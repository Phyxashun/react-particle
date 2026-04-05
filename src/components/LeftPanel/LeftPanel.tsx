import React from 'react';
import CanvasActions from './CanvasActions';
import DisplayToggle from './DisplayToggle';
import ModeSelector from './ModeSelector';
import SpawnControls from './SpawnControls';

interface LeftPanelProps {
  className?: string;
}

const LeftPanel: React.FC<LeftPanelProps> = ({ className = '' }) => (
  <aside id="left-panel" className={`${className} bg-base-200 flex h-screen w-65 flex-initial flex-col gap-4`}>
    <ModeSelector />
    <DisplayToggle />
    <SpawnControls />
    <CanvasActions />
  </aside>
);

export default LeftPanel;
