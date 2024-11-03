import React from "react";

const sizes = {
  texts: "text-[0.94rem] font-medium",
  textxl: "text-[1.25rem] font-medium",
  headings: "text-[0.88rem] font-semibold",
  headingmd: "text-[1.00rem] font-bold",
  headinglg: "text-[1.13rem] font-semibold",
  headingxl: "text-[1.38rem] font-semibold",
  heading2xl: "text-[1.50rem] font-bold md:text-[1.38rem]",
  heading3xl: "text-[1.63rem] font-semibold md:text-[1.50rem] sm:text-[1.38rem]",
  heading4xl: "text-[1.88rem] font-semibold md:text-[1.75rem] sm:text-[1.63rem]",
  heading5xl: "text-[2.88rem] font-bold md:text-[2.63rem] sm:text-[2.25rem]",
};

export type HeadingProps = Partial<{
  className: string;
  as: any;
  size: keyof typeof sizes;
}> &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

const Heading: React.FC<React.PropsWithChildren<HeadingProps>> = ({
  children,
  className = "",
  size = "headinglg",
  as,
  ...restProps
}) => {
  const Component = as || "h6";

  return (
    <Component className={`text-blue_gray-900_01 font-inter ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Heading };
