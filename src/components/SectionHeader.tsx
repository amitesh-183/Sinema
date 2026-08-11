import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  viewAll?: string;
}

const SectionHeader = ({ title, viewAll }: SectionHeaderProps) => {
  return (
    <div className="mb-5 flex items-center justify-between">
      <h2 className="font-display text-xl font-bold capitalize tracking-tight sm:text-2xl">
        <span className="mr-2 inline-block h-5 w-1.5 rounded-full bg-brand-gradient align-middle" />
        {title}
      </h2>
      {viewAll && (
        <Link
          to={viewAll}
          className="group inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-pink-500"
        >
          View All
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
