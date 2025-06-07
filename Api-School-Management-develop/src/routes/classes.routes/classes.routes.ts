import express, { Request, Response } from "express";
import { Teachers } from "../../models/teachers/teachers";
import { Classes } from "../../models/classes/classes";
import validateBusiness from "../../services/validateBusiness";

const classesRoutes = express.Router();

// Create a new class
classesRoutes.post("/save", async (req: any, res: any) => {
  try {
    const { className, classCapacity, classGrade, classSupervisor } = req.body;
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
    try {
      await Classes.create({
        className,
        classCapacity,
        classGrade,
        classSupervisor,
        businessId: business?.id,
      });
      return res.status(200).json({
        message: "Class registered successfully",
        status: 200,
        body: null,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error registering class",
        status: 500,
        body: null,
      });
    }
  } catch (error) {
    console.error("Class creation error:", error);
    return res.status(400).json({
      message: "Class registration failed",
      status: 400,
      body: null,
    });
  }
});

// Get all class list
classesRoutes.get("/all", async (req: any, res: any) => {
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

    const classes = await Classes.findAll({
      where: { businessId: business?.id },
    });

    const teachers = await Teachers.findAll({
      where: { businessId: business?.id },
    });

    // Create a map of teacher IDs to teacher names
    const teacherMap = new Map();
    teachers.forEach((teacher: any) => {
      teacherMap.set(teacher.id, teacher.teacherName);
    });

    // Map classes to include supervisor name
    const updatedClassList = classes.map((cls: any) => {
      const supervisorName = teacherMap.get(cls.classSupervisor) || null;
      return {
        id: cls.id,
        className: cls.className,
        classCapacity: cls.classCapacity,
        classGrade: cls.classGrade,
        classSupervisor: supervisorName,
        businessId: cls.businessId,
      };
    });
    return res.status(200).json({
      message: "Class list fetch successfully",
      status: 200,
      body: updatedClassList,
    });
  } catch (error) {
    console.error("Class list fetch error:", error);
    return res.status(400).json({
      message: "Class list fetch failed",
      status: 400,
      body: null,
    });
  }
});

// Get class by ID
classesRoutes.get("/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Class ID is required",
        status: 400,
        body: null,
      });
    }
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
    if (!id) {
      return res.status(400).json({
        message: "Class ID is required",
        status: 400,
        body: null,
      });
    }
    const classDetails = await Classes.findOne({
      where: { id },
    });
    if (!classDetails) {
      return res.status(404).json({
        message: "Class not found",
        status: 404,
        body: null,
      });
    }
    // Send the response
    return res.status(200).json({
      message: "Class retrieved successfully",
      status: 200,
      body: classDetails,
    });
  } catch (error) {
    console.error("Get class error:", error);
    return res.status(500).json({
      message: "Failed to retrieve subject",
      status: 500,
      body: null,
    });
  }
});

// Update class by ID
classesRoutes.put("/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Class ID is required",
        status: 400,
        body: null,
      });
    }
    const businessPackageName = req.headers.businesspackagename as string;
    const business = await validateBusiness(businessPackageName);
    if (!business) {
      return res.status(404).json({
        message: "Business not found!",
        status: 400,
        body: null,
      });
    }
    const classDetails = await Classes.findOne({
      where: { id, businessId: business.id },
    });
    if (!classDetails) {
      return res.status(404).json({
        message: "Class not found",
        status: 404,
        body: null,
      });
    }
    const { className, classCapacity, classGrade, classSupervisor } = req.body;
    try {
      await Classes.update(
        {
          className,
          classCapacity,
          classGrade,
          classSupervisor,
        },
        { where: { id } }
      );
      return res.status(200).json({
        message: "Class updated successfully",
        status: 200,
        body: null,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error update class",
        status: 500,
        body: null,
      });
    }
  } catch (error) {
    console.error("Update class error:", error);
    return res.status(500).json({
      message: "Failed to update class",
      status: 500,
      body: null,
    });
  }
});

// Delete class by ID
classesRoutes.delete("/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Subject ID is required",
        status: 400,
        body: null,
      });
    }
    const businessPackageName = req.headers.businesspackagename as string;
    const business = await validateBusiness(businessPackageName);
    if (!business) {
      return res.status(404).json({
        message: "Business not found!",
        status: 400,
        body: null,
      });
    }
    const classDetails = await Classes.findOne({
      where: { id, businessId: business.id },
    });
    if (!classDetails) {
      return res.status(404).json({
        message: "Class not found",
        status: 404,
        body: null,
      });
    }
    // Delete class record
    await Classes.destroy({ where: { id } });
    return res.status(200).json({
      message: "Class deleted successfully",
      status: 200,
      body: null,
    });
  } catch (error) {
    console.error("Delete class error:", error);
    return res.status(500).json({
      message: "Failed to delete class",
      status: 500,
      body: null,
    });
  }
});

export default classesRoutes;
