import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface HeaderSearchProps {
  title: string;
  count: number;
}

export function HeaderSearch({ count, title }: HeaderSearchProps) {
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerHeight = useRef<number>(0);
  const [spacerHeight, setSpacerHeight] = useState(0);

  useEffect(() => {
    const header = headerRef.current;
    if (header) {
      headerHeight.current = header.offsetHeight;
      setSpacerHeight(headerHeight.current);
    }

    const controlHeader = () => {
      if (!header) return;

      const navbarHeight = 70;
      const scrollPosition = window.scrollY;

      if (scrollPosition > navbarHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", controlHeader);
    window.addEventListener("resize", () => {
      if (header) {
        headerHeight.current = header.offsetHeight;
        setSpacerHeight(headerHeight.current);
      }
    });

    return () => {
      window.removeEventListener("scroll", controlHeader);
      window.removeEventListener("resize", () => {});
    };
  }, []);

  return (
    <>
      {isSticky && <div style={{ height: `${spacerHeight}px` }} />}

      <div
        ref={headerRef}
        className={`bg-white border-b border-gray-200 w-full
          ${
            isSticky
              ? "fixed top-0 left-0 right-0 z-30 shadow-md transform-gpu"
              : "relative"
          }
          transition-all duration-300 ease-in-out`}
      >
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex items-baseline space-x-2">
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              <span className="text-sm text-gray-500">({count})</span>
            </div>
            <Filters />
          </div>
        </div>
      </div>
    </>
  );
}

function Filters() {
  return (
    <div className="flex items-center space-x-4">
      <Button
        variant="outline"
        className="text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        <Filter className="h-4 w-4 mr-2" />
        Filters
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Sort By
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem className="text-sm">Featured</DropdownMenuItem>
          <DropdownMenuItem className="text-sm">Newest</DropdownMenuItem>
          <DropdownMenuItem className="text-sm">
            Price: High-Low
          </DropdownMenuItem>
          <DropdownMenuItem className="text-sm">
            Price: Low-High
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
