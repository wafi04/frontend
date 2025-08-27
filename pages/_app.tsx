import DashboardLayout from "@/features/dashboard/components/dashboardLayout";
import { AuthInitProvider } from "@/providers/AuthProvider";
import { ReactQueryProvider } from "@/providers/reactQuery";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const isDashboardPage = router.pathname.startsWith("/dashboard");

  if (isDashboardPage) {
    return (
      <ReactQueryProvider>
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      </ReactQueryProvider>
    );
  }

  return (
    <ReactQueryProvider>
      <AuthInitProvider>
        <Component {...pageProps} />
      </AuthInitProvider>
    </ReactQueryProvider>
  );
}
