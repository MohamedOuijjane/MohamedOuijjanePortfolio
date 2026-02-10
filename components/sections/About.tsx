// import Image from "next/image";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-2xl bg-gray-100 lg:order-2">
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <span className="sr-only">Profile Image</span>
            <svg
              className="h-32 w-32"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          {/* <Image
            src="/me.jpg"
            alt="Portrait"
            fill
            className="object-cover"
          /> */}
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
                <span className="h-1.5 w-1.5 rounded-full bg-[#2FAE8A]" />{" "}
                JavaScript (ES6+)
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2FAE8A]" />{" "}
                TypeScript
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2FAE8A]" /> React
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2FAE8A]" />{" "}
                Next.js
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2FAE8A]" />{" "}
                Node.js
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2FAE8A]" />{" "}
                Tailwind CSS
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
