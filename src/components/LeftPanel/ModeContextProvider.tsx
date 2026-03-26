import React, { useState, useMemo } from "react";
import { ModeContext, DefaultValue } from "./ModeContext";
import { type ParticleMode } from "../../lib/Mode";

export const ModeProvider = ({ children }) => {
  const [mode, setMode] = useState<ParticleMode>(DefaultValue);
  const contextValue = useMemo(() => ({ mode, setMode }), [mode]);
  return <ModeContext value={contextValue}>{children}</ModeContext>;
};
