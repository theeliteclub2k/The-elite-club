"use client";

import CardDetails from "../../components/CardDetails";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import UserProfile from "../../components/UserProfile";
import {
  Button,
  Heading,
  Separator,
  Text,
  Input,
  Img,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Index";
import Link from "next/link";
import React, { Suspense } from "react";

const paymentOptionsList = [
  { userImage: "img_image_46.png", upiText: "UPI" },
  { userImage: "img_image_46.png", upiText: "UPI" },
  { userImage: "img_ic_baseline_laptop.svg", upiText: "Net Banking" },
  { userImage: "img_money_1.svg", upiText: "Cash on Delivery" },
];

export default function CheckoutPage() {
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
            <div className="flex gap-[1.50rem] md:flex-col">
              <div className="flex flex-1 flex-col gap-[2.63rem] md:self-stretch">
                <div className="flex flex-col gap-[1.50rem]">
                  <div className="flex flex-col items-start justify-center gap-[0.75rem]">
                    <Text
                      size="text2xl"
                      as="p"
                      className="text-[1.50rem] font-medium text-blue_gray-900_01 md:text-[1.38rem]"
                    >
                      Payment Option
                    </Text>
                    <Separator
                      orientation="horizontal"
                      className="h-[0.06rem] w-full self-stretch bg-blue_gray-100"
                    />
                  </div>
                  <div className="flex flex-col gap-[1.50rem]">
                    <Suspense fallback={<div>Loading feed...</div>}>
                      {paymentOptionsList.map((d, index) => (
                        <UserProfile {...d} key={"optionsList" + index} />
                      ))}
                    </Suspense>
                  </div>
                </div>
                <div className="flex flex-col gap-[1.38rem]">
                  <div className="flex flex-col items-start gap-[0.88rem]">
                    <Text
                      size="text2xl"
                      as="p"
                      className="text-[1.50rem] font-medium text-blue_gray-900_01 md:text-[1.38rem]"
                    >
                      Saved Cards
                    </Text>
                    <Separator
                      orientation="horizontal"
                      className="h-[0.06rem] w-full self-stretch bg-blue_gray-100"
                    />
                  </div>
                  <div className="flex flex-col gap-[1.50rem]">
                    <CardDetails />
                    <CardDetails
                      cardImage="img_ellipse_4.png"
                      cardTitle="SBI Credit Card"
                      cardNumber="XXXX XXXX XXXX XX48"
                      cardExpiry="Exp : 03/22"
                    />
                  </div>
                  <div className="flex flex-col gap-[1.88rem] rounded-md border border-solid border-blue_gray-100 bg-white-a700 px-[1.00rem] py-[1.50rem] sm:py-[1.25rem]">
                    <div className="flex items-center gap-[1.50rem]">
                      <Img
                        src="img_contrast.svg"
                        width={36}
                        height={36}
                        alt="Card Image"
                        className="h-[2.25rem] w-[2.25rem]"
                      />
                      <Heading
                        size="textxl"
                        as="h2"
                        className="text-[1.25rem] font-medium text-blue_gray-900_01"
                      >
                        Add New Credit/Debit/ATM Card
                      </Heading>
                    </div>
                    <div className="flex flex-col items-end gap-[1.00rem]">
                      <div className="flex flex-col items-end gap-[0.50rem] self-stretch">
                        <div className="flex self-stretch pl-[3.75rem] pr-[3.50rem] md:px-[1.25rem]">
                          <Text
                            size="textlg"
                            as="p"
                            className="text-[1.13rem] font-medium text-blue_gray-900_01"
                          >
                            Card Holder Name
                          </Text>
                        </div>
                        <Input
                          size="sm"
                          shape="round"
                          type="text"
                          placeholder={`Enter Your Full Name`}
                          className="w-[90%] rounded-md border border-solid border-blue_gray-100 px-[0.75rem]"
                        />
                      </div>
                      <div className="flex flex-col items-end gap-[0.50rem] self-stretch">
                        <div className="flex self-stretch pl-[3.75rem] pr-[3.50rem] md:px-[1.25rem]">
                          <Text
                            size="textlg"
                            as="p"
                            className="text-[1.13rem] font-medium text-blue_gray-900_01"
                          >
                            Card Number
                          </Text>
                        </div>
                        <div className="flex w-[90%] items-center justify-center rounded-md border border-solid border-blue_gray-100 bg-white-a700 px-[0.75rem] py-[0.88rem] md:w-full">
                          <div className="flex flex-1">
                            <Text
                              as="p"
                              className="text-[1.00rem] font-normal text-gray-400"
                            >
                              XXXX XXXX XXXX XX34
                            </Text>
                          </div>
                          <Img
                            src="img_rupay_logo_1.png"
                            width={56}
                            height={16}
                            alt="Rupay Logo"
                            className="h-[1.00rem] w-[10%] object-contain"
                          />
                        </div>
                      </div>
                      <div className="flex justify-center gap-[1.06rem] self-stretch md:flex-col">
                        <div className="flex w-[44%] flex-col items-start justify-center gap-[0.50rem] md:w-full">
                          <Text
                            size="textlg"
                            as="p"
                            className="text-[1.13rem] font-medium text-blue_gray-900_01"
                          >
                            Expiry Date
                          </Text>
                          <Input
                            size="sm"
                            shape="round"
                            placeholder={`00/0000`}
                            className="self-stretch rounded-md border border-solid border-blue_gray-100 px-[0.75rem]"
                          />
                        </div>
                        <div className="flex w-[44%] flex-col items-start justify-center gap-[0.50rem] md:w-full">
                          <Text
                            size="textlg"
                            as="p"
                            className="text-[1.13rem] font-medium text-blue_gray-900_01"
                          >
                            CVV
                          </Text>
                          <Input
                            size="sm"
                            shape="round"
                            placeholder={`XXX`}
                            className="self-stretch rounded-md border border-solid border-blue_gray-100 px-[0.75rem]"
                          />
                        </div>
                      </div>
                      <Button
                        shape="round"
                        className="w-full min-w-[37.38rem] max-w-[37.38rem] rounded-md px-[2.13rem] font-medium sm:px-[1.25rem]"
                      >
                        ADD CARD
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-[42%] items-start justify-center gap-[1.38rem] md:w-full sm:flex-col">
                <Separator
                  orientation="vertical"
                  className="h-[78.63rem] w-[0.06rem] self-center bg-gray-300 sm:h-[0.06rem] sm:w-[78.63rem]"
                />
                <div className="flex flex-1 flex-col gap-[2.00rem] rounded-lg bg-white-a700 sm:self-stretch">
                  <div className="flex flex-col items-start justify-center gap-[1.38rem]">
                    <Heading
                      as="h3"
                      className="text-[1.13rem] font-semibold text-blue_gray-900_01"
                    >
                      PRICE DETAILS (2 items)
                    </Heading>
                    <div className="flex flex-col gap-[0.88rem] self-stretch">
                      <div className="flex flex-wrap justify-between gap-[1.25rem]">
                        <Text
                          size="textlg"
                          as="p"
                          className="text-[1.13rem] font-normal text-gray-600"
                        >
                          Total MRP
                        </Text>
                        <Text
                          size="textlg"
                          as="p"
                          className="text-[1.13rem] font-normal text-blue_gray-900_01"
                        >
                          ₹2598
                        </Text>
                      </div>
                      <div className="flex flex-wrap justify-between gap-[1.25rem]">
                        <Text
                          size="textlg"
                          as="p"
                          className="text-[1.13rem] font-normal text-gray-600"
                        >
                          Discount on MRP
                        </Text>
                        <Text
                          size="textlg"
                          as="p"
                          className="text-[1.13rem] font-normal text-green-600_01"
                        >
                          -₹1430
                        </Text>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-[1.25rem]">
                        <Text
                          size="textlg"
                          as="p"
                          className="text-[1.13rem] font-normal text-gray-600"
                        >
                          Coupon Discount
                        </Text>
                        <Text
                          size="textlg"
                          as="p"
                          className="text-[1.13rem] font-normal text-green-600_01"
                        >
                          -₹179
                        </Text>
                      </div>
                      <div className="flex justify-center">
                        <Text
                          size="textlg"
                          as="p"
                          className="text-[1.13rem] font-normal text-gray-600"
                        >
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
                          <Text
                            size="textlg"
                            as="p"
                            className="text-[1.13rem] font-normal text-green-600_01"
                          >
                            FREE
                          </Text>
                        </div>
                      </div>
                    </div>
                    <Separator
                      orientation="horizontal"
                      className="h-[0.06rem] w-full self-stretch bg-gray-300"
                    />
                    <div className="flex flex-wrap justify-between gap-[1.25rem] self-stretch">
                      <Heading
                        as="h4"
                        className="text-[1.13rem] font-semibold text-blue_gray-900_01"
                      >
                        Total Amount
                      </Heading>
                      <Heading
                        as="h5"
                        className="text-[1.13rem] font-semibold text-blue_gray-900_01"
                      >
                        $992
                      </Heading>
                    </div>
                  </div>
                  <Button
                    shape="round"
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
