import { Router } from "express";
import * as articleController from "../controllers/article.controller";
import { validate } from "../middlewares/validate";
import {
  CreateArticleSchema,
  UpdateArticleSchema,
  StatusChangeSchema,
} from "../models/article.model";

const router = Router();

router.get("/", articleController.getAll);
router.get("/stats", articleController.getStats);
router.post("/", validate(CreateArticleSchema), articleController.create);
router.get("/:id", articleController.getById);
router.delete("/:id", articleController.remove);
router.patch(
  "/:id/status",
  validate(StatusChangeSchema),
  articleController.changeStatus,
);
router.put("/:id", validate(UpdateArticleSchema), articleController.update);

export default router;
