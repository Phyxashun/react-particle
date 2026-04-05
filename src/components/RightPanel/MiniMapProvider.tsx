import { useState, type ReactNode } from 'react';
import { MiniMapDataContext, MiniMapSetterContext, type MiniMapData } from './MiniMapContext';

interface MiniMapProviderProps {
  children?: ReactNode;
}

export const MiniMapProvider = ({ children }: MiniMapProviderProps) => {
  const [miniMapData, setMiniMapData] = useState<MiniMapData | null>(null);

  return (
    <MiniMapSetterContext value={setMiniMapData}>
      <MiniMapDataContext value={miniMapData}>{children}</MiniMapDataContext>
    </MiniMapSetterContext>
  );
};
