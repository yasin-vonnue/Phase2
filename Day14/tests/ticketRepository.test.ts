import { afterAll, beforeEach, describe, expect, it } from "vitest";

import prisma from "../src/config/database.js";
import { createTicketRepository } from "../src/repository/ticketRepository.js";
import type { Ticket } from "../src/types/ticket.js";
import { Result } from "pg";

const repository = createTicketRepository();

const ticket: Ticket = {
  id: "11111111-1111-1111-1111-111111111111",
  title: "Login problem",
  description: "User cannot log in",
  priority: "high",
  status: "open",
  assignee: null,
  createdAt: "2026-09-15T08:00:00.000Z",
  updatedAt: "2026-09-15T08:00:00.000Z",
};

describe("ticketRepository", () => {
  beforeEach(async () => {
    await prisma.ticket.deleteMany();
  });

  it("adds and gets a ticket", async () => {
    await repository.addTicket(ticket);

    const result = await repository.getTicket(ticket.id);

    expect(result).toEqual(ticket);
  });

  it("returns all tickets", async () => {
    await repository.addTicket(ticket);

    const result = await repository.getTickets({
      page: 1,
      pageSize: 10,
      sortField: "createdAt",
      sortDirection: "desc",
    });

    expect(result.data).toEqual([ticket]);
    expect(result.pagination.total).toBe(1);
    expect(result.pagination.page).toBe(1);
    expect(result.pagination.pageSize).toBe(10);
    expect(result.pagination.totalPages).toBe(1);
  });

  it("updates ticket status", async () => {
    await repository.addTicket(ticket);

    const updated = await repository.updateStatus(ticket.id, "resolved");

    expect(updated?.status).toBe("resolved");
  });

  it("assigns a ticket", async () => {
    await repository.addTicket(ticket);

    const updated = await repository.assignTicket(ticket.id, "Yasin");

    expect(updated?.assignee).toBe("Yasin");
  });

  it("deletes a ticket", async () => {
    await repository.addTicket(ticket);

    const deleted = await repository.deleteTicket(ticket.id);

    expect(deleted).toBe(true);

    const result = await repository.getTicket(ticket.id);

    expect(result).toBeNull();
  });

  it("returns null when a ticket does not exist", async () => {
    const result = await repository.getTicket(
      "99999999-9999-9999-9999-999999999999",
    );

    expect(result).toBeNull();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});
