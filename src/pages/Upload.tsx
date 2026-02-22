import React from "react";
const Header = React.lazy(() => import("@/components/Header"));
const Sidebar = React.lazy(() => import("@/components/Sidebar"));

const Upload = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        Upload
      </div>
    </div>
  );
};

export default Upload;
