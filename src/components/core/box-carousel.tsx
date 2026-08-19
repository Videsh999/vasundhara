"use client";

// Box Carousel — Originkit
// 3D Cube Carousel with preserve-3d rotation driven by autoplay, drag, or arrow keys.

import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type ValueAnimationOptions,
} from "framer-motion";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type CarouselItemType = "image" | "video";

export type CarouselItem = {
  /** Unique identifier — auto-derived from index if not supplied. */
  id?: string | number;
  type: CarouselItemType;
  /** Framer image-picker value (object with `src`/`srcSet`) or a plain URL. */
  src?: any;
  /** Direct URL override. Wins over `src` when non-empty. */
  srcUrl?: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  /** Video poster image (image picker or URL). */
  poster?: any;
};

export type Direction = "left" | "right" | "top" | "bottom";

export interface BoxCarouselProps {
  /** Carousel items. At least 4 are needed for a proper 4-face cube; missing
   *  faces are padded with cycled placeholders. */
  items?: CarouselItem[];
  /** Rotation direction: left/right (horizontal), top/bottom (vertical). */
  direction?: Direction;
  /** Each face renders at exactly imageWidth × imageHeight (px). */
  imageWidth?: number;
  imageHeight?: number;
  /** Interaction: "autoplay" rotates on its own, "drag" lets the user swipe. */
  animation?: "autoplay" | "drag";
  /** Rotation transition. `duration` = move speed, `delay` = delay before each move starts. */
  ease?: ValueAnimationOptions<number>;
  /** Drag sensitivity (1–10). Only used when `animation` is "drag". */
  dragSensitivity?: number;

  /** Emitted when the current item index changes. */
  onIndexChange?: (index: number) => void;
  /** Full transition override (wins over `ease`). */
  transition?: ValueAnimationOptions<number>;
  /** Full snap transition override. */
  snapTransition?: ValueAnimationOptions<number>;

  /** Container styling override. */
  style?: React.CSSProperties;
  className?: string;
}

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const DEFAULT_EASE: [number, number, number, number] = [
  0.953, 0.001, 0.019, 0.995,
];

const DEFAULT_PLACEHOLDER_URLS = [
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1200",
];

const DEFAULT_ITEMS: CarouselItem[] = DEFAULT_PLACEHOLDER_URLS.map((url, i) => ({
  id: i,
  type: "image" as const,
  srcUrl: url,
  alt: `Vasundhara Atelier Archive ${i + 1}`,
}));

const COMPONENT_DEFAULTS = {
  items: DEFAULT_ITEMS,
  imageWidth: 500,
  imageHeight: 340,
  direction: "right" as Direction,
  animation: "autoplay" as const,
  ease: {
    type: "tween" as const,
    duration: 1.1,
    delay: 2.2,
    ease: [0.44, 0, 0.56, 1] as [number, number, number, number],
  },
  dragSensitivity: 5,
};

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

function resolveImageSrc(input: any): string {
  if (!input) return "";
  if (typeof input === "string") return input;
  if (typeof input === "object" && input.src) return input.src;
  return "";
}

function resolveImageSrcSet(input: any): string | undefined {
  if (input && typeof input === "object" && input.srcSet) return input.srcSet;
  return undefined;
}

function padItems(items: CarouselItem[] | undefined): CarouselItem[] {
  if (!items || items.length === 0) return DEFAULT_ITEMS;
  if (items.length >= 4) return items;
  const padded: CarouselItem[] = [];
  for (let i = 0; i < 4; i++) padded.push(items[i % items.length]);
  return padded;
}

