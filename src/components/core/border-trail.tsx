'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type BorderTrailProps = {
  className?: string;
  size?: number;
  duration?: number;
};

export function BorderTrail({
  className,
  size = 140,
  duration = 6,
}: BorderTrailProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden", className)}>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none rounded-[inherit]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle Champagne Gold Linear Gradient for the Moving Beam */}
          <linearGradient id="vdr-luxury-trail-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C6AA78" stopOpacity="0" />
            <stop offset="35%" stopColor="#C6AA78" stopOpacity="0.4" />
            <stop offset="75%" stopColor="#FFF9EE" stopOpacity="1" />
            <stop offset="100%" stopColor="#B09262" stopOpacity="1" />
          </linearGradient>

          {/* Delicate Soft Glow for the Moving Trail */}
          <filter id="vdr-trail-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Subtle Static Ambient Border */}
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="15"
          fill="none"
          stroke="#B09262"
          strokeWidth="1"
          strokeOpacity="0.25"
        />

        {/* 2. Elegant Animated Border Beam Trail (Traces only the 1.5px border outline) */}
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="15"
          fill="none"
          stroke="url(#vdr-luxury-trail-grad)"
          strokeWidth="2"
          strokeDasharray={`${size} 480`}
          filter="url(#vdr-trail-glow)"
          className="animate-[vdrBorderDash_6s_linear_infinite]"
          style={{ animationDuration: `${duration}s` }}
        />
      </svg>
    </div>
  );
}
