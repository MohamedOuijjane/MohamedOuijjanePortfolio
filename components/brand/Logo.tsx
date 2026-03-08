import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function Logo({ className = "", onClick }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center ${className}`}
      onClick={onClick}
    >
      <div className="relative">
        <Image
          src="/brand/Wejan.webp"
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
