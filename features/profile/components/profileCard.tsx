// components/CardProfile.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { User } from "@/types/user";
import { CustomUserBadge } from "./userBadge";
import { formatDate } from "@/utils/format";

export default function CardProfile({ user }: { user: User }) {
  return (
    <Card className="md:col-span-2">
      <CardHeader className="pb-2">
        <CustomUserBadge user={user} size={64} />
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">Email:</p>
            <p className="font-medium">{user.email}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">Terakhir Aktif :</p>
            <p className="font-medium">{formatDate(user.last_activity)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
