'use client'
import { Img, Heading, Menubar, MenubarContent, MenubarMenu, MenubarTrigger, Text } from "@/components/ui";
import Link from "next/link";
import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";

interface Props {
  className?: string;
}

export default function Header({ ...props }: Props) {
  return (
    <div {...props}>
      <div className="flex justify-center self-stretch bg-blue_gray-900_01 py-[0.88rem]">
        <div className="mx-auto flex w-full max-w-[75.25rem] items-center justify-between gap-[1.25rem] md:flex-col md:px-[1.25rem]">
          <Text as="p" className="self-end text-[1.00rem] font-normal text-white-a700 md:self-auto">
            <span className="text-white-a700">
              Sign up now and enjoy a 25% discount on your first order. Don&#39;t miss out!&nbsp;
            </span>
            <span className="font-semibold text-blue-700">Sign up now</span>
          </Text>
          <Link href="#">
            <Img
              src="img_icon.svg"
              width={24}
              height={24}
              alt="Promo Icon"
              className="h-[1.50rem] w-[1.50rem] md:w-full"
            />
          </Link>
        </div>
      </div>
      <div className="flex justify-center self-stretch border-b border-solid border-gray-600 bg-white-a700 py-[1.50rem] sm:py-[1.25rem]">
        <div className="mx-auto flex w-full max-w-[75.25rem] items-center justify-between gap-[1.25rem] md:flex-col md:px-[1.25rem]">
          <Img
            src="img_header_logo.svg"
            width={126}
            height={32}
            alt="Header Logo"
            className="h-[2.00rem] w-[7.88rem] object-contain"
          />
          <Menubar className="flex flex-wrap gap-[1.25rem] border-none">
            <MenubarMenu>
              <MenubarTrigger>
                <Heading size="headings" as="p" className="text-[0.88rem] font-semibold text-blue_gray-900_01">
                  <Link href={'/productlist'}> Home</Link>
                </Heading>
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>
                <Heading
                  size="headings"
                  as="p"
                  className="cursor-pointer text-[0.88rem] font-semibold text-gray-600 hover:text-blue_gray-900_01"
                >
                  Shop
                </Heading>
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>
                <Heading
                  size="headings"
                  as="p"
                  className="cursor-pointer text-[0.88rem] font-semibold text-gray-600 hover:text-blue_gray-900_01"
                >
                  Women
                </Heading>
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>
                <Heading
                  size="headings"
                  as="p"
                  className="cursor-pointer text-[0.88rem] font-semibold text-gray-600 hover:text-blue_gray-900_01"
                >
                  Men
                </Heading>
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>
                <Heading
                  size="headings"
                  as="p"
                  className="cursor-pointer text-[0.88rem] font-semibold text-gray-600 hover:text-blue_gray-900_01"
                >
                  Accessories
                </Heading>
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>
                <Heading
                  size="headings"
                  as="p"
                  className="cursor-pointer text-[0.88rem] font-semibold text-gray-600 hover:text-blue_gray-900_01"
                >
                  About Us
                </Heading>
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>
                <Heading
                  size="headings"
                  as="p"
                  className="cursor-pointer text-[0.88rem] font-semibold text-gray-600 hover:text-blue_gray-900_01"
                >
                  Contact Us
                </Heading>
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>
                <Heading
                  size="headings"
                  as="p"
                  className="cursor-pointer text-[0.88rem] font-semibold text-gray-600 hover:text-blue_gray-900_01"
                >
                  Blog
                </Heading>
              </MenubarTrigger>
            </MenubarMenu>
          </Menubar>
          <div className="flex gap-[1.25rem]">
            <Link href="#">
              <Img src="img_search.svg" width={24} height={24} alt="Search Icon" className="h-[1.50rem] w-[1.50rem]" />
            </Link>
            <Link href="#">
              <Img
                src="img_favorite.svg"
                width={24}
                height={24}
                alt="Favorite Icon"
                className="h-[1.50rem] w-[1.50rem]"
              />
            </Link>
            <Link href='/shoppingcart'>
              <Img src="img_bag.svg"
                width={24} height={24} alt="Bag Icon"
                className="h-[1.50rem] w-[1.50rem]"
              />
            </Link>
            <Link href="#">
              <Img src="img_lock.svg" width={24} height={24} alt="Lock Icon" className="h-[1.50rem] w-[1.50rem]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
