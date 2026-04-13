import { useState, useEffect } from "react";

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

const T = {
  violet:     "#A87FFF",
  violetSoft: "#C4AAFF",
  violetDeep: "#7C5CE8",
  night:      "#0C0C12",
  surface:    "#121218",
  card:       "#1A1A24",
  textD:      "#F0EEF8",
  secD:       "#B8B4D4",
  mutedD:     "#6A6890",
  calm:       "#A8E6C3",
  focused:    "#9EC8FF",
  stressed:   "#FFAEAE",
  tired:      "#BFC0E8",
};

// Données utilisateur simulées — toggle pour démo
const USER_NEW      = { isNew: true,  name: null,        lastEmotion: null,           lastColor: null };
const USER_EXISTING = { isNew: false, name: "Laurie",    lastEmotion: "apaisée",      lastColor: T.calm };

// Palette de couleurs émotionnelles sélectionnables
const EMOTION_COLORS = [
  { color: "#7C5CE8", label: "Calme"      },
  { color: T.calm,    label: "Apaisé·e"   },
  { color: T.focused, label: "Concentré·e"},
  { color: T.tired,   label: "Fatigué·e"  },
  { color: T.stressed,label: "Stressé·e"  },
  { color: "#FFD9A0", label: "Joyeux·se"  },
  { color: "#D4A0FF", label: "Mélancolique"},
  { color: "#FF9EC4", label: "Anxieux·se" },
];

