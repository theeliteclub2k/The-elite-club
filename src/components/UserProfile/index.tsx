import { Heading, Img, RadioGroupItem, RadioGroup } from "@/components/ui";
import React from "react";

interface Props {
  className?: string;
  userImage?: string;
  upiText?: React.ReactNode;
}

export default function UserProfile({ userImage = "img_image_46.png", upiText = "UPI", ...props }: Props) {
  return (
    <div
      {...props}
      className={`${props.className} flex justify-center items-center gap-[0.63rem] px-[1.00rem] py-[1.38rem] sm:py-[1.25rem] border-blue_gray-100 border border-solid bg-white-a700 flex-1 rounded-md`}
    >
      <RadioGroup className="w-[1.50rem]">
        <RadioGroupItem value="radioselection1" label="" id="69_4425_134_323_24_24" className="h-[1.50rem]" />
      </RadioGroup>
      <div className="flex flex-1 items-center gap-[1.06rem]">
        <Img src={userImage} width={44} height={16} alt="Upi Icon" className="h-[1.00rem] object-cover" />
        <Heading size="textxl" as="p" className="text-[1.25rem] font-medium text-blue_gray-900_01 sm:text-[1.06rem]">
          {upiText}
        </Heading>
      </div>
    </div>
  );
}
