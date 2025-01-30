"use client";
import { useForm } from "react-hook-form";
import { InitialDataLogin } from "@/schema/auth";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { BACKEND_URL } from "@/constants";
import { useLoginMutation } from "@/lib/api/auth/api";

export function LoginPage() {
  const { mutate, isPending } = useLoginMutation();
  console.log(BACKEND_URL)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InitialDataLogin>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: InitialDataLogin) => {
    mutate(data);
  };

  return (
    <div className="relative h-screen text-white w-full overflow-hidden">
      <Image
        src="/image1.avif"
        alt="Login background"
        width={500}
        height={500}
        className="absolute inset-0 w-full h-full object-cover brightness-75"
      />
      <div className="relative w-full justify-center h-full flex items-center">
        <Card className="w-full shadow-xl max-w-md p-8 bg-white/10 backdrop-blur-sm border-none">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
            <p className="text-sm text-gray-400">
              Please sign up for an account
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className={cn(
                  "text-white placeholder:pl-2",
                  errors && "border-red-500 focus:ring-red-500"
                )}
              />

              <PasswordInput
                {...register("password")}
                placeholder="Enter Your Password"
                className={cn(
                  "text-white placeholder:pl-2",
                  errors && "border-red-500 focus:ring-red-500"
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "loading...." : "Sign in"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center">
            <p className="text-sm text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="text-blue-400 hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
