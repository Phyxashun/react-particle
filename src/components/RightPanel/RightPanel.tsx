// src/components/RightPanel/RightPanel.tsx
import React from 'react';
import { useDisplay } from '../LeftPanel/DisplayContext';
import DecoratorStack from './DecoratorStack';
import QuadTreeLiveView from './MiniMap';
import PerformanceNote from './PerformanceNote';

interface RightPanelProps {
  className?: string;
}

const RightPanel: React.FC<RightPanelProps> = ({ className = '' }) => {
  const showQt = useDisplay();

  return (
    <aside className={`${className} bg-base-200 flex w-65 flex-col`}>
      {showQt && (
        <>
          <QuadTreeLiveView className="flex-none rounded-md" />
          <div className="h-6 flex-none"></div>
        </>
      )}
      <DecoratorStack className="flex-2 rounded-lg" />
      <div className="divider"></div>
      <PerformanceNote className="flex-none rounded-lg" />
      <div className="h-6 flex-none"></div>
    </aside>
  );
};

export default RightPanel;
