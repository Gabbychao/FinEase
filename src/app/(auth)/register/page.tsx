import RegisterForm from "@/components/auth/register-form";
import Link from "next/link";
import { Suspense } from "react";

export default async function LoginPage() {
  return (
    <div className="w-screen h-screen p-8 flex flex-col">
      <div>
        <h2 className="text-white text-[48px] font-medium mb-5">FinEase</h2>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="mb-[20px]">
          <h2 className="text-[#00FFFF] text-[40px] md:text-[60px] font-medium">
            Create Account
          </h2>
        </div>
        <Suspense>
          <RegisterForm />
        </Suspense>
        <br />
        <Link className="text-white text-[16px] font-medium" href="/login">
          Already have an account?{" "}
          <span className="underline font-bold">Log In</span>
        </Link>
      </div>
    </div>
  );
}
