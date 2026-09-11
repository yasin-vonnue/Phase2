import { describe, expect, it, vi } from "vitest";

import type { Task } from "../src/types/task.js";
import { createTaskService } from "../src/services/taskService.js";
import { createServer } from "node:http";

const existingTasks: Task[] = [
  {
    id: "1",
    title: "Learn Node.js",
    completed: false,
    createdAt: "2026-09-10T09:00:00.000Z",
  },

  {
    id: "2",
    title: "Learn TypeScript",
    completed: true,
    createdAt: "2026-09-10T10:00:00.000Z",
  },
];

describe("Task Service", () => {
  function createFakeRepository(tasks: Task[] = []) {
    let storedTasks = tasks.map((task) => ({ ...task }));

    return {
      getTasks: vi.fn(async () => storedTasks.map((task) => ({ ...task }))),

      saveTasks: vi.fn(async (newTasks: Task[]) => {
        storedTasks = newTasks.map((task) => ({ ...task }));
      }),
    };
  }

  it("lists tasks", async () => {
    const repository = createFakeRepository(existingTasks);
    const service = createTaskService(repository);

    const tasks = await service.listTasks();

    expect(tasks).toEqual(existingTasks);
  });

  it("adds a new task", async () => {
    const repository = createFakeRepository();
    const service = createTaskService(repository);

    const task = await service.addTask("Learn Vitest");

    expect(task.title).toBe("Learn Vitest");
    expect(task.completed).toBe(false);
    expect(task.id).toEqual(expect.any(String));
    expect(task.createdAt).toEqual(expect.any(String));

    expect(repository.saveTasks).toHaveBeenCalled();
  });

  it("completes a task", async () => {
    const repository = createFakeRepository(existingTasks);
    const service = createTaskService(repository);

    const task = await service.completeTask("1");

    expect(task.completed).toBe(true);
    expect(repository.saveTasks).toHaveBeenCalled();
  });

  it("throws when completing a task that doest not exist", async () => {
    const repository = createFakeRepository(existingTasks);
    const service = createTaskService(repository);

    await expect(service.completeTask("999")).rejects.toThrow(
      "Task not found: 999",
    );
  });

  it("deletes a task", async () => {
    const repository = createFakeRepository(existingTasks);
    const service = createTaskService(repository);

    await service.deleteTask("1");

    const remainingTasks = await service.listTasks();

    expect(remainingTasks).toEqual([existingTasks[1]]);
    expect(repository.saveTasks).toHaveBeenCalled();
  });

  it("throws when deleting a task that does not exist", async () => {
    const repository = createFakeRepository(existingTasks);
    const service = createTaskService(repository);

    await expect(service.deleteTask("999")).rejects.toThrow(
      "Task not found: 999",
    );
  });

  it("filters completed tasks", async () => {
    const repository = createFakeRepository(existingTasks);
    const service = createTaskService(repository);

    const tasks = await service.filterTasks("completed");

    expect(tasks).toEqual([existingTasks[1]]);
  });

  it("filters pending tasks", async () => {
    const repository = createFakeRepository(existingTasks);
    const service = createTaskService(repository);

    const tasks = await service.filterTasks("pending");

    expect(tasks).toEqual([existingTasks[0]]);
  });
});
