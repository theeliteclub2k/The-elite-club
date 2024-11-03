"use client";

import { Img, Text, Separator, Heading, Button, Input } from "@/components/ui";
import Link from "next/link";
import React from "react";

export default function SIGNINPage() {
  return (
    <div className="w-full bg-gray-200">
      <div className="flex md:flex-col">
        <div className="w-full md:px-[1.25rem]">
          <div className="bg-white-a700 p-[2.88rem] md:p-[1.25rem]">
            <div className="mb-[21.00rem] flex flex-col gap-[3.13rem]">
              <Img
                src="img_fashionflow_transparent.svg"
                width={126}
                height={32}
                alt="Fashion Image"
                className="h-[2.00rem] w-[20%] object-contain"
              />
              <div className="flex flex-col items-center gap-[1.38rem]">
                <div className="flex flex-col items-center gap-[1.50rem] self-stretch">
                  <div className="flex flex-col items-start justify-center gap-[1.75rem] self-stretch">
                    <Heading
                      size="heading3xl"
                      as="h1"
                      className="text-[1.63rem] font-semibold text-blue_gray-900_01 md:text-[1.50rem] sm:text-[1.38rem]"
                    >
                      Sign in to your account
                    </Heading>
                    <div className="flex flex-col gap-[2.00rem] self-stretch">
                      <div className="flex flex-col items-start justify-center gap-[0.38rem]">
                        <Text size="textlg" as="p" className="text-[1.13rem] font-medium text-blue_gray-900_01">
                          Email Address
                        </Text>
                        <Input
                          shape="round"
                          type="email"
                          placeholder={`Email Address`}
                          className="self-stretch rounded-md border border-solid border-blue_gray-100 px-[1.13rem]"
                        />
                      </div>
                      <div className="flex flex-col items-end gap-[1.25rem]">
                        <div className="flex flex-col items-start justify-center gap-[0.38rem] self-stretch">
                          <Text size="textlg" as="p" className="text-[1.13rem] font-medium text-blue_gray-900_01">
                            Password
                          </Text>
                          <Input
                            shape="round"
                            type="password"
                            placeholder={`Password`}
                            className="self-stretch rounded-md border border-solid border-blue_gray-100 px-[1.13rem]"
                          />
                        </div>
                        <Link href="#">
                          <Heading
                            size="headingmd"
                            as="h2"
                            className="text-[1.00rem] font-semibold text-blue_gray-900_01"
                          >
                            Forgot Password?
                          </Heading>
                        </Link>
                      </div>
                    </div>
                    <Button
                      shape="round"
                      className="w-full max-w-[39.00rem] self-stretch rounded-md px-[2.13rem] sm:px-[1.25rem]"
                    >
                      SIGN IN
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-[0.25rem]">
                    <Link href="#">
                      <Text as="p" className="text-[1.00rem] font-normal text-blue_gray-900_01">
                        Don’t have an account?
                      </Text>
                    </Link>
                    <a href="https://www.youtube.com/embed/bv8Fxk0sz7I" target="_blank">
                      <Heading size="headingmd" as="h3" className="text-[1.00rem] font-bold text-blue_gray-900_01">
                        Sign Up
                      </Heading>
                    </a>
                  </div>
                </div>
                <Separator orientation="horizontal" className="h-[0.06rem] w-full self-stretch bg-gray-200" />
                <div className="flex flex-wrap gap-[1.38rem]">
                  <Link href="#">
                    <Text as="p" className="text-[1.00rem] font-normal text-blue_gray-200">
                      Terms & Conditions
                    </Text>
                  </Link>
                  <Link href="#" className="self-end">
                    <Text as="p" className="text-[1.00rem] font-normal text-blue_gray-200">
                      Privacy Policy
                    </Text>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:px-[1.25rem]">
          <Img
            src="img_frame_26911.png"
            width={720}
            height={1024}
            alt="Featured Image"
            className="h-[64.00rem] w-full object-cover md:h-auto"
          />
        </div>
      </div>
    </div>
  );
}
