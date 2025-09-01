import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { Branch } from "@/shared/types/branch";
import { User } from "@/shared/types/user";
import { useGetAllUsername } from "@/features/users/hooks/api";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  status: boolean;
  pic: number;
  domain: string;
  code?: string;
}

interface ApiPayload {
  name: string;
  is_active: boolean;
  pic: number;
  domain: string;
  code?: string;
  parent_branch_id?: number | null;
}

interface FormBranchProps {
  initialData?: Branch | null;
  onSubmit?: (data: ApiPayload, isEdit: boolean) => void;
  isLoading?: boolean;
}

// Schema validation
const formSchema = z.object({
  name: z.string().min(1, "Branch name is required"),
  status: z.boolean(),
  pic: z.number().min(1, "PIC is required"),
  domain: z.string().min(1, "Domain is required"),
  code: z.string().optional(),
});

export default function FormBranch({
  initialData = null,
  onSubmit,
  isLoading = false,
}: FormBranchProps) {
  const isEdit = !!initialData;
  const [searchPIC, setSearchPIC] = useState<string>("");
  const [openPIC, setOpenPIC] = useState(false);

  // Fetch users with search
  const { data: usersData } = useGetAllUsername({
    username: searchPIC || undefined,
  });

  const users: { id: number; username: string }[] = usersData?.data || [];

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      status: true,
      pic: 0,
      domain: "",
      code: "",
    },
  });

  // Reset form when initialData changes (for edit mode)
  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name || "",
        status: initialData.is_active ?? true,
        pic: initialData.pic || 0,
        domain: initialData.domain || "",
        code: initialData.code || "",
      });
    } else {
      form.reset({
        name: "",
        status: true,
        pic: 0,
        domain: "",
        code: "",
      });
    }
  }, [initialData, form]);

  const handleSubmit = (data: FormData): void => {
    const payload: ApiPayload = {
      ...data,
      is_active: data.status,
    };

    delete (payload as any).status;

    onSubmit?.(payload, isEdit);
  };

  // Get selected user for display
  const selectedUser = users.find((user) => user.id === form.watch("pic"));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Branch Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branch Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter branch name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Branch Code */}
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branch Code</FormLabel>
                <FormControl>
                  <Input placeholder="Enter branch code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Domain */}
          <FormField
            control={form.control}
            name="domain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Domain *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter domain" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* PIC (Person in Charge) with Search */}
          <FormField
            control={form.control}
            name="pic"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Person in Charge *</FormLabel>
                <Popover open={openPIC} onOpenChange={setOpenPIC}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openPIC}
                        className="w-full justify-between"
                      >
                        {field.value && selectedUser
                          ? `${selectedUser.username}`
                          : "Select PIC..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search users..."
                        value={searchPIC}
                        onValueChange={(value) => {
                          setSearchPIC(value);
                        }}
                      />
                      <CommandEmpty>No user found.</CommandEmpty>
                      <CommandGroup className="max-h-48 overflow-y-auto">
                        {users.map((user) => (
                          <CommandItem
                            key={user.id}
                            onSelect={() => {
                              field.onChange(user.id);
                              setOpenPIC(false);
                              setSearchPIC("");
                            }}
                            className="cursor-pointer"
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value === user.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {user.username}
                              </span>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Active Status</FormLabel>
                  <div className="text-sm text-gray-600">
                    Enable or disable this branch
                  </div>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {isEdit ? "Updating..." : "Creating..."}
              </>
            ) : isEdit ? (
              "Update Branch"
            ) : (
              "Create Branch"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
