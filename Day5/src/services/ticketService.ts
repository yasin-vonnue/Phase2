import { randomInt, randomUUID } from "node:crypto";

import type { Ticket, TicketStatus, TicketPriority } from "../types/ticket.js";

export function createTicketService(repository: {
  getTickets: () => Promise<Ticket[]>;
  saveTickets: (tickets: Ticket[]) => Promise<void>;
}) {
  async function addTicket(
    title: string,
    description: string,
    priority: TicketPriority,
  ): Promise<Ticket> {
    const tickets = await repository.getTickets();
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

    tickets.push(ticket);

    await repository.saveTickets(tickets);

    return ticket;
  }

  async function listTickets(): Promise<Ticket[]> {
    return repository.getTickets();
  }

  async function getTicket(id: string): Promise<Ticket> {
    const tickets = await repository.getTickets();

    const ticket = tickets.find((ticket) => ticket.id === id);

    if (!ticket) {
      throw new Error(`Ticket not found: ${id}`);
    }

    return ticket;
  }

  async function updateStatus(
    id: string,
    status: TicketStatus,
  ): Promise<Ticket> {
    const tickets = await repository.getTickets();

    const ticket = tickets.find((ticket) => ticket.id === id);

    if (!ticket) {
      throw new Error(`Ticket not found:${id}`);
    }

    ticket.status = status;
    ticket.updatedAt = new Date().toISOString();

    await repository.saveTickets(tickets);

    return ticket;
  }

  async function assignTicket(
    id: string,
    assignee: string | null,
  ): Promise<Ticket> {
    const tickets = await repository.getTickets();

    const ticket = tickets.find((ticket) => ticket.id === id);

    if (!ticket) {
      throw new Error(`Ticket not found: ${id}`);
    }

    ticket.assignee = assignee;
    ticket.updatedAt = new Date().toISOString();

    await repository.saveTickets(tickets);

    return ticket;
  }

  async function deleteTicket(id: string): Promise<void> {
    const tickets = await repository.getTickets();

    const index = tickets.findIndex((ticket) => ticket.id === id);

    if (index === -1) {
      throw new Error(`Ticket not found: ${id}`);
    }

    tickets.splice(index, 1);

    await repository.saveTickets(tickets);
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
