"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  variant?: string;
  asChild?: boolean;
  colorScheme?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const buttonVariants = cva(
  "w-full flex flex-row items-center justify-center text-center cursor-pointer whitespace-nowrap",
  {
    variants: {
      fill: {
        blue_gray_900_01: "bg-blue_gray-900_01 text-white-a700",
        blue_700: "bg-blue-700 text-white-a700",
        white_A700: "bg-white-a700 text-teal-400",
      },
      size: {
        sm: "h-[1.88rem] px-[0.75rem] text-[0.75rem]",
        lg: "h-[2.50rem] px-[1.50rem] text-[0.88rem]",
        "3xl": "h-[3.13rem] px-[2.13rem] text-[1.00rem]",
      },
      shape: {
        square: "rounded-[0px]",
        round: "rounded-md",
      },
    },
    defaultVariants: {},
  },
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      colorScheme,
      variant = "fill",
      shape,
      size = "3xl",
      children,
      leftIcon,
      rightIcon,
      className,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp className={cn(buttonVariants({ [variant]: colorScheme, size, shape, className }))} ref={ref} {...props}>
        {!!leftIcon && leftIcon}
        {children}
        {!!rightIcon && rightIcon}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
