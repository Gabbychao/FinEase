import LoginForm from "@/components/auth/login-form";
import Link from "next/link";
import React, { Suspense } from "react";

export default async function LoginPage() {
  return (
    <div className="w-screen h-screen p-8 flex flex-col">
      <div>
        <h2 className="text-white text-[48px] font-medium">FinEase</h2>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="mb-[100px]">
          <h2 className="text-[#00FFFF] text-[60px] font-medium">Log In</h2>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
        <br />
        <Link className="text-white text-[16px] font-medium" href="/register">
          Don't have an account yet?{" "}
          <span className="underline font-bold">Sign Up</span>
        </Link>
      </div>
    </div>
  );
}
