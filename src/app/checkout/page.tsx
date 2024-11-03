import React from "react";
import { Metadata } from "next";
import Page from ".";

export const metadata: Metadata = {
  title: "Checkout - Secure Payment & Offers",
  description:
    "Complete your purchase with our secure checkout. Choose from UPI, Net Banking, or COD. Enjoy discounts and free shipping on your stylish selections.",
  //ogTitle:'...'
};

export default function CheckoutPage() {
  return <Page />;
}
