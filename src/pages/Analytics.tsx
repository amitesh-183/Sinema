import { lazy, Suspense } from "react";
import { PageLoader } from "@/components/Loader";
import PageHero from "@/components/PageHero";

const Donot = lazy(() => import("@/components/charts/Donot"));
const FlowChart = lazy(() => import("@/components/charts/FlowChart"));
const Sidebar = lazy(() => import("@/components/Sidebar"));
const Header = lazy(() => import("@/components/Header"));

const Analytics = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]">
        <Sidebar />
        <div className="flex flex-col">
          <Header />
          <main className="flex-1 px-6 py-8">
            <PageHero
              badge="Insights"
              title="Analytics"
              description="Visualize what the world is watching."
            />
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <FlowChart />
              <Donot />
            </div>
          </main>
        </div>
      </div>
    </Suspense>
  );
};

export default Analytics;
