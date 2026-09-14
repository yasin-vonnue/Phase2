import type { NextFunction, Request, Response } from "express";

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (error instanceof Error && error.message.startsWith("Task not found:")) {
    res.status(404).json({
      error: error.message,
    });

    return;
  }

  if (error instanceof SyntaxError) {
    res.status(400).json({
      error: "Invalid JSON",
    });
    return;
  }

  console.error(error);

  res.status(500).json({
    error: "Internal server error",
  });
}
