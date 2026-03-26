// src/components/Canvas/Canvas.tsx
import React from "react";
import { useParticleSystem } from "./useParticleSystem";
import type { ParticleMode } from "../../lib/Mode";
import type { NavbarStats } from "../Navbar/Navbar";
import { StarIcon } from "@heroicons/react/24/solid";

interface CanvasProps {
  mode: ParticleMode;
  spawnCount: number;
  spawnSpeed: number;
  showQt: boolean;
  showRadius: boolean;
  showLinks: boolean;
  action: string | null;
  onActionComplete: () => void;
  onStatsChange: (stats: NavbarStats) => void;
}

const Canvas: React.FC<CanvasProps> = (props) => {
  const { canvasRef } = useParticleSystem(props);

  return (
    <div id="canvas-wrapper" className="relative flex-1 overflow-hidden bg-transparent">
      {/* CANVAS */}
      <canvas id="c" className="block h-screen w-screen cursor-crosshair bg-[#070711]" ref={canvasRef} />

      {/* CANVAS HINT */}
      <div
        id="canvas-hint"
        className="text-base-content/60 pointer-events-none fixed bottom-3 left-1/2 flex -translate-x-1/2 text-center text-xs text-[9.5px] tracking-[0.08em] whitespace-nowrap"
      >
        <span className="mr-1.5">click or drag</span>
        <StarIcon className="mt-px size-3 text-yellow-800" />
        <span className="ml-1.5">{props.mode}</span>
      </div>
    </div>
  );
};

export default Canvas;
