import { lazy, Suspense, type ReactNode } from "react";
import { motion } from "framer-motion";
import { PageLoader } from "@/components/Loader";

const Header = lazy(() => import("@/components/Header"));

interface LegalSection {
  heading: string;
  body: string;
}

interface LegalPageProps {
  badge: string;
  title: string;
  updated: string;
  sections: LegalSection[];
  children?: ReactNode;
}

const LegalPage = ({ badge, title, updated, sections, children }: LegalPageProps) => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Header />
      <main className="mx-auto w-full max-w-3xl px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-3 w-fit rounded-full bg-brand-gradient px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
            {badge}
          </div>
          <h1 className="font-display text-3xl font-extrabold md:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: {updated}</p>
        </motion.div>

        <div className="mt-8 space-y-8">
          {sections.map((section, i) => (
            <motion.section
              key={section.heading}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(0.05 * i, 0.4) }}
            >
              <h2 className="font-display text-lg font-bold">{section.heading}</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {section.body}
              </p>
            </motion.section>
          ))}
          {children}
        </div>
      </main>
    </Suspense>
  );
};

export default LegalPage;
