import { HeaderDashboard } from "@/components/layout/header/HeaderDashboard";
import { Button } from "@/components/ui/button";
import { ListSessions } from "@/features/pages/profile/ListSessions";
import { ProfilePage } from "@/features/pages/profile/profile";
import { UserDetailsComponent } from "@/features/pages/profile/userDetails";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <HeaderDashboard title="profile" subTitle="Profile">
        <Link href={"/dashboard/profile/address"}>
          <Button>Manage Address</Button>
        </Link>
      </HeaderDashboard>
      <ProfilePage />
      <UserDetailsComponent />
      <ListSessions />
    </>
  );
}
