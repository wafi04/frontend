import { CheckCircle, Clock } from "lucide-react";

export const StepIndicator = ({ currentStatus }: { currentStatus: string }) => {
  const steps = [
    { id: "PENDING", label: "Menunggu Pembayaran", icon: Clock },
    { id: "PAID", label: "Pembayaran Berhasil", icon: CheckCircle },
    { id: "SUCCESS", label: "Transaksi Selesai", icon: CheckCircle },
  ];

  const getStepStatus = (stepId: string) => {
    if (currentStatus === "FAILED") {
      return stepId === "PENDING" ? "error" : "inactive";
    }

    const currentIndex = steps.findIndex((step) => step.id === currentStatus);
    const stepIndex = steps.findIndex((step) => step.id === stepId);

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "inactive";
  };

  return (
    <div className="w-full max-w-xl mx-auto mb-6">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-10">
          <div
            className={`h-full transition-all duration-500 ${
              currentStatus === "SUCCESS"
                ? "bg-green-500 w-full"
                : currentStatus === "PAID"
                ? "bg-blue-500 w-1/2"
                : currentStatus === "FAILED"
                ? "bg-red-500 w-1/4"
                : "bg-yellow-500 w-0"
            }`}
          />
        </div>

        {steps.map((step) => {
          const status = getStepStatus(step.id);
          const Icon = step.icon;

          return (
            <div key={step.id} className="flex flex-col items-center relative">
              <div
                className={`
                w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                ${
                  status === "completed"
                    ? "bg-green-500 border-green-500 text-white"
                    : status === "current" && currentStatus === "SUCCESS"
                    ? "bg-green-500 border-green-500 text-white"
                    : status === "current" && currentStatus === "PAID"
                    ? "bg-blue-500 border-blue-500 text-white"
                    : status === "current" && currentStatus === "PENDING"
                    ? "bg-yellow-500 border-yellow-500 text-white"
                    : status === "error"
                    ? "bg-red-500 border-red-500 text-white"
                    : "bg-background border-muted-foreground/30 text-muted-foreground"
                }
              `}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span
                className={`
                text-xs mt-2 text-center max-w-20 leading-tight
                ${
                  status === "completed" || status === "current"
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                }
              `}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