function modIdx(i: number, n: number): number {
  if (n <= 0) return 0;
  return ((i % n) + n) % n;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function BoxCarousel(props: BoxCarouselProps) {
  const resolvedProps = { ...COMPONENT_DEFAULTS, ...props };
  const {
    items: rawItems,
    direction,
    ease,
    animation,
    dragSensitivity,
    imageWidth,
    imageHeight,
    onIndexChange,
    transition: transitionOverride,
    snapTransition: snapTransitionOverride,
    style,
    className = "",
  } = resolvedProps;

  const prefersReducedMotion = useReducedMotion();
  const autoPlay = animation === "autoplay";
  const enableDrag = animation === "drag" || !autoPlay;

  // Padded items
  const items = useMemo(() => padItems(rawItems), [rawItems]);
  const itemCount = items.length;

  // Base rotation transition
  const transition: ValueAnimationOptions<number> = useMemo(
    () =>
      transitionOverride ??
      (prefersReducedMotion
        ? { duration: 0 }
        : (ease ?? {
            duration: 1.1,
            ease: DEFAULT_EASE,
          })),
    [transitionOverride, ease, prefersReducedMotion]
  );

  // Snap-back spring
  const snapTransition: ValueAnimationOptions<number> = useMemo(
    () =>
      snapTransitionOverride ?? {
        type: "spring",
        damping: prefersReducedMotion ? 100 : 30,
        stiffness: prefersReducedMotion ? 1000 : 200,
      },
    [snapTransitionOverride, prefersReducedMotion]
  );

  // Cube dimensions
  const cubeW = Math.max(1, imageWidth ?? 500);
  const cubeH = Math.max(1, imageHeight ?? 340);

  const isHorizontal = direction === "left" || direction === "right";
  const isForward = direction === "left" || direction === "top";

  const depth = isHorizontal ? cubeW : cubeH;
  const halfDepth = depth / 2;

  // Index + rotation state
  const [currentIndex, setCurrentIndexState] = useState(0);
  const currentIndexRef = useRef(0);
  const setCurrentIndex = useCallback((i: number) => {
    currentIndexRef.current = i;
    setCurrentIndexState(i);
  }, []);
  const rotation = useMotionValue(0);

  const frontSlotRef = useRef(0);

  const [faceItems, setFaceItems] = useState<number[]>(() => {
    const n = Math.max(1, itemCount);
    return [0, 1 % n, modIdx(2, n), modIdx(-1, n)];
  });

  const isAnimatingRef = useRef(false);

  const stepDegrees = useMemo(() => {
    if (isHorizontal) {
      return isForward ? -90 : 90;
    }
    return isForward ? 90 : -90;
  }, [isHorizontal, isForward]);

  const advanceFrontSlot = useCallback((deltaDeg: number) => {
    const norm = ((deltaDeg % 360) + 360) % 360;
    if (norm === 90) {
      frontSlotRef.current = (frontSlotRef.current + 3) % 4;
    } else if (norm === 270) {
      frontSlotRef.current = (frontSlotRef.current + 1) % 4;
    } else if (norm === 180) {
      frontSlotRef.current = (frontSlotRef.current + 2) % 4;
    }
  }, []);

  const incomingFrontSlot = useCallback(
    (deltaDeg: number, fromSlot: number) => {
      const norm = ((deltaDeg % 360) + 360) % 360;
      if (norm === 90) return (fromSlot + 3) % 4;
      if (norm === 270) return (fromSlot + 1) % 4;
      if (norm === 180) return (fromSlot + 2) % 4;
      return fromSlot;
    },
    []
  );

  const buildFaces = useCallback(
    (curIdx: number): number[] => {
      const n = Math.max(1, itemCount);
      const fs = frontSlotRef.current;
      const fwd = incomingFrontSlot(stepDegrees, fs);
      const bwd = incomingFrontSlot(-stepDegrees, fs);
      const back = (fs + 2) % 4;
      const faces = [0, 0, 0, 0];
      faces[fs] = modIdx(curIdx, n);
      faces[fwd] = modIdx(curIdx + 1, n);
      faces[bwd] = modIdx(curIdx - 1, n);
      faces[back] = modIdx(curIdx + 2, n);
      return faces;
    },
    [itemCount, stepDegrees, incomingFrontSlot]
  );

  useEffect(() => {
    setFaceItems(buildFaces(currentIndex));
  }, [buildFaces, currentIndex]);

  const navigate = useCallback(
    (dir: "next" | "prev") => {
      if (isAnimatingRef.current) return;
      if (itemCount === 0) return;

      const delta = dir === "next" ? stepDegrees : -stepDegrees;
      const from = rotation.get();
      const to = from + delta;

      const cur = currentIndexRef.current;
      const newIndex = modIdx(
        dir === "next" ? cur + 1 : cur - 1,
        itemCount
      );

      isAnimatingRef.current = true;

      const controls = animate(rotation, to, {
        ...transition,
        onComplete: () => {
          isAnimatingRef.current = false;
          advanceFrontSlot(delta);
          setCurrentIndex(newIndex);
          setFaceItems(buildFaces(newIndex));
          onIndexChange?.(newIndex);
        },
      });
      return controls;
    },
    [
      itemCount,
      stepDegrees,
      rotation,
      transition,
      advanceFrontSlot,
      buildFaces,
      setCurrentIndex,
      onIndexChange,
    ]
  );

  // Autoplay loop using Originkit cadence polling
  const isHoveredRef = useRef(false);

  useEffect(() => {
    if (!autoPlay) return;
    if (itemCount <= 1) return;
    const id = window.setInterval(() => {
      if (!isAnimatingRef.current && !isHoveredRef.current && !dragStateRef.current?.active) {
        navigate("next");
      }
    }, 100);
    return () => window.clearInterval(id);
  }, [autoPlay, navigate, itemCount]);

  // Keyboard navigation
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isHoveredRef.current) return;
      if (isHorizontal) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          navigate(isForward ? "next" : "prev");
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          navigate(isForward ? "prev" : "next");
        }
      } else {
        if (e.key === "ArrowUp") {
          e.preventDefault();
          navigate(isForward ? "next" : "prev");
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          navigate(isForward ? "prev" : "next");
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isHorizontal, isForward, navigate]);

  // Pointer drag
  const dragStateRef = useRef<{
    active: boolean;
    pointerId: number;
    startX: number;
    startY: number;
    startRotation: number;
    committedSteps: number;
  } | null>(null);

  const applyStep = useCallback(
    (dir: "next" | "prev") => {
      const deltaSlot = dir === "next" ? stepDegrees : -stepDegrees;
      advanceFrontSlot(deltaSlot);
      const cur = currentIndexRef.current;
      const ni = modIdx(
        dir === "next" ? cur + 1 : cur - 1,
        Math.max(1, itemCount)
      );
      setCurrentIndex(ni);
      setFaceItems(buildFaces(ni));
    },
    [stepDegrees, itemCount, advanceFrontSlot, setCurrentIndex, buildFaces]
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!enableDrag) return;
      if (isAnimatingRef.current) return;
      if (e.button !== 0 && e.pointerType === "mouse") return;
      const el = e.currentTarget;
      try {
        el.setPointerCapture(e.pointerId);
      } catch {}
      dragStateRef.current = {
        active: true,
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        startRotation: rotation.get(),
        committedSteps: 0,
      };
      setFaceItems(buildFaces(currentIndexRef.current));
    },
    [enableDrag, rotation, buildFaces]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const s = dragStateRef.current;
      if (!s || !s.active || s.pointerId !== e.pointerId) return;
      const dx = e.clientX - s.startX;
      const dy = e.clientY - s.startY;
      const axisDelta = isHorizontal ? dx : dy;
      const correctedSign = isHorizontal ? 1 : -1;
      const sens = Math.max(1, Math.min(10, dragSensitivity ?? 5)) * 0.5;
      const dragDeg =
        ((axisDelta * correctedSign) / Math.max(1, depth)) * 90 * sens;
      rotation.set(s.startRotation + dragDeg);

      const want = Math.round(dragDeg / stepDegrees);
      while (s.committedSteps < want) {
        applyStep("next");
        s.committedSteps++;
      }
      while (s.committedSteps > want) {
        applyStep("prev");
        s.committedSteps--;
      }
    },
    [isHorizontal, depth, dragSensitivity, rotation, stepDegrees, applyStep]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const s = dragStateRef.current;
      if (!s || !s.active || s.pointerId !== e.pointerId) return;
      const el = e.currentTarget;
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {}
      dragStateRef.current = null;

      const target = s.startRotation + s.committedSteps * stepDegrees;
      isAnimatingRef.current = true;

      if (s.committedSteps === 0) {
        animate(rotation, target, {
          ...snapTransition,
          onComplete: () => {
            isAnimatingRef.current = false;
          },
        });
        return;
      }

      onIndexChange?.(currentIndexRef.current);
      animate(rotation, target, {
        ...transition,
        delay: 0,
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });
    },
    [rotation, stepDegrees, transition, snapTransition, onIndexChange]
  );

  const cubeTransform = useTransform(rotation, (r) => {
    if (isHorizontal) return `rotateY(${r}deg)`;
    return `rotateX(${r}deg)`;
  });

  const containerStyle: React.CSSProperties = {
    ...style,
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "none",
    touchAction: "none",
    userSelect: "none",
  };

  const cubeBoxStyle: React.CSSProperties = {
    position: "relative",
    width: cubeW,
    height: cubeH,
    maxWidth: "100%",
  };

  return (
    <div
      ref={wrapperRef}
      className={`framer-box-carousel select-none ${className}`}
      tabIndex={0}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
      onFocus={() => {
        isHoveredRef.current = true;
      }}
      onBlur={() => {
        isHoveredRef.current = false;
      }}
      style={{
        ...containerStyle,
        overflow: "visible",
        cursor: enableDrag ? "grab" : "default",
        perspective: "1100px",
        perspectiveOrigin: "50% 50%",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <motion.div
        style={{
          ...cubeBoxStyle,
          transformStyle: "preserve-3d",
          transform: cubeTransform,
        }}
      >
        {[0, 1, 2, 3].map((slot) => {
          const baseAngle = slot * 90;
          const axis = isHorizontal ? "Y" : "X";
          const itemIdx = faceItems[slot] ?? 0;
          const item = items[modIdx(itemIdx, Math.max(1, itemCount))];
          return (
            <div
              key={slot}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                transformStyle: "preserve-3d",
                transform: `rotate${axis}(${baseAngle}deg) translateZ(${halfDepth}px)`,
                backfaceVisibility: "hidden",
                overflow: "hidden",
                borderRadius: "1.25rem",
                background: "#181614",
                boxShadow:
                  "inset 0 0 0 1px rgba(176, 146, 98, 0.4), 0 25px 50px -12px rgba(0,0,0,0.5)",
              }}
            >
              <FaceContent item={item} />
            </div>
          );
        })}
      </motion.div>

      {/* Manual Navigation Controls & Indicators */}
      <div className="absolute -bottom-10 sm:-bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30 pointer-events-auto">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navigate("prev");
          }}
          aria-label="Previous cube face"
          className="w-8 h-8 rounded-full bg-[#FAF7F0] border border-[#B09262]/40 text-[#B09262] hover:text-[#24211D] hover:border-[#B09262] flex items-center justify-center text-xs shadow-md transition-all active:scale-95 cursor-pointer"
        >
          ←
        </button>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7F0]/80 backdrop-blur-sm border border-[#B09262]/20">
          {items.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === currentIndex ? "w-5 bg-[#B09262]" : "w-1.5 bg-[#B09262]/30"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navigate("next");
          }}
          aria-label="Next cube face"
          className="w-8 h-8 rounded-full bg-[#FAF7F0] border border-[#B09262]/40 text-[#B09262] hover:text-[#24211D] hover:border-[#B09262] flex items-center justify-center text-xs shadow-md transition-all active:scale-95 cursor-pointer"
        >
          →
        </button>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// FaceContent
