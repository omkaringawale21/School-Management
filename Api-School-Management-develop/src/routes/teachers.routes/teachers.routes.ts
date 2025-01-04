import multer from "multer";
import path from "path";
import express from "express";
import { TeachersDTO } from "../../dtos/teachersDTO/teachersDTO";
import fs from "fs";
import { v4 as uuid } from "uuid";
import { ROLES } from "../../enums/Roles";
import { Business } from "../../models/business/business";
import { Roles } from "../../models/roles/roles";
import { Users } from "../../models/users/users";
import { Teachers } from "../../models/teachers/teachers";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (!fs.existsSync("../../uploads/teachers")) {
        fs.mkdirSync("../../uploads/teachers");
      }
      const uploadPath = path.join(__dirname, "../../uploads/teachers");
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueName = `${uuid()}-${file.originalname}`;
      cb(null, uniqueName);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowdFileExt: string[] = [".png", "jpeg", ".jpg"];
    if (allowdFileExt.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});
const teachersRoutes = express.Router();
teachersRoutes.post(
  "/save",
  upload.single("profilePhoto"),
  async (req: any, res: any) => {
    try {
      const {
        teacherName,
        teacherId,
        subject,
        classList,
        phone,
        address,
        teacherEmail,
        teacherPassword,
      } = req.body;
      const profilePhoto = req.file?.filename;
      const { businesspackagename } = req.headers;
      const details = new TeachersDTO(
        teacherEmail,
        teacherName,
        teacherId,
        subject,
        classList,
        phone,
        address,
        profilePhoto,
        teacherPassword
      );
      if (!details) {
        return res.status(400).json({
          message: "Invalid details!",
          status: 400,
          body: null,
        });
      }
      if (!businesspackagename) {
        return res.status(400).json({
          message: "Invalid Business!",
          status: 400,
          body: null,
        });
      }
      const business = await Business.findOne({
        where: { businessPackageName: businesspackagename },
      });
      if (!business?.id) {
        return res.status(400).json({
          message: "Business not found!",
          status: 400,
          body: null,
        });
      }
      const userRole = await Roles.findOne({
        where: { businessId: business?.id, roleName: ROLES.TEACHERS },
        attributes: ["id", "roleName", "businessId"],
      });
      if (!userRole?.id) {
        return res.status(400).json({
          message: "Role not found!",
          status: 400,
          body: null,
        });
      }
      const userDetails = await Users.create({
        businessId: userRole?.businessId,
        email: teacherEmail,
        password: teacherPassword,
        roleId: userRole?.id,
        username: teacherName,
      });
      if (userDetails?.id) {
        const teachersDetails = await Teachers.create({
          email: teacherEmail,
          fullname: teacherName,
          phoneNumber: phone,
          profileUrl: profilePhoto,
          classList,
          subject,
          userId: userDetails?.id,
          businessId: business?.id,
        });
        if (teachersDetails?.id) {
          return res.status(200).json({
            message: "Teacher registered successfully.",
            status: 200,
            body: null,
          });
        } else {
          return res.status(400).json({
            message: "Teacher details not submitted successfully!",
            status: 400,
            body: null,
          });
        }
      } else {
        return res.status(400).json({
          message: "User details not submitted successfully!",
          status: 400,
          body: null,
        });
      }
    } catch (error) {
      if (
        error instanceof multer.MulterError &&
        error.code === "LIMIT_FILE_SIZE"
      ) {
        return res.status(413).json({
          message: "File size is too large. Maximum size is 10MB.",
          status: 413,
          body: null,
        });
      }
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
        status: 500,
        body: null,
      });
    }
  }
);

export default teachersRoutes;
