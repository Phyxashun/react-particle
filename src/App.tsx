// src/App.tsx
import { useState, useCallback } from "react";
import Navbar, { type NavbarStats } from "./components/Navbar/Navbar";
import Canvas from "./components/Canvas/Canvas";
import LeftPanel from "./components/LeftPanel/LeftPanel";
import RightPanel from "./components/RightPanel/RightPanel"; // Import RightPanel
import { type LiveViewData } from "./components/Canvas/useParticleSystem"; // Import LiveViewData
import { useMode } from "./components/LeftPanel/ModeContext.tsx";

const App = () => {
  const { mode } = useMode();
  const [stats, setStats] = useState<NavbarStats>({
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
  const [liveViewData, setLiveViewData] = useState<LiveViewData>({
    quadTree: null,
    particles: [],
    bounds: null,
  });

  const handleLiveViewDataChange = useCallback((data: LiveViewData) => {
    setLiveViewData(data);
  }, []);

  const handleStatsChange = useCallback((newStats: NavbarStats) => {
    setStats(newStats);
  }, []);

  const handleActionComplete = useCallback(() => {
    setCanvasAction(null);
  }, []);

  return (
    <div className="flex-none overflow-hidden">
      <Navbar stats={stats} />
      <div className="grid grid-cols-[auto_auto_auto] justify-stretch">
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
          onClearCanvas={() => setCanvasAction("clear")}
          onFillCanvas={() => setCanvasAction("fill")}
        />
        <div className="relative flex-1 overflow-hidden bg-transparent">
          <Canvas
            mode={mode}
            spawnCount={particleCount}
            spawnSpeed={particleSpeed}
            showQt={showQt}
            showRadius={showRadius}
            showLinks={showLinks}
            action={canvasAction}
            onStatsChange={handleStatsChange}
            onActionComplete={handleActionComplete}
            onLiveViewDataChange={handleLiveViewDataChange}
          />
        </div>
        <RightPanel mode={mode} liveData={liveViewData} showQt={showQt} />
      </div>
    </div>
  );
};

export default App;
