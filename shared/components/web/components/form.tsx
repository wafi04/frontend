import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Loader2,
  Save,
  Upload,
  Globe,
  Building2,
  Share2,
  MessageCircle,
  Settings,
} from "lucide-react";
import { UpsertWebSettings } from "@/shared/types/websettings";
import { useCreateWebSettings } from "../api/webSettings";

// Validation schema
const webSettingsSchema = z.object({
  website_name: z.string().min(1, "Website name is required"),
  website_tagline: z.string().optional(),
  website_description: z.string().optional(),
  website_keywords: z.string().optional(),
  logo_url: z.string().url("Invalid URL").optional().or(z.literal("")),
  logo_dark_url: z.string().url("Invalid URL").optional().or(z.literal("")),
  favicon_url: z.string().url("Invalid URL").optional().or(z.literal("")),
  business_name: z.string().optional(),
  business_address: z.string().optional(),
  business_phone: z.string().optional(),
  business_email: z
    .string()
    .email("Invalid email")
    .optional()
    .or(z.literal("")),
  business_hours: z.string().optional(),
  url_facebook: z.string().url("Invalid URL").optional().or(z.literal("")),
  url_instagram: z.string().url("Invalid URL").optional().or(z.literal("")),
  url_twitter: z.string().url("Invalid URL").optional().or(z.literal("")),
  url_youtube: z.string().url("Invalid URL").optional().or(z.literal("")),
  url_tiktok: z.string().url("Invalid URL").optional().or(z.literal("")),
  url_whatsapp: z.string().url("Invalid URL").optional().or(z.literal("")),
  whatsapp_number: z.string().optional(),
  whatsapp_message: z.string().optional(),
  url_saluran_whatsapp: z
    .string()
    .url("Invalid URL")
    .optional()
    .or(z.literal("")),
  footer_text: z.string().optional(),
  copyright_text: z.string().optional(),
  show_social_links: z.boolean(),
  show_contact_info: z.boolean(),
});

interface FormWebSettingsProps {
  initialData?: Partial<UpsertWebSettings>;
  isLoading?: boolean;
}

export function FormWebSettings({
  initialData,
  isLoading = false,
}: FormWebSettingsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate } = useCreateWebSettings();
  const form = useForm<UpsertWebSettings>({
    defaultValues: {
      website_name: "",
      website_tagline: "",
      website_description: "",
      website_keywords: "",
      logo_url: "",
      logo_dark_url: "",
      favicon_url: "",
      business_name: "",
      business_address: "",
      business_phone: "",
      business_email: "",
      business_hours: "",
      url_facebook: "",
      url_instagram: "",
      url_twitter: "",
      url_youtube: "",
      url_tiktok: "",
      url_whatsapp: "",
      whatsapp_number: "",
      whatsapp_message: "",
      url_saluran_whatsapp: "",
      footer_text: "",
      copyright_text: "",
      show_social_links: false,
      show_contact_info: false,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData); // ini yang bikin ke-load
    }
  }, [initialData, form]);

  const handleSubmit = async (data: UpsertWebSettings) => {
    try {
      setIsSubmitting(true);
      mutate(data);
    } catch (error) {
      console.error("Failed to submit form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {/* Website Information Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Website Information
            </CardTitle>
            <CardDescription>
              Basic information about your website including name, description,
              and SEO settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Website Name & Tagline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="website_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="My Awesome Website" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website_tagline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website Tagline</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your website's catchy tagline"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Website Description */}
            <FormField
              control={form.control}
              name="website_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your website..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This will be used for SEO meta description
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* SEO Keywords */}
            <FormField
              control={form.control}
              name="website_keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO Keywords</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="keyword1, keyword2, keyword3"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Separate keywords with commas for better SEO
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Visual Assets Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Visual Assets
            </CardTitle>
            <CardDescription>
              Upload or link to your logo, favicon, and other visual elements.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="logo_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo URL</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input
                          placeholder="https://example.com/logo.png"
                          {...field}
                        />
                        <Button type="button" variant="outline" size="icon">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="logo_dark_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dark Mode Logo URL</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input
                          placeholder="https://example.com/logo-dark.png"
                          {...field}
                        />
                        <Button type="button" variant="outline" size="icon">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="favicon_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Favicon URL</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input
                          placeholder="https://example.com/favicon.ico"
                          {...field}
                        />
                        <Button type="button" variant="outline" size="icon">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Business Information Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Business Information
            </CardTitle>
            <CardDescription>
              Your business contact details and operating information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Business Name */}
            <FormField
              control={form.control}
              name="business_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Business Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="business_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="contact@business.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="business_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="business_hours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Hours</FormLabel>
                    <FormControl>
                      <Input placeholder="Mon-Fri 9AM-5PM" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Business Address */}
            <FormField
              control={form.control}
              name="business_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="123 Business Street, City, State, ZIP"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Show Contact Info Toggle */}
            <FormField
              control={form.control}
              name="show_contact_info"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Show Contact Information
                    </FormLabel>
                    <FormDescription>
                      Display business contact information on your website
                    </FormDescription>
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
          </CardContent>
        </Card>

        {/* Social Media Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Social Media Links
            </CardTitle>
            <CardDescription>
              Connect your social media accounts to your website.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="url_facebook"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://facebook.com/yourpage"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="url_instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://instagram.com/yourusername"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="url_twitter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://twitter.com/yourusername"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="url_youtube"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>YouTube URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://youtube.com/c/yourchannel"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="url_tiktok"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>TikTok URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://tiktok.com/@yourusername"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="url_whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://wa.me/1234567890"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Show Social Links Toggle */}
            <FormField
              control={form.control}
              name="show_social_links"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Show Social Media Links
                    </FormLabel>
                    <FormDescription>
                      Display social media links on your website
                    </FormDescription>
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
          </CardContent>
        </Card>

        {/* WhatsApp Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              WhatsApp Integration
            </CardTitle>
            <CardDescription>
              Configure WhatsApp settings for customer communication.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="whatsapp_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1234567890" {...field} />
                    </FormControl>
                    <FormDescription>
                      Include country code (e.g., +62 for Indonesia)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="url_saluran_whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp Channel URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://whatsapp.com/channel/..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="whatsapp_message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default WhatsApp Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Hi! I'm interested in your services..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This message will be pre-filled when users click WhatsApp
                    links
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Footer Settings Section */}
        <Card>
          <CardHeader>
            <CardTitle>Footer Settings</CardTitle>
            <CardDescription>
              Customize your website's footer content and copyright information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="footer_text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Footer Text</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Additional footer information..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="copyright_text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Copyright Text</FormLabel>
                    <FormControl>
                      <Input placeholder="© 2024 Your Company" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="min-w-[140px]"
            size="lg"
          >
            {isSubmitting || isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
