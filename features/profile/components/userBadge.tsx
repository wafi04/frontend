import { User } from "@/types/user";
import { Badge } from "@/components/ui/badge";

interface CustomUserBadgeProps {
  user: User;
  size?: number;
}

export function CustomUserBadge({ user, size = 40 }: CustomUserBadgeProps) {
  const initial = user.username?.[0]?.toUpperCase() || "?";
  const imageUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    user.username
  )}&radius=50&size=${size * 2}`;

  return (
    <div className="flex items-center gap-3">
      {/* Container untuk gambar atau fallback */}
      <div
        className="relative flex-shrink-0 overflow-hidden rounded-full bg-muted flex items-center justify-center font-semibold text-white"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        {/* Gambar dari DiceBear */}
        <img
          src={imageUrl}
          alt={user.username}
          className="absolute inset-0 w-full h-full object-cover opacity-0"
          onLoad={(e) => {
            (e.target as HTMLImageElement).style.opacity = "1";
          }}
        />
        {/* Fallback: Initial */}
        <span
          className="fallback absolute inset-0 flex items-center justify-center bg-primary text-white"
          style={{ display: "flex" }}
        >
          {initial}
        </span>
      </div>

      {/* Info User */}
      <div>
        <h2 className="text-xl font-bold">{user.username}</h2>
        <p className="text-sm text-muted-foreground">@{user.username}</p>
        <Badge
          variant={user.role_name === "admin" ? "destructive" : "default"}
          className="mt-1"
        >
          {user.role_name}
        </Badge>
      </div>
    </div>
  );
}
