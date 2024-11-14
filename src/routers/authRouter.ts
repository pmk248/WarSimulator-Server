import { Router } from "express";
import register from "../controllers/authControllers/register";
import login from "../controllers/authControllers/login";
import getLogs from "../controllers/WarControllers/getLogs";
import { verifyToken } from "../middleware/verifyToken";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

export default authRouter;