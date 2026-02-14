import { Router } from "express";
import networkRoutes from "./network.routes";

const router = Router();

router.use("/networks", networkRoutes);

export default router;
