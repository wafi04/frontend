import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import { Skeleton } from "../skeleton";
import { DialogFormProfile } from "@/components/dialog/user/dialog-form-profile";

export const Formprofileskeleton = () => {
  return (
    <section className="w-full py-8">
      <Card>
        <CardHeader>
          <CardTitle>Loading Profile...</CardTitle>
          <CardDescription>
            We are fetching your profile details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
    </section>
  );
};
export const FormprofileError = () => {
  return (
    <section className="w-full py-8">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load profile details. Please try again later.
        </AlertDescription>
      </Alert>
    </section>
  );
};

export const FormProfileDataNotFound = () => {
  return (
    <section className="w-full py-8 flex flex-col items-center justify-center space-y-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle>Complete Your Personal Information</CardTitle>
          <CardDescription>
            It looks like you haven&apos;t completed your profile yet.
            Let&apos;s get started!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DialogFormProfile />
        </CardContent>
      </Card>
    </section>
  );
};
