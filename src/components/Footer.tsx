import { Clapperboard, Github, Instagram, Twitter, Youtube, Linkedin } from "lucide-react";
import { Link } from "react-router";

const COLUMNS: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Movies", to: "/movies" },
      { label: "TV Shows", to: "/tv-series" },
      { label: "Genres", to: "/genres" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms of Service", to: "/terms" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="relative mt-12 border-t border-white/10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pink-500/60 to-transparent" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 sm:gap-10 sm:px-6 sm:py-14 md:grid-cols-4 lg:px-10">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-xl bg-brand-gradient p-1.5">
              <Clapperboard className="h-6 w-6 text-white" />
            </div>
            <span className="font-display text-xl font-bold">
              Sine<span className="text-gradient">ma</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Your all-in-one entertainment hub. Discover, binge and obsess over
            movies &amp; TV — fast.
          </p>
          <div className="mt-6 flex gap-2">
            {[Instagram, Twitter, Youtube, Linkedin, Github].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-pink-500/50 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Get Updates
          </h3>
          <p className="mt-4 text-sm text-muted-foreground">
            Fresh drops &amp; trending picks, straight to your inbox.
          </p>
          <div className="mt-4 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 pl-4">
            <input
              type="email"
              placeholder="you@email.com"
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button
              aria-label="Subscribe"
              className="shrink-0 rounded-full bg-brand-gradient px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              Join
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-muted-foreground sm:py-5">
        © {new Date().getFullYear()} Sinema. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
