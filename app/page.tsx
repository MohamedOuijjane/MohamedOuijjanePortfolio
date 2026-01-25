export default function Home() {
  const panel =
    "rounded-3xl border border-white/10 bg-white/[0.035] shadow-lg shadow-black/40 backdrop-blur-md";
  const skeleton = "rounded-md bg-white/5";

  return (
    <main className="portfolio-bg min-h-screen">
      <div className="portfolio-noise pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-20 lg:px-8 lg:pt-20">
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <div className={`lg:col-span-5 ${panel} p-7 sm:p-8`}>
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 shrink-0 rounded-full bg-white/5 ring-1 ring-white/10" />
              <div className="flex-1 space-y-2 pt-1">
                <div className={`${skeleton} h-5 w-48`} />
                <div className={`${skeleton} h-4 w-32`} />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className={`${skeleton} h-4 w-full`} />
              <div className={`${skeleton} h-4 w-11/12`} />
              <div className={`${skeleton} h-4 w-9/12`} />
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="h-11 w-full rounded-full bg-cyan-500/90 shadow-sm shadow-cyan-500/20 sm:w-40" />
              <div className="h-11 w-full rounded-full border border-white/15 bg-white/5 sm:w-40" />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 lg:space-y-8">
            <div className={`${panel} p-6 sm:p-7`}>
              <div className="flex items-center justify-between gap-4">
                <div className={`${skeleton} h-4 w-40`} />
                <div className="h-6 w-10 rounded-full bg-cyan-500/15 ring-1 ring-cyan-400/20" />
              </div>
              <div className="mt-4 space-y-2.5">
                <div className={`${skeleton} h-3.5 w-full`} />
                <div className={`${skeleton} h-3.5 w-10/12`} />
              </div>
            </div>

            <div className={`${panel} p-6 sm:p-7`}>
              <div className="flex items-center justify-between gap-4">
                <div className={`${skeleton} h-4 w-32`} />
                <div className="h-6 w-10 rounded-full bg-cyan-500/15 ring-1 ring-cyan-400/20" />
              </div>
              <div className="mt-4 space-y-2.5">
                <div className={`${skeleton} h-3.5 w-11/12`} />
                <div className={`${skeleton} h-3.5 w-9/12`} />
              </div>
            </div>

            <div className={`${panel} p-6 sm:p-7`}>
              <div className="flex items-center justify-between gap-4">
                <div className={`${skeleton} h-4 w-44`} />
                <div className="h-6 w-10 rounded-full bg-cyan-500/15 ring-1 ring-cyan-400/20" />
              </div>
              <div className="mt-4 space-y-2.5">
                <div className={`${skeleton} h-3.5 w-full`} />
                <div className={`${skeleton} h-3.5 w-8/12`} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
