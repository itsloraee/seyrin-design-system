import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SeyrinSite from "./seyrin_site.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SeyrinSite />
  </StrictMode>
);
