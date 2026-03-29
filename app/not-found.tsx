import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-xl px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-[#0B0F14]">Project not found</h1>
        <p className="mt-3 text-gray-600">The project URL does not exist.</p>
        <div className="mt-6 flex flex-col gap-4">
          <Link
            href="/projects"
            className="inline-block font-medium text-teal-700 underline hover:text-teal-800"
          >
            Back to projects
          </Link>
          <Link
            href="/"
            className="inline-block font-medium text-teal-700 underline hover:text-teal-800"
          >
            Back home
          </Link>
        </div>
      </main>
    </div>
  );
}
