// src/components/RightPanel/PerformanceNote.tsx
import parse from 'html-react-parser';
import React from 'react';
import MODES from '../../lib/Mode';
import { useMode } from '../LeftPanel/ModeContext';

const PerformanceNote: React.FC = () => {
  const { mode } = useMode();
  const note = MODES[mode!]?.perfNote;
  if (!note) return null;

  return (
    <div className="border-success/15 mb-16 rounded border bg-(--color-bg) px-2.5 py-2">
      <p className="text-accent text-[9px] leading-[1.6] tracking-wider">{parse(note)}</p>
    </div>
  );
};

export default PerformanceNote;
