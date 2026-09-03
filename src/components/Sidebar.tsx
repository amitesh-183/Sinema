import { motion } from "motion/react";
import {
  Clapperboard,
  Compass,
  Film,
  LineChart,
  Upload,
  Users,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/", label: "Browse", icon: Compass, match: (p: string) => p === "/" },
  {
    to: "/genres",
    label: "Genres",
    icon: Film,
    match: (p: string) => p.includes("/genres"),
  },
  {
    to: "/upload",
    label: "Your Movies",
    icon: Upload,
    match: (p: string) => p.includes("/upload"),
  },
  {
    to: "/community",
    label: "Community",
    icon: Users,
    match: (p: string) => p.includes("/community"),
  },
  {
    to: "/analytics",
    label: "Analytics",
    icon: LineChart,
    match: (p: string) => p.includes("/analytics"),
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();
  return (
    <aside className="sticky top-0 hidden h-auto min-h-screen border-r border-white/10 bg-card/40 backdrop-blur-sm md:block">
      <div className="flex h-full flex-col gap-2 px-3 py-4">
        <Link
          to="/"
          className="mb-4 flex items-center gap-2 px-2 font-display text-lg font-bold"
        >
          <div className="rounded-xl p-1.5">
            <Clapperboard className="h-5 w-5 text-white" />
          </div>
          Sinema
        </Link>
        <nav className="grid gap-1">
          {LINKS.map(({ to, label, icon: Icon, match }) => {
            const active = match(pathname);
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "text-white"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="sidebar-pill"
                    className="absolute inset-0 rounded-xl bg-brand-gradient/20"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon className="relative z-10 h-4 w-4" />
                <span className="relative z-10">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
