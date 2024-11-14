import { Router } from "express";
import attack from "../controllers/WarControllers/attack";
import { verifyToken } from "../middleware/verifyToken";
import { allowAttacker, allowIDF } from "../middleware/roleMiddleware"
import getLogs from "../controllers/WarControllers/getLogs";

const attackRouter = Router();

attackRouter.post("/attack", verifyToken, allowAttacker, attack);
attackRouter.get("/logs", verifyToken, getLogs);

export default attackRouter;