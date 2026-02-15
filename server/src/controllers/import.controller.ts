import { Request, Response, NextFunction } from "express";
import * as importService from "../services/import.service";
import { AppError } from "../middlewares/errorHandler";

export async function importArticles(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.file) throw new AppError(400, "No file uploaded");

    const data = JSON.parse(req.file.buffer.toString());

    if (!Array.isArray(data)) throw new AppError(400, "JSON must be an array");

    const result = await importService.importArticles(data);

    res.status(201).json(result);
  } catch (err) {
    if (err instanceof SyntaxError) {
      res.status(400).json({ error: "Invalid JSON file" });

      return;
    }
    next(err);
  }
}
