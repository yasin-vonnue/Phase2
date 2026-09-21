export type TicketPriority = "low" | "medium" | "high";

export type TicketStatus = "open" | "in-progress" | "resolved";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  assignee: string | null;
  createdAt: string;
  updatedAt: string;
}
