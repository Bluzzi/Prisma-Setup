import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  // ...
}

main().then(() => prisma.$disconnect());