// ── AVATAR NERI ──
const NeriAvatar = ({ size = 1, tapped = false }) => {
  const w = 90 * size;

  return (
    <div style={{
      position: "relative", width: w, height: w * 1.1,
      transform: tapped ? "scale(1.12)" : "scale(1)",
      transition: "transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)",
    }}>
      {/* Glow ambiant */}
      <div style={{
        position: "absolute", inset: -12, borderRadius: "50%",
        background: T.violetDeep, filter: "blur(24px)",
        opacity: tapped ? 0.45 : 0.22,
        transition: "opacity 0.3s ease",
      }} />
      {/* Halo secondaire */}
      <div style={{
        position: "absolute", inset: -4, borderRadius: "50%",
        background: T.violetSoft, filter: "blur(12px)",
        opacity: tapped ? 0.3 : 0.1,
        transition: "opacity 0.3s ease",
      }} />

      <svg width={w} height={w * 1.1} viewBox="0 0 90 100" fill="none" style={{ position: "relative", zIndex: 1 }}>
        {/* Étoiles corps */}
        {[[18,28],[62,22],[72,58],[14,65],[44,78],[80,38]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r={1.2} fill="white" opacity={0.55} />
        ))}
        {/* Corps */}
        <ellipse cx="45" cy="65" rx="32" ry="33" fill="url(#bodyG)" />
        {/* Oreilles */}
        <ellipse cx="18" cy="28" rx="11" ry="14" fill={T.violetDeep} opacity="0.85" />
        <ellipse cx="72" cy="28" rx="11" ry="14" fill={T.violetDeep} opacity="0.85" />
        <ellipse cx="18" cy="28" rx="6"  ry="8"  fill={T.violetSoft} opacity="0.35" />
        <ellipse cx="72" cy="28" rx="6"  ry="8"  fill={T.violetSoft} opacity="0.35" />
        {/* Tête */}
        <ellipse cx="45" cy="42" rx="29" ry="27" fill="url(#headG)" />
        {/* Yeux */}
        <ellipse cx="34" cy="40" rx="7"  ry="8"  fill="white" />
        <ellipse cx="56" cy="40" rx="7"  ry="8"  fill="white" />
        <circle  cx="36" cy="41" r="3.5" fill="#1A1A2E" />
        <circle  cx="58" cy="41" r="3.5" fill="#1A1A2E" />
        <circle  cx="37.5" cy="39.5" r="1.4" fill="white" />
        <circle  cx="59.5" cy="39.5" r="1.4" fill="white" />
        {/* Petite bouche douce */}
        <path d="M39 51 Q45 55 51 51" stroke={T.violetSoft} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
        {/* Étoile poitrine */}
        <g transform="translate(35, 68)">
          <path d="M10 2 C10.7 5.5 11 7.5 10 10 C9 7.5 9.3 5.5 10 2Z"    fill={T.violetSoft} />
          <path d="M10 18 C9.3 14.5 9 12.5 10 10 C11 12.5 10.7 14.5 10 18Z" fill={T.violetSoft} />
          <path d="M2 10 C5.5 9.3 7.5 9 10 10 C7.5 11 5.5 10.7 2 10Z"    fill={T.violetSoft} />
          <path d="M18 10 C14.5 10.7 12.5 11 10 10 C12.5 9 14.5 9.3 18 10Z" fill={T.violetSoft} />
          <circle cx="10" cy="10" r="2" fill="white" opacity="0.95" />
        </g>
        {/* Petits bras */}
        <ellipse cx="14" cy="68" rx="5.5" ry="10" fill={T.violetDeep} opacity="0.7" transform="rotate(-20 14 68)" />
        <ellipse cx="76" cy="68" rx="5.5" ry="10" fill={T.violetDeep} opacity="0.7" transform="rotate(20 76 68)" />

        <defs>
          <radialGradient id="bodyG" cx="38%" cy="32%">
            <stop offset="0%"   stopColor={T.violetSoft} stopOpacity="0.55" />
            <stop offset="100%" stopColor="#1E0A3C" />
          </radialGradient>
          <radialGradient id="headG" cx="38%" cy="32%">
            <stop offset="0%"   stopColor={T.violetSoft} stopOpacity="0.65" />
            <stop offset="100%" stopColor="#2A1250" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

// ── SÉLECTEUR COULEUR + MOT ──
const EmotionPicker = ({ selected, onSelect, word, onWordChange }) => (
  <div style={{ width: "100%" }}>
    {/* Palette de couleurs */}
    <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
      {EMOTION_COLORS.map(e => (
        <div
          key={e.color}
          onClick={() => onSelect(e)}
          style={{
            width: selected?.color === e.color ? 32 : 24,
            height: selected?.color === e.color ? 32 : 24,
            borderRadius: "50%",
            background: e.color,
            cursor: "pointer",
            border: selected?.color === e.color ? `2px solid white` : "2px solid transparent",
            boxShadow: selected?.color === e.color ? `0 0 12px ${e.color}99` : "none",
            transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
            flexShrink: 0,
          }}
        />
      ))}
    </div>
    {/* Label de la couleur sélectionnée */}
    {selected && (
      <div style={{ textAlign: "center", fontSize: "0.62rem", color: selected.color, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, marginBottom: 12, opacity: 0.85 }}>
        {selected.label}
      </div>
    )}
    {/* Input mot libre */}
    <div style={{ position: "relative" }}>
      <input
        value={word}
        onChange={e => onWordChange(e.target.value)}
        placeholder="Ou décris-le en un mot…"
        maxLength={30}
        style={{
          width: "100%", background: "rgba(255,255,255,0.04)",
          border: `1px solid ${selected ? selected.color + "44" : "rgba(255,255,255,0.08)"}`,
          borderRadius: 100, padding: "10px 16px",
          fontFamily: "'Outfit', sans-serif", fontSize: "0.82rem", fontWeight: 300,
          color: T.textD, outline: "none",
          textAlign: "center", letterSpacing: "0.02em",
          transition: "border-color 0.3s",
          boxSizing: "border-box",
        }}
      />
    </div>
  </div>
);

// ── APP PRINCIPALE ──
export default function SeyrinHome() {
  // Toggle démo : nouvel utilisateur ou existant
  const [userType, setUserType]         = useState("new");
  const user = userType === "new" ? USER_NEW : USER_EXISTING;

  const [neriTapped, setNeriTapped]     = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [emotionWord, setEmotionWord]   = useState("");
  const [showPicker, setShowPicker]     = useState(false);

  // Tap sur Neri — animation 600ms
  const handleNeriTap = () => {
    setNeriTapped(true);
    setTimeout(() => setNeriTapped(false), 600);
  };

  const accentColor = selectedEmotion?.color || T.violetSoft;

  return (
    <div style={{ minHeight: "100vh", background: "#07070D", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px", fontFamily: "'Outfit', sans-serif" }}>

      {/* iPhone */}
      <div style={{ width: 375, height: 812, background: T.night, borderRadius: 54, overflow: "hidden", position: "relative", boxShadow: "0 48px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)", display: "flex", flexDirection: "column" }}>

        {/* Orb ambiant — change selon émotion sélectionnée */}
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: accentColor, filter: "blur(160px)", opacity: 0.07, top: -150, left: "50%", transform: "translateX(-50%)", pointerEvents: "none", transition: "background 0.8s ease" }} />
        <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: T.violetDeep, filter: "blur(100px)", opacity: 0.08, bottom: -80, right: -60, pointerEvents: "none" }} />

        {/* Dynamic Island */}
        <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 120, height: 34, background: "#000", borderRadius: 20, zIndex: 20 }} />

        {/* Status bar */}
        <div style={{ height: 52, display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 28px 6px", flexShrink: 0 }}>
          <span style={{ fontSize: "0.62rem", fontWeight: 600, color: T.textD, fontFamily: "'DM Sans', sans-serif" }}>9:41</span>
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            {/* Icônes status bar simplifiées */}
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><rect x="0" y="3" width="3" height="7" rx="1" fill={T.mutedD}/><rect x="4.5" y="2" width="3" height="8" rx="1" fill={T.mutedD}/><rect x="9" y="0" width="3" height="10" rx="1" fill={T.textD}/><rect x="13.5" y="0" width="2" height="10" rx="1" fill={T.textD}/></svg>
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M6 2C8.5 2 10.7 3 12 4.7L10.5 6C9.6 4.8 7.9 4 6 4C4.1 4 2.4 4.8 1.5 6L0 4.7C1.3 3 3.5 2 6 2Z" fill={T.textD}/><path d="M6 5.5C7.4 5.5 8.6 6.1 9.4 7L7.9 8.4C7.5 7.9 6.8 7.5 6 7.5C5.2 7.5 4.5 7.9 4.1 8.4L2.6 7C3.4 6.1 4.6 5.5 6 5.5Z" fill={T.textD}/><circle cx="6" cy="10" r="1.5" fill={T.textD}/></svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke={T.mutedD}/><rect x="2" y="2" width="16" height="8" rx="2" fill={T.textD}/><path d="M23 4.5V7.5C23.8 7.2 24.5 6.4 24.5 6C24.5 5.6 23.8 4.8 23 4.5Z" fill={T.mutedD}/></svg>
          </div>
        </div>

        {/* Contenu principal */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "0 28px 0", overflowY: "auto" }}>

          {/* Toggle démo */}
          <div style={{ width: "100%", display: "flex", gap: 6, marginBottom: 24, padding: "4px", background: "rgba(255,255,255,0.04)", borderRadius: 10 }}>
            {[{k:"new",l:"Nouvel utilisateur"},{k:"existing",l:"Utilisateur existant"}].map(b => (
              <button key={b.k} onClick={() => { setUserType(b.k); setSelectedEmotion(null); setEmotionWord(""); setShowPicker(false); }} style={{
                flex: 1, padding: "7px 6px", borderRadius: 7, fontSize: "0.58rem",
                fontFamily: "'DM Sans', sans-serif", fontWeight: 500, cursor: "pointer",
                background: userType === b.k ? `${T.violet}22` : "transparent",
                border: `1px solid ${userType === b.k ? T.violet + "44" : "transparent"}`,
                color: userType === b.k ? T.violet : T.mutedD,
                transition: "all 0.2s",
              }}>{b.l}</button>
            ))}
          </div>

          {/* Logo Seyrin */}
          <div style={{ marginBottom: 8, textAlign: "center" }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.1rem", fontWeight: 700, color: T.textD, letterSpacing: "-0.02em" }}>
              Se<span style={{ color: T.violetSoft }}>y</span>rin
            </div>
            <div style={{ fontSize: "0.48rem", color: T.mutedD, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 2 }}>a quiet space</div>
          </div>

          {/* Neri — cliquable */}
          <div onClick={handleNeriTap} style={{ cursor: "pointer", marginBottom: 20, marginTop: 8 }}>
            <NeriAvatar size={1} tapped={neriTapped} />
          </div>

          {/* Message dynamique */}
          <div style={{ textAlign: "center", marginBottom: 24, maxWidth: 280 }}>
            {user.isNew ? (
              <>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.15rem", fontWeight: 700, color: T.textD, lineHeight: 1.3, marginBottom: 10, letterSpacing: "-0.01em" }}>
                  C'est ton premier moment ici.
                </p>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.82rem", fontWeight: 300, color: T.secD, lineHeight: 1.7, fontStyle: "italic" }}>
                  "Tu peux déposer ce que tu veux ici. Je suis là."
                </p>
              </>
            ) : (
              <>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", fontWeight: 700, color: T.textD, lineHeight: 1.35, marginBottom: 10, letterSpacing: "-0.01em" }}>
                  Bonjour {user.name}. 🌙
                </p>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 14px", borderRadius: 100, background: `${user.lastColor}14`, border: `1px solid ${user.lastColor}33`, marginBottom: 10 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: user.lastColor, boxShadow: `0 0 6px ${user.lastColor}` }} />
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.72rem", fontWeight: 300, color: user.lastColor }}>
                    La dernière fois tu te sentais {user.lastEmotion}
                  </span>
                </div>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.82rem", fontWeight: 300, color: T.secD, lineHeight: 1.7, fontStyle: "italic" }}>
                  "Je suis là si tu veux déposer quelque chose aujourd'hui."
                </p>
              </>
            )}
          </div>

          {/* Sélecteur état d'esprit — optionnel */}
          <div style={{ width: "100%", marginBottom: 20 }}>
            <button
              onClick={() => setShowPicker(v => !v)}
              style={{
                width: "100%", background: "transparent",
                border: `1px dashed ${showPicker ? T.violet + "66" : "rgba(255,255,255,0.1)"}`,
                borderRadius: 14, padding: "10px 16px", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                transition: "all 0.2s",
              }}
            >
              {selectedEmotion ? (
                <>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: selectedEmotion.color, boxShadow: `0 0 8px ${selectedEmotion.color}` }} />
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.78rem", fontWeight: 300, color: selectedEmotion.color }}>
                    {emotionWord || selectedEmotion.label}
                  </span>
                  <span style={{ fontSize: "0.6rem", color: T.mutedD, marginLeft: 4 }}>· modifier</span>
                </>
              ) : (
                <>
                  <span style={{ fontSize: "0.75rem", color: T.mutedD }}>✦</span>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.78rem", fontWeight: 300, color: T.mutedD }}>
                    Comment tu te sens ? <span style={{ opacity: 0.5, fontSize: "0.7rem" }}>(optionnel)</span>
                  </span>
                </>
              )}
            </button>

            {/* Picker dépliable */}
            {showPicker && (
              <div style={{ marginTop: 12, padding: "16px", background: "rgba(255,255,255,0.03)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)" }}>
                <EmotionPicker
                  selected={selectedEmotion}
                  onSelect={e => { setSelectedEmotion(e); setEmotionWord(""); }}
                  word={emotionWord}
                  onWordChange={setEmotionWord}
                />
              </div>
            )}
          </div>

        </div>

        {/* Zone basse — boutons */}
        <div style={{ padding: "12px 28px 40px", flexShrink: 0 }}>
          {/* CTA principal */}
          <button style={{
            width: "100%", padding: "15px",
            borderRadius: 100,
            background: `linear-gradient(135deg, ${T.violetDeep}, ${accentColor})`,
            border: "none", color: "white",
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem", fontWeight: 600,
            cursor: "pointer", letterSpacing: "-0.01em",
            boxShadow: `0 8px 28px ${accentColor}44`,
            transition: "all 0.3s ease",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            <span>Déposer avec Neri</span>
            <span style={{ fontSize: "1rem" }}>✦</span>
          </button>

          {/* Lien vers journal seul */}
          <button style={{ width: "100%", marginTop: 10, background: "transparent", border: "none", color: T.mutedD, fontFamily: "'Outfit', sans-serif", fontSize: "0.72rem", fontWeight: 300, cursor: "pointer", padding: "6px" }}>
            Écrire dans mon journal →
          </button>
        </div>

        {/* Home indicator */}
        <div style={{ height: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <div style={{ width: 120, height: 4, borderRadius: 100, background: "rgba(255,255,255,0.15)" }} />
        </div>

      </div>
    </div>
  );
}
