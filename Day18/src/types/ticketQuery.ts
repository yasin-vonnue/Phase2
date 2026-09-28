import type { Ticket, TicketPriority, TicketStatus } from "./ticket.js";

export type TicketSortField =
  | "createdAt"
  | "updatedAt"
  | "title"
  | "priority"
  | "status";

export type SortDirection = "asc" | "desc";

export interface TicketQuery {
  page: number;
  pageSize: number;
  customerId?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
  assignee?: string;
  search?: string;
  sortField: TicketSortField;
  sortDirection: SortDirection;
}

export interface PaginatedTickets {
  data: Ticket[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
