import React, { useState, useMemo } from 'react';
import { QTLiveViewContext } from './QTLiveViewContext';
import { type LiveViewData } from '../Canvas/useParticleSystem';

export const QTLiveViewProvider = ({ children }) => {
  const [liveViewData, setLiveViewData] = useState<LiveViewData>(null);
  const contextValue = useMemo(() => ({ liveViewData, setLiveViewData }), [liveViewData]);
  return <QTLiveViewContext value={contextValue}>{children}</QTLiveViewContext>;
};
