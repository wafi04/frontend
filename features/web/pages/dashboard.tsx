import { HeaderDashboard } from "@/features/dashboard/components/headerDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormWebSettings } from "../components/form";
export default function DashboardSettings() {
  return (
    <main className="w-full p-6">
      <HeaderDashboard title="Dashboard Settings" />
      <section className="w-full mt-4">     
      <Tabs defaultValue="websettings">
        <TabsList className="">
          <TabsTrigger value="websettings">websettings</TabsTrigger>
          <TabsTrigger value="seosettings">Seo Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="websettings">
            <FormWebSettings />
        </TabsContent>
        <TabsContent value="seosettings"></TabsContent>
      </Tabs>
      </section>
    </main>
  );
}
