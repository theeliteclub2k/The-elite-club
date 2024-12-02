"use client";

import {
  Img,
  Heading,
  Text,
  Button,
  Checkbox,
  Input,
  Separator,
} from "@/components/ui/Index";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { useRouter } from "next/navigation";

export default function SIGNUPPage() {
  const router = useRouter();
  const formSchema = z.object({
    firstName: z.string().min(1, {
      message: "Firstname must be at least 1 characters.",
    }),
    lastName: z.string().min(1, {
      message: "Lastname must be at least 1 characters.",
    }),
    phoneNumber: z.string().min(10, {
      message: "Phone number must be at least 10 characters.",
    }),
    checkboxChecked: z
      .boolean()
      .refine(
        (value) => value === true,
        "You must agree to the terms and conditions"
      ),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Make a POST request with the form values
      const result = await fetch("/api/users", {
        // Replace "/api/your-endpoint" with the actual URL
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensures the server knows you're sending JSON
        },
        body: JSON.stringify(values), // Converts the `values` object to a JSON string
      });
      console.log("result", result);

      // Handle the response
      if (!result.ok) {
        throw new Error(`Error: ${result.statusText}`);
      }

      const data = await result.json();
      router.push(`/verify/${data.userId}`);
      console.log("Success:", data);
    } catch (error) {
      console.error("Submission failed:", error);
    }
  }

  return (
    <div className="flex w-full bg-gray-200 md:flex-col">
      <div className="w-full md:px-[1.25rem]">
        <div className="bg-white-a700 p-[2.88rem] md:p-[1.25rem]">
          <div className="mb-[18.50rem] flex flex-col gap-[3.13rem]">
            <Img
              src="img_fashionflow_transparent.svg"
              width={126}
              height={32}
              alt="Fashion Image"
              className="h-[2.00rem] w-[20%] object-contain"
            />
            <div className="flex flex-col items-center gap-[1.50rem]">
              <div className="flex flex-col items-start justify-center gap-[1.88rem] self-stretch">
                <Heading
                  size="heading3xl"
                  as="h1"
                  className="text-[1.63rem] font-semibold text-blue_gray-900_01 md:text-[1.50rem] sm:text-[1.38rem]"
                >
                  Sign up to create your account
                </Heading>
                <div className="flex flex-col gap-[1.50rem] self-stretch">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8"
                    >
                      <div className="flex gap-[1.50rem] self-stretch md:flex-col">
                        <div className="flex w-full flex-col items-start justify-center gap-[0.38rem]">
                          <Text
                            size="textlg"
                            as="p"
                            className="text-[1.13rem] font-medium text-blue_gray-900_01"
                          >
                            First Name
                          </Text>
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    shape="round"
                                    type="text"
                                    placeholder={`First name`}
                                    className="self-stretch rounded-md border border-solid border-blue_gray-100 px-[1.13rem]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex w-full flex-col items-start justify-center gap-[0.38rem]">
                          <Text
                            size="textlg"
                            as="p"
                            className="text-[1.13rem] font-medium text-blue_gray-900_01"
                          >
                            Last Name
                          </Text>
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    shape="round"
                                    type="text"
                                    placeholder={`First name`}
                                    className="self-stretch rounded-md border border-solid border-blue_gray-100 px-[1.13rem]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-center gap-[0.38rem] self-stretch">
                        <Text
                          size="textlg"
                          as="p"
                          className="text-[1.13rem] font-medium text-blue_gray-900_01"
                        >
                          Phone Number
                        </Text>
                        <div className="flex items-center justify-center self-stretch rounded-md border border-solid border-blue_gray-100 bg-white-a700">
                          <div className="flex-shrink-0 items-center justify-center bg-transparent px-[0.88rem]">
                            +91
                          </div>
                          <Separator
                            orientation="vertical"
                            className="h-[1.63rem] w-[0.06rem] bg-gray-200"
                          />
                          <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                              <FormItem className="flex-grow">
                                <FormControl>
                                  <Input
                                    size="xs"
                                    shape="square"
                                    type="tel"
                                    placeholder="Phone Number"
                                    className="w-full border-none px-[0.75rem] text-gray-400 h-[3.63rem]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <FormField
                        control={form.control}
                        rules={{ required: true }}
                        // Reason for the validation failure: The checkbox is not checked by default
                        // and the required validation rule is not satisfied. To fix this, we need
                        // to set the initial value of the checkbox to true or check it programmatically
                        // when the form is submitted.
                        name="checkboxChecked"
                        render={({ field }) => (
                          <FormItem className="flex-grow">
                            <FormControl>
                              <Checkbox
                                label="By signing up I agree  to the Terms & Conditions and Privacy Policy"
                                id="104:2497"
                                className="gap-[0.50rem] pr-[2.13rem] pt-[0.25rem] font-chivo text-[1.00rem] text-blue_gray-600 sm:pr-[1.25rem]"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full max-w-[39.00rem] self-stretch rounded-md px-[2.13rem] sm:px-[1.25rem] bg-black-900_01 text-[1.13rem] text-white-a700"
                      >
                        SIGN UP
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
              <div className="flex flex-wrap gap-[0.38rem]">
                <Text
                  as="p"
                  className="self-end text-[1.00rem] font-normal text-blue_gray-900_01"
                >
                  Already have account?
                </Text>
                <a href="/signin" target="_blank">
                  <Heading
                    size="headingmd"
                    as="h2"
                    className="text-[1.00rem] font-semibold text-blue_gray-900_01"
                  >
                    Sign In
                  </Heading>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:px-[1.25rem]">
        <Img
          src="img_frame_26911_1024x720.png"
          width={720}
          height={1024}
          alt="Featured Image"
          className="h-[64.00rem] w-full object-cover md:h-auto"
        />
      </div>
    </div>
  );
}
