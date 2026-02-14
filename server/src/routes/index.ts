import { Router } from "express";
import networkRoutes from "./network.routes";
import categoryRoutes from "./category.routes";

const router = Router();

router.use("/networks", networkRoutes);
router.use("/categories", categoryRoutes);

export default router;
