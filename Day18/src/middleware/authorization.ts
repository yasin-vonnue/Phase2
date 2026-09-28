import type { AuthUser } from "../types/auth.js";
import type { Ticket } from "../types/ticket.js";

export function canAccessTicket(user: AuthUser, ticket: Ticket): boolean {
  if (user.role === "admin") {
    return true;
  }

  if (user.role === "customer") {
    return ticket.customerId === user.id;
  }

  if (user.role === "agent") {
    return ticket.assignee === user.id;
  }

  return false;
}

export function canDeleteTicket(user: AuthUser): boolean {
  return user.role === "admin";
}
