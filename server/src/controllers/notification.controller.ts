import { NextFunction, Request, Response } from "express";
import * as notificationService from "../services/notification.service";

export async function sendNotification(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await notificationService.sendNotification(
      req.params.id,
      req.body,
    );

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const notifications = await notificationService.getAll();

    res.json(notifications);
  } catch (err) {
    next(err);
  }
}
