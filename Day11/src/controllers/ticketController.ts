import type { Request, Response } from "express";
import type { TicketPriority, TicketStatus } from "../types/ticket.js";

export function createTicketController(service: {
  addTicket: (
    title: string,
    description: string,
    priority: TicketPriority,
  ) => Promise<unknown>;
  listTickets: () => Promise<unknown>;
  getTicket: (id: string) => Promise<unknown>;
  updateStatus: (id: string, status: TicketStatus) => Promise<unknown>;
  assignTicket: (id: string, assignee: string | null) => Promise<unknown>;
  deleteTicket: (id: string) => Promise<void>;
}) {
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

    const ticket = await service.addTicket(
      title.trim(),
      description.trim(),
      priority,
    );

    res.status(201).json(ticket);
  }

  async function listTickets(_req: Request, res: Response): Promise<void> {
    const tickets = await service.listTickets();

    res.status(200).json(tickets);
  }

  async function getTicket(req: Request, res: Response): Promise<void> {
    const ticket = await service.getTicket(req.params.id as string);

    res.status(200).json(ticket);
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

    const ticket = await service.updateStatus(req.params.id as string, status);

    res.status(200).json(ticket);
  }

  async function assignTicket(req: Request, res: Response): Promise<void> {
    const { assignee } = req.body;

    if (assignee !== null && typeof assignee !== "string") {
      res.status(400).json({
        error: "Assignee must be a string or null",
      });
      return;
    }

    const ticket = await service.assignTicket(
      req.params.id as string,
      assignee,
    );

    res.status(200).json(ticket);
  }

  async function deleteTicket(req: Request, res: Response): Promise<void> {
    await service.deleteTicket(req.params.id as string);

    res.status(204).send();
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
