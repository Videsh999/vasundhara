"use client";

import React, { useState } from "react";
import Link from "next/link";

export interface VasundharaLogoProps {
  variant?: "full" | "mark" | "horizontal";
  theme?: "light" | "dark";
  heightClass?: string;
  className?: string;
  href?: string | null;
  alt?: string;
  "aria-hidden"?: boolean;
}

const PRIMARY_SOURCES = {
  full: {
    light: "/brand/vasundhara-logo-transparent.png",
    dark: "/brand/vasundhara-logo-dark-transparent.png",
  },
  mark: {
    light: "/brand/vasundhara-mark-transparent.png",
    dark: "/brand/vasundhara-mark-dark-transparent.png",
  },
};

const FALLBACK_SOURCES = {
  full: {
    light: "/images/vasundhara_logo_transparent.png",
    dark: "/images/vasundhara_logo_transparent_dark.png",
  },
  mark: {
    light: "/brand/vasundhara-emblem-tight.png",
    dark: "/brand/vasundhara-emblem-dark.png",
  },
};

export function VasundharaLogo({
  variant = "full",
  theme = "light",
  heightClass,
  className = "",
  href = "/?intro=true",
  alt = "Vasundhara Diamond Roof — Countless Tales of Precious",
  "aria-hidden": ariaHidden,
}: VasundharaLogoProps) {
  const [imgSrc, setImgSrc] = useState<string>(
    PRIMARY_SOURCES[variant === "horizontal" ? "full" : variant][theme]
  );
  const [useTypographyFallback, setUseTypographyFallback] = useState(false);

  const defaultHeight =
    variant === "mark" ? "h-9 md:h-11" : "h-11 sm:h-12 md:h-13";

  const handleImageError = () => {
    const fallback =
      FALLBACK_SOURCES[variant === "horizontal" ? "full" : variant][theme];
    if (imgSrc !== fallback) {
      setImgSrc(fallback);
    } else {
      setUseTypographyFallback(true);
    }
  };

  const handleLogoClick = () => {
    if (typeof window !== "undefined" && href?.includes("intro=true")) {
      sessionStorage.removeItem("vdr_has_seen_intro");
    }
  };

  const imgContent = useTypographyFallback ? (
    <div className="flex items-center gap-3 select-none">
      <img
        src="/brand/vasundhara-emblem-tight.png"
        alt="Vasundhara Emblem"
        className="h-8 w-auto object-contain"
      />
      <div className="flex flex-col">
        <span className="font-serif text-base tracking-[0.25em] text-[#B09262] font-medium leading-none">
          VASUNDHARA
        </span>
        <span className="font-sans text-[7.5px] tracking-[0.35em] text-[#6E685F] uppercase font-light mt-0.5">
          DIAMOND ROOF
        </span>
      </div>
    </div>
  ) : (
    <img
      src={imgSrc}
      alt={ariaHidden ? "" : alt}
      aria-hidden={ariaHidden || undefined}
      draggable={false}
      onError={handleImageError}
      loading="eager"
      decoding="async"
      style={{
        maxHeight: variant === "mark" ? "42px" : "54px",
        width: "auto",
        objectFit: "contain",
      }}
      className={`block w-auto object-contain select-none transition-opacity duration-300 ${heightClass ?? defaultHeight}`}
    />
  );

  const wrapped = (
    <div className={`inline-flex items-center justify-center ${className}`}>
      {imgContent}
    </div>
  );

  if (href === null || href === "") return wrapped;

  return (
    <Link
      href={href}
      onClick={handleLogoClick}
      className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C734B]/60 rounded shrink-0 cursor-pointer"
      aria-label={ariaHidden ? undefined : "Vasundhara Diamond Roof — Home"}
    >
      {wrapped}
    </Link>
  );
}
