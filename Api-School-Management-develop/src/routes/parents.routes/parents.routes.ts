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

//Save parent details
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

    // Validate parent data
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

    if (!business) {
      return res.status(404).json({
        message: "Business not found!",
        status: 400,
        body: null,
      });
    }

    // Get parent role
    const userRole = await getUserRole(business.id, ROLES.PARENTS);

    if (!userRole) {
      return res.status(404).json({
        message: "User role not found!",
        status: 400,
        body: null,
      });
    }

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
      message: "Parent registration failed",
      status: 400,
      body: null,
    });
  }
});

// Get all parents
parentsRoutes.get("/all", async (req: any, res: any) => {
  try {
    const businessPackageName = req.headers.businesspackagename as string;

    // Validate business
    const business = await validateBusiness(businessPackageName);

    if (!business) {
      return res.status(404).json({
        message: "Business not found!",
        status: 400,
        body: null,
      });
    }

    const parents = await Parents.findAll({
      where: { businessId: business?.id },
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

// Delete parent details
parentsRoutes.delete("/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Parent ID is required",
        status: 400,
        body: null,
      });
    }

    // Get parent to find associated user
    const parent = await Parents.findOne({ where: { id } });

    if (!parent) {
      return res.status(404).json({
        message: "Parent not found",
        status: 404,
        body: null,
      });
    }

    // Delete parent record
    await Parents.destroy({ where: { id } });

    // Also delete associated user account if exists
    if (parent.userId) {
      await Users.destroy({ where: { id: parent.userId } });
    }

    return res.status(200).json({
      message: "Parent deleted successfully",
      status: 200,
      body: null,
    });
  } catch (error) {
    console.error("Delete parent error:", error);
    return res.status(500).json({
      message: "Failed to delete parent",
      status: 500,
      body: null,
    });
  }
});

// Get parent details by id
parentsRoutes.get("/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Parent ID is required",
        status: 400,
        body: null,
      });
    }

    // Get parent to find associated user
    const parent = await Parents.findOne({ where: { id } });

    if (!parent) {
      return res.status(404).json({
        message: "Parent not found",
        status: 404,
        body: null,
      });
    }

    return res.status(200).json({
      message: "Parent details get successfully",
      status: 200,
      body: parent,
    });
  } catch (error) {
    console.error("Get parent error:", error);
    return res.status(500).json({
      message: "Failed to get parent details",
      status: 500,
      body: null,
    });
  }
});

// Update parent details by id
parentsRoutes.put("/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Parent ID is required",
        status: 400,
        body: null,
      });
    }

    const businessPackageName = req.headers.businesspackagename as string;
    const business = await validateBusiness(businessPackageName);

    const parent = await Parents.findOne({
      where: { id, businessId: business.id },
    });

    if (!parent) {
      return res.status(404).json({
        message: "Parent not found",
        status: 404,
        body: null,
      });
    }

    // Parse incoming data
    const updateData = {
      parentname: req.body.parentname || parent.parentname,
      phoneNumber: req.body.phoneNumber || parent.phoneNumber,
      address: req.body.address || parent.address,
      email: req.body.email || parent.email,
      studentId: req.body.studentId || parent.studentId,
    };

    await Parents.update(updateData, { where: { id } });

    if (parent.userId) {
      await Users.update(
        {
          email: updateData.email,
          username: updateData.parentname,
          ...(req.body.parentPassword
            ? { password: req.body.parentPassword }
            : {}),
        },
        { where: { id: parent.userId } }
      );
    }

    return res.status(200).json({
      message: "Parent updated successfully",
      status: 200,
      body: null,
    });
  } catch (error) {
    console.error("Update parent error:", error);
    return res.status(500).json({
      message: "Failed to update parent",
      status: 500,
      body: null,
    });
  }
});

export default parentsRoutes;
