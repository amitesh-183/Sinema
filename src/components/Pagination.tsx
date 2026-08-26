import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const getPageList = (page: number, total: number) => {
  const set = new Set<number>([1, total]);
  for (let i = Math.max(2, page - 2); i <= Math.min(total - 1, page + 2); i++) {
    set.add(i);
  }
  return [...set].sort((a, b) => a - b);
};

const Pagination = ({ page, totalPages, onChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = getPageList(page, totalPages);
  const items: (number | "ellipsis")[] = [];
  pages.forEach((p, i) => {
    if (i > 0 && p - pages[i - 1] > 1) items.push("ellipsis");
    items.push(p);
  });

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2"
    >
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 sm:h-10 sm:w-10"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {items.map((item, i) =>
        item === "ellipsis" ? (
          <span
            key={`e-${i}`}
            className="flex h-9 items-center px-1 text-sm text-muted-foreground sm:h-10"
          >
            …
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onChange(item)}
            aria-current={item === page ? "page" : undefined}
            className={cn(
              "h-9 min-w-9 rounded-full px-2.5 text-sm font-semibold transition-all sm:h-10 sm:min-w-10 sm:px-3",
              item === page
                ? "bg-brand-gradient text-white shadow-lg shadow-pink-500/25"
                : "border border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
            )}
          >
            {item}
          </button>
        )
      )}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 sm:h-10 sm:w-10"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
};

export default Pagination;
