import { Router } from "express";
import * as categoryController from "../controllers/category.controller";
import { validate } from "../middlewares/validate";
import {
  CreateCategorySchema,
  UpdateCategorySchema,
} from "../models/category.model";

const router = Router();

router.get("/", categoryController.getAll);
router.post("/", validate(CreateCategorySchema), categoryController.create);
router.put("/:id", validate(UpdateCategorySchema), categoryController.update);
router.delete("/:id", categoryController.remove);

export default router;
