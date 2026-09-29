import { describe, expect, it, vi } from "vitest";

import { createTicketService } from "../src/services/ticketService.js";
import type { AuthUser } from "../src/types/auth.js";
import type { Ticket } from "../src/types/ticket.js";
import type {
  TicketQuery,
  PaginatedTickets,
} from "../src/types/ticketQuery.js";

function createRepository(initialTickets: Ticket[] = []) {
  let tickets = [...initialTickets];

  return {
    addTicket: vi.fn(async (ticket: Ticket) => {
      tickets.push(ticket);
      return ticket;
    }),

    getTickets: vi.fn(
      async (_query: TicketQuery): Promise<PaginatedTickets> => ({
        data: [...tickets],
        pagination: {
          page: 1,
          pageSize: 10,
          total: tickets.length,
          totalPages: Math.ceil(tickets.length / 10),
        },
      }),
    ),

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

const customerUser: AuthUser = {
  id: "customer-1",
  email: "customer@example.com",
  role: "customer",
};

const agentUser: AuthUser = {
  id: "agent-1",
  email: "agent@example.com",
  role: "agent",
};

const adminUser: AuthUser = {
  id: "admin-1",
  email: "admin@example.com",
  role: "admin",
};

describe("ticketService", () => {
  it("creates a ticket", async () => {
    const repository = createRepository();
    const service = createTicketService(repository);

    const ticket = await service.addTicket(
      customerUser.id,
      "Login issue",
      "User cannot log in",
      "high",
    );

    expect(ticket.title).toBe("Login issue");
    expect(ticket.description).toBe("User cannot log in");
    expect(ticket.priority).toBe("high");
    expect(ticket.status).toBe("open");
    expect(ticket.assignee).toBeNull();
    expect(ticket.customerId).toBe(customerUser.id);
    expect(ticket.id).toBeTruthy();
    expect(repository.addTicket).toHaveBeenCalled();
  });

  it("lists customer tickets", async () => {
    const repository = createRepository();
    const service = createTicketService(repository);

    await service.listTickets(
      {
        page: 1,
        pageSize: 10,
        sortField: "createdAt",
        sortDirection: "desc",
      },
      customerUser,
    );

    expect(repository.getTickets).toHaveBeenCalledWith({
      page: 1,
      pageSize: 10,
      sortField: "createdAt",
      sortDirection: "desc",
      customerId: customerUser.id,
    });
  });

  it("lists agent tickets", async () => {
    const repository = createRepository();
    const service = createTicketService(repository);

    await service.listTickets(
      {
        page: 1,
        pageSize: 10,
        sortField: "createdAt",
        sortDirection: "desc",
      },
      agentUser,
    );

    expect(repository.getTickets).toHaveBeenCalledWith({
      page: 1,
      pageSize: 10,
      sortField: "createdAt",
      sortDirection: "desc",
      assignee: agentUser.id,
    });
  });

  it("lists all tickets for admin", async () => {
    const repository = createRepository();
    const service = createTicketService(repository);

    const query: TicketQuery = {
      page: 1,
      pageSize: 10,
      sortField: "createdAt",
      sortDirection: "desc",
    };

    await service.listTickets(query, adminUser);

    expect(repository.getTickets).toHaveBeenCalledWith(query);
  });

  it("gets a customer's own ticket", async () => {
    const ticket: Ticket = {
      id: "1",
      customerId: customerUser.id,
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

    await expect(service.getTicket("1", customerUser)).resolves.toEqual(ticket);
  });

  it("allows an agent to access an assigned ticket", async () => {
    const ticket: Ticket = {
      id: "1",
      customerId: customerUser.id,
      title: "Login issue",
      description: "Cannot log in",
      priority: "high",
      status: "open",
      assignee: agentUser.id,
      createdAt: "2026-09-15T08:00:00.000Z",
      updatedAt: "2026-09-15T08:00:00.000Z",
    };

    const repository = createRepository([ticket]);
    const service = createTicketService(repository);

    await expect(service.getTicket("1", agentUser)).resolves.toEqual(ticket);
  });

  it("allows admin to access any ticket", async () => {
    const ticket: Ticket = {
      id: "1",
      customerId: customerUser.id,
      title: "Login issue",
      description: "Cannot log in",
      priority: "high",
      status: "open",
      assignee: agentUser.id,
      createdAt: "2026-09-15T08:00:00.000Z",
      updatedAt: "2026-09-15T08:00:00.000Z",
    };

    const repository = createRepository([ticket]);
    const service = createTicketService(repository);

    await expect(service.getTicket("1", adminUser)).resolves.toEqual(ticket);
  });

  it("forbids a customer from accessing another customer's ticket", async () => {
    const ticket: Ticket = {
      id: "1",
      customerId: "another-customer",
      title: "Private issue",
      description: "Private description",
      priority: "high",
      status: "open",
      assignee: null,
      createdAt: "2026-09-15T08:00:00.000Z",
      updatedAt: "2026-09-15T08:00:00.000Z",
    };

    const repository = createRepository([ticket]);
    const service = createTicketService(repository);

    await expect(service.getTicket("1", customerUser)).rejects.toThrow(
      "Forbidden",
    );
  });

  it("updates status when the user can access the ticket", async () => {
    const ticket: Ticket = {
      id: "1",
      customerId: customerUser.id,
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

    const updated = await service.updateStatus("1", "resolved", customerUser);

    expect(updated.status).toBe("resolved");
    expect(repository.updateStatus).toHaveBeenCalledWith("1", "resolved");
  });

  it("assigns a ticket only for admin", async () => {
    const ticket: Ticket = {
      id: "1",
      customerId: customerUser.id,
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

    const updated = await service.assignTicket("1", agentUser.id, adminUser);

    expect(updated.assignee).toBe(agentUser.id);
    expect(repository.assignTicket).toHaveBeenCalledWith("1", agentUser.id);
  });

  it("forbids a non-admin from assigning a ticket", async () => {
    const repository = createRepository();
    const service = createTicketService(repository);

    await expect(
      service.assignTicket("1", agentUser.id, agentUser),
    ).rejects.toThrow("Forbidden");
  });

  it("deletes a ticket only for admin", async () => {
    const ticket: Ticket = {
      id: "1",
      customerId: customerUser.id,
      title: "Login issue",
      description: "Cannot log in",
      priority: "high",
      status: "open",
      assignee: agentUser.id,
      createdAt: "2026-09-15T08:00:00.000Z",
      updatedAt: "2026-09-15T08:00:00.000Z",
    };

    const repository = createRepository([ticket]);
    const service = createTicketService(repository);

    await service.deleteTicket("1", adminUser);

    expect(repository.deleteTicket).toHaveBeenCalledWith("1");
  });

  it("forbids a non-admin from deleting a ticket", async () => {
    const repository = createRepository();
    const service = createTicketService(repository);

    await expect(service.deleteTicket("1", customerUser)).rejects.toThrow(
      "Forbidden",
    );
  });

  it("throws when a ticket does not exist", async () => {
    const repository = createRepository();
    const service = createTicketService(repository);

    await expect(service.getTicket("missing", customerUser)).rejects.toThrow(
      "Ticket not found: missing",
    );
  });

  it("throws when updating a missing ticket", async () => {
    const repository = createRepository();
    const service = createTicketService(repository);

    await expect(
      service.updateStatus("missing", "resolved", customerUser),
    ).rejects.toThrow("Ticket not found: missing");
  });

  it("throws when assigning a missing ticket", async () => {
    const repository = createRepository();
    const service = createTicketService(repository);

    await expect(
      service.assignTicket("missing", agentUser.id, adminUser),
    ).rejects.toThrow("Ticket not found: missing");
  });

  it("throws when deleting a missing ticket", async () => {
    const repository = createRepository();
    const service = createTicketService(repository);

    await expect(service.deleteTicket("missing", adminUser)).rejects.toThrow(
      "Ticket not found: missing",
    );
  });

  it("propagates repository errors when creating a ticket", async () => {
    const repository = createRepository();
    const service = createTicketService(repository);

    repository.addTicket.mockRejectedValueOnce(
      new Error("Database unavailable"),
    );

    await expect(
      service.addTicket(
        customerUser.id,
        "Login issue",
        "Cannot log in",
        "high",
      ),
    ).rejects.toThrow("Database unavailable");
  });
});
