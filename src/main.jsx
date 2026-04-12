import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SeyrinCharte from "./seyrin_charte.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SeyrinCharte />
  </StrictMode>
);
