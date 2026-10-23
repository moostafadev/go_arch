"use client";

import { LazyMotion } from "framer-motion";

import { MotionProviderProps } from "./types";

const loadFeatures = () =>
  import("framer-motion").then((mod) => mod.domAnimation);

export const MotionProvider = ({ children }: MotionProviderProps) => {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
};
