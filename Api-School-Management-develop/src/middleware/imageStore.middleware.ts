import fs from "fs";
import { v4 as uuid } from "uuid";
import multer from "multer";
import path from "path";

const imageStoreMiddleware = (folderName: string) => {
  const ALLOWED_MIME_TYPES = {
    "image/png": ".png",
    "image/jpg": ".jpg",
    "image/jpeg": ".jpg",
    "image/avif": ".avif",
  };

  // Create storage configuration
  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      const uploadPath = path.join(__dirname, `../uploads/${folderName}`);
      fs.existsSync(uploadPath) ||
        fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },

    filename: (_req, file, cb) => {
      const ext =
        ALLOWED_MIME_TYPES[file.mimetype as keyof typeof ALLOWED_MIME_TYPES];

      if (!ext) {
        return cb(new Error("Unsupported file type"), "");
      }

      const filename = `${uuid()}${ext}`;
      cb(null, filename);
    },
  });

  // File filter to validate file types
  const fileFilter = (
    _req: Express.Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    const isValidType = Object.keys(ALLOWED_MIME_TYPES).includes(file.mimetype);
    cb(null, isValidType);
  };

  return multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
    },
  });
};

export default imageStoreMiddleware;
