"use client";

import React, { useRef, useState, useEffect, ReactNode } from "react";
import { motion, useMotionValue, animate, AnimationPlaybackControls } from "framer-motion";

export interface InfiniteSliderProps {
  children: ReactNode;
  gap?: number;
  speed?: number;
  speedOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
}

export function InfiniteSlider({
  children,
  gap = 16,
  speed = 100,
  speedOnHover,
  direction = "horizontal",
  reverse = false,
  className = "",
}: InfiniteSliderProps) {
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const translation = useMotionValue(0);
  const [contentDimension, setContentDimension] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  // Measure content dimension with native ResizeObserver
  useEffect(() => {
    if (!contentRef.current) return;

    const updateSize = () => {
      if (!contentRef.current) return;
      const rect = contentRef.current.getBoundingClientRect();
      const measured = direction === "horizontal" ? rect.width : rect.height;
      if (measured > 0) {
        setContentDimension(measured);
      }
    };

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(contentRef.current);

    return () => resizeObserver.disconnect();
  }, [direction, children]);

  useEffect(() => {
    if (contentDimension === 0) return;

    let controls: AnimationPlaybackControls | undefined;
    const contentSize = contentDimension + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    if (isTransitioning) {
      controls = animate(translation, [translation.get(), to], {
        ease: "linear",
        duration: currentSpeed !== 0 ? Math.abs(translation.get() - to) / currentSpeed : 0,
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prev) => prev + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: "linear",
        duration: currentSpeed !== 0 ? contentSize / 2 / currentSpeed : 0,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from);
        },
      });
    }

    return () => controls?.stop();
  }, [
    key,
    translation,
    currentSpeed,
    contentDimension,
    gap,
    isTransitioning,
    direction,
    reverse,
  ]);

  const hoverProps = speedOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentSpeed(speedOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentSpeed(speed);
        },
      }
    : {};

  return (
    <div className={`overflow-hidden relative ${className}`}>
      <motion.div
        className="flex"
        style={{
          ...(direction === "horizontal"
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === "horizontal" ? "row" : "column",
        }}
        ref={contentRef}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
