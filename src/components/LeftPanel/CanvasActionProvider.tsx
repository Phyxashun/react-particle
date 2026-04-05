import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { CanvasActionContext } from './CanvasActionContext';

export const CanvasActionProvider = ({ children }: { children?: ReactNode }) => {
  const [action, setAction] = useState<string | null>(null);

  // useCallback ensures triggerAction and completeAction are stable references
  // so the RAF loop's closure never captures a stale version.
  const triggerAction = useCallback((a: string) => setAction(a), []);
  const completeAction = useCallback(() => setAction(null), []);

  const value = useMemo(() => ({ action, triggerAction, completeAction }), [action, triggerAction, completeAction]);

  return <CanvasActionContext value={value}>{children}</CanvasActionContext>;
};
