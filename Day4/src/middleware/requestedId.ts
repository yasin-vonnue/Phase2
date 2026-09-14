import { randomUUID } from "node:crypto";
import type { NextFunction, Request, Response } from "express";

export function requestId(
  _req: Request,
  res: Response,
  next: NextFunction,
): void {
  const id = randomUUID();

  res.setHeader("X-Request-ID", id);

  next();
}
