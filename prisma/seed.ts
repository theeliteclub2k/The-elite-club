const { PrismaClient } = require("@prisma/client");
// import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const addUsers = async () => {
  try {
    const user = await prisma.user.create({
      data: {
        name: "Pritviraj",
        phoneNumber: 9845398111,
      },
    });
    console.log("User created: " + user);
  } catch (error) {
    console.log(error);
  }
};

async function main() {
  await addUsers();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
