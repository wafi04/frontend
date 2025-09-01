import { Input } from "@/components/ui/input";

interface FilterDashboardProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  currentLimit: number;
  setCurrentLimit: (value: number) => void;
}

export function FilterDashboard({
  searchTerm,
  setSearchTerm,
  currentLimit,
  setCurrentLimit,
}: FilterDashboardProps): JSX.Element {
  return (
    <>
      <div className="flex items-center gap-4">
        <Input
          type="text"
          placeholder="Cari...."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Input
          type="number"
          placeholder="Limit per page..."
          value={currentLimit}
          min={1}
          max={100}
          onChange={(e) => {
            const value = e.target.value;

            // Handle empty input
            if (value === "") {
              setCurrentLimit(10); // default value
              return;
            }

            const numValue = Number(value);
            // Validate range
            if (numValue >= 1 && numValue <= 100) {
              setCurrentLimit(numValue);
            }
          }}
          className="w-32"
        />
      </div>
    </>
  );
}
