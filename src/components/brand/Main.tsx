"use client";

import Image from "next/image";
import Link from "next/link";

import { BrandProps, BrandSize } from "./types";

interface BrandLetter {
  char: string;
  tone: "foreground" | "accent";
  isWordStart?: boolean;
}

const LETTERS: BrandLetter[] = [
  { char: "G", tone: "foreground" },
  { char: "O", tone: "foreground" },
  { char: "A", tone: "accent", isWordStart: true },
  { char: "R", tone: "accent" },
  { char: "C", tone: "accent" },
  { char: "H", tone: "accent" },
];

const toneClass: Record<BrandLetter["tone"], string> = {
  foreground: "text-foreground",
  accent: "text-accent",
};

const sizeMap: Record<BrandSize, { text: string; logo: string; gap: string }> =
  {
    sm: { text: "text-base sm:text-lg", logo: "h-7", gap: "gap-2" },
    md: {
      text: "text-base sm:text-lg lg:text-xl",
      logo: "h-8",
      gap: "gap-2.5",
    },
    lg: { text: "text-2xl", logo: "h-8", gap: "gap-3" },
  };

const Brand = ({
  size = "md",
  onNavigate,
  className = "",
  priority = false,
}: BrandProps) => {
  const styles = sizeMap[size];

  return (
    <div className={`inline-flex shrink-0 ${className}`}>
      <Link
        href="/"
        onClick={onNavigate}
        aria-label="GO ARCH home"
        className={`inline-flex shrink-0 items-center ${styles.gap}`}
      >
        <div
          className="relative flex items-center animate-[brand-logo-in_0.6s_cubic-bezier(0.22,1,0.36,1)_both]"
          style={{ animationDelay: "0.05s" }}
        >
          <Image
            src="/logo.png"
            alt=""
            width={150}
            height={40}
            className={`${styles.logo} w-auto object-contain`}
            priority={priority}
          />
        </div>

        <span
          aria-label="GO ARCH"
          className={`inline-flex items-baseline gap-[0.02em] font-black uppercase leading-none ${styles.text}`}
        >
          {LETTERS.map((letter, index) => (
            <span
              key={index}
              aria-hidden="true"
              className={`inline-block animate-[brand-letter-in_0.35s_cubic-bezier(0.22,1,0.36,1)_both] ${toneClass[letter.tone]} ${letter.isWordStart ? "ml-[0.15em]" : ""}`}
              style={{ animationDelay: `calc(0.25s + ${index} * 60ms)` }}
            >
              {letter.char}
            </span>
          ))}
        </span>
      </Link>
    </div>
  );
};

export default Brand;