// -----------------------------------------------------------------------------

function FaceContent({ item }: { item: CarouselItem | undefined }) {
  if (!item) {
    return <div className="w-full h-full bg-[#181614]" />;
  }

  const src = (item.srcUrl && item.srcUrl.trim()) || resolveImageSrc(item.src);
  const srcSet = resolveImageSrcSet(item.src);

  return (
    <div className="relative w-full h-full group overflow-hidden bg-[#181614]">
      {item.type === "video" ? (
        <video
          src={src}
          poster={resolveImageSrc(item.poster) || undefined}
          muted
          playsInline
          loop
          autoPlay
          className="w-full h-full object-cover block pointer-events-none"
        />
      ) : (
        <img
          src={src}
          srcSet={srcSet}
          alt={item.alt || "Vasundhara Heritage Jewellery"}
          draggable={false}
          className="w-full h-full object-cover block pointer-events-none select-none transition-transform duration-700 group-hover:scale-105"
        />
      )}

      {/* Luxury Vignette & Metadata Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#181614]/90 via-[#181614]/25 to-transparent pointer-events-none" />

      <div className="absolute bottom-6 left-6 right-6 text-[#FDFBF7] pointer-events-none">
        <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-[#C6AA78] font-semibold block mb-1">
          {item.title || "ATELIER ARCHIVES • HYDERABAD"}
        </span>
        <span className="font-serif text-base sm:text-lg text-[#FDFBF7] font-light leading-snug block">
          {item.subtitle || item.alt || "Nearly Three Decades of Indian Goldsmithing"}
        </span>
      </div>

      {/* Decorative Gold Corner Emblem */}
      <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-[#181614]/65 backdrop-blur-md border border-[#B09262]/35 text-[9px] font-sans uppercase tracking-widest text-[#C6AA78] pointer-events-none">
        3D CUBE ARCHIVE
      </div>
    </div>
  );
}

export default BoxCarousel;
