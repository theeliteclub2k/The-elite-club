"use client";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./ui/input-otp";

import { users, client } from "../../appwrite.config";
import { Account, ID } from "node-appwrite";

const OTPModal = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(true);
  const [otp, setOtp] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) {
      const fetchUserPhoneNumber = async () => {
        try {
          const user = await users.get(id); // Get user details using Appwrite SDK
          setUserPhoneNumber(user.phone); // Assuming `phone` is the phone field
        } catch (error) {
          console.error("Failed to fetch user phone number:", error);
        }
      };

      fetchUserPhoneNumber();
    }
  }, [open, id]);

  const handleSendOTP = async () => {
    setIsLoading(true);
    try {
      const account = new Account(client);
      const token = await account.createPhoneToken(ID.unique(), "9845398233");
      const userId = token.userId;
      alert("OTP sent successfully!");
    } catch (error) {
      console.error("Failed to send OTP:", error);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setIsLoading(true);
    try {
      await users.updatePhoneSession(id, otp); // Verifies the OTP
      alert("User verified successfully!");
      setOpen(false); // Close the modal upon successful verification
    } catch (error) {
      console.error("Failed to verify OTP:", error);
      alert("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Enter your OTP
          </AlertDialogTitle>
          <AlertDialogDescription>
            Enter the OTP sent to your phone number to verify your account
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center justify-center">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleVerifyOTP}>
            {isLoading ? "Verifying..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
        <button
          onClick={handleSendOTP}
          disabled={isLoading}
          className="mt-4 text-blue-600 underline"
        >
          Resend OTP
        </button>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OTPModal;
