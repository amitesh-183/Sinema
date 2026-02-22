import React from "react";
const Sidebar = React.lazy(() => import("@/components/Sidebar"));
const Header = React.lazy(() => import("@/components/Header"));


const Community = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        Community
      </div>
    </div>
  );
};

export default Community;
