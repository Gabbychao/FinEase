"use client";
import { addUser } from "@/actions/user.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const userSchema = z
  .object({
    username: z.string().min(1, {
      message: "Username of user must required!",
    }),
    password: z.string().min(1, {
      message: "Password of user must required!",
    }),
    confirmPassword: z.string(),
    mobileNumber: z.string().min(1, {
      message: "Mobile number of user must required!",
    }),
    email: z
      .string()
      .min(1, {
        message: "Sponsor of member must required!",
      })
      .email("This is not a valid email."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type formSchemaType = z.infer<typeof userSchema>;

export default function RegisterForm() {
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();

  const form = useForm<formSchemaType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      mobileNumber: "",
    },
  });

  const onSubmit = async (values: formSchemaType) => {
    const result = await addUser({
      username: values.username,
      password: values.password,
      email: values.email,
      mobileNumber: values.mobileNumber,
    });
    if (result.error) {
      setError(result.message);
      return;
    }
    router.push("/login");
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-[350px] md:w-[450px] md:justify-start md:items-start">
      {/* ari ko last */}
      <div className="flex gap-[10px] justify-start">
        <div className="flex flex-col">
          <label
            htmlFor="Firstname"
            className="text-white text-[15px] font-medium text-left"
          >
            First Name
          </label>
          <input
            id="Firstname"
            type="text"
            placeholder="e.g., John"
            className="input input-bordered input-primary w-[180px] md:w-[220px] h-[55px] bg-[#134046] p-3 text-white mb-3"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="Lastname"
            className="text-white text-[15px] font-medium"
          >
            Last Name
          </label>
          <input
            id="Lastname"
            type="text"
            placeholder="e.g., Doe"
            className="input input-bordered input-primary w-[180px] md:w-[220px] h-[55px] bg-[#134046] p-3 text-white mb-3"
          />
        </div>
      </div>
      <label htmlFor="Username" className="text-white text-[15px] font-medium">
        Username
      </label>
      <input
        id="Username"
        type="text"
        placeholder="e.g., johndoe123"
        className="input input-bordered input-primary w-[370px] md:w-[450px] h-[55px] bg-[#134046] p-3 text-white mb-3"
        {...form.register("username")}
      />
      <label htmlFor="Email" className="text-white text-[15px] font-medium">
        Email Address
      </label>
      <input
        id="Email"
        type="email"
        placeholder="e.g., john.doe@example.com"
        className="input input-bordered input-primary w-[370px] md:w-[450px] h-[55px] bg-[#134046] p-3 text-white mb-3"
        {...form.register("email")}
      />
      <label
        htmlFor="ContactNumber"
        className="text-white text-[15px] font-medium"
      >
        Contact Number
      </label>
      <input
        id="ContactNumber"
        type="text"
        placeholder="e.g., +63 238 123 4567"
        className="input input-bordered input-primary w-[370px] md:w-[450px] h-[55px] bg-[#134046] p-3 text-white mb-3"
        {...form.register("mobileNumber")}
      />
      <div className="w-[450px] flex gap-[10px]">
        <div className="flex flex-col">
          <label
            htmlFor="Password"
            className="text-white text-[15px] font-medium"
          >
            Password
          </label>
          <input
            id="Password"
            type="password"
            placeholder="e.g., P@ssw0rd123"
            className="input input-bordered input-primary w-[180px] md:w-[220px] h-[55px] bg-[#134046] p-3 text-white mb-3"
            {...form.register("password")}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="ConfirmPassword"
            className="text-white text-[15px] font-medium"
          >
            Confirm Password
          </label>
          <input
            id="ConfirmPassword"
            type="password"
            placeholder="e.g., P@ssw0rd123"
            className="input input-bordered input-primary w-[180px] md:w-[220px] h-[55px] bg-[#134046] p-3 text-white"
            {...form.register("confirmPassword")}
          />
        </div>
      </div>
      <br />
      <br />
      <div className="w-[350px] md:w-[450px] flex justify-center items-center">
        <button
          disabled={form.formState.isSubmitting}
          type="submit"
          className="w-[300px] md:w-[350px] h-[55px] bg-[#0c282b] text-white text-[24px] font-medium"
        >
          Sign Up
        </button>
      </div>
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
          {form.formState.errors.confirmPassword && (
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
                <span>{form.formState.errors.confirmPassword?.message}</span>
              </div>
            </div>
          )}
          {form.formState.errors.email && (
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
                <span>{form.formState.errors.email?.message}</span>
              </div>
            </div>
          )}
          {form.formState.errors.mobileNumber && (
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
                <span>{form.formState.errors.mobileNumber?.message}</span>
              </div>
            </div>
          )}
        </>
      )}
    </form>
  );
}
