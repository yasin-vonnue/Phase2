import pool from "../config/database.js";
import type { Ticket, TicketPriority, TicketStatus } from "../types/ticket.js";

function isValidUUID(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    id,
  );
}

function mapTicket(row: Record<string, unknown>): Ticket {
  return {
    ...(row as Omit<Ticket, "createdAt" | "updatedAt">),
    createdAt: new Date(row.createdAt as Date).toISOString(),
    updatedAt: new Date(row.updatedAt as Date).toISOString(),
  };
}

export function createTicketRepository() {
  async function addTicket(ticket: Ticket): Promise<Ticket> {
    const result = await pool.query(
      `
      INSERT INTO api_tickets (
        id,
        title,
        description,
        priority,
        status,
        assignee,
        created_at,
        updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING
        id,
        title,
        description,
        priority,
        status,
        assignee,
        created_at::text AS "createdAt",
        updated_at::text AS "updatedAt"
      `,
      [
        ticket.id,
        ticket.title,
        ticket.description,
        ticket.priority,
        ticket.status,
        ticket.assignee,
        ticket.createdAt,
        ticket.updatedAt,
      ],
    );

    return mapTicket(result.rows[0]);
  }

  async function getTickets(): Promise<Ticket[]> {
    const result = await pool.query(`
      SELECT
        id,
        title,
        description,
        priority,
        status,
        assignee,
        created_at::text AS "createdAt",
        updated_at::text AS "updatedAt"
      FROM api_tickets
      ORDER BY created_at DESC
    `);

    return result.rows.map(mapTicket);
  }

  async function getTicket(id: string): Promise<Ticket | null> {
    if (!isValidUUID(id)) {
      return null;
    }
    const result = await pool.query(
      `
      SELECT
        id,
        title,
        description,
        priority,
        status,
        assignee,
        created_at::text AS "createdAt",
        updated_at::text AS "updatedAt"
      FROM api_tickets
      WHERE id = $1
      `,
      [id],
    );

    return result.rows[0] ? mapTicket(result.rows[0]) : null;
  }

  async function updateStatus(
    id: string,
    status: TicketStatus,
  ): Promise<Ticket | null> {
    const result = await pool.query(
      `
      UPDATE api_tickets
      SET
        status = $1,
        updated_at = NOW()
      WHERE id = $2
      RETURNING
        id,
        title,
        description,
        priority,
        status,
        assignee,
        created_at::text AS "createdAt",
        updated_at::text AS "updatedAt"
      `,
      [status, id],
    );

    return result.rows[0] ? mapTicket(result.rows[0]) : null;
  }

  async function assignTicket(
    id: string,
    assignee: string | null,
  ): Promise<Ticket | null> {
    const result = await pool.query(
      `
      UPDATE api_tickets
      SET
        assignee = $1,
        updated_at = NOW()
      WHERE id = $2
      RETURNING
        id,
        title,
        description,
        priority,
        status,
        assignee,
        created_at::text AS "createdAt",
        updated_at::text AS "updatedAt"
      `,
      [assignee, id],
    );

    return result.rows[0] ? mapTicket(result.rows[0]) : null;
  }

  async function deleteTicket(id: string): Promise<boolean> {
    const result = await pool.query(
      `
      DELETE FROM api_tickets
      WHERE id = $1
      `,
      [id],
    );

    return result.rowCount === 1;
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
