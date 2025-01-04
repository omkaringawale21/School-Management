import { Users } from "../../models/users/users";
import SignInDTO from "../../dtos/SignInDTO/SignInDTO";
import express from "express";
import { Roles } from "../../models/roles/roles";

const authRoutes = express.Router();

authRoutes.post("/sign-in", async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const details = new SignInDTO(email, password);
    if (!details) {
      return res.status(400).json({
        message: "Invalid credentials!",
        status: 400,
        body: null,
      });
    }
    let userDetails = await Users.findOne({
      where: { email, password },
      attributes: ["id", "email", "businessId", "roleId"],
    });
    if (!userDetails?.id) {
      return res.status(400).json({
        message: "User not found!",
        status: 400,
        body: null,
      });
    }
    const userRole = await Roles.findOne({
      where: { id: userDetails?.roleId },
      attributes: ["roleName"]
    });
    if (!userRole?.id) {
      return res.status(400).json({
        message: "Role not found!",
        status: 400,
        body: null,
      });
    }
    const ResponseBody = {
      id: userDetails.id,
      email: userDetails.email,
      businessId: userDetails.businessId,
      role: userRole?.roleName,
    };
    return res.status(200).json({
      message: "User login successfully.",
      status: 200,
      body: ResponseBody,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
      body: null,
    });
  }
});

export default authRoutes;
