import express from "express";

import { createTaskController } from "./controllers/taskController.js";
import { createTaskRepository } from "./repository/taskRepository.js";
import { createTaskRoutes } from "./routes/taskRoutes.js";
import { createTaskService } from "./services/taskService.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";
import { logger } from "./middleware/logger.js";
import { requestId } from "./middleware/requestedId.js";

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(requestId);
  app.use(logger);

  const repository = createTaskRepository("./data/tasks.json");
  const service = createTaskService(repository);
  const controller = createTaskController(service);
  const taskRoutes = createTaskRoutes(controller);

  app.get("/health", (_req, res) => {
    res.json({
      status: "ok",
    });
  });

  app.use("/tasks", taskRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
