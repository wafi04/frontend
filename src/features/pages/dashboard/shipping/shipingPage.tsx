"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { LoadingSkeletons } from "@/components/ui/skeleton/CardProductSkeleton";
import { ErrorData } from "@/utils/ErrorData";
import { useGetShippingAddr } from "@/lib/api/user/user-shiipping";
import {
  DialogFormShipping,
  DropdownShipping,
} from "@/components/dialog/user/dialogShipping";

export function ShippingPage() {
  const { data, error, isLoading } = useGetShippingAddr();

  if (isLoading) {
    return <LoadingSkeletons />;
  }

  if (error) {
    return (
      <ErrorData message="Failed to fetch shipping addresses. Please try again later." />
    );
  }

  if (data?.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          No Shipping Addresses Found
        </h2>
        <p className="text-gray-600 mt-2">
          You haven&apos;t added any shipping addresses yet.
        </p>
        <DialogFormShipping />
      </section>
    );
  }

  return (
    <section className="mx-auto ">
      <div className="flex flex-col space-y-4">
        {data?.map((address) => (
          <Card
            key={address.address_id}
            className="shadow-md hover:shadow-lg relative transition-shadow">
            <CardHeader>
              <CardTitle>{address.label || "Unnamed Address"}</CardTitle>
              <CardDescription>
                {address.is_default ? "Default Address" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">
                <strong>Recipient:</strong> {address.recipient_name}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Phone:</strong> {address.recipient_phone}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Address:</strong> {address.full_address}
              </p>
              <p className="text-sm text-gray-700">
                <strong>City:</strong> {address.city}, {address.province},{" "}
                {address.postal_code}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Country:</strong> {address.country}
              </p>
            </CardContent>
            <DropdownShipping data={address} id={address.address_id} />
          </Card>
        ))}
      </div>
    </section>
  );
}
