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
      <button
        className="mode-btn border-base-300 text-base-content/60 duration-120ms hover:text-base-content active-state-classes mb-0.5 block w-full cursor-pointer rounded border bg-transparent px-2.5 py-2 text-left text-[11px] leading-[1.3] transition-all hover:border-[#1a2540]"
        onClick={onClearCanvas}
      >
        Clear
      </button>
      <button
        className="mode-btn border-base-300 text-base-content/60 duration-120ms hover:text-base-content active-state-classes mb-0.5 block w-full cursor-pointer rounded border bg-transparent px-2.5 py-2 text-left text-[11px] leading-[1.3] transition-all hover:border-[#1a2540]"
        onClick={onFillCanvas}
      >
        Fill (200)
      </button>
    </>
  );
};

export default CanvasActions;
