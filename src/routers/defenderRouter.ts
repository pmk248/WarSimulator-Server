import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { allowIDF } from "../middleware/roleMiddleware"
import defend from "../controllers/WarControllers/defend";
import getLogs from "../controllers/WarControllers/getLogs";

const defendRouter = Router();

defendRouter.post("/defend", verifyToken, allowIDF, defend);
defendRouter.get("/logs", verifyToken, getLogs);

export default defendRouter;