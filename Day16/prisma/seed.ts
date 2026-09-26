import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { describe } from "node:test";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
    const tickets = [
        {
            id: "11111111-1111-4111-8111-111111111111",
            title: "Login issue",
            description: "Unable to log in to the application.",
            priority: "high",
            status: "open",
            assignee: "Arthur",
        },
        {
            id: "22222222-2222-4222-8222-222222222222",
            title: "Update profile",
            description: "Need help updating profile information.",
            priority: "medium",
            status: "in-progress",
            assignee: null,
        },
        {
            id: "33333333-3333-4333-8333-333333333333",
            title: "Page loading slowly",
            description: "The dashboard takes too long to load.",
            priority: "low",
            status: "resolved",
            assignee: "Support Team",
        },
    ];

    for (const ticket of tickets){
        await prisma.ticket.upsert({
            where: { id: ticket.id },
            update: {},
            create: ticket,
        });
    }

    console.log("Seed data inserted successfully.");
}

main()
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });