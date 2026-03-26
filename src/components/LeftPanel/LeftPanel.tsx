import React from "react";
import ModeSelector from "./ModeSelector";

export interface LeftPanelProps {
  particleCount: number;
  particleSpeed: number;
  showQt: boolean;
  showRadius: boolean;
  showLinks: boolean;
  onParticleCountChange: (count: number) => void;
  onParticleSpeedChange: (speed: number) => void;
  onShowQtChange: (value: boolean) => void;
  onShowRadiusChange: (value: boolean) => void;
  onShowLinksChange: (value: boolean) => void;
  onClearCanvas: () => void;
  onFillCanvas: () => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({
  particleCount,
  particleSpeed,
  showQt,
  showRadius,
  showLinks,
  onParticleCountChange,
  onParticleSpeedChange,
  onShowQtChange,
  onShowRadiusChange,
  onShowLinksChange,
  onClearCanvas,
  onFillCanvas,
}) => {
  return (
    <aside
      id="left-panel"
      className="bg-base-200 border-base-300 sticky top-0 left-0 flex h-screen w-48.75 min-w-48.75 flex-col gap-0.75 overflow-y-auto border-r px-2.5 py-3"
    >
      <ModeSelector />
      <p
        className="mt-2 mb-1 ml-1 text-[10px] font-black tracking-[0.15em] text-teal-600 uppercase"
        style={{ marginTop: "8px" }}
      >
        <strong>Display Toggle</strong>
      </p>
      <div className={`toggle-row ${showQt ? "is-on" : ""}`} onClick={() => onShowQtChange(!showQt)}>
        <span className="toggle-label">Show QuadTree</span>
        <div className="toggle-pip"></div>
      </div>
      <div className={`toggle-row ${showRadius ? "is-on" : ""}`} onClick={() => onShowRadiusChange(!showRadius)}>
        <span className="toggle-label">Show Radius</span>
        <div className="toggle-pip"></div>
      </div>
      <div className={`toggle-row ${showLinks ? "is-on" : ""}`} onClick={() => onShowLinksChange(!showLinks)}>
        <span className="toggle-label">Trail / Links</span>
        <div className="toggle-pip"></div>
      </div>

      <p
        className="mt-2 mb-1 ml-1 text-[10px] font-black tracking-[0.15em] text-teal-600 uppercase"
        style={{ marginTop: "8px" }}
      >
        <strong>Spawn</strong>
      </p>
      <div className="slider-block">
        <div className="slider-label">
          Count per click <span>{particleCount}</span>
        </div>
        <input
          type="range"
          min={1}
          max={40}
          value={particleCount}
          onChange={(e) => onParticleCountChange(Number(e.target.value))}
        />
      </div>
      <div className="slider-block">
        <div className="slider-label">
          Speed <span>{particleSpeed.toFixed(1)}×</span>
        </div>
        <input
          type="range"
          min={0.1}
          max={3}
          step={0.1}
          value={particleSpeed}
          onChange={(e) => onParticleSpeedChange(Number(e.target.value))}
        />
      </div>

      <p
        className="mt-2 mb-1 ml-1 text-[10px] font-black tracking-[0.15em] text-teal-600 uppercase"
        style={{ marginTop: "8px" }}
      >
        <strong>Canvas</strong>
      </p>
      <button className="mode-btn" onClick={onClearCanvas}>
        Clear
      </button>
      <button className="mode-btn" onClick={onFillCanvas}>
        Fill (200)
      </button>
    </aside>
  );
};

export default LeftPanel;
