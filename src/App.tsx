// src/App.tsx
import { useState, useCallback } from 'react';
import Navbar from './components/Navbar/Navbar';
import type { StatDisplayProps } from './components/Navbar/StatsDisplay';
import Canvas from './components/Canvas/Canvas';
import LeftPanel from './components/LeftPanel/LeftPanel';
import RightPanel from './components/RightPanel/RightPanel';

const App = () => {
  const [stats, setStats] = useState<StatDisplayProps>({
    count: 0,
    fps: 0,
    qt: 0,
    nb: 0,
  });

  const [particleCount, setParticleCount] = useState(10);
  const [particleSpeed, setParticleSpeed] = useState(1.0);
  const [showQt, setShowQt] = useState(false);
  const [showRadius, setShowRadius] = useState(false);
  const [showLinks, setShowLinks] = useState(true);
  const [canvasAction, setCanvasAction] = useState<string | null>(null);

  const handleStatsChange = useCallback((newStats: StatDisplayProps) => {
    setStats(newStats);
  }, []);

  const handleActionComplete = useCallback(() => {
    setCanvasAction(null);
  }, []);

  return (
    <div className="flex-none overflow-hidden">
      <Navbar stats={stats} />
      <div className="flex h-screen w-full">
        <div className="w-48.75 flex-none">
          <LeftPanel
            particleCount={particleCount}
            particleSpeed={particleSpeed}
            showQt={showQt}
            showRadius={showRadius}
            showLinks={showLinks}
            onParticleCountChange={setParticleCount}
            onParticleSpeedChange={setParticleSpeed}
            onShowQtChange={setShowQt}
            onShowRadiusChange={setShowRadius}
            onShowLinksChange={setShowLinks}
            onClearCanvas={() => setCanvasAction('clear')}
            onFillCanvas={() => setCanvasAction('fill')}
          />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <Canvas
            spawnCount={particleCount}
            spawnSpeed={particleSpeed}
            showQt={showQt}
            showRadius={showRadius}
            showLinks={showLinks}
            action={canvasAction}
            onStatsChange={handleStatsChange}
            onActionComplete={handleActionComplete}
          />
        </div>
        <div className="w-55 flex-none">
          <RightPanel showQt={showQt} />
        </div>
      </div>
    </div>
  );
};

export default App;
