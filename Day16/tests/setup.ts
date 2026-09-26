import dotenv from "dotenv";

dotenv.config({
  path: ".env.test",
  override: true,
});

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is missing from .env.test");
}

const databaseName = new URL(databaseUrl).pathname.slice(1);

if (databaseName !== "support_ticket_test_db") {
  throw new Error(
    `Tests must use support_ticket_test_db, but got: ${databaseName}`,
  );
}

console.log("Test database verified:", databaseName);
