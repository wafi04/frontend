"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/ui/useravatar";
import { useAuth } from "@/hooks/auth/userAuthStore";
import { FormatTimestamp } from "@/utils/Format";
import { Mail, User, Calendar, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export function ProfilePage() {
  const { user } = useAuth();
  const { push } = useRouter();

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-xl">
      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        <div className="flex flex-col items-center space-y-4">
          <UserAvatar
            avatarUrl={user?.picture}
            size={180}
            className="border-4 border-primary/20 shadow-2xl ring-4 ring-primary/10"
          />
          <Badge variant="default" className="text-sm ">
            {user?.role || "User"}
          </Badge>
        </div>

        <div className="space-y-4">
          <ProfileDetailItem
            icon={<User className="w-6 h-6 text-primary" />}
            label="Full Name"
            value={user?.name}
          />

          <ProfileDetailItem
            icon={<Mail className="w-6 h-6 text-primary" />}
            label="Email"
            value={user?.email}
            renderRight={() => (
              <Badge
                variant={user?.is_email_verified ? "default" : "destructive"}
                className="ml-2">
                {user?.is_email_verified ? "Verified" : "Unverified"}
              </Badge>
            )}
          />

          <ProfileDetailItem
            icon={<Calendar className="w-6 h-6 text-primary" />}
            label="Account Created"
            value={FormatTimestamp(user?.created_at as number)}
          />

          <ProfileDetailItem
            icon={<Lock className="w-6 h-6 text-primary" />}
            label="Last Login"
            value={FormatTimestamp(user?.last_login_at as number)}
          />

          {!user?.is_email_verified && (
            <div className="mt-4">
              <Button
                onClick={() => push(`/verification-email`)}
                variant="outline"
                className="w-full">
                Verify Email Now
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfileDetailItem({
  icon,
  label,
  value,
  renderRight,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | number;
  renderRight?: () => React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg shadow-sm">
      <div className="flex items-center space-x-4">
        {icon}
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <h2 className="text-sm font-semibold">{value || "N/A"}</h2>
        </div>
      </div>
      {renderRight && renderRight()}
    </div>
  );
}
