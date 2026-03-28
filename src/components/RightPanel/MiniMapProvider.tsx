import { useMemo, useState, type ReactNode } from 'react';
import { MiniMapContext, type MiniMapData } from './MiniMapContext';

interface MiniMapProviderProps {
  children?: ReactNode;
}

export const MiniMapProvider = ({ children }: MiniMapProviderProps) => {
  const [miniMapData, setMiniMapData] = useState<MiniMapData | null>(null);
  const contextValue = useMemo(() => ({ miniMapData, setMiniMapData }), [miniMapData]);
  return <MiniMapContext value={contextValue}>{children}</MiniMapContext>;
};
