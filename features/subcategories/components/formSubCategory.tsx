import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { CreateSubCategory } from "@/shared/types/subcategory";
import { useForm } from "react-hook-form";
import { useCreateSubCategory } from "../hooks/api";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormCategories } from "@/features/category/components/form";
import { useGetAllCategoryActive } from "@/features/category/hooks/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";



export function FormSubcategory() {
        const {data : category}  = useGetAllCategoryActive()
    const {mutate,isPending}  = useCreateSubCategory()
  const form = useForm<CreateSubCategory>({
    defaultValues: {
      bannerUrl: "",
      brand: "",
      information: "",
      instruction: "",
      isActive: true,
      categoryType :"1",
      isCheckNickname: false,
      name: "",
      subName: "",
      thumbnail: ""
    }
  });

  function onSubmit(values: CreateSubCategory) {
   mutate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter subcategory name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter sub name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand</FormLabel>
              <FormControl>
                <Input placeholder="Enter brand name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="categoryType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Type</FormLabel>
              <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    category?.data.map((item)  => (
                        <SelectItem value={item.id.toString()} key={item.id}>{item.name}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="information"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Information</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter detailed information about this subcategory"
                  className="resize-none"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="instruction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instruction</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter usage instructions"
                  className="resize-none"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="bannerUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Banner URL</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="https://example.com/banner.jpg" 
                    type="url"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail URL</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="https://example.com/thumbnail.jpg" 
                    type="url"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Active Status</FormLabel>
                  <div className="text-sm text-muted-foreground">
                    Enable or disable this subcategory
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

          <FormField
            control={form.control}
            name="isCheckNickname"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Check Nickname</FormLabel>
                  <div className="text-sm text-muted-foreground">
                    Enable nickname validation for this service
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

        <div className="flex justify-end space-x-4 pt-6">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            Create Subcategory
          </Button>
        </div>
      </form>
    </Form>
  );
}
export function DialogCreateSubCategory() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Sub Categories</DialogTitle>
          <DialogDescription>Manaage all Sub Categories</DialogDescription>
        </DialogHeader>
        <FormSubcategory />
      </DialogContent>
    </Dialog>
  );
}