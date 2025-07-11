import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  await prisma.role.createMany({
    data: [
      { id: 1, name: "Admin" },
      { id: 2, name: "User" },
    ],
    skipDuplicates: true,
  });

  await prisma.user.createMany({
    data: [
      {
        username: "adminUser",
        email: "admin@example.com",
        password: "securepassword",
        roleId: 1,
      },
      {
        username: "normalUser",
        email: "user@example.com",
        password: "securepassword",
        roleId: 2,
      },
      {
        username: "johnDoe",
        email: "john@example.com",
        password: "password123",
        roleId: 2,
      },
      {
        username: "janeSmith",
        email: "jane@example.com",
        password: "password456",
        roleId: 2,
      },
    ],
    skipDuplicates: true,
  });
}

seed()
  .then(() => console.log("Seed completed"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
