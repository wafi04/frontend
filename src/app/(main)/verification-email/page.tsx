import { VerificationEmail } from "@/features/pages/verification-email/verificaiton-email";
import { LayoutsWithHeaderAndFooter } from "@/providers/NavbarAndFooter";

export default function Page() {
  return (
    <LayoutsWithHeaderAndFooter className="flex justify-center items-center w-full h-screen">
      <VerificationEmail />
    </LayoutsWithHeaderAndFooter>
  );
}
