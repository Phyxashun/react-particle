import React from 'react';
import { useSpawn } from './SpawnContext';

const SpawnControls: React.FC = () => {
  const { particleCount, particleSpeed, setParticleCount, setParticleSpeed } = useSpawn();

  return (
    <>
      <p
        className="mt-2 mb-1 ml-1 text-[10px] font-black tracking-[0.15em] text-teal-600 uppercase"
        style={{ marginTop: '8px' }}
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
          onChange={(e) => setParticleCount(Number(e.target.value))}
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
          onChange={(e) => setParticleSpeed(Number(e.target.value))}
        />
      </div>
    </>
  );
};

export default SpawnControls;
