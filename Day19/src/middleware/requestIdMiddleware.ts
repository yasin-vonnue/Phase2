import { randomUUID } from "node:crypto";
import type { RequestHandler } from "express";

export const requestIdMiddleware: RequestHandler = (req, res, next) => {
  const requestId = req.header("X-Request-ID") ?? randomUUID();

  res.setHeader("X-Request-ID", requestId);

  res.locals.requestId = requestId;

  next();
};
