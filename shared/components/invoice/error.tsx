import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw, XCircle } from "lucide-react";

export function LoadingComponent() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex items-center gap-2">
        <RefreshCw className="w-5 h-5 animate-spin" />
        <span className="text-muted-foreground">Memuat invoice...</span>
      </div>
    </div>
  );
}

export function NonDataInvoice() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 text-center">
          <XCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">
            Invoice Tidak Ditemukan
          </h2>
          <p className="text-muted-foreground">
            Reference ID tidak valid atau sudah expired
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
