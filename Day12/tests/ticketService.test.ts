import { describe, expect, it, vi } from "vitest";

import { createTicketService } from "../src/services/ticketService.js";
import type { Ticket } from "../src/types/ticket.js";

function createRepository(initialTickets: Ticket[] = []) {
  let tickets = [...initialTickets];

  return {
    addTicket: vi.fn(async (ticket: Ticket) => {
      tickets.push(ticket);
      return ticket;
    }),

    getTickets: vi.fn(async () => [...tickets]),

    getTicket: vi.fn(async (id: string) => {
      return tickets.find((ticket) => ticket.id === id) ?? null;
    }),

    updateStatus: vi.fn(async (id: string, status: Ticket["status"]) => {
      const ticket = tickets.find((ticket) => ticket.id === id);

      if (!ticket) {
        return null;
      }

      ticket.status = status;
      ticket.updatedAt = new Date().toISOString();

      return ticket;
    }),

    assignTicket: vi.fn(async (id: string, assignee: string | null) => {
      const ticket = tickets.find((ticket) => ticket.id === id);

      if (!ticket) {
        return null;
      }

      ticket.assignee = assignee;
      ticket.updatedAt = new Date().toISOString();

      return ticket;
    }),

    deleteTicket: vi.fn(async (id: string) => {
      const index = tickets.findIndex((ticket) => ticket.id === id);

      if (index === -1) {
        return false;
      }

      tickets.splice(index, 1);
      return true;
    }),
  };
}

describe("ticketService", () => {
  it("creates a ticket", async () => {
    const repository = createRepository();
    const service = createTicketService(repository);

    const ticket = await service.addTicket(
      "Login issue",
      "User cannot log in",
      "high",
    );

    expect(ticket.title).toBe("Login issue");
    expect(ticket.description).toBe("User cannot log in");
    expect(ticket.priority).toBe("high");
    expect(ticket.status).toBe("open");
    expect(ticket.assignee).toBeNull();
    expect(ticket.id).toBeTruthy();
    expect(repository.addTicket).toHaveBeenCalled();
  });

  it("lists tickets", async () => {
    const ticket: Ticket = {
      id: "1",
      title: "Login issue",
      description: "Cannot log in",
      priority: "high",
      status: "open",
      assignee: null,
      createdAt: "2026-09-15T08:00:00.000Z",
      updatedAt: "2026-09-15T08:00:00.000Z",
    };

    const repository = createRepository([ticket]);
    const service = createTicketService(repository);

    const tickets = await service.listTickets();

    expect(tickets).toEqual([ticket]);
  });

  it("gets a ticket by id", async () => {
    const ticket: Ticket = {
      id: "1",
      title: "Login issue",
      description: "Cannot log in",
      priority: "high",
      status: "open",
      assignee: null,
      createdAt: "2026-09-15T08:00:00.000Z",
      updatedAt: "2026-09-15T08:00:00.000Z",
    };

    const repository = createRepository([ticket]);
    const service = createTicketService(repository);

    await expect(service.getTicket("1")).resolves.toEqual(ticket);
  });

  it("updates ticket status", async () => {
    const ticket: Ticket = {
      id: "1",
      title: "Login issue",
      description: "Cannot log in",
      priority: "high",
      status: "open",
      assignee: null,
      createdAt: "2026-09-15T08:00:00.000Z",
      updatedAt: "2026-09-15T08:00:00.000Z",
    };

    const repository = createRepository([ticket]);
    const service = createTicketService(repository);

    const updated = await service.updateStatus("1", "resolved");

    expect(updated.status).toBe("resolved");
    expect(repository.updateStatus).toHaveBeenCalledWith("1", "resolved");
  });

  it("assigns a ticket", async () => {
    const ticket: Ticket = {
      id: "1",
      title: "Login issue",
      description: "Cannot log in",
      priority: "high",
      status: "open",
      assignee: null,
      createdAt: "2026-09-15T08:00:00.000Z",
      updatedAt: "2026-09-15T08:00:00.000Z",
    };

    const repository = createRepository([ticket]);
    const service = createTicketService(repository);

    const updated = await service.assignTicket("1", "Yasin");

    expect(updated.assignee).toBe("Yasin");
    expect(repository.assignTicket).toHaveBeenCalledWith("1", "Yasin");
  });

  it("deletes a ticket", async () => {
    const ticket: Ticket = {
      id: "1",
      title: "Login issue",
      description: "Cannot log in",
      priority: "high",
      status: "open",
      assignee: null,
      createdAt: "2026-09-15T08:00:00.000Z",
      updatedAt: "2026-09-15T08:00:00.000Z",
    };

    const repository = createRepository([ticket]);
    const service = createTicketService(repository);

    await service.deleteTicket("1");

    expect(repository.deleteTicket).toHaveBeenCalledWith("1");
  });

  it("throws when a ticket does not exist", async () => {
    const repository = createRepository();
    const service = createTicketService(repository);

    await expect(service.getTicket("missing")).rejects.toThrow(
      "Ticket not found: missing",
    );
  });
});
