import { useGetFormFieldsBySubCategory } from "@/features/formFields/api";
import { HeaderOrder } from "@/features/order/components/headerOrder";
import { useOrder } from "@/shared/hooks/formOrder";

export function PlaceholderInput({ subCategoryId }: { subCategoryId: number }) {
  const { setFormData, errors, ...formValues } = useOrder();
  const { data = [] } = useGetFormFieldsBySubCategory(subCategoryId);

  const handleInputChange = (field: string, value: string) => {
    setFormData({ [field]: value });
  };

  return (
    <>
      <HeaderOrder id={1} subName="Masukkan Data Akun" />
      <div className="p-4">
        <div className={`grid grid-cols-${data.length} gap-4`}>
          {data
            .sort((a, b) => a.fieldOrder - b.fieldOrder)
            .map((field) => {
              const fieldValue = (formValues as any)[field.fieldName] || "";
              const fieldError = (errors as any)[field.fieldName];

              return (
                <div key={field.id}>
                  <div className="flex items-center gap-2 pb-2">
                    <label
                      htmlFor={field.fieldName}
                      className="block text-xs font-medium text-foreground"
                    >
                      {field.fieldLabel}
                    </label>
                  </div>

                  <div className="relative flex w-full items-center gap-2">
                    <div className="flex w-full flex-col items-start">
                      {field.fieldType === "select" ? (
                        <select
                          id={field.fieldName}
                          className={`relative block h-9 w-full rounded-lg border px-3 text-xs text-foreground focus:z-10 focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-75 ${
                            fieldError
                              ? "border-destructive focus:border-destructive focus:ring-destructive bg-destructive/5"
                              : "border-border bg-input focus:border-primary focus:ring-primary"
                          }`}
                          value={fieldValue}
                          onChange={(e) =>
                            handleInputChange(field.fieldName, e.target.value)
                          }
                        >
                          <option value="">Pilih {field.fieldLabel}</option>
                          {field.options?.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          className={`relative block h-9 w-full appearance-none rounded-lg border px-3 text-xs text-foreground placeholder-muted-foreground/50 focus:z-10 focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-75 ${
                            fieldError
                              ? "border-destructive focus:border-destructive focus:ring-destructive bg-destructive/5"
                              : "border-border bg-input focus:border-primary focus:ring-primary"
                          }`}
                          type={field.fieldType}
                          id={field.fieldName}
                          placeholder={field.fieldLabel}
                          autoComplete="off"
                          value={fieldValue}
                          onChange={(e) =>
                            handleInputChange(field.fieldName, e.target.value)
                          }
                        />
                      )}

                      {fieldError && (
                        <span className="mt-1 text-xs text-destructive">
                          {fieldError}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
