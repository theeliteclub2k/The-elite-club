"use client";

import { useRouter } from "next/navigation";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import {
  Button,
  Heading,
  Separator,
  Text,
  Img,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

declare global {
  interface Window {
    Razorpay: any;
  }
}
const order = [
  {
    itemId: "67477ba93d297752ec40ad37",
    quantity: 1,
  },
];
export default function CheckoutPage() {
  const router = useRouter();
  const handlePayment = async () => {
    console.log("clicked");
    const toastId = toast.loading("Initiating Payment");
    const response = await fetch("/api/initiatePayment", {
      method: "POST",
      body: JSON.stringify({ order }),
    });
    const data = await response.json();
    console.log(data);
    if (response.status !== 200) {
      toast.error(data.error);
      return;
    }
    toast.dismiss(toastId);
    var opti = {
      key: process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: 100 * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "EliteStore", //your business name
      description: "Order Description",
      // image: imgSrc,
      order_id: data?.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function async(response: any) {
        // console.log("res : ", response);
        const toastId = toast.loading("Payment Successful, Creating Order please wait...");
        await fetch("/api/order/createOrder", {
          method: "POST",
          body: JSON.stringify({
            order,
            payment: response,
          }),
        });
        toast.success("Order Created Successfully", { id: toastId });
        router.push("/"); //redirect to home page
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "name", //your customer's name
        email: "email", //your customer's email
        contact: "phone", //Provide the customer's phone number for better conversion rates
      },
      theme: {
        color: "#11074C",
      },
    };
    var rzp1: any = new window.Razorpay(opti);
    rzp1.open();
    rzp1.on("payment.failed", function (response: any) {
      console.log("payment failed : ", response);
      toast.error("Payment Failed", { id: toastId });
    });
  };
  return (
    <div className="flex w-full flex-col gap-[5.63rem] bg-white-a700 md:gap-[4.19rem] sm:gap-[2.81rem]">
      <div className="flex flex-col gap-[1.50rem]">
        <Header />
        <div className="flex flex-col items-center">
          <div className="mx-auto flex w-full max-w-[75.25rem] flex-col gap-[2.88rem] md:px-[1.25rem]">
            <Breadcrumb>
              <BreadcrumbList className="flex flex-wrap items-center gap-[0.38rem]">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="#">
                      <Text
                        size="textlg"
                        as="p"
                        className="text-[1.13rem] font-normal capitalize tracking-[0.00rem] text-gray-500"
                      >
                        Home
                      </Text>
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <Img
                    src="defaultNoData.png"
                    width={24}
                    height={24}
                    alt="Arrow Right"
                    className="h-[1.50rem] w-[1.50rem]"
                  />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="#" className="self-end">
                      <Text
                        size="textlg"
                        as="p"
                        className="text-[1.13rem] font-normal capitalize tracking-[0.00rem] text-gray-500"
                      >
                        Shopping Cart
                      </Text>
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <Img
                    src="defaultNoData.png"
                    width={24}
                    height={24}
                    alt="Arrow Right"
                    className="h-[1.50rem] w-[1.50rem]"
                  />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    <Link href="#">
                      <Heading
                        as="h1"
                        className="text-[1.13rem] font-semibold capitalize tracking-[0.00rem] text-blue_gray-900_01"
                      >
                        Checkout
                      </Heading>
                    </Link>
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex gap-[1.50rem] md:flex-col justify-center">

              <div className="flex w-[42%] items-start justify-center gap-[1.38rem] md:w-full sm:flex-col">

                <div className="flex flex-1 flex-col gap-[2.00rem] rounded-lg bg-white-a700 sm:self-stretch">
                  <div className="flex flex-col items-start justify-center gap-[1.38rem]">
                    <Heading as="h3" className="text-[1.13rem] font-semibold text-blue_gray-900_01">
                      PRICE DETAILS (2 items)
                    </Heading>
                    <div className="flex flex-col gap-[0.88rem] self-stretch">
                      <div className="flex flex-wrap justify-between gap-[1.25rem]">
                        <Text size="textlg" as="p" className="text-[1.13rem] font-normal text-gray-600">
                          Total MRP
                        </Text>
                        <Text size="textlg" as="p" className="text-[1.13rem] font-normal text-blue_gray-900_01">
                          ₹2598
                        </Text>
                      </div>
                      <div className="flex flex-wrap justify-between gap-[1.25rem]">
                        <Text size="textlg" as="p" className="text-[1.13rem] font-normal text-gray-600">
                          Discount on MRP
                        </Text>
                        <Text size="textlg" as="p" className="text-[1.13rem] font-normal text-green-600_01">
                          -₹1430
                        </Text>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-[1.25rem]">
                        <Text size="textlg" as="p" className="text-[1.13rem] font-normal text-gray-600">
                          Coupon Discount
                        </Text>
                        <Text size="textlg" as="p" className="text-[1.13rem] font-normal text-green-600_01">
                          -₹179
                        </Text>
                      </div>
                      <div className="flex justify-center">
                        <Text size="textlg" as="p" className="text-[1.13rem] font-normal text-gray-600">
                          Shipping Fee
                        </Text>
                        <div className="flex flex-1 flex-wrap justify-end">
                          <Text
                            size="textlg"
                            as="p"
                            className="text-[1.13rem] font-normal text-blue_gray-900_01 line-through"
                          >
                            ₹100
                          </Text>
                          <Text size="textlg" as="p" className="text-[1.13rem] font-normal text-green-600_01">
                            FREE
                          </Text>
                        </div>
                      </div>
                    </div>
                    <Separator orientation="horizontal" className="h-[0.06rem] w-full self-stretch bg-gray-300" />
                    <div className="flex flex-wrap justify-between gap-[1.25rem] self-stretch">
                      <Heading as="h4" className="text-[1.13rem] font-semibold text-blue_gray-900_01">
                        Total Amount
                      </Heading>
                      <Heading as="h5" className="text-[1.13rem] font-semibold text-blue_gray-900_01">
                        $992
                      </Heading>
                    </div>
                  </div>
                  <Button
                    shape="round"
                    onClick={handlePayment}
                    className="w-full max-w-[29.13rem] self-stretch rounded-md px-[2.13rem] font-medium sm:px-[1.25rem]"
                  >
                    CONFIRM PAYMENT
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
