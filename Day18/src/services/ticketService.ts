import { randomUUID } from "node:crypto";

import type { AuthUser } from "../types/auth.js";
import {
  canAccessTicket,
  canDeleteTicket,
} from "../middleware/authorization.js";
import type { Ticket, TicketPriority, TicketStatus } from "../types/ticket.js";
import type { TicketQuery, PaginatedTickets } from "../types/ticketQuery.js";

export function createTicketService(repository: {
  addTicket: (ticket: Ticket) => Promise<Ticket>;
  getTickets: (query: TicketQuery) => Promise<PaginatedTickets>;
  getTicket: (id: string) => Promise<Ticket | null>;
  updateStatus: (id: string, status: TicketStatus) => Promise<Ticket | null>;
  assignTicket: (id: string, assignee: string | null) => Promise<Ticket | null>;
  deleteTicket: (id: string) => Promise<boolean>;
}) {
  async function addTicket(
    customerId: string,
    title: string,
    description: string,
    priority: TicketPriority,
  ): Promise<Ticket> {
    const now = new Date().toISOString();

    const ticket: Ticket = {
      id: randomUUID(),
      customerId,
      title,
      description,
      priority,
      status: "open",
      assignee: null,
      createdAt: now,
      updatedAt: now,
    };

    return repository.addTicket(ticket);
  }

  async function listTickets(
    query: TicketQuery,
    user: AuthUser,
  ): Promise<PaginatedTickets> {
    if (user.role === "customer") {
      return repository.getTickets({
        ...query,
        customerId: user.id,
      });
    }

    if (user.role === "agent") {
      return repository.getTickets({
        ...query,
        assignee: user.id,
      });
    }

    if (user.role === "admin") {
      return repository.getTickets(query);
    }

    throw new Error("Forbidden");
  }

  async function getTicket(id: string, user: AuthUser): Promise<Ticket> {
    const ticket = await repository.getTicket(id);

    if (!ticket) {
      throw new Error(`Ticket not found: ${id}`);
    }

    if (!canAccessTicket(user, ticket)) {
      throw new Error("Forbidden");
    }

    return ticket;
  }

  async function updateStatus(
    id: string,
    status: TicketStatus,
    user: AuthUser,
  ): Promise<Ticket> {
    const existingTicket = await repository.getTicket(id);

    if (!existingTicket) {
      throw new Error(`Ticket not found: ${id}`);
    }

    if (!canAccessTicket(user, existingTicket)) {
      throw new Error("Forbidden");
    }

    const ticket = await repository.updateStatus(id, status);

    if (!ticket) {
      throw new Error(`Ticket not found: ${id}`);
    }

    return ticket;
  }

  async function assignTicket(
    id: string,
    assignee: string | null,
    user: AuthUser,
  ): Promise<Ticket> {
    if (user.role !== "admin") {
      throw new Error("Forbidden");
    }

    const ticket = await repository.assignTicket(id, assignee);

    if (!ticket) {
      throw new Error(`Ticket not found: ${id}`);
    }

    return ticket;
  }

  async function deleteTicket(id: string, user: AuthUser): Promise<void> {
    if (!canDeleteTicket(user)) {
      throw new Error("Forbidden");
    }

    const deleted = await repository.deleteTicket(id);

    if (!deleted) {
      throw new Error(`Ticket not found: ${id}`);
    }
  }

  return {
    addTicket,
    listTickets,
    getTicket,
    updateStatus,
    assignTicket,
    deleteTicket,
  };
}
