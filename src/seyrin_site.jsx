// ============================================================
// SEYRIN — Design System & Documentation
// Auteure : Laurie Thélineau · CDA 2025
// ------------------------------------------------------------
// Ce fichier est le document de référence unique du projet.
// Il contient 5 sections navigables via une sidebar :
//   1. Accueil      → Vision produit, philosophie, boucle émotionnelle
//   2. Charte       → Logo, palette, typographie, règles d'usage
//   3. Identité     → Composants UI, sélecteur émotionnel, calendrier
//   4. Onboarding   → Les 3 écrans interactifs
//   5. Specs Figma  → Maquette annotée avec dimensions
// ============================================================

import { useState, useEffect } from "react";

// ── CHARGEMENT DES POLICES GOOGLE FONTS ──────────────────────
// On injecte les balises <link> dans le <head> dynamiquement.
// La vérification évite les doublons si le composant re-render.
// DM Sans 700   → logo, titres, boutons
// Outfit 300/400/500 → corps de texte, interface
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

  if (!document.querySelector('style[data-seyrin-site]')) {
    const s = document.createElement("style");
    s.setAttribute('data-seyrin-site', '');
    s.textContent = `
      @keyframes sparkN    { 0%,100%{opacity:0;transform:scale(0)} 50%{opacity:.85;transform:scale(1)} }
      @keyframes floatNeri { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    `;
    document.head.appendChild(s);
  }
}

// ── DESIGN TOKENS ────────────────────────────────────────────
// Toutes les couleurs du système en un seul endroit.
// Si une couleur change, elle change partout dans l'app.
const T = {
  // Palette Seyrin Violet
  violet:     "#A87FFF", // accent principal — boutons, focus, liens
  violetSoft: "#C4AAFF", // le "y" du logo, textes accentués
  violetDeep: "#7C5CE8", // dégradés, CTA, fonds riches

  // Fonds dark mode (du plus sombre au plus clair)
  night:   "#0C0C12", // fond principal de la page
  surface: "#121218", // fond sidebar, surfaces secondaires
  card:    "#1A1A24", // fond des cards et blocs

  // Textes dark / light mode
  textD: "#F0EEF8", // texte principal fond sombre
  textL: "#1A1A2E", // texte principal fond clair
  secD:  "#B8B4D4", // texte secondaire fond sombre
  secL:  "#4A4370", // texte secondaire fond clair
  mutedD: "#6A6890", // texte discret fond sombre (labels, placeholders)
  mutedL: "#7A6EA0", // texte discret fond clair

  // Couleurs émotionnelles — palette de base (extensible par l'utilisateur)
  stressed: "#FFAEAE", // rouge pâle → stress, tension
  tired:    "#BFC0E8", // bleu lavande → fatigue, mélancolie
  calm:     "#A8E6C3", // vert doux → apaisement, sérénité
  focused:  "#9EC8FF", // bleu ciel → concentration, clarté
};

// ── NERI — États émotionnels ─────────────────────────────────
const NERI_STATES = {
  accueil:       { g1: "#E8D5FF", g2: "#C4A8FF", g3: "#A78BFA", glow: "#C4A8FF", dot: "#B49BF0", label: "Accueil"       },
  ecoute:        { g1: "#C8E8FF", g2: "#90C8F8", g3: "#60A8F0", glow: "#90C8F8", dot: "#70B4F0", label: "Écoute"        },
  empathie:      { g1: "#FFD8E8", g2: "#FFB0C8", g3: "#F888A8", glow: "#FFB0C8", dot: "#F890B0", label: "Empathie"      },
  encouragement: { g1: "#D8F0E8", g2: "#A0D8C0", g3: "#68C0A0", glow: "#A0D8C0", dot: "#80C8A8", label: "Encouragement" },
};

/**
 * NeriOrb — Mascotte Seyrin, orbe pastel lumineux
 * Gradient rosé/bleu/lilas selon l'état émotionnel détecté.
 * Clignotement naturel via timer React (pas CSS).
 * @param {string}  state  - État émotionnel (accueil/ecoute/empathie/encouragement)
 * @param {number}  size   - Multiplicateur de taille (1 = 130px)
 * @param {boolean} tapped - Animation de tap (scale 1.1)
 */
