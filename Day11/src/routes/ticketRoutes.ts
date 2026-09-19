import { Router } from "express";

export function createTicketRoutes(
  controller: ReturnType<
    typeof import("../controllers/ticketController.js").createTicketController
  >,
) {
  const router = Router();

  router.post("/", controller.createTicket);
  router.get("/", controller.listTickets);
  router.get("/:id", controller.getTicket);
  router.patch("/:id/status", controller.updateStatus);
  router.patch("/:id/assignee", controller.assignTicket);
  router.delete("/:id", controller.deleteTicket);

  return router;
}
