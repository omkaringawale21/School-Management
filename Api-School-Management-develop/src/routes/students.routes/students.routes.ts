import express from "express";
import { StudentDTO } from "../../dtos/studentsDTO/studentsDTO";
import { ROLES } from "../../enums/Roles";
import { Business } from "../../models/business/business";
import { Roles } from "../../models/roles/roles";
import { Users } from "../../models/users/users";
import { Students } from "../../models/students/students";
import imageStoreMiddleware from "../../middleware/imageStore.middleware";
import validateBusiness from "../../services/validateBusiness";
import getUserRole from "../../services/getUserRole";

const studentsRoutes = express.Router();
const studentUpload = imageStoreMiddleware("Student");

// Create a new student
studentsRoutes.post(
  "/save",
  studentUpload.single("profileUrl"),
  async (req: any, res: any) => {
    try {
      const {
        studentName,
        subject,
        classList,
        phoneNumber,
        address,
        studentEmail,
        studentPassword,
      } = req.body;

      const profileUrl = req.file;
      const businessPackageName = req.headers.businesspackagename as string;

      // Validate student data
      new StudentDTO(
        studentName,
        subject ? JSON.parse(subject) : [],
        classList ? JSON.parse(classList) : [],
        phoneNumber,
        address,
        profileUrl
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

      // Get student role
      const userRole = await getUserRole(business.id, ROLES.STUDENTS);

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
        email: studentEmail,
        password: studentPassword,
        roleId: userRole.id,
        username: studentName,
      });

      // Create student profile
      if (userDetails?.id) {
        await Students.create({
          studentEmail,
          studentName,
          phoneNumber,
          profileUrl: profileUrl?.filename ?? null,
          address,
          userId: userDetails.id,
          businessId: business.id,
        });

        return res.status(200).json({
          message: "Student registered successfully",
          status: 200,
          body: null,
        });
      } else {
        throw new Error("Failed to create user account");
      }
    } catch (error: any) {
      console.error("Student creation error:", error);
      return res.status(400).json({
        message: "Student registration failed",
        status: 400,
        body: null,
      });
    }
  }
);

// Get all students
studentsRoutes.get("/all", async (req: any, res: any) => {
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

    const students = await Students.findAll({
      where: { businessId: business?.id },
      include: [Users],
    });

    return res.status(200).json({
      message: "Students retrieved successfully",
      status: 200,
      body: students,
    });
  } catch (error) {
    console.error("Get students error:", error);
    return res.status(500).json({
      message: "Failed to retrieve students",
      status: 500,
      body: null,
    });
  }
});

// Get student by ID
studentsRoutes.get("/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Student ID is required",
        status: 400,
        body: null,
      });
    }

    const student = await Students.findOne({
      where: { id },
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
        status: 404,
        body: null,
      });
    }

    return res.status(200).json({
      message: "Student retrieved successfully",
      status: 200,
      body: student,
    });
  } catch (error) {
    console.error("Get student error:", error);
    return res.status(500).json({
      message: "Failed to retrieve student",
      status: 500,
      body: null,
    });
  }
});

// Delete student
studentsRoutes.delete("/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Student ID is required",
        status: 400,
        body: null,
      });
    }

    // Get student to find associated user
    const student = await Students.findOne({ where: { id } });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
        status: 404,
        body: null,
      });
    }

    // Delete student record
    await Students.destroy({ where: { id } });

    // Also delete associated user account if exists
    if (student.userId) {
      await Users.destroy({ where: { id: student.userId } });
    }

    return res.status(200).json({
      message: "Student deleted successfully",
      status: 200,
      body: null,
    });
  } catch (error) {
    console.error("Delete student error:", error);
    return res.status(500).json({
      message: "Failed to delete student",
      status: 500,
      body: null,
    });
  }
});

// Update student
studentsRoutes.put(
  "/:id",
  studentUpload.single("profileUrl"),
  async (req: any, res: any) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          message: "Student ID is required",
          status: 400,
          body: null,
        });
      }

      const businessPackageName = req.headers.businesspackagename as string;
      const business = await validateBusiness(businessPackageName);

      const student = await Students.findOne({
        where: { id, businessId: business.id },
      });

      if (!student) {
        return res.status(404).json({
          message: "Student not found",
          status: 404,
          body: null,
        });
      }

      // Parse incoming data
      const updateData = {
        studentName: req.body.studentName || student.studentName,
        phoneNumber: req.body.phoneNumber || student.phoneNumber,
        address: req.body.address || student.address,
        studentEmail: req.body.studentEmail || student.studentEmail,
        profileUrl: req.file?.filename || student.profileUrl,
      };

      await Students.update(updateData, { where: { id } });

      if (student.userId) {
        await Users.update(
          {
            email: updateData.studentEmail,
            username: updateData.studentName,
            ...(req.body.studentPassword
              ? { password: req.body.studentPassword }
              : {}),
          },
          { where: { id: student.userId } }
        );
      }

      return res.status(200).json({
        message: "Student updated successfully",
        status: 200,
        body: null,
      });
    } catch (error) {
      console.error("Update student error:", error);
      return res.status(500).json({
        message: "Failed to update student",
        status: 500,
        body: null,
      });
    }
  }
);

export default studentsRoutes;
