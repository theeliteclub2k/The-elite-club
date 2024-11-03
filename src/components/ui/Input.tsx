"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  variant?: string;
  colorScheme?: string;
}

interface IconProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const inputVariants = cva("w-full flex items-center justify-center cursor-text text-[1.00rem]", {
  variants: {
    fill: {
      blue_gray_900_0c: "bg-blue_gray-900_0c text-blue_gray-900_01",
      white_A700: "bg-white-a700 text-gray-400",
    },
    size: {
      xs: "h-[1.25rem] px-[0.75rem] text-[1.00rem]",
      sm: "h-[3.25rem] px-[0.75rem] text-[1.00rem]",
      lg: "h-[4.13rem] px-[1.13rem] text-[1.00rem]",
      md: "h-[3.50rem] px-[1.13rem] text-[1.00rem]",
    },
    shape: {
      square: "rounded-[0px]",
      round: "rounded-md",
    },
  },
  defaultVariants: {},
});

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "fill", colorScheme, shape, size = "md", className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ [variant]: colorScheme, size, shape, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

const InputGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={cn("relative flex w-full", className)} {...props} ref={ref}>
        {children}
      </div>
    );
  },
);
InputGroup.displayName = "InputGroup";

const InputLeftElement = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn("absolute aspect-square h-full left-0 justify-center flex items-center", className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  },
);
InputLeftElement.displayName = "InputLeftElement";

const InputRightElement = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn("absolute aspect-square h-full right-0 justify-center flex items-center", className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  },
);
InputRightElement.displayName = "InputRightElement";

export { Input, InputGroup, InputLeftElement, InputRightElement };
