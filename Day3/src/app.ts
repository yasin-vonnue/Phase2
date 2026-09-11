import { createServer } from "node:http";

import { createTaskRepository } from "./repository/taskRepository.js";
import { createTaskService } from "./services/taskService.js";
import { createRequestHandler } from "./http/handler.js";

export function createApp() {
  const repository = createTaskRepository("./data/tasks.json");

  const service = createTaskService(repository);

  const handler = createRequestHandler(service);

  return createServer(handler);
}
