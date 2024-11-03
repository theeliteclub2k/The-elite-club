import React from "react";

const sizes = {
  textxs: "text-[0.88rem] font-normal not-italic",
  textmd: "text-[1.00rem] font-normal not-italic",
  textlg: "text-[1.13rem] font-normal not-italic",
  text2xl: "text-[1.50rem] font-normal md:text-[1.38rem]",
};

export type TextProps = Partial<{
  className: string;
  as: any;
  size: keyof typeof sizes;
}> &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

const Text: React.FC<React.PropsWithChildren<TextProps>> = ({
  children,
  className = "",
  as,
  size = "textmd",
  ...restProps
}) => {
  const Component = as || "p";

  return (
    <Component className={`text-gray-200 font-inter ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Text };
