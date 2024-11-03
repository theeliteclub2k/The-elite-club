"use client";

import { Img, Heading, Text, Button, Checkbox, Input, Separator, Combobox } from "@/components/ui";
import metadata from "libphonenumber-js/metadata.full.json";
import Link from "next/link";
import React from "react";

export default function SIGNUPPage() {
  const countryOptions = React.useMemo(() => {
    return Object.entries(metadata.countries).map(([code, data]) => {
      const callingCode = `${data[0]}`;

      const display = {
        code,
        callingCode: `+${callingCode}`,
        imgSrc: `https://catamphetamine.github.io/country-flag-icons/3x2/${code}.svg`,
      };

      return {
        value: code,
        label: (
          <>
            <Img isStatic src={display.imgSrc} width={26} height={20} alt="Megaphone Icon" className="h-[1.25rem]" />
          </>
        ),
      };
    });
  }, []);

  return (
    <div className="flex w-full bg-gray-200 md:flex-col">
      <div className="w-full md:px-[1.25rem]">
        <div className="bg-white-a700 p-[2.88rem] md:p-[1.25rem]">
          <div className="mb-[18.50rem] flex flex-col gap-[3.13rem]">
            <Img
              src="img_fashionflow_transparent.svg"
              width={126}
              height={32}
              alt="Fashion Image"
              className="h-[2.00rem] w-[20%] object-contain"
            />
            <div className="flex flex-col items-center gap-[1.50rem]">
              <div className="flex flex-col items-start justify-center gap-[1.88rem] self-stretch">
                <Heading
                  size="heading3xl"
                  as="h1"
                  className="text-[1.63rem] font-semibold text-blue_gray-900_01 md:text-[1.50rem] sm:text-[1.38rem]"
                >
                  Sign up to create your account
                </Heading>
                <div className="flex flex-col items-center gap-[1.50rem] self-stretch">
                  <div className="flex gap-[1.50rem] self-stretch md:flex-col">
                    <div className="flex w-full flex-col items-start justify-center gap-[0.38rem]">
                      <Text size="textlg" as="p" className="text-[1.13rem] font-medium text-blue_gray-900_01">
                        First Name
                      </Text>
                      <Input
                        shape="round"
                        type="text"
                        placeholder={`First name`}
                        className="self-stretch rounded-md border border-solid border-blue_gray-100 px-[1.13rem]"
                      />
                    </div>
                    <div className="flex w-full flex-col items-start justify-center gap-[0.38rem]">
                      <Text size="textlg" as="p" className="text-[1.13rem] font-medium text-blue_gray-900_01">
                        Last Name
                      </Text>
                      <Input
                        shape="round"
                        type="text"
                        placeholder={`Last name`}
                        className="self-stretch rounded-md border border-solid border-blue_gray-100 px-[1.13rem]"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-center gap-[0.38rem] self-stretch">
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
                  <div className="flex flex-col items-start justify-center gap-[0.38rem] self-stretch">
                    <Text size="textlg" as="p" className="text-[1.13rem] font-medium text-blue_gray-900_01">
                      Phone Number
                    </Text>
                    <div className="flex h-[3.63rem] items-center justify-center self-stretch rounded-md border border-solid border-blue_gray-100 bg-white-a700 px-[0.25rem]">
                      <Combobox
                        options={countryOptions}
                        defaultValue={""}
                        width="74"
                        className="max-h-[1.50rem] flex-shrink-0 items-center justify-center border-none bg-transparent pl-[0.88rem]"
                        indicator={
                          <Img
                            src="img_arrow_down_blue_gray_600.svg"
                            width={24}
                            height={24}
                            alt="Arrow Down Icon"
                            className="ml-[0.50rem] h-[1.50rem] w-[1.50rem]"
                          />
                        }
                      />
                      <Separator orientation="vertical" className="ml-[0.38rem] h-[1.63rem] w-[0.06rem] bg-gray-200" />
                      <Input
                        size="xs"
                        shape="square"
                        type="tel"
                        placeholder="Phone Number"
                        className="ml-[0.38rem] flex-grow border-none px-[0.75rem] text-gray-400"
                      />
                    </div>
                  </div>
                  <Checkbox
                    label="By signing up I agree  to the Terms & Conditions and Privacy Policy"
                    id="104:2497"
                    className="gap-[0.50rem] pr-[2.13rem] pt-[0.25rem] font-chivo text-[1.00rem] text-blue_gray-600 sm:pr-[1.25rem]"
                  />
                </div>
                <a href="https://www.youtube.com/embed/bv8Fxk0sz7I" target="_blank">
                  <Button
                    shape="round"
                    className="w-full max-w-[39.00rem] self-stretch rounded-md px-[2.13rem] sm:px-[1.25rem]"
                  >
                    SIGN UP
                  </Button>
                </a>
              </div>
              <div className="flex flex-wrap gap-[0.38rem]">
                <Text as="p" className="self-end text-[1.00rem] font-normal text-blue_gray-900_01">
                  Already have account?
                </Text>
                <a href="https://www.youtube.com/embed/bv8Fxk0sz7I" target="_blank">
                  <Heading size="headingmd" as="h2" className="text-[1.00rem] font-semibold text-blue_gray-900_01">
                    Sign In
                  </Heading>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:px-[1.25rem]">
        <Img
          src="img_frame_26911_1024x720.png"
          width={720}
          height={1024}
          alt="Featured Image"
          className="h-[64.00rem] w-full object-cover md:h-auto"
        />
      </div>
    </div>
  );
}
