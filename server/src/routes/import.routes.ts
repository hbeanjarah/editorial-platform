import { Router } from "express";
import * as importController from "../controllers/import.controller";
import { uploadJson } from "../middlewares/upload";

const router = Router();

router.post(
  "/articles",
  uploadJson.single("file"),
  importController.importArticles,
);

export default router;
