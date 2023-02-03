import { Prisma, PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const promises: Promise<unknown>[] = [];

  // Generate 10 users and posts:
  for (let i = 0; i < 10; i++) {
    const user: Prisma.UserCreateInput = {
      email: faker.internet.email(),
      name: faker.name.firstName()
    };

    const post: Prisma.PostCreateWithoutUserInput = {
      title: faker.commerce.productName(),
      content: faker.lorem.lines(),
      published: Boolean(i % 2)
    };

    const create = prisma.user.create({
      data: { ...user, posts: { create: post } }
    });

    promises.push(create);
  }

  // Await promises:
  await Promise.all(promises);
}

main().then(() => prisma.$disconnect());