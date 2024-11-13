import { Router } from "express";
import register from "../controllers/authControllers/register";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", );

export default authRouter;