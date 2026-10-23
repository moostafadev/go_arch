import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";

import { Badge } from "@/components/badge";
import { PLACEHOLDER_IMAGE } from "@/constants/placeholders";

const line1Words = "Get ready to become".split(" ");
const line2Words = "a Real Architect.".split(" ");
const line2Base = line1Words.length * 40;

interface HeroProps {
  image: string | null;
}

export const Hero = ({ image }: HeroProps) => {
  return (
    <section className="relative flex min-h-[calc(100dvh-4rem)] items-center overflow-hidden border-b border-border bg-background py-12 lg:py-0">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-accent/50 to-transparent" />
        <div className="absolute inset-0 bg-arch-grid-fade" />
        <div className="absolute top-[-20%] left-[20%] h-125 w-125 rounded-full bg-accent/15 blur-[120px] animate-[float-glow_12s_ease-in-out_infinite_alternate]" />
        <div className="absolute bottom-[-10%] right-[10%] h-100 w-100 rounded-full bg-blue-500/10 blur-[100px] animate-[float-glow_15s_ease-in-out_infinite_alternate-reverse]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent" />
      </div>

      <div className="container relative z-10 flex flex-col items-center gap-12 lg:flex-row lg:justify-between lg:gap-8">
        <div className="flex w-full max-w-2xl flex-col gap-6 text-center lg:items-start lg:text-left">
          <Badge delay={50} className="self-center lg:self-start">
            250+ Students Across 20 Countries
          </Badge>

          <h1 className="text-3xl font-black uppercase leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
            {line1Words.map((word, i) => (
              <Fragment key={`l1-${i}`}>
                <span
                  className="inline-block animate-[hero-word-in_0.5s_cubic-bezier(0.22,1,0.36,1)_both]"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  {word}
                </span>
                {i < line1Words.length - 1 && " "}
              </Fragment>
            ))}
            <br />
            {line2Words.map((word, i) => (
              <Fragment key={`l2-${i}`}>
                <span
                  className="inline-block bg-clip-text text-transparent bg-linear-to-r from-accent to-red-400 animate-[hero-word-in_0.5s_cubic-bezier(0.22,1,0.36,1)_both]"
                  style={{ animationDelay: `${line2Base + i * 40}ms` }}
                >
                  {word}
                </span>
                {i < line2Words.length - 1 && " "}
              </Fragment>
            ))}
          </h1>

          <p
            className="max-w-xl self-center text-sm text-foreground-second sm:text-base lg:self-start lg:text-lg animate-[hero-fade-up_0.45s_cubic-bezier(0.22,1,0.36,1)_both]"
            style={{ animationDelay: "0.3s" }}
          >
            The definitive A-Z program in architectural design. Master
            Competition Design, Photoshop, Rhino & Grasshopper through projects
            designed to shape the next generation of architects.
          </p>

          <div
            className="self-center flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4 lg:self-start animate-[hero-fade-up_0.45s_cubic-bezier(0.22,1,0.36,1)_both]"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="w-full sm:w-auto">
              <Link
                href="/courses"
                className="group flex w-full items-center justify-center gap-2 bg-accent px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-accent-hover sm:py-4"
              >
                Get Full Courses
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="w-full sm:w-auto">
              <Link
                href="/contact"
                className="group flex w-full items-center justify-center gap-2 border border-border bg-background/50 backdrop-blur-sm px-8 py-3.5 text-sm font-bold text-foreground transition-all hover:bg-card sm:py-4"
              >
                <MessageCircle className="size-4" />
                Message Us
              </Link>
            </div>
          </div>
        </div>

        <div className="relative w-full max-w-md lg:max-w-none lg:flex-1">
          <div className="absolute -inset-1 bg-linear-to-tr from-accent/30 to-transparent blur-sm" />
          <div className="relative aspect-4/3 w-full overflow-hidden border border-border bg-card sm:aspect-square lg:aspect-4/5 lg:max-h-[75vh]">
            <Image
              src={image || PLACEHOLDER_IMAGE}
              alt="Modern Architectural Design"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover grayscale transition-all duration-700 hover:grayscale-0 hover:scale-105"
              priority
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-background/20" />
          </div>
        </div>
      </div>
    </section>
  );
};
