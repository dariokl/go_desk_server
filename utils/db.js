import Prisma from "@prisma/client";
const { PrismaClient } = Prisma;

const db = new PrismaClient();

export default db;
