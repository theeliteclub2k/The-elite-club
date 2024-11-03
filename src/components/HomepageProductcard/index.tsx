import { Text, Heading, Img, Button } from "@/components/ui";
import React from "react";

interface Props {
  className?: string;
}

export default function HomepageProductcard({ ...props }: Props) {
  return (
    <div {...props} className={`${props.className} flex flex-col items-center w-[23.00rem] gap-[1.00rem]`}>
      <div className="relative h-[28.75rem] content-center self-stretch">
        <Img
          src="img_rectangle_136_5.png"
          width={368}
          height={460}
          alt="Graphic Image"
          className="mx-auto h-[28.75rem] w-full flex-1 object-cover"
        />
        <Button
          size="lg"
          shape="square"
          className="absolute left-[0.63rem] top-[0.63rem] m-auto w-full min-w-[6.63rem] max-w-[6.63rem] px-[1.13rem] font-bold"
        >
          25% OFF
        </Button>
      </div>
      <div className="flex flex-col items-start justify-center gap-[0.25rem] self-stretch">
        <Heading size="heading2xl" as="h4" className="text-[1.50rem] font-semibold text-blue_gray-900_01">
          Trendy Graphic Tee
        </Heading>
        <div className="flex self-stretch">
          <Heading size="headingmd" as="h6" className="text-[1.00rem] font-semibold text-gray-400">
            H&M
          </Heading>
          <div className="flex flex-1 items-center px-[1.00rem]">
            <Img
              src="img_frame_amber_500.svg"
              width={16}
              height={16}
              alt="Rating Image"
              className="h-[1.00rem] w-[1.00rem]"
            />
            <Heading size="headingmd" as="h6" className="text-[1.00rem] font-semibold text-blue_gray-900_01">
              4.8
            </Heading>
          </div>
        </div>
        <div className="flex flex-wrap gap-[0.50rem] self-stretch">
          <Heading size="heading2xl" as="h4" className="text-[1.50rem] font-bold text-blue_gray-900_01">
            Rs. 1200
          </Heading>
          <Text size="text2xl" as="p" className="text-[1.50rem] font-normal text-gray-400 line-through">
            Rs 1500
          </Text>
        </div>
      </div>
    </div>
  );
}
