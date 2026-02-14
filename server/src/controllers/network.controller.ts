import { NextFunction, Request, Response } from "express";
import { getAll as getAllNetworks } from "../services/network.service";

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const networks = await getAllNetworks();
    res.json(networks);
  } catch (error) {
    next(error);
  }
}
