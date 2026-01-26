import { SocialRail } from "@/components/SocialRail";
import { TopNav } from "@/components/TopNav";

export default function Home() {
  return (
    <div className="min-h-screen scroll-smooth bg-white">
      <TopNav />
      <SocialRail />
      <main className="mx-auto max-w-[1200px] px-6 py-20">
        {/* Page content goes here */}
      </main>
    </div>
  );
}
