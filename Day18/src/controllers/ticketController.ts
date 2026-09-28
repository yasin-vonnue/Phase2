import type { Request, Response } from "express";

import type { AuthUser } from "../types/auth.js";
import type { TicketPriority, TicketStatus } from "../types/ticket.js";
import type { TicketQuery, PaginatedTickets } from "../types/ticketQuery.js";
import { validateTicketQuery } from "../validation/ticketQueryValidation.js";

export function createTicketController(service: {
  addTicket: (
    customerId: string,
    title: string,
    description: string,
    priority: TicketPriority,
  ) => Promise<unknown>;
  listTickets: (
    query: TicketQuery,
    user: AuthUser,
  ) => Promise<PaginatedTickets>;
  getTicket: (id: string, user: AuthUser) => Promise<unknown>;
  updateStatus: (
    id: string,
    status: TicketStatus,
    user: AuthUser,
  ) => Promise<unknown>;
  assignTicket: (
    id: string,
    assignee: string | null,
    user: AuthUser,
  ) => Promise<unknown>;
  deleteTicket: (id: string, user: AuthUser) => Promise<void>;
}) {
  function getUser(req: Request, res: Response): AuthUser | null {
    if (!req.user) {
      res.status(401).json({
        error: "Authentication required",
      });
      return null;
    }

    return req.user;
  }

  async function createTicket(req: Request, res: Response): Promise<void> {
    const { title, description, priority } = req.body;

    if (typeof title !== "string" || title.trim() === "") {
      res.status(400).json({
        error: "Title is required",
      });
      return;
    }

    if (typeof description !== "string" || description.trim() === "") {
      res.status(400).json({
        error: "Description is required",
      });
      return;
    }

    if (priority !== "low" && priority !== "medium" && priority !== "high") {
      res.status(400).json({
        error: "Priority must be low, medium, or high",
      });
      return;
    }

    const user = getUser(req, res);

    if (!user) {
      return;
    }

    if (user.role !== "customer") {
      res.status(403).json({
        error: "Forbidden",
      });
      return;
    }

    const ticket = await service.addTicket(
      user.id,
      title.trim(),
      description.trim(),
      priority,
    );

    res.status(201).json(ticket);
  }

  async function listTickets(req: Request, res: Response): Promise<void> {
    const user = getUser(req, res);

    if (!user) {
      return;
    }

    const validation = validateTicketQuery(
      req.query as Record<string, unknown>,
    );

    if (!validation.success) {
      res.status(400).json({ error: validation.error });
      return;
    }

    try {
      const result = await service.listTickets(validation.data, user);

      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error && error.message === "Forbidden") {
        res.status(403).json({
          error: "Forbidden",
        });
        return;
      }

      throw error;
    }
  }

  async function getTicket(req: Request, res: Response): Promise<void> {
    const user = getUser(req, res);

    if (!user) {
      return;
    }

    try {
      const ticket = await service.getTicket(req.params.id as string, user);

      res.status(200).json(ticket);
    } catch (error) {
      if (error instanceof Error && error.message === "Forbidden") {
        res.status(403).json({
          error: "Forbidden",
        });
        return;
      }

      throw error;
    }
  }

  async function updateStatus(req: Request, res: Response): Promise<void> {
    const { status } = req.body;

    if (
      status !== "open" &&
      status !== "in-progress" &&
      status !== "resolved"
    ) {
      res.status(400).json({
        error: "Status must be open, in-progress, or resolved",
      });
      return;
    }

    const user = getUser(req, res);

    if (!user) {
      return;
    }

    try {
      const ticket = await service.updateStatus(
        req.params.id as string,
        status,
        user,
      );

      res.status(200).json(ticket);
    } catch (error) {
      if (error instanceof Error && error.message === "Forbidden") {
        res.status(403).json({
          error: "Forbidden",
        });
        return;
      }

      throw error;
    }
  }

  async function assignTicket(req: Request, res: Response): Promise<void> {
    const { assignee } = req.body;

    if (assignee !== null && typeof assignee !== "string") {
      res.status(400).json({
        error: "Assignee must be a string or null",
      });
      return;
    }

    const user = getUser(req, res);

    if (!user) {
      return;
    }

    try {
      const ticket = await service.assignTicket(
        req.params.id as string,
        assignee,
        user,
      );

      res.status(200).json(ticket);
    } catch (error) {
      if (error instanceof Error && error.message === "Forbidden") {
        res.status(403).json({
          error: "Forbidden",
        });
        return;
      }

      throw error;
    }
  }

  async function deleteTicket(req: Request, res: Response): Promise<void> {
    const user = getUser(req, res);

    if (!user) {
      return;
    }

    try {
      await service.deleteTicket(req.params.id as string, user);

      res.status(204).send();
    } catch (error) {
      if (error instanceof Error && error.message === "Forbidden") {
        res.status(403).json({
          error: "Forbidden",
        });
        return;
      }

      throw error;
    }
  }

  return {
    createTicket,
    listTickets,
    getTicket,
    updateStatus,
    assignTicket,
    deleteTicket,
  };
}
