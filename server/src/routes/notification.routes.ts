import { Router } from "express";
import * as notificationController from "../controllers/notification.controller";
const router = Router();

router.get("/", notificationController.getAll);

export default router;
