import {
  Img,
  Heading,
  Text,
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
  SelectItems,
} from "@/components/ui";
import React from "react";

const dropDownOptions = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];
interface Props {
  className?: string;
  productImage?: string;
  productName?: React.ReactNode;
  sellerInfo?: React.ReactNode;
  currentPrice?: React.ReactNode;
  originalPrice?: React.ReactNode;
  discountOffer?: React.ReactNode;
}

export default function ProductDetails1({
  productImage = "img_rectangle_145_148x118.png",
  productName = "Trendy Black T-shirt",
  sellerInfo = "Sold by:GENUS APPARELS LTD. ",
  currentPrice = "₹584",
  originalPrice = "₹1299.00",
  discountOffer = "(55% OFF)",
  ...props
}: Props) {
  return (
    <div
      {...props}
      className={`${props.className} flex sm:flex-col justify-center items-start p-[0.75rem] border-gray-300 border border-solid flex-1 rounded-md`}
    >
      <div className="flex flex-1">
        <div className="relative h-[9.25rem] w-[18%] content-center sm:h-auto">
          <Img
            src={productImage}
            width={118}
            height={148}
            alt="Product Image"
            className="mx-auto h-[9.25rem] w-full flex-1 object-cover"
          />
          <Img
            src="img_checkmark_blue_gray_900_01.svg"
            width={20}
            height={20}
            alt="Checkmark Icon"
            className="absolute left-[0.50rem] top-[0.50rem] m-auto h-[1.25rem] w-[1.25rem]"
          />
        </div>
        <div className="flex flex-1 flex-col gap-[1.25rem] p-[0.38rem] sm:gap-[1.25rem]">
          <div className="ml-[0.50rem] flex flex-col items-start justify-center gap-[0.38rem] sm:ml-0 sm:gap-[0.38rem]">
            <Heading as="h6" className="text-[1.13rem] font-semibold text-blue_gray-900_01 sm:text-[0.94rem]">
              {productName}
            </Heading>
            <Text size="textxs" as="p" className="text-[0.88rem] font-normal text-blue_gray-200_01">
              {sellerInfo}
            </Text>
          </div>
          <div className="mx-[0.50rem] flex gap-[0.56rem] sm:mx-0">
            <Select name="Size Dropdown">
              <SelectTrigger
                shape="round"
                indicator={
                  <Img
                    src="img_arrowdown_black_900_01.svg"
                    width={16}
                    height={16}
                    alt="Arrow Down"
                    className="h-[1.00rem] w-[1.00rem]"
                  />
                }
                className="w-[18%] gap-[0.63rem] rounded-sm px-[0.38rem] font-semibold"
              >
                <SelectValue placeholder={`Size: XL`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItems options={dropDownOptions} />
              </SelectContent>
            </Select>
            <Select name="Quantity Dropdown">
              <SelectTrigger
                shape="round"
                indicator={
                  <Img
                    src="img_arrowdown_black_900_01.svg"
                    width={16}
                    height={16}
                    alt="Arrow Down"
                    className="h-[1.00rem] w-[1.00rem]"
                  />
                }
                className="w-[14%] gap-[0.63rem] rounded-sm px-[0.38rem] font-semibold"
              >
                <SelectValue placeholder={`Qty: 1`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItems options={dropDownOptions} />
              </SelectContent>
            </Select>
          </div>
          <div className="mx-[0.50rem] flex flex-wrap sm:mx-0">
            <Heading
              size="headingmd"
              as="h6"
              className="text-[1.00rem] font-bold text-blue_gray-900_01 sm:text-[0.81rem]"
            >
              {currentPrice}
            </Heading>
            <Text
              as="p"
              className="ml-[0.50rem] text-[1.00rem] font-normal text-gray-400 line-through sm:text-[0.81rem]"
            >
              {originalPrice}
            </Text>
            <Heading
              size="headingmd"
              as="h6"
              className="ml-[0.50rem] text-[1.00rem] font-bold text-teal-400 sm:text-[0.81rem]"
            >
              {discountOffer}
            </Heading>
          </div>
        </div>
      </div>
      <Img
        src="img_icon_gray_400_01.svg"
        width={24}
        height={24}
        alt="Secondary Icon"
        className="h-[1.50rem] w-[1.50rem]"
      />
    </div>
  );
}
