import { useAuthStore } from "@/shared/hooks/authStore";
import { useAuthQuery } from "@/shared/hooks/useAuthQuery";

export default function DashboardPage() {
  const { data } = useAuthQuery();
  console.log(data);
  return <></>;
}
