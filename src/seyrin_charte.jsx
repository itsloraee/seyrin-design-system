import { useState } from "react";

// Chargement des polices
if (typeof document !== 'undefined') {
  ["https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap",
   "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500&display=swap"
  ].forEach(url => {
    if (!document.querySelector(`link[href="${url}"]`)) {
      const l = document.createElement("link");
      l.rel = "stylesheet"; l.href = url;
      document.head.appendChild(l);
    }
  });
}

const V = "#A87FFF";
const VS = "#C4AAFF";
const VD = "#7C5CE8";
const NIGHT = "#0C0C12";
const CARD = "#1A1A24";
const TEXT_D = "#F0EEF8";
const TEXT_L = "#1A1A2E";
const MUTED_D = "#6A6890";
const MUTED_L = "#7A6EA0";
const SEC_D = "#B8B4D4";
const SEC_L = "#4A4370";
const GUIDE_DARK = "#FF5555";   // rouge vif — lisible sur fond sombre
const GUIDE2_DARK = "#00E89A";  // vert vif — lisible sur fond sombre
const GUIDE_LIGHT = "#D4000F";  // rouge très foncé — fort sur fond clair
const GUIDE2_LIGHT = "#007A40"; // vert très foncé — fort sur fond clair

const StarMark = ({ size = 1, bg = "dark" }) => {
  const s = 56 * size;
  const isDark = bg === "dark";
  return (
    <svg width={s} height={s} viewBox="0 0 56 56" fill="none">
      {isDark && <circle cx="28" cy="28" r="22" fill={V} opacity="0.06" />}
      {isDark && <circle cx="28" cy="28" r="14" fill={V} opacity="0.1" />}
      <path d="M28 5 C28.9 17 29.6 22.5 28 28 C26.4 22.5 27.1 17 28 5Z" fill={VS} />
      <path d="M28 51 C27.1 39 26.4 33.5 28 28 C29.6 33.5 28.9 39 28 51Z" fill={VS} />
      <path d="M7 28 C17.5 27.1 23 26.4 28 28 C23 29.6 17.5 28.9 7 28Z" fill={VS} />
      <path d="M49 28 C38.5 28.9 33 29.6 28 28 C33 26.4 38.5 27.1 49 28Z" fill={VS} />
      <path d="M15 15 C21 21 24.5 24.5 28 28 C24.5 24.5 21 21 15 15Z" fill={V} opacity="0.45" />
      <path d="M41 15 C35 21 31.5 24.5 28 28 C31.5 24.5 35 21 41 15Z" fill={V} opacity="0.45" />
      <path d="M15 41 C21 35 24.5 31.5 28 28 C24.5 31.5 21 35 15 41Z" fill={V} opacity="0.45" />
      <path d="M41 41 C35 35 31.5 31.5 28 28 C31.5 31.5 35 35 41 41Z" fill={V} opacity="0.45" />
      <circle cx="28" cy="28" r="5" fill={VS} opacity="0.2" />
      <circle cx="28" cy="28" r="2.5" fill="white" opacity="0.95" />
    </svg>
  );
};

const WordmarkFull = ({ size = 1, bg = "dark" }) => {
  const isDark = bg === "dark";
  const textColor = isDark ? TEXT_D : TEXT_L;
  const mutedColor = isDark ? MUTED_D : MUTED_L;
  const fs = 2.2 * size;
  const starSize = 0.38 * size;
  // Tout en un seul bloc de texte inline — police unique DM Sans pour baseline parfaite
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: `${fs}rem`,
        fontWeight: 700,
        letterSpacing: "-0.03em",
        lineHeight: 1,
        color: textColor,
        whiteSpace: "nowrap",
        position: "relative",
      }}>
        Se<span style={{ color: VS }}>y</span>r
        <span style={{ position: "relative", display: "inline-block" }}>
          ı
          <span style={{ position: "absolute", top: `-${0.62 * size}rem`, left: "50%", transform: "translateX(-50%)", pointerEvents: "none" }}>
            <StarMark size={starSize} bg={bg} />
          </span>
        </span>
        n
      </div>
      <div style={{ fontSize: `${0.58 * size}rem`, letterSpacing: "0.22em", textTransform: "uppercase", color: mutedColor, marginTop: `${6 * size}px`, fontFamily: "'DM Sans', sans-serif" }}>
        a quiet space
      </div>
    </div>
  );
};

