import { AuthProvider } from "@/providers/AuthProvider";
import { WithChildren } from "@/types/interfaces";

export default function Main({ children }: WithChildren) {
  return <AuthProvider>{children}</AuthProvider>;
}
