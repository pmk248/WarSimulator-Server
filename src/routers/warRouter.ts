import { Router } from "express";
import attack from "../controllers/WarControllers/attack";

const warRouter = Router();

warRouter.post("/attack", attack);
warRouter.post("/defend", );

export default warRouter;