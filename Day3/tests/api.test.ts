import { describe, expect, it, beforeAll, afterAll } from "vitest";
import type { Server } from "node:http";

import { createApp } from "../src/app.js";

describe("Task API", () => {
  let server: Server;
  let baseUrl: string;

  beforeAll(async () => {
    server = createApp();

    await new Promise<void>((resolve) => {
      server.listen(0, () => {
        const address = server.address();

        if (!address || typeof address === "string") {
          throw new Error("Could not get server address");
        }

        baseUrl = `http://localhost:${address.port}`;

        resolve();
      });
    });
  });

  afterAll(async () => {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  });

  it("GET /tasks returns a list of tasks", async () => {
    const response = await fetch(`${baseUrl}/tasks`);

    expect(response.status).toBe(200);

    const data = await response.json();

    expect(Array.isArray(data)).toBe(true);
  });

  it("POST /tasks creates a task", async () => {
    const response = await fetch(`${baseUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Test API task",
      }),
    });

    expect(response.status).toBe(201);

    const data = await response.json();

    expect(data.title).toBe("Test API task");
    expect(data.completed).toBe(false);
    expect(data.id).toBeDefined();
  });

  it("POST /tasks rejects an empty title", async () => {
    const response = await fetch(`${baseUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "",
      }),
    });

    expect(response.status).toBe(400);

    const data = await response.json();

    expect(data.error).toBe("Title is required");
  });

  it("returns 404 for a missing task", async () => {
    const response = await fetch(`${baseUrl}/tasks/does-not-exist`);

    expect(response.status).toBe(404);

    const data = await response.json();

    expect(data.error).toBe("Task not found: does-not-exist");
  });

  it("returns 404 for an unknown route", async () => {
    const response = await fetch(`${baseUrl}/unknown`);

    expect(response.status).toBe(404);

    const data = await response.json();

    expect(data.error).toBe("Route not found");
  });

  it("PATCH /tasks/:id completes a task", async () => {
    const createResponse = await fetch(`${baseUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Task to complete",
      }),
    });

    const createdTask = await createResponse.json();

    const response = await fetch(`${baseUrl}/tasks/${createdTask.id}`, {
      method: "PATCH",
    });

    expect(response.status).toBe(200);

    const data = await response.json();

    expect(data.id).toBe(createdTask.id);
    expect(data.completed).toBe(true);
  });

  it("DELETE /tasks/:id deletes a task", async () => {
    const createResponse = await fetch(`${baseUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Task to delete",
      }),
    });

    const createdTask = await createResponse.json();

    const deleteResponse = await fetch(`${baseUrl}/tasks/${createdTask.id}`, {
      method: "DELETE",
    });

    expect(deleteResponse.status).toBe(204);

    const getResponse = await fetch(`${baseUrl}/tasks/${createdTask.id}`);

    expect(getResponse.status).toBe(404);
  });

  it("POST /tasks rejects malformed JSON", async () => {
    const response = await fetch(`${baseUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: '{"title":',
    });

    expect(response.status).toBe(400);

    const data = await response.json();

    expect(data.error).toBe("Invalid JSON");
  });
});
