import { TopNav } from "@/components/TopNav";
import { SocialRail } from "@/components/SocialRail";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <TopNav />
      <SocialRail />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-2/3 rounded bg-gray-200"></div>
          <div className="h-4 w-full rounded bg-gray-200"></div>
          <div className="h-4 w-5/6 rounded bg-gray-200"></div>
          
          <div className="pt-8 space-y-3">
            <div className="h-4 w-1/3 rounded bg-gray-200"></div>
            <div className="h-4 w-1/2 rounded bg-gray-200"></div>
            <div className="h-4 w-1/3 rounded bg-gray-200"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
