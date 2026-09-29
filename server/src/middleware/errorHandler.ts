import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.js";

// Centralized error middleware. Must be registered last in app.ts.
// Never leaks stack traces, SQL, or Prisma internals to clients.
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    res.status(err.status).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
        ...(err.details !== undefined ? { details: err.details } : {}),
      },
    });
    return;
  }

  // Log diagnostic info server-side only.
  // eslint-disable-next-line no-console
  console.error("[unhandled-error]", err);
  res.status(500).json({
    success: false,
    error: { code: "INTERNAL_ERROR", message: "Something went wrong" },
  });
}
