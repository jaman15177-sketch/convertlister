import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    const result = await prisma.$queryRaw`SELECT NOW()`;
    console.log("✅ DB CONNECTED SUCCESSFULLY");
    console.log(result);
  } catch (err) {
    console.error("❌ DB CONNECTION FAILED");
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
