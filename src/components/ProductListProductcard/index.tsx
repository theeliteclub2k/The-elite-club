import { Text, Heading, Img, Button } from "@/components/ui/Index";
import React from "react";

interface Props {
  className?: string;
}

export default function ProductListProductcard({ ...props }: Props) {
  return (
    <div
      {...props}
      className={`${props.className} flex flex-col items-center w-full gap-[0.63rem]`}
    >
      <div className="relative h-[21.25rem] content-center self-stretch">
        <Img
          src="img_rectangle_136_340x272.png"
          width={272}
          height={340}
          alt="Urban Vibe Image"
          className="mx-auto h-[21.25rem] w-full flex-1 object-cover"
        />
        <Button
          size="sm"
          shape="square"
          className="absolute left-[0.56rem] top-[0.63rem] m-auto w-full min-w-[4.88rem] max-w-[4.88rem] px-[0.75rem] font-bold"
        >
          25% OFF
        </Button>
      </div>
      <div className="flex flex-col items-start justify-center gap-[0.38rem] self-stretch">
        <Heading
          as="h6"
          className="text-[1.13rem] font-semibold text-blue_gray-900_01"
        >
          Urban Vibe T-Shirt
        </Heading>
        <div className="flex self-stretch">
          <Heading
            size="headings"
            as="p"
            className="text-[0.88rem] font-semibold text-gray-400"
          >
            H&M
          </Heading>
          <div className="flex flex-1 px-[1.00rem]">
            <Img
              src="img_frame_amber_500.svg"
              width={16}
              height={16}
              alt="Rating Image"
              className="h-[1.00rem] w-[1.00rem]"
            />
            <Heading
              size="headings"
              as="p"
              className="text-[0.88rem] font-semibold text-blue_gray-900_01"
            >
              4.8
            </Heading>
          </div>
        </div>
        <div className="flex flex-wrap gap-[0.56rem] self-stretch">
          <Heading
            as="h6"
            className="text-[1.13rem] font-bold text-blue_gray-900_01"
          >
            Rs. 550
          </Heading>
          <Text
            size="textlg"
            as="p"
            className="text-[1.13rem] font-normal text-gray-400 line-through"
          >
            Rs 1000
          </Text>
        </div>
      </div>
    </div>
  );
}
