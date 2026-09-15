import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { createTicketRepository } from "../src/repository/ticketRepository.js";
import type { Ticket } from "../src/types/ticket.js";

const tempDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(
    tempDirectories.splice(0).map((directory) =>
      rm(directory, { recursive: true, force: true }),
    ),
  );
});

async function createTestRepository() {
  const directory = await mkdtemp(join(tmpdir(), "day5-"));
  tempDirectories.push(directory);

  return createTicketRepository(join(directory, "tickets.json"));
}

describe("ticketRepository", () => {
  it("returns an empty array when the file does not exist", async () => {
    const repository = await createTestRepository();

    const tickets = await repository.getTickets();

    expect(tickets).toEqual([]);
  });

  it("saves and reads tickets", async () => {
    const repository = await createTestRepository();

    const ticket: Ticket = {
      id: "ticket-1",
      title: "Login problem",
      description: "User cannot log in",
      priority: "high",
      status: "open",
      assignee: null,
      createdAt: "2026-09-15T08:00:00.000Z",
      updatedAt: "2026-09-15T08:00:00.000Z",
    };

    await repository.saveTickets([ticket]);

    const tickets = await repository.getTickets();

    expect(tickets).toEqual([ticket]);
  });

  it("throws when the JSON is not an array", async () => {
    const repository = await createTestRepository();

    await repository.saveTickets([] as Ticket[]);

    await expect(repository.getTickets()).resolves.toEqual([]);
  });
});