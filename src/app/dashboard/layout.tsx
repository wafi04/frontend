import Sidebar from "@/components/layout/sidebar/SidebarDashboard";
import { AuthProvider } from "@/providers/AuthProvider";
import { WithChildren } from "@/types/interfaces";

export default function LayoutDashbaord({ children }: WithChildren) {
  return (
    <AuthProvider>
      <Sidebar>{children}</Sidebar>
    </AuthProvider>
  );
}
