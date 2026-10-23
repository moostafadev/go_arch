"use client";

import Image from "next/image";
import Link from "next/link";
import { m, type Variants } from "framer-motion";

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

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.05, staggerChildren: 0.15 } },
};

const logoVariants: Variants = {
  hidden: { opacity: 0.55, scale: 0.85, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const lettersWrapperVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 4, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

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
  animateOnView = false,
}: BrandProps) => {
  const styles = sizeMap[size];

  const trigger = animateOnView
    ? ({ whileInView: "visible" } as const)
    : ({ animate: "visible" } as const);

  return (
    <m.div
      variants={containerVariants}
      initial="hidden"
      {...trigger}
      viewport={animateOnView ? { once: true, amount: 0.4 } : undefined}
      className={`inline-flex shrink-0 ${className}`}
    >
      <Link
        href="/"
        onClick={onNavigate}
        aria-label="GO ARCH home"
        className={`inline-flex shrink-0 items-center ${styles.gap}`}
      >
        <m.div variants={logoVariants} className="relative flex items-center">
          <Image
            src="/logo.png"
            alt=""
            width={150}
            height={40}
            className={`${styles.logo} w-auto object-contain`}
            priority={priority}
          />
        </m.div>

        <m.span
          variants={lettersWrapperVariants}
          aria-label="GO ARCH"
          className={`inline-flex items-baseline gap-[0.02em] font-black uppercase leading-none ${styles.text}`}
        >
          {LETTERS.map((letter, index) => (
            <m.span
              key={index}
              aria-hidden="true"
              variants={letterVariants}
              className={`inline-block ${toneClass[letter.tone]} ${letter.isWordStart ? "ml-[0.15em]" : ""}`}
            >
              {letter.char}
            </m.span>
          ))}
        </m.span>
      </Link>
    </m.div>
  );
};

export default Brand;
