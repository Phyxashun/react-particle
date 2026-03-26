// src/components/RightPanel/RightPanel.tsx
import React from "react";
import type { ParticleMode } from "../../lib/Mode";
import type { LiveViewData } from "../Canvas/useParticleSystem";
import DecoratorStack from "./DecoratorStack";
import PerformanceNote from "./PerformanceNote";
import QuadTreeLiveView from "./QuadTreeLiveView";

interface RightPanelProps {
  mode: ParticleMode;
  liveData: LiveViewData;
  showQt: boolean;
}

const RightPanel: React.FC<RightPanelProps> = ({ mode, liveData, showQt }) => {
  return (
    <aside
      id="right-panel"
      className="bg-base-200 border-base-300 flex w-55 min-w-55 shrink-0 flex-col overflow-x-hidden overflow-y-auto border-l px-3 py-3.5"
    >
      {showQt && (
        <div className="mb-4 flex flex-col gap-2">
          <p className="text-base-content/60 text-[8.5px] tracking-[0.15em] uppercase">QuadTree Live View</p>
          <div className="w-full">
            <QuadTreeLiveView liveData={liveData} />
          </div>
        </div>
      )}

      {/* Force DecoratorStack to stay within the 205px width */}
      <div className="h-auto min-h-0 w-full shrink">
        <DecoratorStack mode={mode} />
      </div>

      <div className="divider my-2"></div>

      <PerformanceNote className="mb-16" mode={mode} />
    </aside>
  );
};

export default RightPanel;
