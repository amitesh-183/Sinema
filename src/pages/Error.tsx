import { useRouteError, Link } from "react-router";
import { motion } from "motion/react";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const Error = () => {
  const error = useRouteError();
  const is404 =
    (error as { status?: number } | null)?.status === 404;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-6 overflow-hidden px-6 text-center">
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-blob absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-pink-600/20 blur-[100px]" />
        <div
          className="animate-blob absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-violet-600/20 blur-[100px]"
          style={{ animationDelay: "-5s" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="font-display text-6xl font-extrabold leading-none sm:text-8xl">
          <span className="text-gradient">4</span>
          <span className="text-white">0</span>
          <span className="text-gradient">4</span>
        </div>
        <p className="mt-4 text-lg font-semibold">
          {is404 ? "Page not found" : "Something went wrong"}
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          {is404
            ? "This scene didn't make the final cut. Let's get you back to the main feature."
            : "The show hit a technical glitch. Refresh or head back home."}
        </p>
        <Link to="/">
          <Button variant="gradient" size="lg" className="mt-6">
            <Home className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Error;
