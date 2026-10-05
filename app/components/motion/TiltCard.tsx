"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  maxTilt?: number;
}

export default function TiltCard({
  children,
  className = "",
  onClick,
  maxTilt = 6,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [maxTilt, -maxTilt]),
    { stiffness: 260, damping: 25 }
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-maxTilt, maxTilt]),
    { stiffness: 260, damping: 25 }
  );

  const spotlightX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const spotlightY = useTransform(mouseY, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // Extract grid column and row spanning classes so they apply directly to the outer wrapper in CSS Grid
  const gridClasses = className
    .split(" ")
    .filter((cls) => cls.startsWith("col-span-") || cls.startsWith("md:col-span-") || cls.startsWith("lg:col-span-") || cls.startsWith("row-span-") || cls.startsWith("md:row-span-") || cls.startsWith("lg:row-span-"))
    .join(" ");

  const innerClasses = className
    .split(" ")
    .filter((cls) => !cls.startsWith("col-span-") && !cls.startsWith("md:col-span-") && !cls.startsWith("lg:col-span-") && !cls.startsWith("row-span-") && !cls.startsWith("md:row-span-") && !cls.startsWith("lg:row-span-"))
    .join(" ");

  return (
    <div style={{ perspective: "1200px" }} className={`h-full w-full ${gridClasses}`}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={
          shouldReduceMotion
            ? {}
            : {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }
        }
        className={`group relative overflow-hidden rounded-2xl glass-panel h-full transition-all duration-300 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/10 ${innerClasses}`}
      >
        {/* Specular Radial Cursor Glow */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${spotlightX} ${spotlightY}, rgba(6, 182, 212, 0.16), transparent 80%)`,
          }}
        />
        <div style={{ transform: "translateZ(15px)" }} className="relative z-10 w-full h-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
