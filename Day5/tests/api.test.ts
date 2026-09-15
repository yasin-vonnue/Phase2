import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import request from "supertest";
import { afterEach, describe, expect, it } from "vitest";

import { createApp } from "../src/app.js";

const tempDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(
    tempDirectories
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  );
});

async function createTestApp() {
  const directory = await mkdtemp(join(tmpdir(), "day5-api-"));
  tempDirectories.push(directory);

  return createApp(join(directory, "tickets.json"));
}

describe("Ticket API", () => {
  it("creates a ticket", async () => {
    const app = await createTestApp();

    const response = await request(app).post("/tickets").send({
      title: "Login issue",
      description: "User cannot log in",
      priority: "high",
    });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe("Login issue");
    expect(response.body.priority).toBe("high");
    expect(response.body.status).toBe("open");
    expect(response.body.assignee).toBeNull();
  });

  it("lists tickets", async () => {
    const app = await createTestApp();

    await request(app).post("/tickets").send({
      title: "Payment issue",
      description: "Payment failed",
      priority: "medium",
    });

    const response = await request(app).get("/tickets");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it("gets a ticket by id", async () => {
    const app = await createTestApp();

    const created = await request(app).post("/tickets").send({
      title: "Login issue",
      description: "Cannot log in",
      priority: "high",
    });

    const response = await request(app).get(`/tickets/${created.body.id}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(created.body.id);
  });

  it("updates ticket status", async () => {
    const app = await createTestApp();

    const created = await request(app).post("/tickets").send({
      title: "Bug report",
      description: "Button does not work",
      priority: "low",
    });

    const response = await request(app)
      .patch(`/tickets/${created.body.id}/status`)
      .send({
        status: "resolved",
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("resolved");
  });

  it("assigns a ticket", async () => {
    const app = await createTestApp();

    const created = await request(app).post("/tickets").send({
      title: "Support request",
      description: "Needs help",
      priority: "medium",
    });

    const response = await request(app)
      .patch(`/tickets/${created.body.id}/assignee`)
      .send({
        assignee: "Arthur",
      });

    expect(response.status).toBe(200);
    expect(response.body.assignee).toBe("Arthur");
  });

  it("deletes a ticket", async () => {
    const app = await createTestApp();

    const created = await request(app).post("/tickets").send({
      title: "Temporary ticket",
      description: "Delete this ticket",
      priority: "low",
    });

    const response = await request(app).delete(`/tickets/${created.body.id}`);

    expect(response.status).toBe(204);

    const getResponse = await request(app).get(`/tickets/${created.body.id}`);

    expect(getResponse.status).toBe(404);
  });

  it("rejects invalid priority", async () => {
    const app = await createTestApp();

    const response = await request(app).post("/tickets").send({
      title: "Invalid ticket",
      description: "Invalid priority",
      priority: "urgent",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Priority must be low, medium, or high");
  });

  it("rejects missing title", async () => {
    const app = await createTestApp();

    const response = await request(app).post("/tickets").send({
      description: "No title",
      priority: "low",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Title is required");
  });

  it("returns 404 for a missing ticket", async () => {
    const app = await createTestApp();

    const response = await request(app).get("/tickets/not-found");

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Ticket not found: not-found");
  });
});
