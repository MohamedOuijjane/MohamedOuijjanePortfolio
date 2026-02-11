export function Services() {
  const services = [
    {
      title: "Web Development",
      description:
        "Building fast, responsive, and accessible websites using modern frameworks like React and Next.js.",
      icon: (
        <svg
          className="h-8 w-8 text-teal-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
    },
    {
      title: "Backend Solutions",
      description:
        "Designing robust APIs and database architectures that scale with your business needs.",
      icon: (
        <svg
          className="h-8 w-8 text-teal-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
          />
        </svg>
      ),
    },
    {
      title: "UI/UX Design",
      description:
        "Creating intuitive and aesthetically pleasing interfaces that drive user engagement.",
      icon: (
        <svg
          className="h-8 w-8 text-teal-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      ),
    },
  ];

  return (
    <section id="services" className="scroll-mt-24 py-20">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-[#0B0F14] md:text-4xl">
          What I Do
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-gray-600">
          I help businesses and individuals bring their ideas to life with
          high-quality technical solutions.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.title}
            className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:border-teal-700/20 hover:shadow-md"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-teal-700/10">
              {service.icon}
            </div>
            <h3 className="mb-3 text-xl font-bold text-[#0B0F14]">
              {service.title}
            </h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
