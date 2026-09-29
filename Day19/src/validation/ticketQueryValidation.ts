import type { TicketPriority, TicketStatus } from "../types/ticket.js";
import type {
  TicketQuery,
  TicketSortField,
  SortDirection,
} from "../types/ticketQuery.js";

const validStatuses: TicketStatus[] = ["open", "in-progress", "resolved"];

const validPriorities: TicketPriority[] = ["low", "medium", "high"];

const validSortFields: TicketSortField[] = [
  "createdAt",
  "updatedAt",
  "title",
  "priority",
  "status",
];

const validSortDirections: SortDirection[] = ["asc", "desc"];

type ValidationResult =
  | { success: true; data: TicketQuery }
  | { success: false; error: string };

export function validateTicketQuery(
  query: Record<string, unknown>,
): ValidationResult {
  const page = query.page === undefined ? 1 : Number(query.page);
  const pageSize = query.pageSize === undefined ? 10 : Number(query.pageSize);

  if (
    !Number.isInteger(page) ||
    page < 1 ||
    (typeof query.page !== "string" && query.page !== undefined)
  ) {
    return { success: false, error: "page must be a positive integer" };
  }

  if (
    !Number.isInteger(pageSize) ||
    pageSize < 1 ||
    pageSize > 100 ||
    (typeof query.pageSize !== "string" && query.pageSize !== undefined)
  ) {
    return {
      success: false,
      error: "pageSize must be an integer between 1 and 100",
    };
  }

  if (
    query.status !== undefined &&
    (typeof query.status !== "string" ||
      !validStatuses.includes(query.status as TicketStatus))
  ) {
    return {
      success: false,
      error: "status must be open, in-progress, or resolved",
    };
  }

  if (
    query.priority !== undefined &&
    (typeof query.priority !== "string" ||
      !validPriorities.includes(query.priority as TicketPriority))
  ) {
    return {
      success: false,
      error: "priority must be low, medium, or high",
    };
  }

  if (query.assignee !== undefined && typeof query.assignee !== "string") {
    return { success: false, error: "assignee must be a string" };
  }

  if (query.search !== undefined && typeof query.search !== "string") {
    return { success: false, error: "search must be a string" };
  }

  const sortField =
    query.sortField === undefined ? "createdAt" : query.sortField;

  if (
    typeof sortField !== "string" ||
    !validSortFields.includes(sortField as TicketSortField)
  ) {
    return {
      success: false,
      error: `sortField must be one of: ${validSortFields.join(", ")}`,
    };
  }

  const sortDirection =
    query.sortDirection === undefined ? "desc" : query.sortDirection;

  if (
    typeof sortDirection !== "string" ||
    !validSortDirections.includes(sortDirection as SortDirection)
  ) {
    return {
      success: false,
      error: "sortDirection must be asc or desc",
    };
  }

  return {
    success: true,
    data: {
      page,
      pageSize,
      status: query.status as TicketStatus | undefined,
      priority: query.priority as TicketPriority | undefined,
      assignee: query.assignee as string | undefined,
      search: query.search as string | undefined,
      sortField: sortField as TicketSortField,
      sortDirection: sortDirection as SortDirection,
    },
  };
}
