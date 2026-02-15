import { Router } from "express";
import networkRoutes from "./network.routes";
import categoryRoutes from "./category.routes";
import articleRoutes from "./article.routes";
import notificationRoutes from "./notification.routes";
import importRoutes from "./import.routes";

const router = Router();

router.use("/networks", networkRoutes);
router.use("/categories", categoryRoutes);
router.use("/articles", articleRoutes);
router.use("/notifications", notificationRoutes);
router.use("/import", importRoutes);

export default router;
