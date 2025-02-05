import { Form } from "@/components/ui/form";
import { ShippingReqType } from "@/schema/shipping";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShippingReqData } from "@/schema/shipping";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  useCreateShippingAddr,
  useUpdateShippingAddr,
} from "@/lib/api/user/user-shiipping";

export function FormShipping({
  update,
  id,
}: {
  update?: ShippingReqType;
  id?: string;
}) {
  const create = useCreateShippingAddr();
  const updatedata = useUpdateShippingAddr(id);
  const form = useForm<ShippingReqType>({
    resolver: zodResolver(ShippingReqData),
    defaultValues: {
      city: update?.city || "",
      country: update?.country || "",
      full_address: update?.full_address || "",
      is_default: update?.is_default || false,
      label: update?.label || "",
      postal_code: update?.postal_code || "",
      province: update?.province || "",
      recipient_name: update?.recipient_name || "",
      recipient_phone: update?.recipient_phone || "",
    },
  });

  const onSubmit = (data: ShippingReqType) => {
    if (update) {
      updatedata.mutate(data);
    } else {
      create.mutate(data);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4 w-full max-w-2xl">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="recipient_name"
              className="block text-sm font-medium">
              Recipient Name
            </Label>
            <Input
              id="recipient_name"
              {...form.register("recipient_name")}
              placeholder="Enter Recipient Name"
            />
            {form.formState.errors.recipient_name && (
              <p className="text-red-500">
                {form.formState.errors.recipient_name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city" className="block text-sm font-medium">
              City
            </Label>
            <Input
              id="city"
              {...form.register("city")}
              placeholder="Enter City"
            />
            {form.formState.errors.city && (
              <p className="text-red-500">
                {form.formState.errors.city.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="province" className="block text-sm font-medium">
              Province
            </Label>
            <Input
              id="province"
              {...form.register("province")}
              placeholder="Enter Province"
            />
            {form.formState.errors.province && (
              <p className="text-red-500">
                {form.formState.errors.province.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="recipient_phone"
              className="block text-sm font-medium">
              Recipient Phone
            </Label>
            <Input
              id="recipient_phone"
              {...form.register("recipient_phone")}
              placeholder="Enter Recipient Phone"
            />
            {form.formState.errors.recipient_phone && (
              <p className="text-red-500">
                {form.formState.errors.recipient_phone.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full_address" className="block text-sm font-medium">
              Full Address
            </Label>
            <Input
              id="full_address"
              {...form.register("full_address")}
              placeholder="Enter Full Address"
            />
            {form.formState.errors.full_address && (
              <p className="text-red-500">
                {form.formState.errors.full_address.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="postal_code" className="block text-sm font-medium">
              Postal Code
            </Label>
            <Input
              id="postal_code"
              {...form.register("postal_code")}
              placeholder="Enter Postal Code"
            />
            {form.formState.errors.postal_code && (
              <p className="text-red-500">
                {form.formState.errors.postal_code.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="country" className="block text-sm font-medium">
              Country
            </Label>
            <Input
              id="country"
              {...form.register("country")}
              placeholder="Enter Country"
            />
            {form.formState.errors.country && (
              <p className="text-red-500">
                {form.formState.errors.country.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="label" className="block text-sm font-medium">
              Label (Optional)
            </Label>
            <Input
              id="label"
              {...form.register("label")}
              placeholder="Enter Label"
            />
            {form.formState.errors.label && (
              <p className="text-red-500">
                {form.formState.errors.label.message}
              </p>
            )}
          </div>
        </div>

        <div className="col-span-2 space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="is_default"
              checked={form.watch("is_default")}
              onCheckedChange={(checked) =>
                form.setValue("is_default", checked)
              }
            />
            <Label htmlFor="is_default" className="text-sm font-medium">
              Default
            </Label>
          </div>

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
