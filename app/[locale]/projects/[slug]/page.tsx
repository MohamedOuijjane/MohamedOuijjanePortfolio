import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { getProjectBySlug, projects } from "@/data/projects";
import { PageShell } from "@/components/PageShell";
import { ArrowLeft, Github, ChevronRight } from "lucide-react";
import { satoshi } from "@/lib/fonts";
import { ProjectHeroCarousel } from "@/components/projects/ProjectHeroCarousel";

interface ProjectPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  projects.forEach((project) => {
    params.push({ locale: "en", slug: project.slugs.en });
    params.push({ locale: "en", slug: project.slugs.fr });
    params.push({ locale: "fr", slug: project.slugs.en });
    params.push({ locale: "fr", slug: project.slugs.fr });
  });

  return params;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const lang = locale as "en" | "fr";
  const t = await getTranslations({ locale, namespace: "projects" });
  const tn = await getTranslations({ locale, namespace: "nav" });

  const projectTitle = project.title[lang];
  const projectSubtitle = project.subtitle?.[lang] || project.summary[lang];

  // Special handling for premium projects
  const isCpuGrid = project.slugs.en === "cpu-grid-traffic";
  const isCopagMdm = project.slugs.en === "copag-mdm";
  const isCertifyEase =
    project.slugs.en === "certifyease-language-exam-platform";
  const isPortfolio = project.slugs.en === "portfolio-website";
  const isPremiumProject =
    isCpuGrid || isCopagMdm || isCertifyEase || isPortfolio;

  return (
    <PageShell>
      <article className={`${satoshi.variable} font-sans`}>
        {/* Navigation Breadcrumb - Default for all projects EXCEPT Premium Ones */}
        {!isPremiumProject && (
          <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-teal-700 transition-colors">
              {tn("home")}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href="/projects"
              className="hover:text-teal-700 transition-colors"
            >
              {tn("projects")}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-gray-900 truncate">
              {projectTitle}
            </span>
          </div>
        )}

        {/* 1. HERO SECTION */}
        <section className="mb-20">
          {isPremiumProject ? (
            /* Special Layout for Premium Projects */
            <div className="flex flex-col gap-12">
              {/* 1. Full Width Carousel/Image at Top */}
              <div className="w-full">
                {isCpuGrid || isCertifyEase || isCopagMdm || isPortfolio ? (
                  <ProjectHeroCarousel slug={project.slugs.en} />
                ) : (
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-gray-200 bg-transparent">
                    {project.cover && (
                      <Image
                        src={project.cover}
                        alt={projectTitle}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1200px) 100vw, 1200px"
                        priority
                      />
                    )}
                  </div>
                )}
              </div>

              {/* 2. Text Content Centered Below */}
              <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-6">
                {/* Breadcrumb (Centered) */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Link
                    href="/"
                    className="hover:text-teal-700 transition-colors"
                  >
                    {tn("home")}
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <Link
                    href="/projects"
                    className="hover:text-teal-700 transition-colors"
                  >
                    {tn("projects")}
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <span className="font-medium text-gray-900 truncate">
                    {projectTitle}
                  </span>
                </div>

                <h1 className="text-4xl font-bold text-black md:text-5xl lg:text-6xl leading-tight">
                  {projectTitle}
                </h1>

                <p className="text-xl text-gray-600 md:text-2xl leading-relaxed max-w-3xl">
                  {projectSubtitle}
                </p>

                {/* Labels */}
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {(project.expandedStack || project.stack).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-teal-50 px-4 py-1.5 text-sm font-medium text-teal-700 border border-teal-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex justify-center mt-6">
                  {project.links.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-3 text-base font-semibold text-gray-700 transition-all hover:bg-black hover:text-white hover:border-black hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <Github className="h-5 w-5" />
                      {t("view_code")}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Standard Layout for Other Projects */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column: Text & Actions */}
              <div className="flex flex-col gap-6">
                <h1 className="text-4xl font-bold text-black md:text-5xl lg:text-6xl leading-tight">
                  {projectTitle}
                </h1>

                <p className="max-w-3xl text-xl text-gray-600 md:text-2xl leading-relaxed">
                  {projectSubtitle}
                </p>

                {/* Labels */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {(project.expandedStack || project.stack).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-teal-50 px-4 py-1.5 text-sm font-medium text-teal-700 border border-teal-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex justify-center mt-8">
                  {project.links.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-3 text-base font-semibold text-gray-700 transition-all hover:bg-black hover:text-white hover:border-black hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <Github className="h-5 w-5" />
                      {t("view_code")}
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Image */}
              <div className="w-full">
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-gray-200 bg-transparent">
                  {project.cover && (
                    <Image
                      src={project.cover}
                      alt={projectTitle}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Content Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-16">
            {/* 2. PROJECT OVERVIEW */}
            {project.fullDescription && (
              <section>
                <h2 className="text-2xl font-bold text-black mb-4">
                  {t("overview")}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {project.fullDescription[lang]}
                </p>
              </section>
            )}

            {/* 3. THE PROBLEM */}
            {project.problem && (
              <section>
                <h2 className="text-2xl font-bold text-black mb-4">
                  {t("problem")}
                </h2>
                <div className="bg-red-50/50 border-l-4 border-red-400 p-6 rounded-r-lg">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {project.problem[lang]}
                  </p>
                </div>
              </section>
            )}

            {/* 4. THE SOLUTION */}
            {project.solution && (
              <section>
                <h2 className="text-2xl font-bold text-black mb-4">
                  {t("solution")}
                </h2>
                <div className="bg-teal-50/50 border-l-4 border-teal-500 p-6 rounded-r-lg">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {project.solution[lang]}
                  </p>
                </div>
              </section>
            )}

            {/* 5. ARCHITECTURE */}
            {project.architecture && (
              <section>
                <h2 className="text-2xl font-bold text-black mb-4">
                  {t("architecture")}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {project.architecture[lang]}
                </p>
              </section>
            )}

            {/* 6. HOW IT WORKS */}
            {project.howItWorks && (
              <section>
                <h2 className="text-2xl font-bold text-black mb-6">
                  {t("how_it_works")}
                </h2>
                <div className="relative border-l border-gray-200 ml-3 space-y-8">
                  {project.howItWorks.map((step, index) => (
                    <div key={index} className="relative pl-8">
                      <span className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-teal-100 ring-4 ring-white">
                        <span className="h-2 w-2 rounded-full bg-teal-600" />
                      </span>
                      <h4 className="text-lg font-medium text-gray-900 mb-1">
                        {t("step")} {index + 1}
                      </h4>
                      <p className="text-gray-600">{step[lang]}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 9. CHALLENGES & ENGINEERING DECISIONS */}
            {project.challenges && (
              <section>
                <h2 className="text-2xl font-bold text-black mb-6">
                  {t("challenges")}
                </h2>
                <div className="grid gap-4">
                  {project.challenges.map((challenge, index) => (
                    <div
                      key={index}
                      className="flex gap-4 items-start p-4 rounded-lg bg-gray-50 border border-gray-100"
                    >
                      <span className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold text-sm">
                        {index + 1}
                      </span>
                      <p className="text-gray-700 pt-1">{challenge[lang]}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-10">
            {/* 7. TECH STACK */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-wider text-sm">
                {t("tech_stack")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {(project.techStackDetailed || project.stack).map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-600 shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* 8. KEY FEATURES */}
            {project.features && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-wider text-sm">
                  {t("features")}
                </h3>
                <ul className="space-y-3">
                  {project.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm text-gray-600"
                    >
                      <svg
                        className="w-5 h-5 text-teal-500 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature[lang]}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 11. LIMITATIONS */}
            {project.limitations && (
              <div>
                <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-wider text-sm">
                  {t("limitations")}
                </h3>
                <ul className="space-y-3">
                  {project.limitations.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm text-gray-500 italic"
                    >
                      <span className="text-gray-400">•</span>
                      {item[lang]}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 12. FUTURE IMPROVEMENTS */}
            {project.futureImprovements && (
              <div>
                <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-wider text-sm">
                  {t("roadmap")}
                </h3>
                <ul className="space-y-3">
                  {project.futureImprovements.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm text-gray-600"
                    >
                      <span className="text-teal-500">→</span>
                      {item[lang]}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* 13. NAVIGATION / FOOTER CTA */}
        <div className="mt-24 pt-10 border-t border-gray-100 flex justify-between items-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t("back_to_projects")}
          </Link>

          {project.links.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              {t("view_on_github")}
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      </article>
    </PageShell>
  );
}
