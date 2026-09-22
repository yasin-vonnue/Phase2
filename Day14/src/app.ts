import express from "express";

import { createTicketController } from "./controllers/ticketController.js";
import { createTicketRepository } from "./repository/ticketRepository.js";
import { createTicketRoutes } from "./routes/ticketRoutes.js";
import { createTicketService } from "./services/ticketService.js";

import { checkDatabaseConnection } from "./config/database.js";

export function createApp(filePath = "./data/tickets.json") {
  const app = express();

  app.use(express.json());

  const repository = createTicketRepository();
  const service = createTicketService(repository);
  const controller = createTicketController(service);
  const ticketRoutes = createTicketRoutes(controller);

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
