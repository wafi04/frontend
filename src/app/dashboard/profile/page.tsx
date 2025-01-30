import { HeaderDashboard } from "@/components/layout/header/HeaderDashboard";
import { ListSessions } from "@/features/pages/profile/ListSessions";
import { ProfilePage } from "@/features/pages/profile/profile";

export default function Page() {
  return (
    <>
      <HeaderDashboard title="profile" subTitle="Profile" />
      <ProfilePage />
      <ListSessions />
    </>
  );
}
