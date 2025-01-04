import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { resolve } from "path";
dotenv.config({
  path: resolve(__dirname, "../.env"),
});
import initializeDatabase from "./config/DB";
import authRoutes from "./routes/auth.routes/auth.routes";
import cors from "cors";
import teachersRoutes from "./routes/teachers.routes/teachers.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const PORT = process.env.PORT;

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

// Connect to database
initializeDatabase();

// Auth routes
app.use("/api", authRoutes);
// Teachers routes
app.use("/api/teacher", teachersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
