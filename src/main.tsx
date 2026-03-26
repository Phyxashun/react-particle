// Import styles
import "./styles/styles.css";

// Import react
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Import Components
import App from "./App.tsx";
import { ModeProvider } from "./components/LeftPanel/ModeContextProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModeProvider>
      <App />
    </ModeProvider>
  </StrictMode>,
);
