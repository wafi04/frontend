import { useAuthStore } from "@/hooks/authStore";
import { useAuthQuery } from "@/hooks/useAuthQuery";

export default function DashboardPage() {
  const { data } = useAuthQuery();
  console.log(data);
  return <></>;
}
