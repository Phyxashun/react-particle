import React from "react";
import { useMode } from "./ModeContext";

const modeButtons = [
  {
    mode: "spark",
    label: "SparkParticle",
    sub: "@WithGravity · @WithTrail · @WithShrink",
  },
  {
    mode: "bubble",
    label: "BubbleParticle",
    sub: "@WithGlow · @WithFade · @WithLifetime",
  },
  {
    mode: "confetti",
    label: "ConfettiParticle",
    sub: "@WithRotation · @WithGravity",
  },
  {
    mode: "snow",
    label: "SnowParticle",
    sub: "@WithDrag · @WithGravity",
  },
  {
    mode: "bouncer",
    label: "BouncerParticle",
    sub: "@WithBounce · @WithRotation",
  },
];

const spatialButtons = [
  {
    mode: "flock",
    label: "FlockParticle",
    sub: "@WithFlocking · @WithWrap",
  },
  {
    mode: "constellation",
    label: "ConstellationParticle",
    sub: "@WithAttraction · @WithLinkDraw",
  },
  {
    mode: "repulsor",
    label: "RepulsorParticle",
    sub: "@WithRepulsion · @WithDrag",
  },
  {
    mode: "orbital",
    label: "OrbitalParticle",
    sub: "@WithRepulsion + @WithAttraction",
  },
];

const ModeSelector: React.FC = () => {
  const { mode, setMode } = useMode();

  return (
    <>
      <div className="flex w-full flex-col px-1">
        {/* Native daisyUI Menu Title replacement */}
        <p className="mt-2 mb-1 ml-1 text-[10px] font-black tracking-[0.15em] text-teal-600 uppercase">
          Visual / Lifecycle
        </p>

        <div className="flex flex-col gap-1">
          {modeButtons.map((btn) => {
            const isActive = mode === btn.mode;

            return (
              <button
                key={btn.mode}
                onClick={() => setMode(btn.mode)}
                className={`
            btn btn-sm h-auto justify-start rounded border px-2.5 py-2 font-normal normal-case
            ${
              isActive
                ? "btn-accent bg-accent/10 border-accent text-accent"
                : "btn-ghost border-base-300 text-base-content/60 hover:border-base-content/20"
            }
          `}
              >
                <div className="flex flex-col items-start text-left leading-[1.3]">
                  <span className="text-[11px] font-bold">{btn.label}</span>
                  <span className="mt-0.75 text-[8.5px] tracking-wider opacity-50">{btn.sub}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex w-full flex-col px-1">
        {/* Header Section */}
        <p className="mt-2 mb-1 ml-1 text-[10px] font-black tracking-[0.15em] text-teal-600 uppercase">
          Spatial / QuadTree
        </p>

        {/* Button List */}
        <div className="flex flex-col gap-1">
          {spatialButtons.map((btn) => {
            const isActive = mode === btn.mode;

            return (
              <button
                key={btn.mode}
                onClick={() => setMode(btn.mode)}
                className={`
            btn btn-sm h-auto justify-start rounded border px-2.5 py-2 font-normal normal-case
            ${
              isActive
                ? "btn-accent bg-accent/10 border-accent text-accent"
                : "btn-ghost border-base-300 text-base-content/60 hover:border-base-content/20"
            }
          `}
              >
                <div className="flex flex-col items-start text-left leading-[1.3]">
                  <span className="text-[11px] font-bold">{btn.label}</span>
                  <span className="mt-0.75 text-[8.5px] tracking-wider opacity-50">{btn.sub}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ModeSelector;
