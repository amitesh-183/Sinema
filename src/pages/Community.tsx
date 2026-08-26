import { lazy, Suspense } from "react";
import { PageLoader } from "@/components/Loader";
import PageHero from "@/components/PageHero";

const Sidebar = lazy(() => import("@/components/Sidebar"));
const Header = lazy(() => import("@/components/Header"));

const Community = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]">
        <Sidebar />
        <div className="flex flex-col">
          <Header />
          <main className="flex-1 px-6 py-8">
            <PageHero
              badge="Fan zone"
              title="Community"
              description="Join the conversation — reviews, watch parties and hot takes are on the way."
            />
          </main>
        </div>
      </div>
    </Suspense>
  );
};

export default Community;
