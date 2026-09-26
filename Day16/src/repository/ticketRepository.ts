import { Prisma } from "../../generated/prisma/client.js";
import prisma from "../config/database.js";
import type { Ticket, TicketPriority, TicketStatus } from "../types/ticket.js";
import type { TicketQuery, PaginatedTickets } from "../types/ticketQuery.js";

function isValidUUID(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    id,
  );
}

function mapTicket(row: {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  assignee: string | null;
  createdAt: Date;
  updatedAt: Date;
}): Ticket {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    priority: row.priority as TicketPriority,
    status: row.status as TicketStatus,
    assignee: row.assignee,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function isNotFoundError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2025"
  );
}

export function createTicketRepository() {
  async function addTicket(ticket: Ticket): Promise<Ticket> {
    const result = await prisma.ticket.create({
      data: {
        id: ticket.id,
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        status: ticket.status,
        assignee: ticket.assignee,
        createdAt: new Date(ticket.createdAt),
        updatedAt: new Date(ticket.updatedAt),
      },
    });

    return mapTicket(result);
  }

  async function getTickets(query: TicketQuery): Promise<PaginatedTickets> {
    const {
      page,
      pageSize,
      status,
      priority,
      assignee,
      search,
      sortField,
      sortDirection,
    } = query;

    const where: Prisma.TicketWhereInput = {
      ...(status && { status }),
      ...(priority && { priority }),
      ...(assignee && { assignee }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    const [tickets, total] = await Promise.all([
      prisma.ticket.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
          [sortField]: sortDirection,
        },
      }),
      prisma.ticket.count({ where }),
    ]);

    return {
      data: tickets.map(mapTicket),
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  async function getTicket(id: string): Promise<Ticket | null> {
    if (!isValidUUID(id)) {
      return null;
    }

    const ticket = await prisma.ticket.findUnique({
      where: { id },
    });

    return ticket ? mapTicket(ticket) : null;
  }

  async function updateStatus(
    id: string,
    status: TicketStatus,
  ): Promise<Ticket | null> {
    try {
      const ticket = await prisma.ticket.update({
        where: { id },
        data: { status },
      });

      return mapTicket(ticket);
    } catch (error) {
      if (isNotFoundError(error)) {
        return null;
      }

      throw error;
    }
  }

  async function assignTicket(
    id: string,
    assignee: string | null,
  ): Promise<Ticket | null> {
    try {
      const ticket = await prisma.ticket.update({
        where: { id },
        data: { assignee },
      });

      return mapTicket(ticket);
    } catch (error) {
      if (isNotFoundError(error)) {
        return null;
      }

      throw error;
    }
  }

  async function deleteTicket(id: string): Promise<boolean> {
    const result = await prisma.ticket.deleteMany({
      where: { id },
    });

    return result.count === 1;
  }

  return {
    addTicket,
    getTickets,
    getTicket,
    updateStatus,
    assignTicket,
    deleteTicket,
  };
}
