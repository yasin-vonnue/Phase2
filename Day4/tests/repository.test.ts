import { afterEach, describe, it, expect } from "vitest";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";

import { createTaskRepository } from "../src/repository/taskRepository.js";

const testDirectory = join(tmpdir(), "day2-task-manager");
const testFile = join(testDirectory, "tasks.json");

describe("Task Respository", () => {
  it("returns an empty array whent the file does not exist", async () => {
    await rm(testDirectory, { recursive: true, force: true });

    const repository = createTaskRepository(testFile);

    const tasks = await repository.getTasks();

    expect(tasks).toEqual([]);
  });

  it("reads valid tasks from the file", async () => {
    await mkdir(testDirectory, { recursive: true });
    const tasks = [
      {
        id: "1",
        title: "Learn Node.js",
        completed: false,
        createdAt: "2026-09-10T09:00:00.000Z",
      },
    ];

    await writeFile(testFile, JSON.stringify(tasks), "utf8");

    const repository = createTaskRepository(testFile);

    const result = await repository.getTasks();

    expect(result).toEqual(tasks);
  });

  it("throws an error when the JSON is malformed", async () => {
    await mkdir(testDirectory, { recursive: true });

    await writeFile(testFile, "{ invalid json }", "utf8");

    const repository = createTaskRepository(testFile);

    await expect(repository.getTasks()).rejects.toThrow();
  });

  it("throws an error when the JSON is not an array", async () => {
    await mkdir(testDirectory, { recursive: true });

    await writeFile(testFile, JSON.stringify({ tasks: [] }), "utf8");

    const repository = createTaskRepository(testFile);

    await expect(repository.getTasks()).rejects.toThrow(
      "Task data must be an array",
    );
  });

  afterEach(async () => {
    await rm(testDirectory, { recursive: true, force: true });
  });
});
