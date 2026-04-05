import { useMemo, useState, type ReactNode } from 'react';
import { SpawnContext } from './SpawnContext';

export const SpawnProvider = ({ children }: { children?: ReactNode }) => {
  const [particleCount, setParticleCount] = useState(10);
  const [particleSpeed, setParticleSpeed] = useState(1.0);

  const value = useMemo(
    () => ({ particleCount, particleSpeed, setParticleCount, setParticleSpeed }),
    [particleCount, particleSpeed]
  );

  return <SpawnContext value={value}>{children}</SpawnContext>;
};