// ── COMPOSANTS CHARTE ──

const SectionLabel = ({ children, color }) => (
  <p style={{ fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: color || V, marginBottom: 6 }}>{children}</p>
);

const SectionTitle = ({ children, color, textColor }) => (
  <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.3rem", fontWeight: 700, color: color || textColor, marginBottom: 24, lineHeight: 1.2 }}>{children}</h2>
);

const Divider = () => (
  <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(168,127,255,0.2), transparent)", margin: "48px 0" }} />
);

// Trait de repère
const Guide = ({ label, color = GUIDE, style = {} }) => (
  <div style={{ position: "absolute", display: "flex", alignItems: "center", gap: 4, ...style }}>
    <div style={{ width: "100%", height: 1, background: color, opacity: 0.7 }} />
    {label && <span style={{ fontSize: "0.55rem", color: color, letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap", opacity: 0.9 }}>{label}</span>}
  </div>
);

// Flèche double pour mesure
const Measure = ({ label, direction = "h", color = GUIDE, style = {} }) => (
  <div style={{ position: "absolute", display: "flex", alignItems: "center", justifyContent: "center", ...style }}>
    {direction === "h" ? (
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <div style={{ width: 1, height: 6, background: color, opacity: 0.8 }} />
        <div style={{ flex: 1, height: 1, background: color, opacity: 0.8 }} />
        <div style={{ width: 1, height: 6, background: color, opacity: 0.8 }} />
        <span style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", fontSize: "0.55rem", color: color, whiteSpace: "nowrap", letterSpacing: "0.06em" }}>{label}</span>
      </div>
    ) : (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
        <div style={{ width: 6, height: 1, background: color, opacity: 0.8 }} />
        <div style={{ flex: 1, width: 1, background: color, opacity: 0.8 }} />
        <div style={{ width: 6, height: 1, background: color, opacity: 0.8 }} />
        <span style={{ position: "absolute", right: -36, top: "50%", transform: "translateY(-50%)", fontSize: "0.55rem", color: color, whiteSpace: "nowrap", letterSpacing: "0.06em" }}>{label}</span>
      </div>
    )}
  </div>
);

export default function SeyrinCharte() {
  const [bg, setBg] = useState("dark");
  const isDark = bg === "dark";
  const textColor = isDark ? TEXT_D : TEXT_L;
  const mutedColor = isDark ? MUTED_D : MUTED_L;
  const secColor = isDark ? SEC_D : SEC_L;
  const cardBg = isDark ? CARD : "#E8E3FF";
  const GUIDE = isDark ? GUIDE_DARK : GUIDE_LIGHT;
  const GUIDE2 = isDark ? GUIDE2_DARK : GUIDE2_LIGHT;
  const pageBg = isDark ? NIGHT : "#F0ECFF";

  return (
    <div style={{ background: pageBg, color: textColor, fontFamily: "'Outfit', 'DM Sans', sans-serif", minHeight: "100vh", padding: "40px 28px", transition: "background 0.3s" }}>

      {/* ── HEADER ── */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div>
            <SectionLabel>Seyrin — Charte graphique</SectionLabel>
            <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "2rem", fontWeight: 700, color: textColor, marginBottom: 8 }}>
              Brand Guidelines
            </h1>
            <p style={{ fontSize: "0.85rem", color: secColor, fontWeight: 300, lineHeight: 1.7, maxWidth: 420 }}>
              Document de référence pour l'utilisation du logo, de la palette, et de la typographie Seyrin.
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {["dark", "light"].map(b => (
              <button key={b} onClick={() => setBg(b)} style={{
                background: bg === b ? `${V}22` : "transparent",
                border: `1px solid ${bg === b ? V : V + "33"}`,
                color: bg === b ? V : mutedColor,
                borderRadius: 100, padding: "6px 18px", fontSize: "0.75rem",
                cursor: "pointer", transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: 6
              }}>
                {b === "dark" ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" fill="currentColor"/></svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="4" fill="currentColor"/>
                    {[0,45,90,135,180,225,270,315].map((deg, i) => {
                      const rad = deg * Math.PI / 180;
                      const x1 = 12 + 7 * Math.cos(rad), y1 = 12 + 7 * Math.sin(rad);
                      const x2 = 12 + 9 * Math.cos(rad), y2 = 12 + 9 * Math.sin(rad);
                      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>;
                    })}
                  </svg>
                )}
                {b === "dark" ? "Sombre" : "Clair"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── 01 CONSTRUCTION DU LOGO ── */}
      <div style={{ marginBottom: 52 }}>
        <SectionLabel>01 — Construction</SectionLabel>
        <SectionTitle textColor={textColor}>Anatomie & repères</SectionTitle>

        <div style={{ background: cardBg, borderRadius: 20, padding: "48px 32px", border: `1px solid rgba(168,127,255,0.1)` }}>
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap", alignItems: "flex-start" }}>

            {/* Logo avec repères */}
            <div style={{ position: "relative", width: 260, height: 160, flexShrink: 0 }}>
              {/* Logo centré */}
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <WordmarkFull size={0.9} bg={bg} />
              </div>

              {/* Ligne baseline */}
              <div style={{ position: "absolute", bottom: 28, left: 0, right: 0, height: 1, background: GUIDE, opacity: isDark ? 0.5 : 0.9, borderTop: `1px dashed ${GUIDE}` }} />
              <span style={{ position: "absolute", bottom: 20, right: 0, fontSize: "0.5rem", color: GUIDE, letterSpacing: "0.08em", textTransform: "uppercase" }}>Baseline</span>

              {/* Ligne cap height */}
              <div style={{ position: "absolute", top: 18, left: 0, right: 0, borderTop: `1px dashed ${GUIDE}`, opacity: isDark ? 0.5 : 0.9 }} />
              <span style={{ position: "absolute", top: 10, right: 0, fontSize: "0.5rem", color: GUIDE, letterSpacing: "0.08em", textTransform: "uppercase" }}>Cap height</span>

              {/* Zone centre vertical */}
              <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 1, borderLeft: isDark ? `1px dashed rgba(107,255,184,0.4)` : `1px dashed rgba(0,122,64,0.7)` }} />

              {/* Axe horizontal */}
              <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, borderTop: isDark ? `1px dashed rgba(107,255,184,0.3)` : `1px dashed rgba(0,122,64,0.5)` }} />
            </div>

            {/* Légende anatomie */}
            <div style={{ flex: 1, minWidth: 200, display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { color: VS, label: "y coloré", desc: "Violet Soft #C4AAFF — ancre chromatique" },
                { color: V, label: "Étoile ✦", desc: "4 branches effilées — remplace le point du i" },
                { color: GUIDE, label: "Baseline", desc: "Alignement texte + slogan" },
                { color: GUIDE2, label: "Axes", desc: "Centrage horizontal & vertical" },
                { color: "#B8B4D4", label: "DM Sans 700", desc: "Logo & titres — Google Fonts" },
                { color: MUTED_D, label: "Slogan", desc: "0.58em — tracking 0.22em — uppercase" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color, marginTop: 5, flexShrink: 0 }} />
                  <div>
                    <span style={{ fontSize: "0.78rem", fontWeight: 500, color: textColor }}>{item.label}</span>
                    <span style={{ fontSize: "0.72rem", color: mutedColor }}> — {item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 02 ZONE DE PROTECTION ── */}
      <div style={{ marginBottom: 52 }}>
        <SectionLabel>02 — Zone de protection</SectionLabel>
        <SectionTitle textColor={textColor}>Clear zone — Espace minimal</SectionTitle>

        <div style={{ background: cardBg, borderRadius: 20, padding: "48px 32px", border: `1px solid rgba(168,127,255,0.1)` }}>
          <p style={{ fontSize: "0.82rem", color: secColor, marginBottom: 36, fontWeight: 300, lineHeight: 1.7, maxWidth: 480 }}>
            La zone de protection correspond à la hauteur du "S" de Seyrin sur chaque côté. Aucun autre élément visuel ne peut empiéter dans cet espace.
          </p>

          <div style={{ display: "inline-flex", position: "relative", padding: "40px" }}>
            {/* Zone de protection — tirets verts */}
            <div style={{ position: "absolute", inset: 0, border: `1.5px dashed ${GUIDE2}`, borderRadius: 8, opacity: isDark ? 0.6 : 1 }} />

            {/* Mesures */}
            {/* Haut */}
            <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 1, height: 40, background: GUIDE2, opacity: isDark ? 0.6 : 1 }} />
              <span style={{ fontSize: "0.5rem", color: GUIDE2, letterSpacing: "0.08em", position: "absolute", top: 10, left: 8, whiteSpace: "nowrap" }}>1× hauteur "S"</span>
            </div>
            {/* Bas */}
            <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 1, height: 40, background: GUIDE2, opacity: isDark ? 0.6 : 1 }} />
            </div>
            {/* Gauche */}
            <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)" }}>
              <div style={{ height: 1, width: 40, background: GUIDE2, opacity: isDark ? 0.6 : 1 }} />
            </div>
            {/* Droite */}
            <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)" }}>
              <div style={{ height: 1, width: 40, background: GUIDE2, opacity: isDark ? 0.6 : 1 }} />
            </div>

            {/* Logo */}
            <WordmarkFull size={1} bg={bg} />
          </div>

          <div style={{ marginTop: 24, display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ width: 16, height: 1, borderTop: `1.5px dashed ${GUIDE2}`, opacity: isDark ? 0.8 : 1 }} />
            <span style={{ fontSize: "0.72rem", color: mutedColor }}>Zone de protection — aucun élément ne peut entrer dans cet espace</span>
          </div>
        </div>
      </div>

      {/* ── 03 TAILLES MINIMALES ── */}
      <div style={{ marginBottom: 52 }}>
        <SectionLabel>03 — Tailles minimales</SectionLabel>
        <SectionTitle textColor={textColor}>Limites d'utilisation</SectionTitle>

        <div style={{ background: cardBg, borderRadius: 20, padding: "40px 32px", border: `1px solid rgba(168,127,255,0.1)` }}>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-end" }}>
            {[
              { size: 0.32, label: "16px", sub: "Favicon uniquement\n(icône seule)", ok: true, iconOnly: true },
              { size: 0.5, label: "24px", sub: "Minimum absolu\n(icône seule)", ok: true, iconOnly: true },
              { size: 0.65, label: "32px", sub: "Minimum\nwordmark", ok: true },
              { size: 0.85, label: "40px", sub: "Usage standard", ok: true },
              { size: 1.1, label: "56px+", sub: "Taille recommandée", ok: true, recommended: true },
            ].map(({ size, label, sub, ok, iconOnly, recommended }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <div style={{ position: "relative" }}>
                  <div style={{
                    background: isDark ? NIGHT : "#F4F1FF",
                    border: `1px solid ${recommended ? V : "rgba(168,127,255,0.15)"}`,
                    borderRadius: 14,
                    padding: iconOnly ? "16px" : "16px 20px",
                    display: "flex", flexDirection: "column", alignItems: "center",
                    boxShadow: recommended ? `0 0 16px ${V}22` : "none"
                  }}>
                    <StarMark size={size * 0.9} bg={bg} />
                    {!iconOnly && size >= 0.65 && (
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: `${size * 1.4}rem`, color: textColor, letterSpacing: "-0.03em", fontWeight: 700, marginTop: 4 }}>
                        Se<span style={{ color: VS }}>y</span>rin
                      </div>
                    )}
                  </div>
                  {recommended && (
                    <div style={{ position: "absolute", top: -10, right: -10, background: V, borderRadius: 100, padding: "2px 8px", fontSize: "0.5rem", color: "white", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                      Recommandé
                    </div>
                  )}
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 500, color: textColor }}>{label}</div>
                  <div style={{ fontSize: "0.6rem", color: mutedColor, lineHeight: 1.5, whiteSpace: "pre-line" }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Divider />

      {/* ── 04 PALETTE ── */}
      <div style={{ marginBottom: 52 }}>
        <SectionLabel>04 — Palette de couleurs</SectionLabel>
        <SectionTitle textColor={textColor}>Système chromatique</SectionTitle>

        {/* Primaires */}
        <p style={{ fontSize: "0.65rem", color: mutedColor, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Couleurs primaires</p>
        <div style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
          {[
            { name: "Night", hex: "#0C0C12", use: "Fond principal", bg: "#0C0C12", text: TEXT_D },
            { name: "Surface", hex: "#121218", use: "Fond secondaire", bg: "#121218", text: TEXT_D },
            { name: "Card", hex: "#1A1A24", use: "Cartes / blocs", bg: "#1A1A24", text: TEXT_D },
            { name: "Seyrin Violet", hex: "#A87FFF", use: "Accent principal", bg: "#A87FFF", text: "#1A1A2E" },
            { name: "Violet Deep", hex: "#7C5CE8", use: "CTA, dégradés", bg: "#7C5CE8", text: TEXT_D },
            { name: "Violet Soft", hex: "#C4AAFF", use: "y, textes accentués", bg: "#C4AAFF", text: "#1A1A2E" },
          ].map(s => (
            <div key={s.hex} style={{ flex: "1 1 100px", minWidth: 100, borderRadius: 14, overflow: "hidden", background: cardBg, border: `1px solid rgba(168,127,255,0.1)` }}>
              <div style={{ height: 64, background: s.bg, position: "relative", display: "flex", alignItems: "flex-end", padding: "0 10px 6px" }}>
                <span style={{ fontSize: "0.55rem", fontFamily: "monospace", color: s.text, opacity: 0.8, letterSpacing: "0.04em" }}>{s.hex}</span>
              </div>
              <div style={{ padding: "10px 12px" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 500, color: textColor }}>{s.name}</div>
                <div style={{ fontSize: "0.62rem", color: mutedColor, marginTop: 2 }}>{s.use}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Émotionnelles */}
        <p style={{ fontSize: "0.65rem", color: mutedColor, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Couleurs émotionnelles</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[
            { name: "Stressé", hex: "#FFAEAE", bg: "#FFAEAE" },
            { name: "Fatigué", hex: "#BFC0E8", bg: "#BFC0E8" },
            { name: "Apaisé", hex: "#A8E6C3", bg: "#A8E6C3" },
            { name: "Concentré", hex: "#9EC8FF", bg: "#9EC8FF" },
          ].map(s => (
            <div key={s.hex} style={{ flex: "1 1 80px", borderRadius: 14, overflow: "hidden", background: cardBg, border: `1px solid rgba(168,127,255,0.1)` }}>
              <div style={{ height: 44, background: `${s.bg}44` }} />
              <div style={{ padding: "8px 12px" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 500, color: textColor }}>{s.name}</div>
                <div style={{ fontSize: "0.58rem", color: mutedColor, fontFamily: "monospace" }}>{s.hex}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ── 05 TYPOGRAPHIE ── */}
      <div style={{ marginBottom: 52 }}>
        <SectionLabel>05 — Typographie</SectionLabel>
        <SectionTitle textColor={textColor}>Hiérarchie & usage</SectionTitle>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { role: "Logo / Titres forts", font: "DM Sans", weight: "700", size: "clamp(2rem, 6vw, 4rem)", use: "Logo, titres H1, CTA", sample: "Seyrin", color: textColor, style: "normal" },
            { role: "Titres interface", font: "DM Sans", weight: "600", size: "1.3rem", use: "H2, titres écrans, onboarding", sample: "Comment tu te sens ?", color: textColor, style: "normal" },
            { role: "Body Regular", font: "Outfit", weight: "400", size: "1rem", use: "Texte principal, interface", sample: "Bienvenue dans ton espace. Ici, tu déposes.", color: textColor, style: "normal" },
            { role: "Body Light", font: "Outfit", weight: "300", size: "0.9rem", use: "Descriptions, contenu secondaire", sample: "Tu n'es pas jugé. Tu n'es pas analysé.", color: secColor, style: "normal" },
            { role: "Label", font: "DM Sans", weight: "500", size: "0.65rem", use: "Labels, micro-textes, uppercase", sample: "A QUIET SPACE", color: mutedColor, style: "normal", upper: true },
          ].map(item => (
            <div key={item.role} style={{ background: cardBg, borderRadius: 14, padding: "20px 24px", border: `1px solid rgba(168,127,255,0.08)`, display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ width: 140, flexShrink: 0 }}>
                <div style={{ fontSize: "0.65rem", color: V, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{item.role}</div>
                <div style={{ fontSize: "0.62rem", color: mutedColor, lineHeight: 1.5 }}>{item.font}<br />{item.weight} · {item.size}</div>
              </div>
              <div style={{ flex: 1, minWidth: 160 }}>
                <span style={{ fontFamily: item.font === "Outfit" ? "'Outfit', sans-serif" : "'DM Sans', sans-serif", fontSize: item.size, fontWeight: item.weight.includes("300") ? 300 : item.weight.includes("500") ? 500 : 400, color: item.color, fontStyle: item.style, textTransform: item.upper ? "uppercase" : "none", letterSpacing: item.upper ? "0.15em" : "normal" }}>
                  {item.sample}
                </span>
              </div>
              <div style={{ fontSize: "0.62rem", color: mutedColor, maxWidth: 160, lineHeight: 1.5, fontStyle: "italic" }}>{item.use}</div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ── 06 USAGES CORRECTS / INCORRECTS ── */}
      <div style={{ marginBottom: 52 }}>
        <SectionLabel>06 — Règles d'usage</SectionLabel>
        <SectionTitle textColor={textColor}>À faire & à éviter</SectionTitle>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {/* DO */}
          <div style={{ background: "rgba(168,230,195,0.05)", border: "1px solid rgba(168,230,195,0.2)", borderRadius: 16, padding: "24px" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 20 }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#A8E6C3", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5 L4 7 L8 3" stroke="#0C0C12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "#A8E6C3", letterSpacing: "0.08em", textTransform: "uppercase" }}>À faire</span>
            </div>
            {[
              "Utiliser le logo sur fond sombre ou fond clair dédié",
              "Respecter la zone de protection",
              "Utiliser les couleurs de la palette officielle",
              "Garder le y en Violet Soft #C4AAFF",
              "Utiliser Playfair Display pour les titres",
              "Conserver les proportions du logo",
            ].map(item => (
              <div key={item} style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "flex-start" }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#A8E6C3", marginTop: 7, flexShrink: 0 }} />
                <span style={{ fontSize: "0.78rem", color: secColor, lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>

          {/* DON'T */}
          <div style={{ background: "rgba(255,174,174,0.05)", border: "1px solid rgba(255,174,174,0.2)", borderRadius: 16, padding: "24px" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 20 }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#FFAEAE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3 3 L7 7 M7 3 L3 7" stroke="#0C0C12" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "#FFAEAE", letterSpacing: "0.08em", textTransform: "uppercase" }}>À éviter</span>
            </div>
            {[
              "Déformer ou étirer le logo",
              "Changer la couleur du y ou de l'étoile",
              "Placer le logo sur un fond trop chargé",
              "Utiliser des polices non prévues dans la charte",
              "Réduire en dessous de la taille minimale",
              "Ajouter des effets (ombre portée, contour…)",
            ].map(item => (
              <div key={item} style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "flex-start" }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#FFAEAE", marginTop: 7, flexShrink: 0 }} />
                <span style={{ fontSize: "0.78rem", color: secColor, lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(168,127,255,0.2), transparent)", marginBottom: 32 }} />
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.6rem", fontWeight: 700, color: textColor, marginBottom: 6 }}>
          Se<span style={{ color: VS }}>y</span>rin
        </div>
        <p style={{ fontSize: "0.65rem", color: mutedColor, letterSpacing: "0.12em" }}>Brand Guidelines · Laurie Thélineau · CDA 2025</p>
      </div>

    </div>
  );
}
