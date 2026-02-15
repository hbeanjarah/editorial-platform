import { NextFunction, Request, Response } from "express";

import * as articleService from "../services/article.service";

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await articleService.getAll(req.query as any);

    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const article = await articleService.getById(req.params.id);

    res.json(article);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const article = await articleService.create(req.body);

    res.status(201).json(article);
  } catch (err) {
    next(err);
  }
}

export async function update(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const article = await articleService.update(req.params.id, req.body);

    res.json(article);
  } catch (err) {
    next(err);
  }
}

export async function remove(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    await articleService.remove(req.params.id);

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function getStats(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const stats = await articleService.getStats();
    res.json(stats);
  } catch (err) {
    next(err);
  }
}

export async function changeStatus(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const article = await articleService.changeStatus(
      req.params.id,
      req.body.status,
    );

    res.json(article);
  } catch (err) {
    next(err);
  }
}
