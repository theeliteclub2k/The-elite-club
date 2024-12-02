import OTPModal from "@/components/OTPModal";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  console.log("id", id);

  return <OTPModal id={id} />;
};

export default page;
