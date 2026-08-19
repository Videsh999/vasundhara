"use client";

import React from "react";
import { VasundharaLoader } from "@/components/luxury/VasundharaLoader";

interface LoadingExperienceProps {
  onComplete?: () => void;
}

export function LoadingExperience({ onComplete }: LoadingExperienceProps) {
  return <VasundharaLoader onComplete={onComplete} minDuration={3100} />;
}

