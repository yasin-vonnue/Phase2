import { describe, it, expect } from "vitest";
import type { Task } from "../src/types/task.js";

describe("Task interface", () => {
  it("can represent a task", () => {
    const task: Task = {
      id: "1",
      title: "Learn Node.js",
      completed: false,
      createdAt: new Date().toISOString(),
    };

    expect(task.title).toBe("Learn Node.js");
    expect(task.completed).toBe(false);
  });
});
