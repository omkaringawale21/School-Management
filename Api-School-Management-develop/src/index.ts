import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import { resolve } from 'path';
dotenv.config({
    path: resolve(__dirname, "../.env")
});
import initializeDatabase from './config/DB';


const app = express();
const PORT = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!');
});

// Connect to database
initializeDatabase();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
