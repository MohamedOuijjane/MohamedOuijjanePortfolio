import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center ${className}`}>
      <div className="relative">
        <Image
          src="/brand/wejan.png"
          alt="Mohamed Ouijjane logo"
          width={120}
          height={32}
          className="h-8 w-auto md:h-10 object-contain"
          priority
        />
      </div>
    </Link>
  );
}
