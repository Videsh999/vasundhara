"use client";

import React, { Component, ReactNode } from "react";

interface ThreeErrorBoundaryProps {
  children: ReactNode;
  fallbackImage?: string;
  title?: string;
}

interface ThreeErrorBoundaryState {
  hasError: boolean;
}

export class ThreeErrorBoundary extends Component<
  ThreeErrorBoundaryProps,
  ThreeErrorBoundaryState
> {
  constructor(props: ThreeErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ThreeErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn("WebGL 3D Context Error fallback activated:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F7F3E9] border border-[#8C734B]/20 flex items-center justify-center p-6 text-center">
          {this.props.fallbackImage ? (
            <img
              src={this.props.fallbackImage}
              alt={this.props.title || "Vasundhara Jewellery High Resolution Studio Presentation"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="space-y-2">
              <span className="font-serif text-lg text-[#1C1A17] font-light block">
                High-Resolution Studio View
              </span>
              <span className="font-sans text-xs uppercase tracking-widest text-[#8C734B] block">
                Vasundhara Masterpiece Photography
              </span>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
