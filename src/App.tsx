// src/App.tsx
import { useCallback, useState } from 'react';
import Canvas from './components/Canvas/Canvas';
import LeftPanel from './components/LeftPanel/LeftPanel';
import Navbar from './components/Navbar/Navbar';
import type { StatsDisplayProps } from './components/Navbar/StatsDisplay';
import RightPanel from './components/RightPanel/RightPanel';

const CanvasActions = {
  clear: 'clear',
  fill: 'fill',
};

const App = () => {
  const [stats, setStats] = useState<StatsDisplayProps>({
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

  const handleStatsChange = useCallback(
    (newStats: StatsDisplayProps) => {
      setStats({ count: newStats.count, fps: newStats.fps, qt: newStats.qt, nb: newStats.nb });
    },
    [setStats]
  );

  const handleActionComplete = useCallback(() => {
    setCanvasAction(null);
  }, [setCanvasAction]);

  return (
    <div className="flex flex-col overflow-hidden">
      <Navbar className="flex-1" stats={stats} />
      <div className="flex h-screen w-full flex-row">
        <LeftPanel
          showQt={showQt}
          showRadius={showRadius}
          showLinks={showLinks}
          onShowQtChange={setShowQt}
          onShowRadiusChange={setShowRadius}
          onShowLinksChange={setShowLinks}
          particleCount={particleCount}
          particleSpeed={particleSpeed}
          onParticleCountChange={setParticleCount}
          onParticleSpeedChange={setParticleSpeed}
          onClearCanvas={() => setCanvasAction(CanvasActions.clear)}
          onFillCanvas={() => setCanvasAction(CanvasActions.fill)}
          className="p-2"
        />
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

        <RightPanel className="p-2" showQt={showQt} />
      </div>
    </div>
  );
};

export default App;
