import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path, { resolve } from "path";
dotenv.config({
  path: resolve(__dirname, "../.env"),
});
import initializeDatabase from "./config/DB";
import authRoutes from "./routes/auth.routes/auth.routes";
import cors from "cors";
import teachersRoutes from "./routes/teachers.routes/teachers.routes";
import studentsRoutes from "./routes/students.routes/students.routes";
import parentsRoutes from './routes/parents.routes/parents.routes';

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const PORT = process.env.PORT;

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE", "OPTION"],
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

// Connect to database
initializeDatabase();

// Auth routes
app.use("/api", authRoutes);
// Teachers routes
app.use("/api/teacher", teachersRoutes);
// Students routes
app.use("/api/student", studentsRoutes);
// Parents routes
app.use("/api/parent", parentsRoutes);

app.use("/Teacher", express.static(path.join(__dirname, "uploads/Teacher")));
app.use("/Student", express.static(path.join(__dirname, "uploads/Student")));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
