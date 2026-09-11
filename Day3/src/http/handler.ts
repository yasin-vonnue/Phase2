import type { IncomingMessage, ServerResponse } from "node:http";

import { createTaskService } from "../services/taskService.js";
import { matchRoute } from "./router.js";
import { parseJsonBody } from "./body.js";
import { sendError, sendJson, sendNoContent } from "./response.js";

export function createRequestHandler(
  service: ReturnType<typeof createTaskService>,
) {
  return async function handleRequest(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void> {
    const method = req.method ?? "GET";
    const url = req.url ?? "/";

    const match = matchRoute(method, url);

    if (!match) {
      sendError(res, 404, "Route not found");
      return;
    }

    try {
      if (match.route.method === "GET" && match.route.path === "/tasks") {
        const tasks = await service.listTasks();

        sendJson(res, 200, tasks);
        return;
      }

      if (match.route.method === "GET" && match.route.path === "/tasks/:id") {
        const task = await service.getTask(match.id!);

        sendJson(res, 200, task);
        return;
      }

      if (match.route.method === "POST" && match.route.path === "/tasks") {
        const body = await parseJsonBody(req);

        if (
          typeof body !== "object" ||
          body === null ||
          !("title" in body) ||
          typeof body.title !== "string" ||
          body.title.trim() === ""
        ) {
          sendError(res, 400, "Title is required");
          return;
        }

        const task = await service.addTask(body.title.trim());

        sendJson(res, 201, task);
        return;
      }

      if (match.route.method === "PATCH" && match.route.path === "/tasks/:id") {
        const task = await service.completeTask(match.id!);

        sendJson(res, 200, task);
        return;
      }

      if (
        match.route.method === "DELETE" &&
        match.route.path === "/tasks/:id"
      ) {
        await service.deleteTask(match.id!);

        sendNoContent(res);
        return;
      }

      sendError(res, 404, "Route not found");
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.startsWith("Task not found:")
      ) {
        sendError(res, 404, error.message);
        return;
      }

      if (error instanceof SyntaxError) {
        sendError(res, 400, "Invalid JSON");
        return;
      }

      console.error(error);
      sendError(res, 400, "Internal server error");
    }
  };
}
