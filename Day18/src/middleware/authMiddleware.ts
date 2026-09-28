import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import type { AuthUser } from "../types/auth.js";

const JWT_SECRET: string = process.env.JWT_SECRET ?? "";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not configured");
}

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authorization = req.header("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    res.status(401).json({
      error: "Authentication required",
    });
    return;
  }

  const token = authorization.slice(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (
      typeof decoded !== "object" ||
      decoded === null ||
      typeof decoded.userId !== "string" ||
      typeof decoded.email !== "string" ||
      typeof decoded.role !== "string"
    ) {
      res.status(401).json({
        error: "Invalid or expired token",
      });
      return;
    }

    req.user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    } satisfies AuthUser;

    next();
  } catch {
    res.status(401).json({
      error: "Invalid or expired token",
    });
  }
}
