import React from "react";
import { Metadata } from "next";
import Page from ".";

export const metadata: Metadata = {
  title: "Product List - Explore Fashion Essentials",
  description:
    "Browse our product list for the latest fashion deals. Enjoy 25% off on essential tees, vintage-inspired tops, and more from brands like H&M and Zara.",
  //ogTitle:'...'
};

export default function ProductlistPage() {
  return <Page />;
}