const NeriOrb = ({ state = "accueil", size = 1, tapped = false }) => {
  const s = NERI_STATES[state];
  const base = 130 * size;
  const [eyeOpen, setEyeOpen] = useState(true);

  useEffect(() => {
    let t;
    const scheduleBlink = () => {
      t = setTimeout(() => {
        setEyeOpen(false);
        setTimeout(() => { setEyeOpen(true); scheduleBlink(); }, 180);
      }, 3000 + Math.random() * 2000);
    };
    scheduleBlink();
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      position: "relative", width: base * 1.6, height: base * 1.6,
      display: "flex", alignItems: "center", justifyContent: "center",
      transform: tapped ? "scale(1.1)" : "scale(1)",
      transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1)",
    }}>
      <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: base*.9, height: base*.18, borderRadius: "50%", background: s.glow, filter: `blur(${base*.1}px)`, opacity: .3 }}/>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `radial-gradient(circle, ${s.glow}44 0%, transparent 70%)` }}/>
      <div style={{
        width: base, height: base,
        background: `radial-gradient(circle at 35% 30%, ${s.g1} 0%, ${s.g2} 48%, ${s.g3} 100%)`,
        borderRadius: "58% 42% 52% 48% / 50% 54% 46% 50%",
        boxShadow: `0 ${base*.06}px ${base*.32}px ${s.glow}66, inset 0 ${base*.06}px ${base*.18}px rgba(255,255,255,.55)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", flexDirection: "column", gap: base * .1,
        transition: "background .8s ease, box-shadow .8s ease",
      }}>
        <div style={{ position: "absolute", top: "12%", left: "18%", width: "42%", height: "32%", background: "radial-gradient(ellipse, rgba(255,255,255,.7) 0%, transparent 80%)", borderRadius: "50%", pointerEvents: "none" }}/>
        <div style={{ display: "flex", gap: base * .17, position: "relative", zIndex: 1, marginTop: base * .08 }}>
          {[0,1].map(i => (
            <div key={i} style={{ width: base*.1, height: eyeOpen ? base*.125 : base*.016, borderRadius: "50%", background: "rgba(30,20,60,.82)", transition: "height 0.09s ease-in-out", position: "relative", boxShadow: "inset -1px -1px 2px rgba(255,255,255,.2)" }}>
              {eyeOpen && <div style={{ position: "absolute", top: "14%", right: "16%", width: "30%", height: "30%", borderRadius: "50%", background: "white", opacity: .9 }}/>}
            </div>
          ))}
        </div>
        <svg width={base*.22} height={base*.1} viewBox="0 0 22 10" fill="none" style={{ position: "relative", zIndex: 1 }}>
          {state === "accueil" || state === "encouragement"
            ? <path d="M3 3 Q11 10 19 3" stroke="rgba(30,20,60,.55)" strokeWidth="2" strokeLinecap="round" fill="none"/>
            : <path d="M5 6 Q11 9 17 6" stroke="rgba(30,20,60,.45)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
          }
        </svg>
        {[[.14,.2],[.82,.14],[.88,.75],[.12,.78],[.52,.92]].map(([rx,ry],i) => (
          <div key={i} style={{ position: "absolute", left: `${rx*100}%`, top: `${ry*100}%`, fontSize: base*.065, color: "rgba(255,255,255,.85)", animation: `sparkN ${2.2+i*.3}s ease-in-out infinite`, animationDelay: `${i*.4}s` }}>✦</div>
        ))}
      </div>
    </div>
  );
};
// Ces composants sont réutilisés dans toutes les sections.
// Ils reçoivent leurs props mais ne gèrent pas d'état.

/**
 * StarMark — L'étoile signature de Seyrin ✦
 * Remplace le point du "i" dans le logo.
 * 4 branches principales + 4 branches diagonales semi-transparentes.
 * @param {number} size   - Multiplicateur de taille (1 = 56px)
 * @param {string} color  - Couleur des branches (défaut: violetSoft)
 * @param {bool}   glow   - Ajoute des halos concentriques (dark mode)
 */
const StarMark = ({ size = 1, color = "#C4AAFF", glow = false }) => {
  const s = 56 * size; // taille finale en pixels
  return (
    <svg width={s} height={s} viewBox="0 0 56 56" fill="none">
      {/* Halos concentriques — visibles uniquement en dark mode */}
      {glow && <circle cx="28" cy="28" r="22" fill="#A87FFF" opacity="0.06" />}
      {glow && <circle cx="28" cy="28" r="14" fill="#A87FFF" opacity="0.1" />}
      {/* 4 branches cardinales (N, S, O, E) — pleines */}
      <path d="M28 5 C28.9 17 29.6 22.5 28 28 C26.4 22.5 27.1 17 28 5Z" fill={color} />
      <path d="M28 51 C27.1 39 26.4 33.5 28 28 C29.6 33.5 28.9 39 28 51Z" fill={color} />
      <path d="M7 28 C17.5 27.1 23 26.4 28 28 C23 29.6 17.5 28.9 7 28Z" fill={color} />
      <path d="M49 28 C38.5 28.9 33 29.6 28 28 C33 26.4 38.5 27.1 49 28Z" fill={color} />
      {/* 4 branches diagonales — semi-transparentes (opacity 0.45) */}
      <path d="M15 15 C21 21 24.5 24.5 28 28 C24.5 24.5 21 21 15 15Z" fill={color} opacity="0.45" />
      <path d="M41 15 C35 21 31.5 24.5 28 28 C31.5 24.5 35 21 41 15Z" fill={color} opacity="0.45" />
      <path d="M15 41 C21 35 24.5 31.5 28 28 C24.5 31.5 21 35 15 41Z" fill={color} opacity="0.45" />
      <path d="M41 41 C35 35 31.5 31.5 28 28 C31.5 31.5 35 35 41 41Z" fill={color} opacity="0.45" />
      {/* Centre : halo doux + point blanc brillant */}
      <circle cx="28" cy="28" r="5" fill={color} opacity="0.2" />
      <circle cx="28" cy="28" r="2.5" fill="white" opacity="0.95" />
    </svg>
  );
};

/**
 * WordmarkFull — Logo complet avec étoile et slogan
 * Affiche "Seyrin" avec le y coloré, l'étoile sur le i,
 * et "a safe space in your pocket" en dessous.
 * @param {number} size   - Multiplicateur de taille (1 = 2.2rem)
 * @param {bool}   isDark - Adapte les couleurs selon le thème
 */
const WordmarkFull = ({ size = 1, isDark = true }) => {
  const textColor  = isDark ? T.textD : T.textL;
  const mutedColor = isDark ? T.mutedD : T.mutedL;
  const fs = 2.2 * size;       // taille du nom
  const starSize = 0.38 * size; // taille de l'étoile relative au nom

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
      {/* Ligne principale : Se[y]r[ı★]n */}
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
        Se
        {/* "y" en Violet Soft — ancre chromatique du logo */}
        <span style={{ color: T.violetSoft }}>y</span>
        r
        {/* "ı" sans point — l'étoile se positionne en absolu dessus */}
        <span style={{ position: "relative", display: "inline-block" }}>
          ı
          <span style={{
            position: "absolute",
            top: `-${0.62 * size}rem`, // remonte au-dessus du ı
            left: "50%",
            transform: "translateX(-50%)",
            pointerEvents: "none",
          }}>
            <StarMark size={starSize} color={T.violetSoft} glow={isDark} />
          </span>
        </span>
        n
      </div>
      {/* Slogan — uppercase, tracking large, discret */}
      <div style={{
        fontSize: `${0.58 * size}rem`,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: mutedColor,
        marginTop: `${6 * size}px`,
        fontFamily: "'DM Sans', sans-serif",
      }}>
        a safe space in your pocket
      </div>
    </div>
  );
};

/**
 * Chip — Étiquette de section (badge pill)
 * Utilisée dans le header de chaque page pour indiquer la section active.
 */
const Chip = ({ children }) => (
  <span style={{
    fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.16em",
    textTransform: "uppercase", padding: "3px 10px", borderRadius: 100,
    background: `${T.violet}18`, color: T.violet,
    border: `1px solid ${T.violet}33`,
    fontFamily: "'DM Sans', sans-serif",
  }}>
    {children}
  </span>
);

/**
 * SLabel — Label de section (surtitre)
 * Petit texte uppercase violet au-dessus des titres de rubrique.
 */
const SLabel = ({ children }) => (
  <p style={{
    fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.2em",
    textTransform: "uppercase", color: T.violet, marginBottom: 6,
    fontFamily: "'DM Sans', sans-serif",
  }}>
    {children}
  </p>
);

/**
 * STitle — Titre de rubrique (h2)
 * Utilise th.text pour s'adapter au thème dark/light.
 */
const STitle = ({ children, th }) => (
  <h2 style={{
    fontFamily: "'DM Sans', sans-serif", fontSize: "1.4rem", fontWeight: 700,
    color: th.text, marginBottom: 24, lineHeight: 1.2,
  }}>
    {children}
  </h2>
);

/**
 * Divider — Séparateur de section
 * Ligne horizontale avec fondu violet au centre.
 */
const Divider = () => (
  <div style={{
    height: 1,
    background: "linear-gradient(90deg, transparent, rgba(168,127,255,0.2), transparent)",
    margin: "44px 0",
  }} />
);

/**
 * Card — Conteneur générique
 * Fond card, border-radius 16, border violet très légère.
 * Accepte un style supplémentaire pour les variantes (couleurs, bg custom).
 */
const Card = ({ children, th, style = {} }) => (
  <div style={{
    background: th.card, borderRadius: 16, padding: "24px",
    border: "1px solid rgba(168,127,255,0.08)",
    ...style, // permet de surcharger le style depuis l'extérieur
  }}>
    {children}
  </div>
);

// ── CONFIGURATION NAVIGATION ─────────────────────────────────
// Tableau des sections — chaque item génère un bouton dans la sidebar.
// id       → clé unique pour le state actif
// label    → texte affiché dans la nav
// icon     → caractère unicode décoratif
const NAV = [
  { id: "accueil",    label: "Accueil",      icon: "◈" },
  { id: "charte",     label: "Charte",       icon: "◉" },
  { id: "identite",   label: "Identité",     icon: "◎" },
  { id: "onboarding", label: "Onboarding",   icon: "▷" },
  { id: "specs",      label: "Specs Figma",  icon: "⊞" },
];

// ══════════════════════════════════════════════════════════════
// SECTION 1 : ACCUEIL
// Vision produit, philosophie, boucle émotionnelle, stack tech.
// ══════════════════════════════════════════════════════════════
function SectionAccueil({ th }) {
  return (
    <div>

      {/* ── Hero centré avec logo et tagline ── */}
      <div style={{ textAlign: "center", padding: "60px 0 48px", position: "relative" }}>
        {/* Orb décoratif en arrière-plan — flou violet centré */}
        <div style={{
          position: "absolute", width: 400, height: 400, borderRadius: "50%",
          background: T.violetDeep, filter: "blur(120px)", opacity: 0.12,
          top: -80, left: "50%", transform: "translateX(-50%)", pointerEvents: "none",
        }} />
        {/* Logo Seyrin complet */}
        <div style={{ marginBottom: 24, display: "inline-block" }}>
          <WordmarkFull size={1.2} isDark={th.isDark} />
        </div>

        {/* Neri — mascotte centrée avec animation float */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <div style={{ animation: "floatNeri 5s ease-in-out infinite" }}>
            <NeriOrb state="accueil" size={0.75} />
          </div>
        </div>
        {/* Étymologie et baseline */}
        <p style={{
          fontFamily: "'Outfit', sans-serif", fontSize: "1rem", fontWeight: 300,
          color: th.sec, lineHeight: 1.8, maxWidth: 460, margin: "0 auto 32px",
        }}>
          Du latin <em style={{ color: T.violetSoft }}>serenus</em> — ciel calme et dégagé.<br />
          Un espace pour déposer, observer, évoluer.
        </p>
        {/* Phrase manifeste en pill */}
        <div style={{
          display: "inline-flex", padding: "10px 20px", borderRadius: 100,
          border: `1px solid ${T.violet}33`, background: `${T.violet}0A`,
        }}>
          <span style={{
            fontSize: "0.72rem", color: T.violet,
            fontFamily: "'DM Sans', sans-serif", fontWeight: 500, letterSpacing: "0.08em",
          }}>
            Seyrin ne donne pas de réponses. Il reflète.
          </span>
        </div>
      </div>

      <Divider />

      {/* ── Intention fondamentale ── */}
      {/* Documente la décision produit centrale : "être accueilli" */}
      <div style={{ marginBottom: 48 }}>
        <SLabel>Intention fondamentale</SLabel>
        <STitle th={th}>Être accueilli</STitle>
        {/* Card légèrement teintée violet pour mettre en valeur */}
        <Card th={th} style={{
          borderColor: `${T.violet}33`,
          background: th.isDark ? `${T.violet}08` : `${T.violet}0A`,
        }}>
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontSize: "1.05rem",
            fontWeight: 300, color: th.sec, lineHeight: 1.9, maxWidth: 560,
          }}>
            Dans les 30 premières secondes, l'utilisateur doit ressentir une seule chose :<br />
            <span style={{ color: th.text, fontWeight: 400 }}>il est accueilli.</span>
          </p>
          {/* Filtre de décision — citation posée comme règle de design */}
          <div style={{
            marginTop: 20, padding: "16px 20px", borderRadius: 12,
            background: th.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
            border: `1px solid rgba(168,127,255,0.1)`,
          }}>
            <p style={{
              fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem",
              fontWeight: 300, color: th.muted, lineHeight: 1.8, fontStyle: "italic",
            }}>
              "Est-ce que ça accueille, ou est-ce que ça demande quelque chose à l'utilisateur ?"<br />
              <span style={{ fontSize: "0.75rem", opacity: 0.7 }}>— filtre de décision pour chaque feature</span>
            </p>
          </div>
        </Card>
      </div>

      {/* ── La boucle émotionnelle ── */}
      {/* 4 étapes connectées par des flèches : Déposer → Colorier → Étiqueter → Contempler */}
      <div style={{ marginBottom: 48 }}>
        <SLabel>Cœur du produit</SLabel>
        <STitle th={th}>La boucle émotionnelle</STitle>
        {/* Flex row avec flèches entre chaque card */}
        <div style={{ display: "flex", gap: 0, alignItems: "stretch", flexWrap: "wrap" }}>
          {[
            { num: "01", name: "Déposer",    desc: "Entrée libre, sans format imposé. Aucune question avant d'écrire.",                                        color: T.violetSoft, icon: "✦" },
            { num: "02", name: "Colorier",   desc: "L'utilisateur choisit une couleur et lui donne son propre nom. Pas de catégories imposées.",               color: T.calm,       icon: "◉" },
            { num: "03", name: "Étiqueter",  desc: "Des tags libres, dans son propre vocabulaire. Seyrin apprend son langage, pas l'inverse.",                color: T.focused,    icon: "◈" },
            { num: "04", name: "Contempler", desc: "Récap hebdo, mensuel, annuel. Un miroir de soi, construit avec ses propres mots et couleurs.",            color: T.tired,      icon: "◎" },
          ].map((p, i, arr) => (
            <div key={p.num} style={{ display: "flex", alignItems: "stretch", flex: "1 1 180px" }}>
              {/* Card de chaque étape avec border colorée selon l'étape */}
              <Card th={th} style={{ flex: 1, borderColor: `${p.color}22` }}>
                <div style={{ fontSize: "1.2rem", marginBottom: 12, color: p.color }}>{p.icon}</div>
                <div style={{ fontSize: "0.58rem", color: p.color, letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, marginBottom: 8, opacity: 0.8 }}>{p.num}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", fontWeight: 700, color: th.text, marginBottom: 10 }}>{p.name}</div>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", fontWeight: 300, color: th.sec, lineHeight: 1.7 }}>{p.desc}</p>
              </Card>
              {/* Flèche de liaison entre les étapes (pas après la dernière) */}
              {i < arr.length - 1 && (
                <div style={{ display: "flex", alignItems: "center", padding: "0 4px", color: th.muted, fontSize: "0.8rem", flexShrink: 0 }}>→</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Différenciation : Ton langage vs les autres ── */}
      {/* Tableau comparatif 2 colonnes : concurrents vs Seyrin */}
      <div style={{ marginBottom: 48 }}>
        <SLabel>Différenciation clé</SLabel>
        <STitle th={th}>Ton langage, pas le nôtre</STitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {/* Colonne gauche : ce que font les concurrents */}
          <Card th={th} style={{ borderColor: "rgba(255,174,174,0.2)", background: "rgba(255,174,174,0.04)" }}>
            <div style={{ fontSize: "0.65rem", color: T.stressed, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, marginBottom: 16 }}>Les autres apps</div>
            {["Daylio te donne ses émojis", "Reflectly te donne ses questions", "Jour te donne ses prompts", "L'app définit ce que tu ressens"].map(item => (
              <div key={item} style={{ display: "flex", gap: 8, marginBottom: 9, alignItems: "flex-start" }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: T.stressed, marginTop: 7, flexShrink: 0 }} />
                <span style={{ fontSize: "0.78rem", color: th.sec, lineHeight: 1.6, fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>{item}</span>
              </div>
            ))}
          </Card>
          {/* Colonne droite : l'approche Seyrin */}
          <Card th={th} style={{ borderColor: `${T.calm}33`, background: `${T.calm}06` }}>
            <div style={{ fontSize: "0.65rem", color: T.calm, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, marginBottom: 16 }}>Seyrin</div>
            {["Tu choisis ta couleur", "Tu lui donnes ton propre nom", "Ta palette devient unique", "Ton récap annuel ne ressemble à personne d'autre"].map(item => (
              <div key={item} style={{ display: "flex", gap: 8, marginBottom: 9, alignItems: "flex-start" }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: T.calm, marginTop: 7, flexShrink: 0 }} />
                <span style={{ fontSize: "0.78rem", color: th.sec, lineHeight: 1.6, fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>{item}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>

      <Divider />

      {/* ── Les 3 piliers produit ── */}
      <div style={{ marginBottom: 48 }}>
        <SLabel>Architecture produit</SLabel>
        <STitle th={th}>Trois piliers</STitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
          {[
            { num: "01", name: "Refuge",                  desc: "Un espace sûr, sans jugement, sans analyse, sans pression. Tu déposes, c'est tout.",       color: T.violetSoft },
            { num: "02", name: "Miroir évolutif",         desc: "Visualisation douce des émotions dans le temps. L'app montre, tu interprètes.",            color: T.calm },
            { num: "03", name: "Tableau de bord intérieur", desc: "Lecture structurée mais non intrusive de ton évolution personnelle.",                    color: T.focused },
          ].map(p => (
            <Card key={p.num} th={th}>
              <div style={{ fontSize: "0.6rem", color: p.color, letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, marginBottom: 12, opacity: 0.8 }}>{p.num}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", fontWeight: 700, color: th.text, marginBottom: 10 }}>{p.name}</div>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.82rem", fontWeight: 300, color: th.sec, lineHeight: 1.7 }}>{p.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* ── Ce que Seyrin n'est PAS ── */}
      {/* Pills rouges = positionnement négatif (ce qu'on refuse d'être) */}
      <div style={{ marginBottom: 48 }}>
        <SLabel>Positionnement</SLabel>
        <STitle th={th}>Ce que Seyrin n'est pas</STitle>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {["Pas de coaching", "Pas de chatbot", "Pas de streaks", "Pas de gamification", "Pas d'analyse psychologique"].map(item => (
            <div key={item} style={{
              padding: "8px 16px", borderRadius: 100,
              border: "1px solid rgba(255,174,174,0.3)",
              background: "rgba(255,174,174,0.06)",
              color: T.stressed, fontSize: "0.78rem", fontFamily: "'Outfit', sans-serif",
            }}>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* ── Stack technique ── */}
      <div style={{ marginBottom: 48 }}>
        <SLabel>Stack technique</SLabel>
        <STitle th={th}>PWA · React · Node.js · PostgreSQL</STitle>
        <Card th={th}>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {[
              { cat: "Frontend",        items: ["React + Vite", "Tailwind CSS", "i18next"] },
              { cat: "Backend",         items: ["Node.js", "Express", "JWT + bcrypt"] },
              { cat: "Base de données", items: ["PostgreSQL", "Hébergement EU"] },
              { cat: "Distribution",    items: ["PWA", "Service Worker", "RGPD compliant"] },
            ].map(g => (
              <div key={g.cat}>
                <div style={{ fontSize: "0.6rem", color: T.mutedD, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, marginBottom: 10 }}>{g.cat}</div>
                {g.items.map(i => (
                  <div key={i} style={{ fontSize: "0.8rem", color: th.sec, fontFamily: "'Outfit', sans-serif", fontWeight: 300, marginBottom: 5 }}>— {i}</div>
                ))}
              </div>
            ))}
          </div>
        </Card>
      </div>

    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SECTION 2 : CHARTE GRAPHIQUE
// Construction du logo, zone de protection, tailles, palette,
// typographie, règles d'usage (à faire / à éviter).
// ══════════════════════════════════════════════════════════════
function SectionCharte({ th }) {
  // Couleurs des guides d'annotation — contrastées selon le thème
  const GUIDE  = th.isDark ? "#FF5555" : "#D4000F"; // rouge → lignes baseline/cap height
  const GUIDE2 = th.isDark ? "#00E89A" : "#007A40"; // vert  → axes de centrage

  return (
    <div>

      {/* 01 — Construction du logo */}
      <div style={{ marginBottom: 48 }}>
        <SLabel>01 — Construction</SLabel>
        <STitle th={th}>Anatomie & repères</STitle>
        <Card th={th}>
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap", alignItems: "flex-start" }}>
            {/* Zone de visualisation avec repères */}
            <div style={{ position: "relative", width: 260, height: 160, flexShrink: 0 }}>
              {/* Logo centré dans la zone */}
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <WordmarkFull size={0.9} isDark={th.isDark} />
              </div>
              {/* Ligne baseline — rouge tirets */}
              <div style={{ position: "absolute", bottom: 28, left: 0, right: 0, borderTop: `1px dashed ${GUIDE}`, opacity: 0.7 }} />
              <span style={{ position: "absolute", bottom: 20, right: 0, fontSize: "0.48rem", color: GUIDE, letterSpacing: "0.08em", textTransform: "uppercase" }}>Baseline</span>
              {/* Ligne cap height — rouge tirets */}
              <div style={{ position: "absolute", top: 18, left: 0, right: 0, borderTop: `1px dashed ${GUIDE}`, opacity: 0.7 }} />
              <span style={{ position: "absolute", top: 10, right: 0, fontSize: "0.48rem", color: GUIDE, letterSpacing: "0.08em", textTransform: "uppercase" }}>Cap height</span>
              {/* Axe vertical central — vert tirets */}
              <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", borderLeft: `1px dashed ${GUIDE2}`, opacity: 0.5 }} />
              {/* Axe horizontal central — vert tirets */}
              <div style={{ position: "absolute", top: "50%", left: 0, right: 0, borderTop: `1px dashed ${GUIDE2}`, opacity: 0.4 }} />
            </div>
            {/* Légende des éléments anatomiques */}
            <div style={{ flex: 1, minWidth: 200, display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { color: T.violetSoft, label: "y coloré",    desc: "Violet Soft #C4AAFF — ancre chromatique" },
                { color: T.violet,     label: "Étoile ✦",    desc: "4 branches effilées — remplace le point du i" },
                { color: GUIDE,        label: "Baseline",     desc: "Alignement texte + slogan" },
                { color: GUIDE2,       label: "Axes",         desc: "Centrage horizontal & vertical" },
                { color: T.secD,       label: "DM Sans 700",  desc: "Logo & titres — Google Fonts" },
                { color: T.mutedD,     label: "Slogan",       desc: "0.58em — tracking 0.22em — uppercase" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: item.color, marginTop: 5, flexShrink: 0 }} />
                  <div>
                    <span style={{ fontSize: "0.75rem", fontWeight: 500, color: th.text }}>{item.label}</span>
                    <span style={{ fontSize: "0.7rem", color: th.muted }}> — {item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* 02 — Zone de protection */}
      {/* Espace minimal autour du logo — rien ne peut entrer dedans */}
      <div style={{ marginBottom: 48 }}>
        <SLabel>02 — Zone de protection</SLabel>
        <STitle th={th}>Clear zone — Espace minimal</STitle>
        <Card th={th}>
          <p style={{ fontSize: "0.82rem", color: th.sec, marginBottom: 28, fontWeight: 300, lineHeight: 1.7, maxWidth: 480 }}>
            La zone de protection correspond à la hauteur du "S" de Seyrin sur chaque côté.
            Aucun autre élément visuel ne peut empiéter dans cet espace.
          </p>
          {/* Logo entouré du rectangle de protection en tirets verts */}
          <div style={{ display: "inline-flex", position: "relative", padding: "40px" }}>
            <div style={{
              position: "absolute", inset: 0,
              border: `1.5px dashed ${GUIDE2}`,
              borderRadius: 8, opacity: th.isDark ? 0.6 : 1,
            }} />
            <WordmarkFull size={1} isDark={th.isDark} />
          </div>
          {/* Légende */}
          <div style={{ marginTop: 20, display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ width: 16, height: 0, borderTop: `1.5px dashed ${GUIDE2}` }} />
            <span style={{ fontSize: "0.7rem", color: th.muted }}>Zone de protection — aucun élément ne peut entrer dans cet espace</span>
          </div>
        </Card>
      </div>

      {/* 03 — Tailles minimales */}
      {/* 5 tailles du plus petit (favicon) au recommandé (56px+) */}
      <div style={{ marginBottom: 48 }}>
        <SLabel>03 — Tailles minimales</SLabel>
        <STitle th={th}>Limites d'utilisation</STitle>
        <Card th={th}>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-end" }}>
            {[
              { size: 0.32, label: "16px",  sub: "Favicon\n(icône seule)",      iconOnly: true },
              { size: 0.5,  label: "24px",  sub: "Minimum absolu\n(icône seule)", iconOnly: true },
              { size: 0.65, label: "32px",  sub: "Minimum\nwordmark" },
              { size: 0.85, label: "40px",  sub: "Usage standard" },
              { size: 1.1,  label: "56px+", sub: "Taille recommandée", recommended: true },
            ].map(({ size, label, sub, iconOnly, recommended }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div style={{ position: "relative" }}>
                  {/* Fond légèrement contrasté pour bien voir le logo */}
                  <div style={{
                    background: th.isDark ? T.night : "#F4F1FF",
                    border: `1px solid ${recommended ? T.violet : "rgba(168,127,255,0.15)"}`,
                    borderRadius: 12, padding: iconOnly ? "14px" : "14px 18px",
                    display: "flex", flexDirection: "column", alignItems: "center",
                    boxShadow: recommended ? `0 0 16px ${T.violet}22` : "none",
                  }}>
                    <StarMark size={size * 0.85} color={T.violetSoft} glow={th.isDark} />
                    {/* Affiche le wordmark uniquement si assez grand */}
                    {!iconOnly && size >= 0.65 && (
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: `${size * 1.3}rem`, fontWeight: 700, color: th.text, letterSpacing: "-0.03em", marginTop: 4 }}>
                        Se<span style={{ color: T.violetSoft }}>y</span>rin
                      </div>
                    )}
                  </div>
                  {/* Badge "Recommandé" sur la taille préférée */}
                  {recommended && (
                    <div style={{ position: "absolute", top: -10, right: -10, background: T.violet, borderRadius: 100, padding: "2px 8px", fontSize: "0.5rem", color: "white", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                      Recommandé
                    </div>
                  )}
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "0.7rem", fontWeight: 500, color: th.text }}>{label}</div>
                  <div style={{ fontSize: "0.58rem", color: th.muted, lineHeight: 1.5, whiteSpace: "pre-line" }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Divider />

      {/* 04 — Palette de couleurs */}
      {/* 2 sous-sections : primaires (fonds + violets) + émotionnelles */}
      <div style={{ marginBottom: 48 }}>
        <SLabel>04 — Palette de couleurs</SLabel>
        <STitle th={th}>Système chromatique</STitle>

        {/* Couleurs primaires */}
        <p style={{ fontSize: "0.63rem", color: th.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Couleurs primaires</p>
        <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
          {[
            { name: "Night",         hex: "#0C0C12", bg: "#0C0C12", use: "Fond principal",    text: T.textD },
            { name: "Surface",       hex: "#121218", bg: "#121218", use: "Fond secondaire",   text: T.textD },
            { name: "Card",          hex: "#1A1A24", bg: "#1A1A24", use: "Cartes / blocs",    text: T.textD },
            { name: "Seyrin Violet", hex: "#A87FFF", bg: "#A87FFF", use: "Accent principal",  text: T.textL },
            { name: "Violet Deep",   hex: "#7C5CE8", bg: "#7C5CE8", use: "CTA, dégradés",     text: T.textD },
            { name: "Violet Soft",   hex: "#C4AAFF", bg: "#C4AAFF", use: "y, textes accentués", text: T.textL },
          ].map(s => (
            <div key={s.hex} style={{ flex: "1 1 90px", minWidth: 90, borderRadius: 12, overflow: "hidden", background: th.card, border: "1px solid rgba(168,127,255,0.1)" }}>
              {/* Bloc de couleur avec le code hex en overlay */}
              <div style={{ height: 56, background: s.bg, display: "flex", alignItems: "flex-end", padding: "0 8px 5px" }}>
                <span style={{ fontSize: "0.5rem", fontFamily: "monospace", color: s.text, opacity: 0.8 }}>{s.hex}</span>
              </div>
              <div style={{ padding: "8px 10px" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 500, color: th.text }}>{s.name}</div>
                <div style={{ fontSize: "0.6rem", color: th.muted, marginTop: 2 }}>{s.use}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Couleurs émotionnelles — base de la palette personnalisable */}
        <p style={{ fontSize: "0.63rem", color: th.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Couleurs émotionnelles</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[
            { name: "Stressé",   hex: "#FFAEAE", bg: T.stressed },
            { name: "Fatigué",   hex: "#BFC0E8", bg: T.tired },
            { name: "Apaisé",    hex: "#A8E6C3", bg: T.calm },
            { name: "Concentré", hex: "#9EC8FF", bg: T.focused },
          ].map(s => (
            <div key={s.hex} style={{ flex: "1 1 80px", borderRadius: 12, overflow: "hidden", background: th.card, border: "1px solid rgba(168,127,255,0.1)" }}>
              {/* Aplat transparent de la couleur (opacity 44 = ~27%) */}
              <div style={{ height: 40, background: `${s.bg}44` }} />
              <div style={{ padding: "7px 10px" }}>
                <div style={{ fontSize: "0.7rem", fontWeight: 500, color: th.text }}>{s.name}</div>
                <div style={{ fontSize: "0.58rem", color: th.muted, fontFamily: "monospace" }}>{s.hex}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* 05 — Typographie */}
      {/* Chaque ligne = un style : role, police, taille, exemple live, usage */}
      <div style={{ marginBottom: 48 }}>
        <SLabel>05 — Typographie</SLabel>
        <STitle th={th}>Hiérarchie & usage</STitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { role: "Logo / Titres",    font: "DM Sans", weight: "700", size: "clamp(2rem,6vw,4rem)", use: "Logo, titres H1, CTA",         sample: "Seyrin",                             color: th.text },
            { role: "Titres interface", font: "DM Sans", weight: "600", size: "1.3rem",               use: "H2, écrans onboarding",         sample: "Comment tu te sens ?",               color: th.text },
            { role: "Body Regular",     font: "Outfit",  weight: "400", size: "1rem",                 use: "Texte principal",               sample: "Bienvenue dans ton espace.",         color: th.text },
            { role: "Body Light",       font: "Outfit",  weight: "300", size: "0.9rem",               use: "Descriptions secondaires",      sample: "Tu n'es pas jugé. Tu n'es pas analysé.", color: th.sec },
            { role: "Label",            font: "DM Sans", weight: "500", size: "0.65rem",              use: "Labels, micro-textes",          sample: "A QUIET SPACE",                      color: th.muted, upper: true },
          ].map(item => (
            <div key={item.role} style={{
              background: th.card, borderRadius: 12, padding: "18px 22px",
              border: "1px solid rgba(168,127,255,0.08)",
              display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap",
            }}>
              {/* Colonne 1 : nom du style + specs */}
              <div style={{ width: 130, flexShrink: 0 }}>
                <div style={{ fontSize: "0.62rem", color: T.violet, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>{item.role}</div>
                <div style={{ fontSize: "0.6rem", color: th.muted, lineHeight: 1.5 }}>{item.font} · {item.weight}</div>
              </div>
              {/* Colonne 2 : exemple live dans la vraie police */}
              <div style={{ flex: 1, minWidth: 140 }}>
                <span style={{
                  fontFamily: item.font === "Outfit" ? "'Outfit', sans-serif" : "'DM Sans', sans-serif",
                  fontSize: item.size,
                  // Conversion du poids string → number pour fontWeight
                  fontWeight: item.weight.includes("300") ? 300 : item.weight.includes("500") ? 500 : item.weight.includes("600") ? 600 : 700,
                  color: item.color,
                  textTransform: item.upper ? "uppercase" : "none",
                  letterSpacing: item.upper ? "0.15em" : "normal",
                }}>
                  {item.sample}
                </span>
              </div>
              {/* Colonne 3 : contexte d'utilisation */}
              <div style={{ fontSize: "0.6rem", color: th.muted, maxWidth: 140, lineHeight: 1.5, fontStyle: "italic" }}>{item.use}</div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* 06 — Règles d'usage */}
      {/* 2 colonnes : À faire (vert) / À éviter (rouge) */}
      <div style={{ marginBottom: 48 }}>
        <SLabel>06 — Règles d'usage</SLabel>
        <STitle th={th}>À faire & à éviter</STitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {/* À FAIRE */}
          <div style={{ background: "rgba(168,230,195,0.05)", border: "1px solid rgba(168,230,195,0.2)", borderRadius: 16, padding: "22px" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 18 }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: T.calm, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M2 5 L4 7 L8 3" stroke="#0C0C12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span style={{ fontSize: "0.72rem", fontWeight: 500, color: T.calm, letterSpacing: "0.08em", textTransform: "uppercase" }}>À faire</span>
            </div>
            {["Utiliser le logo sur fond sombre ou fond clair dédié", "Respecter la zone de protection", "Utiliser les couleurs de la palette officielle", "Garder le y en Violet Soft #C4AAFF", "Utiliser DM Sans 700 pour les titres", "Conserver les proportions du logo"].map(item => (
              <div key={item} style={{ display: "flex", gap: 8, marginBottom: 9, alignItems: "flex-start" }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: T.calm, marginTop: 7, flexShrink: 0 }} />
                <span style={{ fontSize: "0.75rem", color: th.sec, lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
          {/* À ÉVITER */}
          <div style={{ background: "rgba(255,174,174,0.05)", border: "1px solid rgba(255,174,174,0.2)", borderRadius: 16, padding: "22px" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 18 }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: T.stressed, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M3 3 L7 7 M7 3 L3 7" stroke="#0C0C12" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <span style={{ fontSize: "0.72rem", fontWeight: 500, color: T.stressed, letterSpacing: "0.08em", textTransform: "uppercase" }}>À éviter</span>
            </div>
            {["Déformer ou étirer le logo", "Changer la couleur du y ou de l'étoile", "Placer le logo sur un fond trop chargé", "Utiliser des polices non prévues dans la charte", "Réduire en dessous de la taille minimale", "Ajouter des effets (ombre portée, contour…)"].map(item => (
              <div key={item} style={{ display: "flex", gap: 8, marginBottom: 9, alignItems: "flex-start" }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: T.stressed, marginTop: 7, flexShrink: 0 }} />
                <span style={{ fontSize: "0.75rem", color: th.sec, lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SECTION 3 : IDENTITÉ VISUELLE
// Composants UI réutilisables + explorations du logo.
// ══════════════════════════════════════════════════════════════
function SectionIdentite({ th }) {
  // État local : émotion sélectionnée dans le sélecteur interactif
  const [selectedEmotion, setSelectedEmotion] = useState("tired");

  // Définition des 4 émotions de base (la palette est extensible par l'utilisateur)
  const emotions = [
    { id: "stressed", label: "Stressé",   color: T.stressed },
    { id: "tired",    label: "Fatigué",   color: T.tired },
    { id: "calm",     label: "Apaisé",    color: T.calm },
    { id: "focused",  label: "Concentré", color: T.focused },
  ];

  // Données du calendrier (24 jours) — null = pas d'entrée ce jour
  const calendarData = [
    null, null, null, null, "stressed", "stressed", "tired",
    "tired", "tired", null, null, null, null, null,
    "calm", "calm", "focused", "focused", "calm", "calm", "calm",
    "focused", "focused", "calm",
  ];

  return (
    <div>

      {/* ── 01 Composants UI ── */}
      <div style={{ marginBottom: 48 }}>
        <SLabel>01 — Composants UI</SLabel>
        <STitle th={th}>Librairie de base</STitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 16 }}>

          {/* BOUTONS — 3 variantes : primaire gradient, outline, ghost */}
          <Card th={th}>
            <p style={{ fontSize: "0.62rem", color: th.muted, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Boutons</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {/* Bouton primaire : gradient + ombre */}
              <button style={{ background: `linear-gradient(135deg, ${T.violetDeep}, ${T.violet})`, border: "none", color: "white", padding: "12px 20px", borderRadius: 100, fontWeight: 600, fontSize: "0.85rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", boxShadow: `0 4px 20px ${T.violet}33` }}>
                Je dépose ✦
              </button>
              {/* Bouton outline : bordure violette, fond transparent */}
              <button style={{ background: "transparent", border: `1px solid ${T.violet}44`, color: T.violetSoft, padding: "11px 20px", borderRadius: 100, fontWeight: 500, fontSize: "0.85rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                Voir mon historique
              </button>
              {/* Bouton ghost : lien textuel discret */}
              <button style={{ background: "transparent", border: "none", color: th.muted, padding: "6px 0", fontSize: "0.8rem", cursor: "pointer", fontFamily: "'Outfit', sans-serif", textAlign: "left" }}>
                Passer l'onboarding →
              </button>
            </div>
          </Card>

          {/* SÉLECTEUR D'ÉMOTION — chips interactives avec état actif */}
          <Card th={th}>
            <p style={{ fontSize: "0.62rem", color: th.muted, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Sélecteur d'émotion</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {emotions.map(e => (
                <div
                  key={e.id}
                  onClick={() => setSelectedEmotion(e.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "7px 13px", borderRadius: 100, cursor: "pointer",
                    fontSize: "0.78rem", fontWeight: 500, fontFamily: "'Outfit', sans-serif",
                    background: `${e.color}18`,
                    color: e.color,
                    // Border plus épaisse et plus opaque si sélectionné
                    border: `${selectedEmotion === e.id ? 2 : 1.5}px solid ${e.color}${selectedEmotion === e.id ? "88" : "33"}`,
                    boxShadow: selectedEmotion === e.id ? `0 0 10px ${e.color}44` : "none",
                    transition: "all 0.2s",
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: e.color, display: "inline-block" }} />
                  {e.label}
                </div>
              ))}
            </div>
          </Card>

          {/* ENTRÉE JOURNAL — aperçu d'une entrée enregistrée */}
          <Card th={th}>
            <p style={{ fontSize: "0.62rem", color: th.muted, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Entrée du journal</p>
            <div style={{ background: `${T.violet}06`, border: `1px solid ${T.violet}18`, borderRadius: 10, padding: "14px" }}>
              {/* Date + heure */}
              <div style={{ fontSize: "0.62rem", color: th.muted, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Lundi 24 févr. · 21h03</div>
              {/* Extrait du texte en italique */}
              <p style={{ fontFamily: "'Outfit', sans-serif", fontStyle: "italic", color: th.sec, fontSize: "0.85rem", lineHeight: 1.7, marginBottom: 10 }}>
                "Ce soir je me sens plus calme. La journée a été longue mais..."
              </p>
              {/* Tag émotion associée */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.7rem", color: T.calm, background: `${T.calm}18`, borderRadius: 100, padding: "4px 10px", width: "fit-content", border: `1px solid ${T.calm}33` }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.calm, display: "inline-block" }} />
                Apaisé
              </div>
            </div>
          </Card>

          {/* CALENDRIER ÉMOTIONNEL — grille 7 colonnes avec couleurs par émotion */}
          <Card th={th}>
            <p style={{ fontSize: "0.62rem", color: th.muted, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Calendrier émotionnel</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3 }}>
              {/* Jours de la semaine */}
              {["L","M","M","J","V","S","D"].map((d, i) => (
                <div key={i} style={{ textAlign: "center", fontSize: "0.55rem", color: th.muted, padding: "2px 0", letterSpacing: "0.04em" }}>{d}</div>
              ))}
              {/* Cases jours — colorées si une émotion est associée */}
              {calendarData.map((emotion, i) => {
                const emotionColor = emotion ? T[emotion] : null;
                return (
                  <div key={i} style={{
                    aspectRatio: "1", borderRadius: 5,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.62rem", fontWeight: emotion ? 500 : 400,
                    background: emotionColor ? `${emotionColor}28` : "transparent",
                    color: emotionColor || th.muted,
                    // Anneau violet sur le jour courant (24)
                    border: i+1 === 24 ? `1.5px solid ${T.violet}` : "1px solid transparent",
                    cursor: "pointer",
                  }}>
                    {i + 1}
                  </div>
                );
              })}
            </div>
          </Card>

        </div>
      </div>

      <Divider />

      {/* ── 02 Directions logo ── */}
      {/* 4 explorations visuelles du "y" comme signature graphique */}
      <div style={{ marginBottom: 48 }}>
        <SLabel>02 — Directions logo</SLabel>
        <STitle th={th}>Explorations du "y"</STitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 14 }}>
          {[
            {
              label: "Direction A", desc: "Halo concentrique\nPulse sur le y",
              // 3 cercles concentriques → suggestion de pulsation / présence
              render: () => (
                <div style={{ position: "relative", width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {[26, 38, 48].map((s, i) => (
                    <div key={i} style={{ position: "absolute", width: s, height: s, borderRadius: "50%", border: `1px solid ${T.violet}`, opacity: 0.6 - i * 0.18 }} />
                  ))}
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.violet, boxShadow: `0 0 10px ${T.violet}`, position: "relative", zIndex: 2 }} />
                </div>
              )
            },
            {
              label: "Direction B ✦", desc: "Étoile-point\nSobre & élégant",
              // Étoile à 4 branches en losange — retenue, premium
              render: () => (
                <svg width="48" height="48" viewBox="0 0 50 50" fill="none">
                  <path d="M25 10 L27 21 L38 23 L27 25 L25 36 L23 25 L12 23 L23 21 Z" fill={T.violet} opacity="0.9"/>
                  <circle cx="25" cy="23" r="3" fill="white" opacity="0.5"/>
                </svg>
              )
            },
            {
              label: "Direction C", desc: "Arc lunaire\nLien Lunaris",
              // Arc + point flottant — clin d'œil à l'ancienne identité Lunaris
              render: () => (
                <svg width="48" height="48" viewBox="0 0 50 50" fill="none">
                  <path d="M38 25 A14 14 0 1 1 25 11" stroke={T.violet} strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="25" cy="25" r="4" fill={T.violetSoft}/>
                  <circle cx="38" cy="25" r="2.5" fill={T.violet}/>
                </svg>
              )
            },
            {
              label: "Direction D", desc: "Point lumineux\nMinimaliste",
              // Point avec glow intégré dans le wordmark — version la plus sobre
              render: () => (
                <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: th.text }}>Sey</span>
                  <div style={{ position: "relative", width: 13, height: 13 }}>
                    <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: T.violet, opacity: 0.2 }} />
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 5, height: 5, borderRadius: "50%", background: T.violet, boxShadow: `0 0 8px ${T.violet}` }} />
                  </div>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: th.text }}>rin</span>
                </div>
              )
            },
          ].map(dir => (
            <div key={dir.label} style={{
              background: th.card, borderRadius: 14, padding: "24px 14px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
              border: "1px solid rgba(168,127,255,0.08)", textAlign: "center",
            }}>
              <div style={{ height: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {dir.render()}
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 500, color: th.text, marginBottom: 4 }}>{dir.label}</div>
                <div style={{ fontSize: "0.65rem", color: th.muted, lineHeight: 1.6, whiteSpace: "pre-line" }}>{dir.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ── 03 Neri — Mascotte ── */}
      <NeriSection th={th} />

    </div>
  );
}

// Composant séparé pour éviter les re-renders
function NeriSection({ th }) {
  const [neriState, setNeriState] = useState("accueil");
  return (
    <div style={{ marginBottom: 48 }}>
      <SLabel>03 — Neri</SLabel>
      <STitle th={th}>La mascotte de Seyrin</STitle>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>

        {/* Orbe interactif */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, flexShrink: 0 }}>
          <div style={{ animation: "floatNeri 5s ease-in-out infinite" }}>
            <NeriOrb state={neriState} size={0.85} />
          </div>
          {/* Sélecteur d'états */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            {Object.entries(NERI_STATES).map(([k, v]) => (
              <button key={k} onClick={() => setNeriState(k)} style={{
                padding: "6px 14px", borderRadius: 100, cursor: "pointer",
                background: neriState === k ? `${v.glow}22` : "transparent",
                border: `1px solid ${neriState === k ? v.dot + "88" : "rgba(168,127,255,0.15)"}`,
                color: neriState === k ? v.dot : th.muted,
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", fontWeight: 500,
                transition: "all 0.2s", letterSpacing: "0.06em",
              }}>{v.label}</button>
            ))}
          </div>
        </div>

        {/* Spécifications */}
        <div style={{ flex: 1, minWidth: 240, display: "flex", flexDirection: "column", gap: 14 }}>
          <Card th={th}>
            <p style={{ fontSize: "0.62rem", color: th.muted, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>Nature</p>
            {["Orbe fluide lumineux — gradient pastel rose/bleu/lilas", "Forme qui morphe doucement en continu (border-radius animé)", "Lumière interne : reflet nacré + glow externe", "Visage minimaliste : 2 yeux + bouche, clignotement naturel React", "Sparkles ✦ orbitaux autour du corps"].map(item => (
              <div key={item} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: NERI_STATES[neriState].dot, marginTop: 7, flexShrink: 0 }} />
                <span style={{ fontSize: "0.75rem", color: th.sec, lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </Card>
          <Card th={th}>
            <p style={{ fontSize: "0.62rem", color: th.muted, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>4 États émotionnels</p>
            {Object.entries(NERI_STATES).map(([k, v]) => (
              <div key={k} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: v.glow, boxShadow: `0 0 8px ${v.glow}`, flexShrink: 0 }} />
                <span style={{ fontSize: "0.75rem", fontWeight: 500, color: th.text, width: 110 }}>{v.label}</span>
                <span style={{ fontSize: "0.68rem", color: th.muted, fontFamily: "monospace" }}>{v.g1} → {v.g3}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SECTION 4 : ONBOARDING
// Les 3 écrans d'introduction dans un mock iPhone interactif.
// ══════════════════════════════════════════════════════════════

// Données des 3 écrans d'onboarding
// Chaque écran a sa propre palette d'orbs (ambiance lumineuse unique)
const OB_SCREENS = [
  {
    id: 1,
    orb: "#7C5CE8", orb2: "#A87FFF", accent: "#C4AAFF", // violet
    title: "Un endroit pour poser ce que tu portes.",
    body: "Pas de coaching. Pas de réponses. Juste de l'espace.",
    cta: "Continuer",
  },
  {
    id: 2,
    orb: "#3D8B6E", orb2: "#A8E6C3", accent: "#A8E6C3", // vert doux
    title: "Tu notes. Seyrin se souvient.",
    body: "Une entrée par jour suffit. Ou rien. C'est toi qui décides.",
    cta: "Continuer",
  },
  {
    id: 3,
    orb: "#2E5FAA", orb2: "#9EC8FF", accent: "#9EC8FF", // bleu
    title: "Ce que tu écris ici ne regarde que toi.",
    body: "Chiffré, privé, et jamais monétisé.",
    cta: "Commencer",
  },
];

function SectionOnboarding({ th }) {
  // Index de l'écran actif (0, 1 ou 2)
  const [current, setCurrent] = useState(0);
  // Contrôle l'opacité/translation pendant la transition entre écrans
  const [visible, setVisible] = useState(true);

  const screen = OB_SCREENS[current];

  /**
   * goTo — Change d'écran avec animation fade + slide
   * 1. Cache le contenu (visible = false → opacity 0 + translateY)
   * 2. Après 260ms, change l'écran et réaffiche
   */
  const goTo = (idx) => {
    if (idx === current) return;
    setVisible(false);
    setTimeout(() => { setCurrent(idx); setVisible(true); }, 260);
  };

  return (
    <div>
      <SLabel>Onboarding</SLabel>
      <STitle th={th}>Trois écrans d'accueil</STitle>

      <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-start" }}>

        {/* ── iPhone Mock + navigation ── */}
        <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          {/* Tabs de navigation entre écrans */}
          <div style={{ display: "flex", gap: 8 }}>
            {OB_SCREENS.map((s, i) => (
              <button key={i} onClick={() => goTo(i)} style={{
                background: current === i ? `${s.accent}18` : "transparent",
                border: `1px solid ${current === i ? s.accent : "rgba(255,255,255,0.1)"}`,
                borderRadius: 100, padding: "6px 14px", fontSize: "0.68rem",
                color: current === i ? s.accent : th.muted,
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, transition: "all 0.2s",
              }}>
                Écran {s.id}
              </button>
            ))}
          </div>

          {/* Boîtier iPhone — dimensions proportionnelles à un 14 Pro */}
          <div style={{
            width: 280, height: 580,
            background: "#121218",
            borderRadius: 44, overflow: "hidden", position: "relative",
            boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.07)",
            display: "flex", flexDirection: "column",
          }}>
            {/* Dynamic Island */}
            <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 86, height: 24, background: "#000", borderRadius: 16, zIndex: 10 }} />

            {/* Status bar */}
            <div style={{ height: 38, display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 20px 4px", flexShrink: 0 }}>
              <span style={{ fontSize: "0.6rem", fontWeight: 600, color: "#F0EEF8", fontFamily: "'DM Sans', sans-serif" }}>9:41</span>
            </div>

            {/* Zone de contenu principale */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "14px 24px 28px", position: "relative", overflow: "hidden" }}>
              {/* Orbs de fond — transition de couleur à chaque écran */}
              <div style={{ position: "absolute", width: 240, height: 240, borderRadius: "50%", background: screen.orb, filter: "blur(70px)", opacity: 0.18, top: -60, left: -40, pointerEvents: "none", transition: "background 0.5s" }} />
              <div style={{ position: "absolute", width: 150, height: 150, borderRadius: "50%", background: screen.orb2, filter: "blur(50px)", opacity: 0.1, bottom: 60, right: -30, pointerEvents: "none", transition: "background 0.5s" }} />

              {/* Step indicator : 3 pills, celui actif est plus large */}
              <div style={{ display: "flex", gap: 5, marginBottom: 28, marginTop: 4 }}>
                {OB_SCREENS.map((_, i) => (
                  <div key={i} style={{
                    height: 2.5,
                    width: i === current ? 18 : 6, // actif = 18px, inactif = 6px
                    borderRadius: 100,
                    background: i === current ? screen.accent : "rgba(255,255,255,0.15)",
                    transition: "all 0.3s",
                  }} />
                ))}
              </div>

              {/* Contenu animé : fade + slide selon visible */}
              <div style={{
                flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(10px)",
                transition: "all 0.26s ease",
              }}>
                <div style={{ marginBottom: 22 }}>
                  <StarMark size={0.6} color={screen.accent} />
                </div>
                {/* Compteur discret : 01 / 03 */}
                <div style={{ fontSize: "0.46rem", color: screen.accent, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, marginBottom: 12, opacity: 0.7 }}>
                  {String(screen.id).padStart(2,"0")} / {String(OB_SCREENS.length).padStart(2,"0")}
                </div>
                <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", fontWeight: 700, color: "#F0EEF8", lineHeight: 1.3, marginBottom: 10, letterSpacing: "-0.01em" }}>
                  {screen.title}
                </h1>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem", fontWeight: 300, color: "#B8B4D4", lineHeight: 1.75 }}>
                  {screen.body}
                </p>
              </div>

              {/* Boutons bas : CTA principal + lien skip */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <button
                  onClick={() => current < OB_SCREENS.length - 1 && goTo(current + 1)}
                  style={{
                    width: "100%", padding: "11px", borderRadius: 100,
                    background: `linear-gradient(135deg, ${screen.orb}, ${screen.accent})`,
                    border: "none", color: "white", fontSize: "0.72rem", fontWeight: 600,
                    fontFamily: "'DM Sans', sans-serif",
                    boxShadow: `0 6px 20px ${screen.orb}44`, cursor: "pointer",
                  }}>
                  {screen.cta}
                </button>
                {/* Lien "Passer" — visible uniquement si pas sur le dernier écran */}
                {current < OB_SCREENS.length - 1 && (
                  <button
                    onClick={() => goTo(OB_SCREENS.length - 1)}
                    style={{ background: "none", border: "none", color: "#6A6890", fontSize: "0.6rem", fontFamily: "'Outfit', sans-serif", cursor: "pointer", padding: "2px" }}>
                    Passer l'introduction
                  </button>
                )}
              </div>
            </div>

            {/* Home indicator iOS */}
            <div style={{ height: 22, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <div style={{ width: 90, height: 3, borderRadius: 100, background: "rgba(255,255,255,0.18)" }} />
            </div>
          </div>
        </div>

        {/* ── Résumé textuel des 3 écrans ── */}
        {/* Cliquables pour naviguer dans le mock */}
        <div style={{ flex: 1, minWidth: 240, display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ fontSize: "0.62rem", color: th.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Contenu des écrans</p>
          {OB_SCREENS.map((s, i) => (
            <div
              key={i}
              onClick={() => goTo(i)}
              style={{
                background: current === i ? `${s.accent}10` : th.card,
                borderRadius: 14, padding: "18px 20px",
                border: `1px solid ${current === i ? s.accent + "44" : "rgba(168,127,255,0.08)"}`,
                cursor: "pointer", transition: "all 0.2s",
              }}
            >
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.accent, flexShrink: 0 }} />
                <span style={{ fontSize: "0.6rem", color: s.accent, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>Écran {s.id}</span>
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", fontWeight: 700, color: th.text, marginBottom: 6, lineHeight: 1.3 }}>{s.title}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.78rem", fontWeight: 300, color: th.sec, lineHeight: 1.6 }}>{s.body}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SECTION 5 : SPECS FIGMA
// Maquette annotée avec lignes de cotes et panel de spécifications.
// Permet de reproduire fidèlement l'onboarding dans Figma.
// ══════════════════════════════════════════════════════════════

// Données des écrans — identiques à OB_SCREENS avec ctaGrad en plus
const SPEC_SCREENS = [
  { id: 1, label: "Écran 1 — Bienvenue",        orb: "#7C5CE8", orb2: "#A87FFF", accent: "#C4AAFF", title: "Un endroit pour poser ce que tu portes.", body: "Pas de coaching. Pas de réponses. Juste de l'espace.", cta: "Continuer",  ctaGrad: "linear-gradient(135deg, #7C5CE8, #C4AAFF)" },
  { id: 2, label: "Écran 2 — Le geste",         orb: "#3D8B6E", orb2: "#A8E6C3", accent: "#A8E6C3", title: "Tu notes. Seyrin se souvient.",           body: "Une entrée par jour suffit. Ou rien.",               cta: "Continuer",  ctaGrad: "linear-gradient(135deg, #3D8B6E, #A8E6C3)" },
  { id: 3, label: "Écran 3 — Confidentialité",  orb: "#2E5FAA", orb2: "#9EC8FF", accent: "#9EC8FF", title: "Ce que tu écris ici ne regarde que toi.", body: "Chiffré, privé, et jamais monétisé.",                cta: "Commencer", ctaGrad: "linear-gradient(135deg, #2E5FAA, #9EC8FF)" },
];

/**
 * SpecRow — Ligne de spec : label à gauche, valeur monospace à droite
 * Séparée par une fine bordure en bas.
 */
const SpecRow = ({ label, value }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
    <span style={{ fontSize: "0.66rem", color: "#6A6890", fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>{label}</span>
    <span style={{ fontSize: "0.66rem", color: "#B8B4D4", fontFamily: "monospace", textAlign: "right" }}>{value}</span>
  </div>
);

/**
 * SpecBlock — Conteneur d'un groupe de specs avec titre doré
 * Style "annotation Figma" : badge orange + fond card sombre.
 */
const SpecBlock = ({ title, children }) => (
  <div style={{ marginBottom: 14 }}>
    {/* Titre du groupe en style "étiquette Figma" */}
    <div style={{ display: "inline-block", background: "rgba(245,166,35,0.12)", border: "1px solid rgba(245,166,35,0.35)", borderRadius: 4, padding: "2px 8px", fontSize: "0.56rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#F5A623", marginBottom: 8 }}>{title}</div>
    <div style={{ background: "#1A1A24", borderRadius: 8, padding: "10px 12px", border: "1px solid rgba(255,255,255,0.05)" }}>{children}</div>
  </div>
);

function SectionSpecs({ th }) {
  const [activeScreen, setActiveScreen] = useState(0);
  // Toggle pour afficher/masquer les lignes d'annotation
  const [showAnnotations, setShowAnnotations] = useState(true);
  const screen = SPEC_SCREENS[activeScreen];

  return (
    <div>
      <SLabel>Specs Figma</SLabel>
      <STitle th={th}>Maquette annotée — Onboarding</STitle>

      {/* Barre de contrôle : tabs écrans + toggle annotations */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {SPEC_SCREENS.map((s, i) => (
            <button key={i} onClick={() => setActiveScreen(i)} style={{
              background: activeScreen === i ? `${s.accent}18` : "transparent",
              border: `1px solid ${activeScreen === i ? s.accent : "rgba(255,255,255,0.1)"}`,
              borderRadius: 100, padding: "6px 14px", fontSize: "0.68rem",
              color: activeScreen === i ? s.accent : th.muted,
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, transition: "all 0.2s",
            }}>{s.label}</button>
          ))}
        </div>
        {/* Bouton toggle annotations */}
        <button onClick={() => setShowAnnotations(v => !v)} style={{
          background: showAnnotations ? `${T.violet}12` : "transparent",
          border: `1px solid ${showAnnotations ? T.violet : "rgba(168,127,255,0.2)"}`,
          borderRadius: 100, padding: "6px 16px", fontSize: "0.68rem",
          color: showAnnotations ? T.violet : th.muted,
          cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/><path d="M6 5.5V8.5M6 3.5V4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
          {showAnnotations ? "Masquer annotations" : "Afficher annotations"}
        </button>
      </div>

      <div style={{ display: "flex", gap: 28, alignItems: "flex-start", flexWrap: "wrap" }}>

        {/* ── Mock iPhone avec annotations ── */}
        {/* marginLeft dynamique pour laisser la place aux annotations */}
        <div style={{ position: "relative", flexShrink: 0, marginLeft: showAnnotations ? 130 : 0, transition: "margin 0.3s" }}>

          {/* Lignes d'annotation — positionnées en absolu à gauche du téléphone */}
          {showAnnotations && (
            <div style={{ position: "absolute", left: -128, top: 0, bottom: 0, width: 128, pointerEvents: "none" }}>
              {[
                { top: 24,  label: "Status bar · 40px" },
                { top: 100, label: "Step dots · 3×6px" },
                { top: 190, label: "Star · 0.6×" },
                { top: 280, label: "Titre DM Sans 700" },
                { top: 365, label: "Corps Outfit 300" },
                { top: 490, label: "CTA · 44px height" },
                { top: 535, label: "Lien skip" },
              ].map((ann, i) => (
                // Chaque annotation : texte + ligne tirets orange
                <div key={i} style={{ position: "absolute", top: ann.top, left: 0, right: 0, display: "flex", alignItems: "center" }}>
                  <span style={{ fontSize: "0.5rem", color: "#F5A623", whiteSpace: "nowrap", paddingRight: 6, fontFamily: "monospace", opacity: 0.85 }}>{ann.label}</span>
                  <div style={{ flex: 1, height: 1, borderTop: "1px dashed rgba(245,166,35,0.4)" }} />
                </div>
              ))}
            </div>
          )}

          {/* iPhone réduit (240×510) pour la vue specs */}
          <div style={{ width: 240, height: 510, background: "#121218", borderRadius: 38, overflow: "hidden", position: "relative", boxShadow: "0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.07)", display: "flex", flexDirection: "column" }}>
            <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 72, height: 20, background: "#000", borderRadius: 14, zIndex: 10 }} />
            <div style={{ height: 34, display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 18px 3px", flexShrink: 0 }}>
              <span style={{ fontSize: "0.58rem", fontWeight: 600, color: "#F0EEF8", fontFamily: "'DM Sans', sans-serif" }}>9:41</span>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "12px 20px 24px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", background: screen.orb, filter: "blur(60px)", opacity: 0.18, top: -50, left: -30, pointerEvents: "none" }} />
              <div style={{ display: "flex", gap: 4, marginBottom: 24, marginTop: 3 }}>
                {SPEC_SCREENS.map((_, i) => (
                  <div key={i} style={{ height: 2, width: i === activeScreen ? 15 : 5, borderRadius: 100, background: i === activeScreen ? screen.accent : "rgba(255,255,255,0.15)" }} />
                ))}
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ marginBottom: 18 }}><StarMark size={0.52} color={screen.accent} /></div>
                <div style={{ fontSize: "0.42rem", color: screen.accent, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, marginBottom: 10, opacity: 0.7 }}>
                  {String(screen.id).padStart(2,"0")} / {String(SPEC_SCREENS.length).padStart(2,"0")}
                </div>
                <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", fontWeight: 700, color: "#F0EEF8", lineHeight: 1.3, marginBottom: 8 }}>{screen.title}</h1>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.62rem", fontWeight: 300, color: "#B8B4D4", lineHeight: 1.75 }}>{screen.body}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <button style={{ width: "100%", padding: "9px", borderRadius: 100, background: screen.ctaGrad, border: "none", color: "white", fontSize: "0.62rem", fontWeight: 600, fontFamily: "'DM Sans', sans-serif", boxShadow: `0 5px 16px ${screen.orb}44`, cursor: "pointer" }}>{screen.cta}</button>
                {activeScreen < SPEC_SCREENS.length - 1 && (
                  <button style={{ background: "none", border: "none", color: "#6A6890", fontSize: "0.55rem", fontFamily: "'Outfit', sans-serif", cursor: "pointer", padding: "2px" }}>Passer l'introduction</button>
                )}
              </div>
            </div>
            <div style={{ height: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <div style={{ width: 80, height: 3, borderRadius: 100, background: "rgba(255,255,255,0.18)" }} />
            </div>
          </div>
        </div>

        {/* ── Panel de spécifications ── */}
        <div style={{ flex: 1, minWidth: 260 }}>
          {/* Badge d'en-tête coloré selon l'écran actif */}
          <div style={{ marginBottom: 16 }}>
            <span style={{ display: "inline-block", fontSize: "0.58rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: screen.accent, background: `${screen.accent}18`, border: `1px solid ${screen.accent}44`, borderRadius: 4, padding: "3px 10px" }}>
              SPECS — {screen.label.toUpperCase()}
            </span>
          </div>
          {/* Blocs de specs regroupés par catégorie */}
          <SpecBlock title="Frame">
            <SpecRow label="Largeur"       value="390px" />
            <SpecRow label="Hauteur"       value="844px" />
            <SpecRow label="Padding H"     value="24px" />
            <SpecRow label="Padding V"     value="16 / 32px" />
            <SpecRow label="Border radius" value="40px" />
            <SpecRow label="Fond"          value="#121218" />
          </SpecBlock>
          <SpecBlock title="Step indicator">
            <SpecRow label="Dot inactive"    value="6 × 2.5px" />
            <SpecRow label="Dot active"      value="18 × 2.5px" />
            <SpecRow label="Couleur active"  value={screen.accent} />
            <SpecRow label="Couleur inactive" value="rgba(255,255,255,0.15)" />
            <SpecRow label="Gap"             value="5px" />
          </SpecBlock>
          <SpecBlock title="Typographie">
            <SpecRow label="Titre"          value="DM Sans 700" />
            <SpecRow label="Taille titre"   value="1.65rem / ~26px" />
            <SpecRow label="Line-height"    value="1.25" />
            <SpecRow label="Corps"          value="Outfit 300" />
            <SpecRow label="Taille corps"   value="0.95rem / ~15px" />
            <SpecRow label="Line-height"    value="1.75" />
            <SpecRow label="Couleur titre"  value="#F0EEF8" />
            <SpecRow label="Couleur corps"  value="#B8B4D4" />
          </SpecBlock>
          <SpecBlock title="Bouton CTA">
            <SpecRow label="Hauteur"       value="48px" />
            <SpecRow label="Border radius" value="100px (pill)" />
            <SpecRow label="Gradient"      value={`${screen.orb} → ${screen.accent}`} />
            <SpecRow label="Texte"         value="DM Sans 600 · 0.9rem" />
            <SpecRow label="Shadow"        value={`0 8px 28px ${screen.orb}55`} />
          </SpecBlock>
          <SpecBlock title="Orbs">
            <SpecRow label="Orb 1 taille"  value="340 × 340px" />
            <SpecRow label="Orb 1 couleur" value={screen.orb} />
            <SpecRow label="Orb 1 blur"    value="100px · opacity 0.18" />
            <SpecRow label="Orb 2 taille"  value="200 × 200px" />
            <SpecRow label="Orb 2 couleur" value={screen.orb2} />
            <SpecRow label="Orb 2 blur"    value="70px · opacity 0.10" />
          </SpecBlock>
          <SpecBlock title="Transitions">
            <SpecRow label="Slide content" value="opacity + translateY(12px)" />
            <SpecRow label="Durée"         value="280ms ease" />
            <SpecRow label="Step dots"     value="width 400ms ease" />
            <SpecRow label="Orb couleur"   value="background 600ms ease" />
          </SpecBlock>
        </div>

      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// COMPOSANT RACINE : SeyrinSite
// Gère la navigation entre sections et le thème dark/light.
// C'est le seul composant exporté — point d'entrée de l'app.
// ══════════════════════════════════════════════════════════════
export default function SeyrinSite() {
  // Section active dans la sidebar (défaut : accueil)
  const [section, setSection] = useState("accueil");
  // Thème global : true = dark, false = light
  const [isDark, setIsDark] = useState(true);

  // Objet thème passé en prop à toutes les sections
  // Centralise les couleurs adaptées au mode courant
  const th = {
    isDark,
    bg:   isDark ? T.night   : "#F0ECFF", // fond de page
    card: isDark ? T.card    : "#E0D9FF", // fond des cards
    text: isDark ? T.textD   : T.textL,   // texte principal
    sec:  isDark ? T.secD    : T.secL,    // texte secondaire
    muted: isDark ? T.mutedD : T.mutedL,  // texte discret
  };

  return (
    <div style={{
      background: th.bg,
      minHeight: "100vh",
      fontFamily: "'Outfit', sans-serif",
      display: "flex",
      transition: "background 0.3s",
    }}>

      {/* ── SIDEBAR FIXE ── */}
      <div style={{
        width: 220, flexShrink: 0,
        background: isDark ? T.surface : "#E8E3FF",
        borderRight: `1px solid rgba(168,127,255,${isDark ? 0.08 : 0.2})`,
        display: "flex", flexDirection: "column",
        position: "sticky", top: 0, height: "100vh", overflowY: "auto",
        padding: "28px 16px",
      }}>

        {/* Logo compact dans la sidebar */}
        <div style={{ marginBottom: 32, paddingLeft: 4 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.3rem", fontWeight: 700, color: th.text, letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 3 }}>
            Se<span style={{ color: T.violetSoft }}>y</span>rin
          </div>
          <div style={{ fontSize: "0.55rem", color: th.muted, letterSpacing: "0.18em", textTransform: "uppercase" }}>Design System</div>
        </div>

        {/* Navigation — un bouton par section */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
          {NAV.map(n => (
            <button
              key={n.id}
              onClick={() => setSection(n.id)}
              style={{
                background: section === n.id ? `${T.violet}18` : "transparent",
                border: `1px solid ${section === n.id ? `${T.violet}44` : "transparent"}`,
                borderRadius: 10, padding: "10px 14px",
                display: "flex", alignItems: "center", gap: 10,
                color: section === n.id ? T.violet : th.muted,
                fontSize: "0.82rem", fontFamily: "'DM Sans', sans-serif",
                fontWeight: section === n.id ? 500 : 400,
                cursor: "pointer", textAlign: "left", transition: "all 0.2s",
              }}
            >
              <span style={{ fontSize: "0.75rem", opacity: 0.7 }}>{n.icon}</span>
              {n.label}
            </button>
          ))}
        </nav>

        {/* Toggle dark / light — 2 boutons dans un pill container */}
        <div style={{
          display: "flex", gap: 6, marginTop: 24, padding: "4px",
          background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)",
          borderRadius: 10,
        }}>
          {[
            {
              mode: true,
              // Icône lune SVG
              icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" fill="currentColor"/></svg>,
              label: "Sombre",
            },
            {
              mode: false,
              // Icône soleil SVG avec 8 rayons calculés dynamiquement
              icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="4" fill="currentColor"/>
                {[0,45,90,135,180,225,270,315].map((deg, i) => {
                  const r = deg * Math.PI / 180;
                  return <line key={i} x1={12+7*Math.cos(r)} y1={12+7*Math.sin(r)} x2={12+9*Math.cos(r)} y2={12+9*Math.sin(r)} stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>;
                })}
              </svg>,
              label: "Clair",
            },
          ].map(b => (
            <button
              key={String(b.mode)}
              onClick={() => setIsDark(b.mode)}
              style={{
                flex: 1,
                background: isDark === b.mode ? `${T.violet}22` : "transparent",
                border: `1px solid ${isDark === b.mode ? `${T.violet}44` : "transparent"}`,
                borderRadius: 7, padding: "7px 4px",
                color: isDark === b.mode ? T.violet : th.muted,
                fontSize: "0.65rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                transition: "all 0.2s",
              }}
            >
              {b.icon}
              {b.label}
            </button>
          ))}
        </div>

        {/* Signature auteure */}
        <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid rgba(168,127,255,${isDark ? 0.08 : 0.2})` }}>
          <p style={{ fontSize: "0.58rem", color: th.muted, lineHeight: 1.6 }}>
            Laurie Thélineau<br />CDA 2025 · v1.0
          </p>
        </div>
      </div>

      {/* ── ZONE PRINCIPALE (scrollable) ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "40px 40px 80px" }}>

        {/* En-tête de page avec chip de section */}
        <div style={{ marginBottom: 36, paddingBottom: 24, borderBottom: `1px solid rgba(168,127,255,${isDark ? 0.1 : 0.2})` }}>
          <Chip>
            {NAV.find(n => n.id === section)?.icon} {NAV.find(n => n.id === section)?.label}
          </Chip>
        </div>

        {/* Rendu conditionnel de la section active */}
        {/* On passe toujours l'objet th pour l'adaptation thème dark/light */}
        {section === "accueil"    && <SectionAccueil    th={th} />}
        {section === "charte"     && <SectionCharte     th={th} />}
        {section === "identite"   && <SectionIdentite   th={th} />}
        {section === "onboarding" && <SectionOnboarding th={th} />}
        {section === "specs"      && <SectionSpecs      th={th} />}

        {/* Footer global */}
        <div style={{ textAlign: "center", marginTop: 64, paddingTop: 32, borderTop: `1px solid rgba(168,127,255,${isDark ? 0.08 : 0.15})` }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.4rem", fontWeight: 700, color: th.text, marginBottom: 6 }}>
            Se<span style={{ color: T.violetSoft }}>y</span>rin
          </div>
          <p style={{ fontSize: "0.62rem", color: th.muted, letterSpacing: "0.1em" }}>
            Design System · Laurie Thélineau · CDA 2025
          </p>
        </div>

      </div>
    </div>
  );
}
