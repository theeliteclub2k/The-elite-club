const { PrismaClient } = require("@prisma/client");

// import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const addUsers = async () => {
  try {
    const users = await prisma.user.createMany({
      data: [
        {
          name: "Gautham",
          phoneNumber: 9845398233,
        },
        {
          name: "Alice",
          phoneNumber: 9876543210,
        },
        {
          name: "Bob",
          phoneNumber: 9123456789,
        },
      ],
    });
    console.log("Users created: ", users);
  } catch (error) {
    console.log("Error creating users: ", error);
  }
};

const addProducts = async () => {
  try {
    const products = await prisma.product.createMany({
      data: [
        {
          name: "Laptop",
          description: "High performance laptop",
          price: 1000.0,
          quantity: 10,
          category: "ELECTRONICS",
        },
        {
          name: "Headphones",
          description: "Noise-canceling headphones",
          price: 150.0,
          quantity: 50,
          category: "ELECTRONICS",
        },
        {
          name: "T-Shirt",
          description: "Cotton t-shirt",
          price: 20.0,
          quantity: 100,
          category: "CLOTHING",
        },
        {
          name: "Sofa",
          description: "Comfortable sofa",
          price: 500.0,
          quantity: 5,
          category: "FURNITURE",
        },
        {
          name: "Coffee Table",
          description: "Wooden coffee table",
          price: 120.0,
          quantity: 20,
          category: "FURNITURE",
        },
        {
          name: "Book - JavaScript",
          description: "Learn JavaScript",
          price: 30.0,
          quantity: 200,
          category: "BOOKS",
        },
        {
          name: "Smartphone",
          description: "Latest smartphone",
          price: 700.0,
          quantity: 15,
          category: "ELECTRONICS",
        },
        {
          name: "Blender",
          description: "High-speed blender",
          price: 100.0,
          quantity: 25,
          category: "ELECTRONICS",
        },
        {
          name: "Desk Chair",
          description: "Ergonomic desk chair",
          price: 250.0,
          quantity: 30,
          category: "FURNITURE",
        },
        {
          name: "Jeans",
          description: "Comfortable jeans",
          price: 40.0,
          quantity: 70,
          category: "CLOTHING",
        },
      ],
    });
    console.log("Products created: ", products);
  } catch (error) {
    console.log("Error creating products: ", error);
  }
};

const addOrders = async () => {
  try {
    // Fetch existing users and products for creating orders
    const users = await prisma.user.findMany();
    const products = await prisma.product.findMany();

    // Create orders individually to get their IDs
    const order1 = await prisma.order.create({
      data: {
        totalAmount: 150.0,
        status: "PENDING",
        userId: users[0].id,
      },
    });

    const order2 = await prisma.order.create({
      data: {
        totalAmount: 300.0,
        status: "SHIPPED",
        userId: users[1].id,
      },
    });

    // Adding items to orders
    const orderItems = [
      {
        quantity: 2,
        price: products[0].price,
        productId: products[0].id,
        orderId: order1.id,
      },
      {
        quantity: 1,
        price: products[1].price,
        productId: products[1].id,
        orderId: order1.id,
      },
      {
        quantity: 3,
        price: products[2].price,
        productId: products[2].id,
        orderId: order2.id,
      },
      {
        quantity: 1,
        price: products[3].price,
        productId: products[3].id,
        orderId: order2.id,
      },
    ];

    for (const item of orderItems) {
      await prisma.orderItem.create({
        data: item,
      });
    }

    console.log("Order items created.");
  } catch (error) {
    console.log("Error creating orders: ", error);
  }
};

async function main() {
  await addUsers();
  await addProducts();
  await addOrders();
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
