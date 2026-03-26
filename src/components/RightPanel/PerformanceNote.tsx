// src/components/RightPanel/PerformanceNote.tsx
import React from "react";
import MODES, { type ParticleMode } from "../../lib/Mode";
import parse from "html-react-parser";

interface PerformanceNoteProps {
  className: string;
  mode: ParticleMode;
}

const PerformanceNote: React.FC<PerformanceNoteProps> = ({ className = "", mode }) => {
  const note = MODES[mode]?.perfNote;
  if (!note) return null;

  return (
    <div
      className={`border-success/15 text-base-content/60 rounded border bg-(--color-bg) px-2.5 py-2 text-[9px] leading-[1.6] tracking-wider ${className}`}
    >
      <b className="text-accent">{parse(note)}</b>
    </div>
  );
};

export default PerformanceNote;
