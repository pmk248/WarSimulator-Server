import { Router } from "express";
import attack from "../controllers/WarControllers/attack";
import { verifyToken } from "../middleware/verifyToken";
import { allowAttacker, allowIDF } from "../middleware/roleMiddleware"
import getLogs from "../controllers/WarControllers/getLogs";
import defend from "../controllers/WarControllers/defend";

const warRouter = Router();

warRouter.post("/attack", verifyToken, allowAttacker, attack);
warRouter.post("/defend", verifyToken, allowIDF, defend);

warRouter.get("/logs", verifyToken, getLogs);

export default warRouter;