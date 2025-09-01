// PaginationComponents.tsx
import { PaginationResponse } from "@/shared/types/response";
import { Button } from "../ui/button";

export const PaginationComponents = ({
  pagination,
  onPageChange,
}: {
  pagination: PaginationResponse;
  onPageChange: (page: number) => void;
}) => {
  // Generate page numbers untuk ditampilkan
  const generatePageNumbers = () => {
    const pages = [];
    const totalPages = pagination.totalPages;
    const currentPage = pagination.currentPage;

    if (totalPages <= 5) {
      // Jika total pages <= 5, tampilkan semua
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Logic untuk pagination dengan banyak pages
      if (currentPage <= 3) {
        // Jika di awal
        pages.push(1, 2, 3, 4, 5);
      } else if (currentPage >= totalPages - 2) {
        // Jika di akhir
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Jika di tengah
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex items-center justify-between space-x-2 py-4">
      <div className="text-sm text-muted-foreground">
        Menampilkan {(pagination.currentPage - 1) * pagination.itemsPerPage + 1}{" "}
        -{" "}
        {Math.min(
          pagination.currentPage * pagination.itemsPerPage,
          pagination.totalItems
        )}{" "}
        dari {pagination.totalItems} data
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          disabled={!pagination.hasPrevPage}
          onClick={() => onPageChange(pagination.currentPage - 1)}
        >
          Previous
        </Button>

        <div className="flex items-center space-x-1">
          {/* First page dengan ellipsis jika perlu */}
          {pageNumbers[0] > 1 && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="w-8 h-8 p-0"
                onClick={() => onPageChange(1)}
              >
                1
              </Button>
              {pageNumbers[0] > 2 && (
                <span className="px-2 text-muted-foreground">...</span>
              )}
            </>
          )}

          {/* Page numbers */}
          {pageNumbers.map((pageNum) => (
            <Button
              key={pageNum}
              variant={
                pageNum === pagination.currentPage ? "default" : "outline"
              }
              size="sm"
              className="w-8 h-8 p-0"
              onClick={() => onPageChange(pageNum)}
            >
              {pageNum}
            </Button>
          ))}

          {/* Last page dengan ellipsis jika perlu */}
          {pageNumbers[pageNumbers.length - 1] < pagination.totalPages && (
            <>
              {pageNumbers[pageNumbers.length - 1] <
                pagination.totalPages - 1 && (
                <span className="px-2 text-muted-foreground">...</span>
              )}
              <Button
                variant="outline"
                size="sm"
                className="w-8 h-8 p-0"
                onClick={() => onPageChange(pagination.totalPages)}
              >
                {pagination.totalPages}
              </Button>
            </>
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          disabled={!pagination.hasNextPage}
          onClick={() => onPageChange(pagination.currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
