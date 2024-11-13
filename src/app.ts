import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./database/connection";
import authRouter from "./routers/authRouer";

const PORT = process.env.PORT;
const app = express();

dbConnection();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}...`);
})