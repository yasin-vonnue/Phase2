import prisma from "../config/database.js";

export function createUserRepository() {
  async function findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async function createUser(email: string, passwordHash: string) {
    return prisma.user.create({
      data: {
        email,
        passwordHash,
      },
    });
  }

  async function findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  return {
    findByEmail,
    createUser,
    findById,
  };
}
