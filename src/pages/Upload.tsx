import { lazy, Suspense } from "react";
import { PageLoader } from "@/components/Loader";
import PageHero from "@/components/PageHero";

const Header = lazy(() => import("@/components/Header"));
const Sidebar = lazy(() => import("@/components/Sidebar"));

const Upload = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]">
        <Sidebar />
        <div className="flex flex-col">
          <Header />
          <main className="flex-1 px-6 py-8">
            <PageHero
              badge="Your library"
              title="Your Movies"
              description="Uploads and personal picks are coming soon. This is your future dashboard."
            />
          </main>
        </div>
      </div>
    </Suspense>
  );
};

export default Upload;
