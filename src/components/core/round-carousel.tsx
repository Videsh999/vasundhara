"use client";

import React, { useEffect, useRef } from "react";

export interface RoundCarouselImage {
  src: string;
  title?: string;
  subtitle?: string;
  slug?: string;
}

export interface RoundCarouselProps {
  images?: RoundCarouselImage[];
  imageWidth?: number;
  imageHeight?: number;
  spacing?: number;
  speed?: number;
  direction?: "right" | "left";
  drag?: boolean;
  sensitivity?: number;
  tilt?: number;
  perspective?: number;
  cornerRadius?: number;
  innerDim?: number;
  background?: string;
  style?: React.CSSProperties;
}

const DEFAULT_IMAGES: RoundCarouselImage[] = [
  {
    src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
    title: "SOLITAIRE RINGS",
    subtitle: "Eternal Brilliance",
    slug: "diamond-jewellery",
  },
  {
    src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
    title: "KUNDAN & EMERALD",
    subtitle: "Atelier Masterpiece",
    slug: "kundan",
  },
  {
    src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800",
    title: "DIAMOND DROPS",
    subtitle: "Sculptural Earrings",
    slug: "diamond-jewellery",
  },
  {
    src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800",
    title: "TEMPLE HERITAGE",
    subtitle: "22K Pure Nakshi Gold",
    slug: "temple-jewellery",
  },
  {
    src: "https://images.unsplash.com/photo-1611591475163-9a3d463e230c?auto=format&fit=crop&q=80&w=800",
    title: "GOLD KADA",
    subtitle: "Handcrafted Movement",
    slug: "gold-jewellery",
  },
  {
    src: "https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&q=80&w=800",
    title: "BRIDAL POLKI",
    subtitle: "Heirloom Ceremonial",
    slug: "bridal",
  },
  {
    src: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=800",
    title: "CONTEMPORARY",
    subtitle: "Modern Geometries",
    slug: "contemporary",
  },
  {
    src: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800",
    title: "PEARL VEIL",
    subtitle: "Natural Sea Pearls",
    slug: "high-jewellery",
  },
];

export function RoundCarousel({
  images = DEFAULT_IMAGES,
  imageWidth = 280,
  imageHeight = 360,
  spacing = 3,
  speed = 6,
  direction = "right",
  drag = true,
  sensitivity = 5,
  tilt = -6,
  perspective = 2800,
  cornerRadius = 20,
  innerDim = 3.5,
  background = "transparent",
  style = {},
}: RoundCarouselProps) {
  const items = images && images.length > 0 ? images : DEFAULT_IMAGES;
  const count = items.length;

  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const rotYRef = useRef(0);
  const velRef = useRef(0);
  const lastRef = useRef(0);
  const dragRef = useRef({ active: false, x: 0 });

  const angle = 360 / count;
  const factor = 1 + spacing * 0.15;
  const radius = (imageWidth * factor) / (2 * Math.tan(Math.PI / count));
  const radiusPx = cornerRadius;
  const degPerSec = speed * 6 * (direction === "left" ? -1 : 1);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    const apply = () => {
      ring.style.transform = `translateZ(${-radius}px) rotateY(${rotYRef.current}deg)`;
    };
    apply();

    const draw = (now: number) => {
      const dt = lastRef.current ? (now - lastRef.current) / 1000 : 0;
      lastRef.current = now;
      const f = Math.min(dt, 0.1);
      const d = dragRef.current;
      if (!d.active) {
        if (Math.abs(velRef.current) > 0.01) {
          rotYRef.current += velRef.current * f;
          velRef.current *= 0.94;
        } else {
          rotYRef.current += degPerSec * f;
        }
      }
      apply();
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [radius, degPerSec, count]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!drag) return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    dragRef.current = { active: true, x: e.clientX };
    velRef.current = 0;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d.active) return;
    const dx = e.clientX - d.x;
    d.x = e.clientX;
    const k = 0.3 * sensitivity;
    rotYRef.current += dx * k;
    velRef.current = dx * k * 60;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    dragRef.current.active = false;
  };

  const faceBase: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    borderRadius: radiusPx,
    overflow: "hidden",
    backfaceVisibility: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div
      style={{
        ...style,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background,
        perspective: `${perspective}px`,
        cursor: drag ? "grab" : "default",
        touchAction: "none",
        userSelect: "none",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt}deg)`,
        }}
      >
        <div
          ref={ringRef}
          style={{
            position: "relative",
            width: imageWidth,
            height: imageHeight,
            transformStyle: "preserve-3d",
          }}
        >
          {items.map((img, i) => {
            const src = img?.src;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  inset: 0,
                  transform: `rotateY(${i * angle}deg) translateZ(${radius}px)`,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Front Face of 3D Card with Luxury Frame & Vignette */}
                <div
                  style={{
                    ...faceBase,
                    backgroundColor: src ? "transparent" : "#24211D",
                    backgroundImage: src ? `url(${src})` : undefined,
                    boxShadow: "0 18px 45px -8px rgba(36, 33, 29, 0.35)",
                    border: "1px solid rgba(176, 146, 98, 0.3)",
                  }}
                >
                  {/* Subtle Gradient Shadow & Title Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(36, 33, 29, 0.85) 0%, rgba(36, 33, 29, 0.15) 50%, rgba(36, 33, 29, 0) 100%)",
                      pointerEvents: "none",
                    }}
                  />
                  {img.title && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "16px",
                        left: "16px",
                        right: "16px",
                        color: "#FDFBF7",
                        pointerEvents: "none",
                      }}
                    >
                      <span
                        style={{
                          display: "block",
                          fontFamily: "var(--font-sans)",
                          fontSize: "10px",
                          letterSpacing: "0.25em",
                          textTransform: "uppercase",
                          color: "#C6AA78",
                          fontWeight: 600,
                        }}
                      >
                        {img.title}
                      </span>
                      {img.subtitle && (
                        <span
                          style={{
                            display: "block",
                            fontFamily: "var(--font-serif)",
                            fontSize: "14px",
                            fontStyle: "italic",
                            color: "#EFE9DA",
                            opacity: 0.9,
                            marginTop: "2px",
                          }}
                        >
                          {img.subtitle}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Back Mirrored Face of 3D Card (Inner Dim) */}
                <div
                  style={{
                    ...faceBase,
                    transform: "rotateY(180deg)",
                    backgroundColor: src ? "transparent" : "#1C1A17",
                    backgroundImage: src ? `url(${src})` : undefined,
                    filter: `brightness(${innerDim / 10})`,
                    border: "1px solid rgba(176, 146, 98, 0.15)",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RoundCarousel;
