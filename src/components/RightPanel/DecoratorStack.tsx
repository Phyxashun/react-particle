// src/components/RightPanel/DecoratorStack.tsx
import React from 'react';
import MODES from '../../lib/Mode';
import { useMode } from '../LeftPanel/ModeContext';

const DecoratorStack: React.FC = () => {
  const { mode } = useMode();
  const stackInfo = MODES[mode!];

  if (!stackInfo) return null;

  return (
    <div className={`border-success/15 flex flex-1 flex-col rounded border bg-(--color-bg) px-2.5 py-2 tracking-wider`}>
      {/* Title Header */}
      <p className="mb-1 ml-1 text-[10px] font-black tracking-[0.15em] text-teal-600 uppercase">Decorator Stack</p>

      {/* Primary Badge Component */}
      <div className="bg-success/10 border-success/20 text-success mb-2 flex flex-col items-center justify-center rounded border p-2 text-center">
        <span className="text-xs">★</span>
        <span className="text-[10px] leading-tight font-bold tracking-tight uppercase">{stackInfo.primary}</span>
      </div>

      {/* Code Stack Section */}
      <div className="bg-base-300/50 border-base-300 rounded border p-1 font-mono text-[10px] leading-relaxed">
        {stackInfo.stack.map(([fn, args]) => (
          <div key={fn} className="mb-1 pr-0 pl-4 -indent-4 wrap-anywhere whitespace-normal">
            <span className="text-base-content/40">@</span>
            <span className="text-warning font-bold">{fn}</span>
            <span className="text-base-content/40">(</span>
            <span className="text-teal-600">{args}</span>
            <span className="text-base-content/40">)</span>
          </div>
        ))}

        <div className="border-base-300 mt-1 border-t pt-1 pr-0 pl-4 -indent-4 wrap-anywhere whitespace-normal">
          <span className="text-secondary italic">class </span>
          <span className="text-base-content font-bold">{stackInfo.className}</span>{' '}
          <span className="text-base-content/40">extends </span>
          <span className="text-info">Particle</span>
        </div>
      </div>
    </div>
  );
};

export default DecoratorStack;
