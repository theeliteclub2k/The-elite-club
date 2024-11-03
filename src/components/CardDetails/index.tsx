import { Text, Heading, Img, RadioGroupItem, RadioGroup } from "@/components/ui";
import React from "react";

interface Props {
  className?: string;
  cardImage?: string;
  cardTitle?: React.ReactNode;
  cardNumber?: React.ReactNode;
  cardExpiry?: React.ReactNode;
}

export default function CardDetails({
  cardImage = "img_ellipse_3.png",
  cardTitle = "HDFC Debit Card",
  cardNumber = "XXXX XXXX XXXX XX48",
  cardExpiry = "Exp : 03/22",
  ...props
}: Props) {
  return (
    <div
      {...props}
      className={`${props.className} flex sm:flex-col justify-center items-center gap-[0.50rem] p-[1.00rem] border-blue_gray-100 border border-solid bg-white-a700 flex-1 rounded-md`}
    >
      <RadioGroup className="w-[1.50rem]">
        <RadioGroupItem value="radiogroup1" label="" id="69_4425_134_832_24_24" className="h-[1.50rem]" />
      </RadioGroup>
      <div className="flex flex-1 items-center gap-[0.50rem]">
        <Img
          src={cardImage}
          width={60}
          height={60}
          alt="Card Image"
          className="h-[3.75rem] w-[3.75rem] rounded-[30px] object-cover"
        />
        <div className="flex flex-1 flex-col items-start gap-[0.50rem] self-end sm:gap-[0.50rem]">
          <Heading size="textxl" as="p" className="text-[1.25rem] font-medium text-blue_gray-900_01 sm:text-[1.06rem]">
            {cardTitle}
          </Heading>
          <div className="flex flex-wrap justify-between gap-[1.25rem] self-stretch">
            <Text as="p" className="text-[1.00rem] font-medium text-gray-600 sm:text-[0.81rem]">
              {cardNumber}
            </Text>
            <Text as="p" className="text-[1.00rem] font-medium text-gray-600 sm:text-[0.81rem]">
              {cardExpiry}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
