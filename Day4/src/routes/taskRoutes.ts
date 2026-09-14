import { Router } from "express";

import type { createTaskController } from "../controllers/taskController.js";

export function createTaskRoutes(
  controller: ReturnType<typeof createTaskController>,
) {
  const router = Router();

  router.get("/", controller.listTasks);
  router.get("/:id", controller.getTask);
  router.post("/", controller.createTask);
  router.patch("/:id", controller.completeTask);
  router.delete("/:id", controller.deleteTask);

  return router;
}
