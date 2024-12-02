import HomepageProductcard from "../../components/HomepageProductcard";
import { Heading } from "@/components/ui/Index";
import React, { Suspense } from "react";

export default function RelatedProductsSection() {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="mx-auto flex w-full max-w-[75.25rem] flex-col gap-[3.00rem] md:px-[1.25rem]">
          <div className="flex flex-col items-start justify-center gap-[0.88rem]">
            <Heading
              as="h2"
              className="text-[1.13rem] font-semibold text-gray-800_01"
            >
              Related Product
            </Heading>
            <Heading
              size="heading4xl"
              as="h3"
              className="text-[1.88rem] font-semibold text-blue_gray-900_01 md:text-[1.75rem] sm:text-[1.63rem]"
            >
              Discover Related Products
            </Heading>
          </div>
          <div className="flex gap-[3.00rem] overflow-x-scroll md:flex-col">
            <Suspense fallback={<div>Loading feed...</div>}>
              {[...Array(3)].map((d, index) => (
                <HomepageProductcard key={"productList" + index} />
              ))}
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
