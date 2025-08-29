import { PaginationResponse } from "@/shared/types/response";
import { Button } from "../ui/button";

export const PaginationComponents = ({
  pagination,
}: {
  pagination: PaginationResponse;
}) => {
  return (
    <div className="flex items-center justify-between space-x-2 py-4">
      <div className="text-sm text-muted-foreground">
        Showing {pagination.currentPage} to {pagination.itemsPerPage} of
        {" " + pagination.totalItems} data
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          disabled={pagination.currentPage <= 1}
        >
          Previous
        </Button>
        <div className="flex items-center space-x-1">
          {Array.from(
            { length: Math.min(5, pagination.totalPages) },
            (_, i) => {
              const pageNum = i + 1;
              return (
                <Button
                  key={pageNum}
                  variant={
                    pageNum === pagination.currentPage ? "default" : "outline"
                  }
                  size="sm"
                  className="w-8 h-8 p-0"
                >
                  {pageNum}
                </Button>
              );
            }
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          disabled={pagination.currentPage >= pagination.totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
