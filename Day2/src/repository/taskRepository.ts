import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

import type { Task } from "../types/task.js";

export function createTaskRepository(filePath: string) {
  async function getTasks(): Promise<Task[]> {
    try {
      const data = await readFile(filePath, "utf8");
      const parsed = JSON.parse(data);

      if (!Array.isArray(parsed)) {
        throw new Error("Task data must be an array");
      }

      return parsed;
    } catch (error) {
      if (
        error instanceof Error &&
        "code" in error &&
        error.code === "ENOENT"
      ) {
        return [];
      }

      throw error;
    }
  }

  async function saveTasks(tasks: Task[]): Promise<void> {
    await mkdir(dirname(filePath), { recursive: true });

    const data = JSON.stringify(tasks, null, 2);

    await writeFile(filePath, data, "utf8");
  }

  return {
    getTasks,
    saveTasks,
  };
}
