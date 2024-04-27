import EditUserDetails from "@/components/manage-account/update-user-form";
import React from "react";

export default function UserDetails() {
  return (
    <div className="p-3">
      <div className="w-full h-[775px] rounded-[10px] bg-[#119fa4] flex flex-col items-center ">
        <div className="w-full text-center ">
          <h2 className="text-black text-[48px] font-medium">
            Manage Account
          </h2>
          <h2 className="text-white text-[35px] mt-5">
            Personal Information
          </h2>
        </div>
        <div className="w-full h-full flex justify-center items-center">
          <EditUserDetails />
        </div>
      </div>
    </div>
  );
}