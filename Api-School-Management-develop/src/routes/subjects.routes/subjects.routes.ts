import express, { Request, Response } from "express";
import { Teachers } from "../../models/teachers/teachers";
import { Subjects } from "../../models/subjects/subjects";
import validateBusiness from "../../services/validateBusiness";

const subjectsRoutes = express.Router();

// Create subject
subjectsRoutes.post("/save", async (req: any, res: any) => {
  try {
    const { subjectName, teacherId } = req.body;

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

    if (Array.isArray(teacherId) && teacherId.length > 0 && subjectName) {
      try {
        await Subjects.create({
          subjectName,
          teacherId,
          businessId: business?.id,
        });

        return res.status(200).json({
          message: "Subject registered successfully",
          status: 200,
          body: null,
        });
      } catch (error) {
        return res.status(500).json({
          message: "Error registering subject",
          status: 500,
          body: null,
        });
      }
    } else {
      return res.status(400).json({
        message:
          "Invalid input: 'teacherId' must be a non-empty array and 'subjectName' is required",
        status: 400,
        body: null,
      });
    }
  } catch (error) {
    console.error("Subject creation error:", error);
    return res.status(400).json({
      message: "Subject registration failed",
      status: 400,
      body: null,
    });
  }
});

// Get all subject list
subjectsRoutes.get("/all", async (req: any, res: any) => {
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

    const subjects = await Subjects.findAll({
      where: { businessId: business?.id },
    });

    const teachers = await Teachers.findAll({
      where: { businessId: business?.id },
    });

    const teacherMap = new Map();
    teachers.forEach((teacher: any) => {
      teacherMap.set(teacher.id, teacher.teacherName);
    });

    let updatedSubjectList: any[] = [];

    if (Array.isArray(subjects)) {
      updatedSubjectList = subjects.map((subject: any) => {
        const teacherNames = Array.isArray(subject.teacherId)
          ? subject.teacherId
              .map((id: any) => teacherMap.get(id))
              .filter(Boolean)
          : [];

        return {
          id: subject.id,
          subjectName: subject.subjectName,
          teachers: teacherNames,
          businessId: subject.businessId,
        };
      });
    }

    return res.status(200).json({
      message: "Subject list fetch successfully",
      status: 200,
      body: updatedSubjectList,
    });
  } catch (error) {
    console.error("Subject list fetch error:", error);
    return res.status(400).json({
      message: "Subject list fetch failed",
      status: 400,
      body: null,
    });
  }
});

// Get subject by ID
subjectsRoutes.get("/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;

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
        message: "Subject ID is required",
        status: 400,
        body: null,
      });
    }

    const subject = await Subjects.findOne({
      where: { id },
    });

    if (!subject) {
      return res.status(404).json({
        message: "Subject not found",
        status: 404,
        body: null,
      });
    }

    // Send the response
    return res.status(200).json({
      message: "Subject retrieved successfully",
      status: 200,
      body: subject,
    });
  } catch (error) {
    console.error("Get subject error:", error);
    return res.status(500).json({
      message: "Failed to retrieve subject",
      status: 500,
      body: null,
    });
  }
});

// Update subject by ID
subjectsRoutes.put("/:id", async (req: any, res: any) => {
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

    const subject = await Subjects.findOne({
      where: { id, businessId: business.id },
    });

    if (!subject) {
      return res.status(404).json({
        message: "Subject not found",
        status: 404,
        body: null,
      });
    }

    const { subjectName, teacherId } = req.body;

    if (Array.isArray(teacherId) && teacherId.length > 0 && subjectName) {
      try {
        await Subjects.update(
          {
            subjectName,
            teacherId,
            businessId: business?.id,
          },
          { where: { id } }
        );

        return res.status(200).json({
          message: "Subject updated successfully",
          status: 200,
          body: null,
        });
      } catch (error) {
        return res.status(500).json({
          message: "Error updated subject",
          status: 500,
          body: null,
        });
      }
    } else {
      return res.status(400).json({
        message:
          "Invalid input: 'teacherId' must be a non-empty array and 'subjectName' is required",
        status: 400,
        body: null,
      });
    }
  } catch (error) {
    console.error("Update subject error:", error);
    return res.status(500).json({
      message: "Failed to update subject",
      status: 500,
      body: null,
    });
  }
});

// Delete subject by ID
subjectsRoutes.delete("/:id", async (req: any, res: any) => {
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

    // Delete subject record
    await Subjects.destroy({ where: { id } });

    return res.status(200).json({
      message: "Subject deleted successfully",
      status: 200,
      body: null,
    });
  } catch (error) {
    console.error("Delete subject error:", error);
    return res.status(500).json({
      message: "Failed to delete subject",
      status: 500,
      body: null,
    });
  }
});

export default subjectsRoutes;
