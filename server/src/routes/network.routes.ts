import { Router } from "express";
import * as networkController from "../controllers/network.controller";

const router = Router();

router.get("/", networkController.getAll);

export default router;
