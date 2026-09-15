import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

import type { Ticket } from "../types/ticket.js";

export function createTicketRepository(filePath: string) {
  async function getTickets(): Promise<Ticket[]> {
    try {
      const data = await readFile(filePath, "utf8");
      const tickets = JSON.parse(data);

      if (!Array.isArray(tickets)) {
        throw new Error("Ticket data must be an array");
      }

      return tickets as Ticket[];
    } catch (error) {
      if (
        error instanceof Error &&
        "code" in error &&
        error.code === "ENOENT"
      ) {
        return [];
      }

      throw error;
    }
  }

  async function saveTickets(tickets: Ticket[]): Promise<void> {
    await mkdir(dirname(filePath), { recursive: true });

    const data = JSON.stringify(tickets, null, 2);

    await writeFile(filePath, data, "utf8");
  }

  return {
    getTickets,
    saveTickets,
  };
}
