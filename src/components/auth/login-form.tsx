"use client";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username must required!",
  }),
  password: z.string().min(1, {
    message: "Password must required!",
  }),
});

type formSchemaType = z.infer<typeof formSchema>;

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || DEFAULT_LOGIN_REDIRECT;
  const router = useRouter();
  const [error, setError] = useState<string | undefined>(undefined);

  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setError(undefined);
    }, 5000);

    return () => clearTimeout(timeOut);
  }, [error]);

  const onSubmit = async (values: formSchemaType) => {
    const response = await signIn("credentials", {
      ...values,
      redirect: false,
    });
    if (!response) {
      setError("Something went wrong");
      return;
    }
    if (!!response.error) {
      setError("Invalid Credentials");
    } else {
      router.push(callbackUrl);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
      <label htmlFor="UserName" className="text-white text-[15px] font-medium">
        Username
      </label>
      <input
        id="UserName"
        type="text"
        className="input input-bordered input-primary w-[350px] h-[55px] bg-[#134046] p-3 text-white"
        {...form.register("username")}
      />
      <br />
      <label htmlFor="Password" className="text-white text-[15px] font-medium">
        Password
      </label>
      <input
        id="Password"
        type="password"
        className="input input-bordered input-primary w-[350px] h-[55px] bg-[#134046] text-white p-3"
        {...form.register("password")}
      />
      <br />
      <br />
      <button
        disabled={form.formState.isSubmitting}
        type="submit"
        className="w-[350px] h-[55px] bg-[#0c282b] text-white text-[24px] font-medium"
      >
        Log In
      </button>
      {form.formState.isSubmitted && error && (
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
      {form.formState.isSubmitted && form.formState.errors && (
        <>
          {form.formState.errors.root && (
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="flex flex-col">
                <span>{form.formState.errors.root?.message}</span>
              </div>
            </div>
          )}
          {form.formState.errors.username && (
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="flex flex-col">
                <span>{form.formState.errors.username?.message}</span>
              </div>
            </div>
          )}
          {form.formState.errors.password && (
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="flex flex-col">
                <span>{form.formState.errors.password?.message}</span>
              </div>
            </div>
          )}
        </>
      )}
    </form>
  );
}
