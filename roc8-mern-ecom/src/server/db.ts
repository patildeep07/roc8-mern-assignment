import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

import { env } from "~/env";

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;

// async function main() {
//   // Code
//   const user = await prisma.user.create({
//     data: { name: "Deep", email: "patildeep07@gmail.com", password: "12345" },
//   });

//   console.log({ user });
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//   });
