import { Router } from "express";
import attack from "../controllers/WarControllers/attack";
import { verifyToken } from "../middleware/verifyToken";
import { allowAttacker } from "../middleware/roleMiddleware"

const warRouter = Router();

warRouter.post("/attack", verifyToken, allowAttacker, attack);
warRouter.post("/defend", );

export default warRouter;