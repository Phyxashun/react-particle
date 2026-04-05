import { useMemo, useState, type ReactNode } from 'react';
import { DisplayContext } from './DisplayContext';

export const DisplayProvider = ({ children }: { children?: ReactNode }) => {
  const [showQt, setShowQt] = useState(false);
  const [showRadius, setShowRadius] = useState(false);
  const [showLinks, setShowLinks] = useState(true);

  // setShow* are stable useState setters — only the boolean values drive memoization.
  const value = useMemo(
    () => ({ showQt, showRadius, showLinks, setShowQt, setShowRadius, setShowLinks }),
    [showQt, showRadius, showLinks]
  );

  return <DisplayContext value={value}>{children}</DisplayContext>;
};
