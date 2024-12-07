const { PrismaClient } = require("@prisma/client");

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
    console.error("Error creating users: ", error);
  }
};

const fetchAndAddProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    const products = data;

    const productData = [];
    for (const product of products) {
      productData.push({
        name: product.title,
        description: product.description,
        price: product.price,
        quantity: Math.floor(Math.random() * 100) + 1, // Random quantity between 1 and 100
        category: "CLOTHING",
        imageUrl: product.image,
      });
    }

    const createdProducts = await prisma.product.createMany({
      data: productData,
    });

    console.log("Products created: ", createdProducts);
  } catch (error) {
    console.error("Error fetching/adding products: ", error);
  }
};

const addOrdersAndPayments = async () => {
  try {
    const users = await prisma.user.findMany();
    const products = await prisma.product.findMany();

    const orders = [
      {
        totalAmount: 150.0,
        status: "PENDING",
        userId: users[0].id,
      },
      {
        totalAmount: 300.0,
        status: "SHIPPED",
        userId: users[1].id,
      },
    ];

    const createdOrders = [];
    for (const orderData of orders) {
      const order = await prisma.order.create({
        data: orderData,
      });
      createdOrders.push(order);
    }

    const orderItems = [
      {
        quantity: 2,
        price: products[0].price,
        productId: products[0].id,
        orderId: createdOrders[0].id,
      },
      {
        quantity: 1,
        price: products[1].price,
        productId: products[1].id,
        orderId: createdOrders[0].id,
      },
      {
        quantity: 3,
        price: products[2].price,
        productId: products[2].id,
        orderId: createdOrders[1].id,
      },
      {
        quantity: 1,
        price: products[3].price,
        productId: products[3].id,
        orderId: createdOrders[1].id,
      },
    ];

    for (const item of orderItems) {
      await prisma.orderItem.create({
        data: item,
      });
    }

    console.log("Order items created.");

    // Add payments for orders
    const payments = [
      {
        razorpay_payment_id: "pay_29QQoUBi66xm2f",
        razorpay_order_id: "order_DBJOWzybf0sJbb",
        razorpay_signature: "e7ecf544e1e4b17c",
        Order: {
          connect: [{ id: createdOrders[0].id }, { id: createdOrders[1].id }],
        },
      },
    ];

    for (const paymentData of payments) {
      await prisma.payment.create({
        data: paymentData,
      });
    }

    console.log("Payments created.");
  } catch (error) {
    console.error("Error creating orders and payments: ", error);
  }
};

async function main() {
  await addUsers();
  await fetchAndAddProducts();
  await addOrdersAndPayments();
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
