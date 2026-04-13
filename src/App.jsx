import { useState } from "react";
import SeyrinCharte from "./seyrin_charte.jsx";
import SeyrinHome from "./seyrin_home.jsx";

const TABS = [
  {
    id: "charte",
    label: "Brand Guidelines",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
  },
  {
    id: "home",
    label: "Home Screen",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="12" cy="19" r="1" fill="currentColor"/>
      </svg>
    ),
  },
];

const V      = "#A87FFF";
const VS     = "#C4AAFF";
const NIGHT  = "#0C0C12";
const CARD   = "#1A1A24";
const MUTED  = "#6A6890";
const TEXT   = "#F0EEF8";

export default function App() {
  const [active, setActive] = useState("charte");

  return (
    <div style={{ minHeight: "100vh", background: NIGHT, fontFamily: "'Outfit', sans-serif" }}>

      {/* ── TOP NAV ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(12,12,18,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(168,127,255,0.1)",
        padding: "0 24px",
        display: "flex", alignItems: "center", gap: 32, height: 52,
      }}>
        {/* Logo */}
        <div style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem",
          fontWeight: 700, color: TEXT, letterSpacing: "-0.02em",
          flexShrink: 0,
        }}>
          Se<span style={{ color: VS }}>y</span>rin
          <span style={{ fontSize: "0.48rem", color: MUTED, letterSpacing: "0.18em", textTransform: "uppercase", marginLeft: 8, verticalAlign: "middle" }}>
            design system
          </span>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, padding: "4px", background: "rgba(255,255,255,0.03)", borderRadius: 10 }}>
          {TABS.map(tab => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 7,
                  padding: "6px 14px", borderRadius: 7, border: "none",
                  cursor: "pointer", transition: "all 0.2s ease",
                  background: isActive ? `${V}18` : "transparent",
                  color: isActive ? V : MUTED,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.72rem", fontWeight: 500,
                  outline: isActive ? `1px solid ${V}33` : "1px solid transparent",
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Badge version */}
        <div style={{ marginLeft: "auto", fontSize: "0.58rem", color: MUTED, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          CDA 2025
        </div>
      </nav>

      {/* ── CONTENU ── */}
      <div style={{ display: active === "charte" ? "block" : "none" }}>
        <SeyrinCharte />
      </div>
      <div style={{ display: active === "home" ? "block" : "none" }}>
        <SeyrinHome />
      </div>

    </div>
  );
}
