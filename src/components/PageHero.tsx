import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

interface PageHeroProps {
  badge?: string;
  title: string;
  description?: string;
}

const PageHero = ({ badge, title, description }: PageHeroProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {badge && (
        <div className="mb-3 flex w-fit items-center gap-1.5 rounded-full bg-brand-gradient px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
          <Sparkles className="h-3 w-3" />
          {badge}
        </div>
      )}
      <h1 className="font-display text-2xl font-extrabold sm:text-3xl md:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="mt-2 max-w-lg text-muted-foreground">{description}</p>
      )}
    </motion.div>
  );
};

export default PageHero;
