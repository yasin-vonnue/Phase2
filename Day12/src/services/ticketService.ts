import { randomUUID } from "node:crypto";

import type { Ticket, TicketPriority, TicketStatus } from "../types/ticket.js";

export function createTicketService(repository: {
  addTicket: (ticket: Ticket) => Promise<Ticket>;
  getTickets: () => Promise<Ticket[]>;
  getTicket: (id: string) => Promise<Ticket | null>;
  updateStatus: (id: string, status: TicketStatus) => Promise<Ticket | null>;
  assignTicket: (id: string, assignee: string | null) => Promise<Ticket | null>;
  deleteTicket: (id: string) => Promise<boolean>;
}) {
  async function addTicket(
    title: string,
    description: string,
    priority: TicketPriority,
  ): Promise<Ticket> {
    const now = new Date().toISOString();

    const ticket: Ticket = {
      id: randomUUID(),
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

  async function listTickets(): Promise<Ticket[]> {
    return repository.getTickets();
  }

  async function getTicket(id: string): Promise<Ticket> {
    const ticket = await repository.getTicket(id);

    if (!ticket) {
      throw new Error(`Ticket not found: ${id}`);
    }

    return ticket;
  }

  async function updateStatus(
    id: string,
    status: TicketStatus,
  ): Promise<Ticket> {
    const ticket = await repository.updateStatus(id, status);

    if (!ticket) {
      throw new Error(`Ticket not found: ${id}`);
    }

    return ticket;
  }

  async function assignTicket(
    id: string,
    assignee: string | null,
  ): Promise<Ticket> {
    const ticket = await repository.assignTicket(id, assignee);

    if (!ticket) {
      throw new Error(`Ticket not found: ${id}`);
    }

    return ticket;
  }

  async function deleteTicket(id: string): Promise<void> {
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
