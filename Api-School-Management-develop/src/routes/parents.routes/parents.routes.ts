import express, { Request, Response } from "express";
import { Users } from "./../../models/users/users";
import { Students } from "./../../models/students/students";
import { Parents } from "./../../models/parents/parents";
import { ParentsDTO } from "../../dtos/parentsDTO/parentsDTO";
import { ROLES } from "../../enums/Roles";
import { Business } from "../../models/business/business";
import { Roles } from "../../models/roles/roles";
import validateBusiness from "../../services/validateBusiness";
import getUserRole from "../../services/getUserRole";

const parentsRoutes = express.Router();

//Save parent Details
parentsRoutes.post("/save", async (req: any, res: any) => {
  try {
    const {
      parentname,
      email,
      phoneNumber,
      studentId,
      parentPassword,
      address,
    } = req.body;

    const businessPackageName = req.headers.businesspackagename as string;

    // Validate student data
    new ParentsDTO(
      parentname,
      email,
      phoneNumber,
      studentId,
      parentPassword,
      address
    );

    // Validate business
    const business = await validateBusiness(businessPackageName);

    // Get student role
    const userRole = await getUserRole(business.id, ROLES.PARENTS);

    // Create user account
    const userDetails = await Users.create({
      businessId: userRole.businessId,
      email: email,
      password: parentPassword,
      roleId: userRole.id,
      username: parentname,
    });

    // Create parent profile
    if (userDetails?.id) {
      await Parents.create({
        parentname,
        email,
        phoneNumber,
        studentId,
        userId: userDetails.id,
        businessId: business.id,
        address,
      });

      return res.status(200).json({
        message: "Parent registered successfully",
        status: 200,
        body: null,
      });
    } else {
      throw new Error("Failed to create user account");
    }
  } catch (error: any) {
    console.error("Parent creation error:", error);
    return res.status(400).json({
      message: error.message || "Parent registration failed",
      status: 400,
      body: null,
    });
  }
});

// Get all parents
parentsRoutes.get("/all", async (_req: any, res: any) => {
  try {
    const parents = await Parents.findAll({
      include: [Users, Students],
    });

    return res.status(200).json({
      message: "Parents retrieved successfully",
      status: 200,
      body: parents,
    });
  } catch (error) {
    console.error("Get parents error:", error);
    return res.status(500).json({
      message: "Failed to retrieve parents",
      status: 500,
      body: null,
    });
  }
});

export default parentsRoutes;
