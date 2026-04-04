import React from 'react';
import CanvasActions from './CanvasActions';
import DisplayToggle from './DisplayToggle';
import ModeSelector from './ModeSelector';
import SpawnControls from './SpawnControls';

export interface LeftPanelProps {
  showQt: boolean;
  showRadius: boolean;
  showLinks: boolean;
  onShowQtChange: (value: boolean) => void;
  onShowRadiusChange: (value: boolean) => void;
  onShowLinksChange: (value: boolean) => void;
  particleCount: number;
  particleSpeed: number;
  onParticleCountChange: (count: number) => void;
  onParticleSpeedChange: (speed: number) => void;
  onClearCanvas: () => void;
  onFillCanvas: () => void;
  className?: string;
}

const LeftPanel: React.FC<LeftPanelProps> = ({
  showQt,
  showRadius,
  showLinks,
  onShowQtChange,
  onShowRadiusChange,
  onShowLinksChange,
  particleCount,
  particleSpeed,
  onParticleCountChange,
  onParticleSpeedChange,
  onClearCanvas,
  onFillCanvas,
  className = '',
}) => {
  const displayToggleProps = {
    showQt: showQt,
    showRadius: showRadius,
    showLinks: showLinks,
    onShowQtChange: onShowQtChange,
    onShowRadiusChange: onShowRadiusChange,
    onShowLinksChange: onShowLinksChange,
  };

  const spawnControlsProps = {
    particleCount: particleCount,
    particleSpeed: particleSpeed,
    onParticleCountChange: onParticleCountChange,
    onParticleSpeedChange: onParticleSpeedChange,
  };

  const canvasActionsProps = {
    onClearCanvas: onClearCanvas,
    onFillCanvas: onFillCanvas,
  };
  return (
    <aside id="left-panel" className={`${className} bg-base-200 flex h-screen w-65 flex-initial flex-col gap-4`}>
      <ModeSelector />
      <DisplayToggle {...displayToggleProps} />
      <SpawnControls {...spawnControlsProps} />
      <CanvasActions {...canvasActionsProps} />
    </aside>
  );
};

export default LeftPanel;
