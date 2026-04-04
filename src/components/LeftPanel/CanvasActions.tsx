import React from 'react';

export interface CanvasActionsProps {
  onClearCanvas: () => void;
  onFillCanvas: () => void;
}

const CanvasActions: React.FC<CanvasActionsProps> = ({ onClearCanvas, onFillCanvas }: CanvasActionsProps) => {
  return (
    <>
      <p
        className="mt-2 mb-1 ml-1 text-[10px] font-black tracking-[0.15em] text-teal-600 uppercase"
        style={{ marginTop: '8px' }}
      >
        <strong>Canvas</strong>
      </p>
      <button className="mode-btn" onClick={onClearCanvas}>
        Clear
      </button>
      <button className="mode-btn" onClick={onFillCanvas}>
        Fill (200)
      </button>
    </>
  );
};

export default CanvasActions;
