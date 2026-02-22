import React from "react";
const Donot = React.lazy(() => import("@/components/charts/Donot"));
const FlowChart = React.lazy(() => import("@/components/charts/FlowChart"));
const Sidebar = React.lazy(() => import("@/components/Sidebar"));
const Header = React.lazy(() => import("@/components/Header"));

const Analytics = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 px-8 my-4">
            <FlowChart />
            <Donot />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
