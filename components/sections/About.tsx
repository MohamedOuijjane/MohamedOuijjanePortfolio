import Image from "next/image";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="group relative aspect-square w-full max-w-md lg:order-2">
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl border-2 border-teal-700/40 transition-all duration-150 ease-out group-hover:translate-x-5 group-hover:translate-y-5 group-hover:border-teal-800/55"
          />
          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-black/10 transition-all duration-150 ease-out group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-lg">
            <Image
              src="/images/about_me_pic.jpeg"
              alt="Portrait of Mohamed Ouijjane"
              fill
              className="object-cover transition-all duration-150 ease-out will-change-transform will-change-opacity group-hover:opacity-0 group-hover:scale-[1.02] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />
            <Image
              src="/images/about_me_pic_2.jpeg"
              alt=""
              aria-hidden="true"
              fill
              className="object-cover opacity-0 transition-all duration-150 ease-out will-change-transform will-change-opacity group-hover:opacity-100 group-hover:scale-[1.02] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col justify-center lg:order-1">
          <h2 className="mb-6 text-3xl font-bold text-[#0B0F14] md:text-4xl">
            About Me
          </h2>
          <div className="space-y-4 text-lg text-gray-600">
            <p>
              Hello! I&apos;m a passionate software engineer with a love for
              building things that live on the internet. My interest in web
              development started back in 2018 when I decided to try editing
              custom Tumblr themes — turns out hacking together HTML & CSS was
              pretty fun!
            </p>
            <p>
              Fast-forward to today, and I&apos;ve had the privilege of working
              at an advertising agency, a start-up, a huge corporation, and a
              student-led design studio. My main focus these days is building
              accessible, inclusive products and digital experiences for a
              variety of clients.
            </p>
            <p>
              Here are a few technologies I&apos;ve been working with recently:
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm font-medium">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-700" />{" "}
                JavaScript (ES6+)
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-700" />{" "}
                TypeScript
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-700" /> React
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-700" />{" "}
                Next.js
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-700" />{" "}
                Node.js
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-700" />{" "}
                Tailwind CSS
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
