import type { Task } from "../types/task.js";
import { createTaskRepository } from "../repository/taskRepository.js";
import { randomUUID } from "node:crypto";

export function createTaskService(
  repository: ReturnType<typeof createTaskRepository>,
) {
  async function addTask(title: string): Promise<Task> {
    const tasks = await repository.getTasks();

    const task: Task = {
      id: randomUUID(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    tasks.push(task);

    await repository.saveTasks(tasks);

    return task;
  }

  async function listTasks(): Promise<Task[]> {
    return repository.getTasks();
  }

  async function completeTask(id: string): Promise<Task> {
    const tasks = await repository.getTasks();

    const task = tasks.find((task) => task.id === id);

    if (!task) {
      throw new Error(`Task not found: ${id}`);
    }

    task.completed = true;

    await repository.saveTasks(tasks);

    return task;
  }

  async function deleteTask(id: string): Promise<void> {
    const tasks = await repository.getTasks();

    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      throw new Error(`Task not found: ${id}`);
    }

    tasks.splice(taskIndex, 1);

    await repository.saveTasks(tasks);
  }

  async function filterTasks(status: "completed" | "pending"): Promise<Task[]> {
    const tasks = await repository.getTasks();

    if (status === "completed") {
      return tasks.filter((task) => task.completed);
    }

    return tasks.filter((task) => !task.completed);
  }

  return {
    addTask,
    listTasks,
    completeTask,
    deleteTask,
    filterTasks,
  };
}
