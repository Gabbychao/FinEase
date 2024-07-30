"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as z from "zod";
import { addUser } from "@/actions/auth/user.action";
import { useToast } from "@/components/ui/use-toast";

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
  .regex(/[0-9]/, "Password must contain at least one number");

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function RegisterForm() {
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: FormSchemaType) => {
    const result = await addUser({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    });
    if (result.error) {
      setError(result.message);
      form.setError("email", {
        type: "manual",
        message: "Email already exists",
      });
      return;
    }
    router.push("/login");
    toast({
      description: "Successfully Created!",
    });
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input
                id="first-name"
                required
                {...form.register("firstName")}
              />
              {form.formState.errors.firstName && (
                <p className="text-red-500">
                  {form.formState.errors.firstName?.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input
                id="last-name"
                required
                {...form.register("lastName")}
              />
              {form.formState.errors.lastName && (
                <p className="text-red-500">
                  {form.formState.errors.lastName?.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-red-500">
                {form.formState.errors.email?.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-red-500">
                {form.formState.errors.password?.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              required
              {...form.register("confirmPassword")}
            />
            {form.formState.errors.confirmPassword && (
              <p className="text-red-500">
                {form.formState.errors.confirmPassword?.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Create an account
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
