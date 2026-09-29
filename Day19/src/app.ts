import express from "express";
import cors from "cors";
import helmet from "helmet";

import { createTicketController } from "./controllers/ticketController.js";
import { createTicketRepository } from "./repository/ticketRepository.js";
import { createTicketRoutes } from "./routes/ticketRoutes.js";
import { createTicketService } from "./services/ticketService.js";
import { createAuthController } from "./controllers/authController.js";
import { createAuthRoutes } from "./routes/authRoutes.js";
import { createUserRepository } from "./repository/userRepository.js";
import { createAuthService } from "./services/authService.js";

import { logger } from "./utils/logger.js";
import { requestIdMiddleware } from "./middleware/requestIdMiddleware.js";

import { checkDatabaseConnection } from "./config/database.js";

export function createApp(filePath = "./data/tickets.json") {
  const app = express();

  const log = logger();

  app.use(requestIdMiddleware);

  app.use((req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
      log.info("HTTP request", {
        requestId: res.locals.requestId,
        method: req.method,
        path: req.originalUrl,
        statusCode: res.statusCode,
        durationMs: Date.now() - start,
      });
    });

    next();
  });

  app.use(helmet());

  app.use(
    cors({
      origin: "http://localhost:3000",
    }),
  );

  app.use(express.json({ limit: "100kb" }));

  const repository = createTicketRepository();
  const service = createTicketService(repository);
  const controller = createTicketController(service);
  const ticketRoutes = createTicketRoutes(controller);

  const userRepository = createUserRepository();
  const authService = createAuthService(userRepository);
  const authController = createAuthController(authService);
  const authRoutes = createAuthRoutes(authController);

  app.get("/health", async (_req, res) => {
    try {
      await checkDatabaseConnection();

      res.status(200).json({
        status: "ok",
        database: "connected",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        status: "error",
        database: "disconnected",
      });
    }
  });

  app.use("/auth", authRoutes);

  app.use("/tickets", ticketRoutes);

  app.use((_req, res) => {
    res.status(404).json({
      error: "Route not found",
    });
  });

  app.use(
    (
      error: unknown,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction,
    ) => {
      if (error instanceof SyntaxError) {
        res.status(400).json({
          error: "Invalid JSON",
        });
        return;
      }

      if (
        typeof error === "object" &&
        error !== null &&
        "type" in error &&
        error.type === "entity.too.large"
      ) {
        res.status(413).json({
          error: "Request body too large",
        });
        return;
      }

      if (
        error instanceof Error &&
        error.message.startsWith("Ticket not found:")
      ) {
        res.status(404).json({
          error: error.message,
        });
        return;
      }

      console.error(error);

      res.status(500).json({
        error: "Internal server error",
      });
    },
  );

  return app;
}
