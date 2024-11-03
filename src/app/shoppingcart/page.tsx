import React from "react";
import { Metadata } from "next";
import Page from ".";

export const metadata: Metadata = {
  title: "Your Shopping Cart - FashionFlow",
  description:
    "Ready to checkout? Review your FashionFlow shopping cart with 4 selected items. Enjoy exclusive discounts and free shipping on orders above $180. Place your order now!",
  //ogTitle:'...'
};

export default function ShoppingCartPage() {
  return <Page />;
}
