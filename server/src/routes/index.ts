import { Router } from "express";
import networkRoutes from "./network.routes";
import categoryRoutes from "./category.routes";
import articleRoutes from "./article.routes";

const router = Router();

router.use("/networks", networkRoutes);
router.use("/categories", categoryRoutes);
router.use("/articles", articleRoutes);

export default router;
