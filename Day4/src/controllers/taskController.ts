import type { Request, Response } from "express";

import { createTaskService } from "../services/taskService.js";

export function createTaskController(
  service: ReturnType<typeof createTaskService>,
) {
  async function listTasks(_req: Request, res: Response): Promise<void> {
    const tasks = await service.listTasks();

    res.status(200).json(tasks);
  }

  async function getTask(req: Request, res: Response): Promise<void> {
    const task = await service.getTask(req.params.id as string);

    res.status(200).json(task);
  }

  async function createTask(req: Request, res: Response): Promise<void> {
    const { title } = req.body;

    if (typeof title !== "string" || title.trim() === "") {
      res.status(400).json({
        error: "Title is required",
      });
      return;
    }

    const task = await service.addTask(title.trim());

    res.status(201).json(task);
  }

  async function completeTask(req: Request, res: Response): Promise<void> {
    const task = await service.completeTask(req.params.id as string);

    res.status(200).json(task);
  }

  async function deleteTask(req: Request, res: Response): Promise<void> {
    await service.deleteTask(req.params.id as string);

    res.status(204).send();
  }

  return {
    listTasks,
    getTask,
    createTask,
    completeTask,
    deleteTask,
  };
}
