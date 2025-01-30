"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { PropsAuth } from "@/types/auth";
import { PasswordInput } from "@/components/ui/PasswordInput";

export default function Auth({
  fields,
  step,
  onSubmit,
  image,
  isLoading,
}: PropsAuth) {
  return (
    <div className="relative h-screen text-white w-full overflow-hidden">
      <Image
        src={image}
        alt="Login background"
        width={500}
        height={500}
        className="absolute inset-0 w-full h-full object-cover brightness-75"
      />
      <div className="relative w-full justify-center h-full flex items-center">
        <Card className="w-full shadow-xl max-w-md p-8 bg-white/10 backdrop-blur-sm border-none">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-3xl font-bold">
              {step === "signin" ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <p className="text-sm text-gray-400">
              {step === "signin"
                ? "Please sign in to your account"
                : "Please sign up for an account"}
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-3" onSubmit={onSubmit}>
              {fields.map(
                ({
                  id,
                  name,
                  onChange,
                  placeholder,

                  value,
                  isPassword,
                  type,
                  label,
                  error,
                }) => (
                  <div className="space-y-2" key={id}>
                    <label
                      htmlFor={name}
                      className="text-sm font-medium text-white">
                      {label}
                    </label>
                    {isPassword ? (
                      <PasswordInput
                        id={id}
                        type={type}
                        value={value}
                        {...onChange}
                        placeholder={placeholder}
                        className={cn(
                          "  text-white",
                          error && "border-red-500 focus:ring-red-500"
                        )}
                      />
                    ) : (
                      <div className="relative">
                        <Input
                          id={id}
                          type={type}
                          value={value}
                          {...onChange}
                          placeholder={placeholder}
                          className={cn(
                            "text-white placeholder:pl-2",
                            error && "border-red-500 focus:ring-red-500"
                          )}
                        />
                      </div>
                    )}
                    {error && (
                      <p className="text-sm text-red-500 mt-1">{error}</p>
                    )}
                  </div>
                )
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>
                      {step === "signin" ? "Signing In..." : "Signing Up..."}
                    </span>
                  </div>
                ) : step === "signin" ? (
                  "Sign In"
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center">
            <p className="text-sm text-gray-400">
              {step === "signin" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/auth/register"
                    className="text-blue-400 hover:underline">
                    Sign up
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="text-blue-400 hover:underline">
                    Sign in
                  </Link>
                </>
              )}
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
