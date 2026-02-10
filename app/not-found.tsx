import Link from "next/link";
import { TopNav } from "@/components/TopNav";
import { SocialRail } from "@/components/SocialRail";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <TopNav />
      <SocialRail />
      <main className="mx-auto max-w-xl px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-[#0B0F14]">Project not found</h1>
        <p className="mt-3 text-gray-600">
          The project URL does not exist.
        </p>
        <Link
          href="/projects"
          className="mt-6 inline-block font-medium text-[#2FAE8A] underline hover:text-[#258a6e]"
        >
          Back to projects
        </Link>
      </main>
    </div>
  );
}
