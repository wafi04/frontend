"use client";
import {
  useEmailVerfication,
  useResendVerificationEmail,
} from "@/lib/api/auth/email";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useRef } from "react";

export function VerificationEmail() {
  const [timer, setTimer] = useState<number>(60);
  const [code, setCode] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const verify = useEmailVerfication();
  const resend = useResendVerificationEmail();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleChange = (value: string, index: number) => {
    const newValue = value.replace(/[^0-9]/g, "");

    const newCode = [...code];
    newCode[index] = newValue;
    setCode(newCode);

    if (newValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const verificationCode = code.join("");
    verify.mutate(verificationCode);
    console.log("Verification Code:", verificationCode);
  };

  return (
    <Card className="max-w-md w-full">
      <CardHeader className="text-center w-full">
        <CardTitle>Verification Email</CardTitle>
        <CardDescription>Verification Your Email</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center w-full space-y-4">
        <div className="flex space-x-2">
          {code.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-xl"
              placeholder="-"
            />
          ))}
        </div>

        <div className="flex justify-center  space-x-1">
          <p className="text-sm text-gray-600 cursor-pointer">
            {timer > 0
              ? `Resend email in ${timer} seconds`
              : "Resend verification email ?"}
          </p>
          {/* {timer === 0 && ( */}
          <p
            onClick={() => {
              setTimer(60);
              resend.mutate();
            }}
            className="text-sm cursor-pointer text-gray-600 underline">
            Resend Email
          </p>
          {/* )} */}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center  space-x-2">
        <Button
          onClick={handleSubmit}
          disabled={code.some((digit) => !digit)}
          className="px-4 py-2 rounded">
          Verify
        </Button>
      </CardFooter>
    </Card>
  );
}
