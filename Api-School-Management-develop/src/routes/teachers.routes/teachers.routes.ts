// routes/teachers.routes/teachers.routes.ts
import express, { Request, Response } from "express";
import { TeacherDTO } from "../../dtos/teachersDTO/teachersDTO";
import { ROLES } from "../../enums/Roles";
import { Business } from "../../models/business/business";
import { Roles } from "../../models/roles/roles";
import { Users } from "../../models/users/users";
import { Teachers } from "../../models/teachers/teachers";
import imageStoreMiddleware from "../../middleware/imageStore.middleware";
import validateBusiness from "../../services/validateBusiness";
import getUserRole from "../../services/getUserRole";

const teachersRoutes = express.Router();
const teacherUpload = imageStoreMiddleware("Teacher");

// Create a new teacher
teachersRoutes.post(
  "/save",
  teacherUpload.single("profileUrl"),
  async (req: any, res: any) => {
    try {
      const {
        teacherName,
        subject,
        classList,
        phoneNumber,
        address,
        teacherEmail,
        teacherPassword,
      } = req.body;

      const profileUrl = req.file;
      const businessPackageName = req.headers.businesspackagename as string;

      // Validate teacher data
      new TeacherDTO(
        teacherName,
        subject ? JSON.parse(subject) : [],
        classList ? JSON.parse(classList) : [],
        phoneNumber,
        address,
        profileUrl
      );

      // Validate business
      const business = await validateBusiness(businessPackageName);

      // Get teacher role
      const userRole = await getUserRole(business.id, ROLES.TEACHERS);

      // Create user account
      const userDetails = await Users.create({
        businessId: userRole.businessId,
        email: teacherEmail,
        password: teacherPassword,
        roleId: userRole.id,
        username: teacherName,
      });

      // Create teacher profile
      if (userDetails?.id) {
        await Teachers.create({
          teacherEmail,
          teacherName,
          phoneNumber,
          profileUrl: profileUrl?.filename ?? null,
          address,
          userId: userDetails.id,
          businessId: business.id,
        });

        return res.status(200).json({
          message: "Teacher registered successfully",
          status: 200,
          body: null,
        });
      } else {
        throw new Error("Failed to create user account");
      }
    } catch (error: any) {
      console.error("Teacher creation error:", error);
      return res.status(400).json({
        message: error.message || "Teacher registration failed",
        status: 400,
        body: null,
      });
    }
  }
);

// Get all teachers
teachersRoutes.get("/all", async (_req: any, res: any) => {
  try {
    const teachers = await Teachers.findAll({
      include: [Users],
    });

    return res.status(200).json({
      message: "Teachers retrieved successfully",
      status: 200,
      body: teachers,
    });
  } catch (error) {
    console.error("Get teachers error:", error);
    return res.status(500).json({
      message: "Failed to retrieve teachers",
      status: 500,
      body: null,
    });
  }
});

// Get teacher by ID
teachersRoutes.get("/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Teacher ID is required",
        status: 400,
        body: null,
      });
    }

    const teacher = await Teachers.findOne({
      where: { id },
    });

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
        status: 404,
        body: null,
      });
    }

    return res.status(200).json({
      message: "Teacher retrieved successfully",
      status: 200,
      body: teacher,
    });
  } catch (error) {
    console.error("Get teacher error:", error);
    return res.status(500).json({
      message: "Failed to retrieve teacher",
      status: 500,
      body: null,
    });
  }
});

// Delete teacher
teachersRoutes.delete("/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Teacher ID is required",
        status: 400,
        body: null,
      });
    }

    // Get teacher to find associated user
    const teacher = await Teachers.findOne({ where: { id } });

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
        status: 404,
        body: null,
      });
    }

    // Delete teacher record
    await Teachers.destroy({ where: { id } });

    // Also delete associated user account if exists
    if (teacher.userId) {
      await Users.destroy({ where: { id: teacher.userId } });
    }

    return res.status(200).json({
      message: "Teacher deleted successfully",
      status: 200,
      body: null,
    });
  } catch (error) {
    console.error("Delete teacher error:", error);
    return res.status(500).json({
      message: "Failed to delete teacher",
      status: 500,
      body: null,
    });
  }
});

// Update teacher
teachersRoutes.put(
  "/:id",
  teacherUpload.single("profileUrl"),
  async (req: any, res: any) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          message: "Teacher ID is required",
          status: 400,
          body: null,
        });
      }

      const businessPackageName = req.headers.businesspackagename as string;
      const business = await validateBusiness(businessPackageName);

      const teacher = await Teachers.findOne({
        where: { id, businessId: business.id },
      });

      if (!teacher) {
        return res.status(404).json({
          message: "Teacher not found",
          status: 404,
          body: null,
        });
      }

      // Parse incoming data
      const updateData = {
        teacherName: req.body.teacherName || teacher.teacherName,
        phoneNumber: req.body.phoneNumber || teacher.phoneNumber,
        address: req.body.address || teacher.address,
        teacherEmail: req.body.teacherEmail || teacher.teacherEmail,
        profileUrl: req.file?.filename || teacher.profileUrl,
      };

      await Teachers.update(updateData, { where: { id } });

      if (teacher.userId) {
        await Users.update(
          {
            email: updateData.teacherEmail,
            username: updateData.teacherName,
            ...(req.body.teacherPassword
              ? { password: req.body.teacherPassword }
              : {}),
          },
          { where: { id: teacher.userId } }
        );
      }

      return res.status(200).json({
        message: "Teacher updated successfully",
        status: 200,
        body: null,
      });
    } catch (error) {
      console.error("Update teacher error:", error);
      return res.status(500).json({
        message: "Failed to update teacher",
        status: 500,
        body: null,
      });
    }
  }
);

export default teachersRoutes;
