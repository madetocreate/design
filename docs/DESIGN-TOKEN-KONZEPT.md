# Design Token Konzept - design.studiomeyer.io

> Analyse-Datum: 31.01.2026 | Analysiert mit MCP-Server (analyze_website, design_tokens, section_map, screenshot)

---

## 1. IST-Zustand: Gefundene Inkonsistenzen

### Zusammenfassung

| Kategorie | Status | Problem |
|-----------|--------|---------|
| **Farben** | Inkonsistent | Hardcoded `#e94560` statt `--color-accent` (#ff5268) |
| **Schriftgrößen** | Inkonsistent | Tokens definiert, aber Components nutzen arbitrary values |
| **Line-Height** | Kein System | 10+ verschiedene Werte, kein definiertes Scale |
| **Letter-Spacing** | Kein System | 8+ arbitrary Werte wie `tracking-[0.4em]` |
| **Section-Spacing** | Inkonsistent | py-12, py-16, py-24, py-32, py-40, py-48 wild gemischt |
| **Opacities** | Kein System | white/10, white/40, white/50, white/60, white/70, white/80 |
| **Buttons** | Inkonsistent | `.btn` hat andere Größen als CTA/Form-Buttons |
| **Animationen** | OK | Effekte funktionieren, NICHT ANFASSEN |

---

## 2. Fonts (IST)

**Definiert:**
- `Inter` (Body, --font-body)
- `DM Serif Display` (Headlines, --font-display)

**Problem:** Nur weight 400 geladen. Components nutzen `font-light` (300), `font-extralight` (200), `font-medium` (500) - diese Weights werden nicht explizit geladen.

**Empfehlung:** Inter weights 200, 300, 400, 500 laden. DM Serif Display nur 400 (korrekt).

---

## 3. Farb-Tokens (IST vs SOLL)

### IST - Definiert in globals.css @theme:
```
--color-primary:          #708573   (Sage Green)
--color-secondary:        #050505   (Near Black)
--color-accent:           #ff5268   (Coral Red)
--color-background:       #000000
--color-foreground:       #ffffff
--color-foreground-muted: rgba(255,255,255, 0.75)
--color-foreground-subtle:rgba(255,255,255, 0.6)
--color-border:           rgba(255,255,255, 0.1)
--color-border-hover:     rgba(255,255,255, 0.2)
```

### Inkonsistenzen gefunden:

| Datei | Problem |
|-------|---------|
| `CtaSection.tsx` | Nutzt `#e94560` statt `var(--color-accent)` (#ff5268) |
| `CtaSection.tsx` | `border-[#e94560]/30` hardcoded |
| Pricing-Page | `bg-white/[0.03]`, `bg-white/[0.06]`, `bg-white/[0.08]` statt Tokens |
| Diverse | `text-white/70`, `text-white/50` statt `--color-foreground-muted` |

### SOLL - Fehlende Opacity-Tokens hinzufügen:
```css
--color-foreground-faint:  rgba(255,255,255, 0.1);   /* Für Badges, Divider-Text */
--color-foreground-dim:    rgba(255,255,255, 0.4);    /* Für sekundäre Labels */
--color-foreground-muted:  rgba(255,255,255, 0.75);   /* Bereits vorhanden */
--color-foreground-subtle: rgba(255,255,255, 0.6);    /* Bereits vorhanden */

--color-surface-faint:     rgba(255,255,255, 0.03);   /* Card-Hintergründe */
--color-surface-dim:       rgba(255,255,255, 0.06);   /* Hover-States */
--color-surface-muted:     rgba(255,255,255, 0.1);    /* Active-States */
```

---

## 4. Typography Scale (IST vs SOLL)

### IST - Definiert aber nicht genutzt:
```
--font-size-xs:      0.75rem    (12px)
--font-size-sm:      0.875rem   (14px)
--font-size-base:    1rem       (16px)
--font-size-lg:      1.125rem   (18px)
--font-size-xl:      1.25rem    (20px)
--font-size-2xl:     1.5rem     (24px)
--font-size-3xl:     2rem       (32px)
--font-size-4xl:     2.5rem     (40px)
--font-size-5xl:     3.5rem     (56px)
--font-size-6xl:     5rem       (80px)
--font-size-7xl:     7rem       (112px)
--font-size-8xl:     10rem      (160px)
--font-size-display: clamp(4rem, 15vw, 12rem)
```

### Problem:
Components nutzen stattdessen:
- `text-[5.5rem]` (arbitrary, nicht im Scale)
- `text-[clamp(8rem,25vw,20rem)]` (inline clamp)
- `fontSize: 'clamp(3.5rem, 13vw, 11rem)'` (inline style)
- `text-4xl md:text-6xl lg:text-8xl` (Tailwind-defaults statt Custom-Tokens)

### SOLL - Utility-Klassen in globals.css nutzen:
Die Klassen `.text-display`, `.text-heading-1`, `.text-heading-2`, `.text-heading-3`, `.text-body`, `.text-label` sind **bereits definiert** - sie werden nur nicht konsequent verwendet.

**Mapping für Components:**

| Component | IST | SOLL |
|-----------|-----|------|
| Hero Titel | `fontSize: clamp(3.5rem,13vw,11rem)` | `.text-display` |
| Stats Counter | `text-[clamp(8rem,25vw,20rem)]` | `.text-display` oder neues `.text-stat` |
| Section Headings | `text-4xl md:text-6xl lg:text-8xl` | `.text-heading-1` |
| Sub-Headings | `text-3xl md:text-5xl` | `.text-heading-2` |
| Card Titles | `text-xl md:text-2xl` | `.text-heading-3` |
| Body Text | `text-sm md:text-base` | `.text-body` |
| Labels/Tags | `text-xs uppercase tracking-[0.4em]` | `.text-label` |

---

## 5. Line-Height Scale (NEU - fehlt komplett)

### IST - Chaos:
`leading-[0.85]`, `leading-[0.9]`, `leading-none`, `leading-[1.05]`, `leading-[1.1]`, `leading-[1.3]`, `leading-tight`, `leading-relaxed`

### SOLL - 5 definierte Stufen:
```css
--leading-display:  0.85;    /* Sehr große Headlines (Hero, Stats) */
--leading-tight:    1.0;     /* Headlines h1-h3 */
--leading-snug:     1.3;     /* Sub-Headlines, Cards */
--leading-normal:   1.6;     /* Body Text (bereits als body default) */
--leading-relaxed:  1.7;     /* Längere Texte, Descriptions */
```

**Anwendung:**
```css
.text-display    { line-height: var(--leading-display); }
.text-heading-1  { line-height: var(--leading-tight); }
.text-heading-2  { line-height: var(--leading-tight); }
.text-heading-3  { line-height: var(--leading-snug); }
.text-body       { line-height: var(--leading-relaxed); }
```

---

## 6. Letter-Spacing Scale (NEU - fehlt komplett)

### IST - Chaos:
`tracking-tight`, `tracking-[-0.03em]`, `tracking-[-0.02em]`, `tracking-tighter`, `tracking-[0.05em]`, `tracking-wider`, `tracking-[0.2em]`, `tracking-[0.3em]`, `tracking-[0.4em]`

### SOLL - 4 definierte Stufen:
```css
--tracking-tight:   -0.03em;   /* Display/Hero Headlines */
--tracking-normal:  -0.02em;   /* Standard Headlines (bereits in h1-h6) */
--tracking-wide:     0.05em;   /* Labels, Tags (bereits in .text-label) */
--tracking-wider:    0.2em;    /* Uppercase Nav-Items, Badges */
```

**Alle `tracking-[0.3em]` und `tracking-[0.4em]` auf `tracking-[0.2em]` vereinheitlichen** - der aktuelle Spread ist zu breit und inkonsistent.

---

## 7. Spacing / Vertikaler Rhythmus

### IST - Section Padding:
```
py-12          (3rem)    - Footer
py-16          (4rem)    - FeaturedProjects
py-24          (6rem)    - Verschiedene
py-32          (8rem)    - Verschiedene
py-32 md:py-40 (8/10rem) - Services
py-32 md:py-48 (8/12rem) - CtaSection
py-16 md:py-24 (4/6rem)  - Pricing, Contact
```

### SOLL - 3 Section-Größen:
```css
/* Bereits definiert: --spacing-section: clamp(5rem, 12vh, 10rem) */

/* NEU: Varianten */
--spacing-section-sm: clamp(3rem, 6vh, 5rem);     /* Kompakte Sektionen */
--spacing-section:    clamp(5rem, 12vh, 10rem);    /* Standard (vorhanden) */
--spacing-section-lg: clamp(7rem, 15vh, 14rem);    /* Hero, CTA - mehr Luft */
```

**Mapping:**
| Section | IST | SOLL |
|---------|-----|------|
| Footer | `py-12` | `--spacing-section-sm` |
| FeaturedProjects | `py-16` | `--spacing-section-sm` |
| Standard Sections | `py-24`, `py-32` | `--spacing-section` (die CSS-Klasse `.section`) |
| Hero, CTA | `py-32 md:py-48` | `--spacing-section-lg` |

### "Luftiger" machen:
Die `--spacing-section` ist bereits fluid (`clamp(5rem, 12vh, 10rem)`). Um **mehr Luft** zu bekommen:
```css
--spacing-section:    clamp(6rem, 14vh, 12rem);    /* +20% mehr Luft */
--spacing-section-lg: clamp(8rem, 18vh, 16rem);    /* Deutlich luftiger */
```

---

## 8. Button-Token-System (NEU)

### IST:
- `.btn`: `padding: 0.75rem 1.5rem`
- CTA: `px-10 py-5` (komplett anders!)
- Form Submit: `py-4` (wieder anders)

### SOLL:
```css
.btn         { padding: 0.75rem 1.5rem; }   /* Standard (vorhanden) */
.btn-lg      { padding: 1rem 2.5rem; }       /* Für CTA-Buttons */
.btn-xl      { padding: 1.25rem 3rem; }      /* Für Hero-CTA */
```

---

## 9. Konkrete Aktionen (Priorität)

### Sofort (Tokens fixen, keine Effekte ändern):

1. **`globals.css`**: Line-Height Tokens hinzufügen (`--leading-*`)
2. **`globals.css`**: Letter-Spacing Tokens hinzufügen (`--tracking-*`)
3. **`globals.css`**: Opacity/Surface Tokens hinzufügen (`--color-surface-*`, `--color-foreground-faint/dim`)
4. **`globals.css`**: Section-Spacing Varianten hinzufügen (`--spacing-section-sm/lg`)
5. **`globals.css`**: Button-Varianten hinzufügen (`.btn-lg`, `.btn-xl`)
6. **`CtaSection.tsx`**: `#e94560` → `var(--color-accent)` ersetzen

### Danach (Component-Migration):

7. Components von arbitrary Tailwind-Werten auf CSS-Klassen migrieren
8. `text-white/XX` durch `text-[var(--color-foreground-muted)]` etc. ersetzen
9. `tracking-[0.3em]`/`tracking-[0.4em]` auf `tracking-[0.2em]` vereinheitlichen
10. Section-Padding auf `.section`/`.section-sm`/`.section-lg` Klassen umstellen

### NICHT ANFASSEN:
- Parallax-Effekte
- Scroll-Animationen
- Hover-Effekte
- GSAP/Framer Motion Code
- Alle `@keyframes`
- MagneticButton-Logik
- Hero-Kachel-Layout (nur Spacing-Tokens anpassen)

---

## 10. Vollständiges Token-Set (Referenz)

```css
@theme {
  /* === COLORS === */
  --color-primary:            #708573;
  --color-secondary:          #050505;
  --color-accent:             #ff5268;
  --color-background:         #000000;
  --color-foreground:         #ffffff;
  --color-foreground-faint:   rgba(255,255,255, 0.1);   /* NEU */
  --color-foreground-dim:     rgba(255,255,255, 0.4);    /* NEU */
  --color-foreground-subtle:  rgba(255,255,255, 0.6);
  --color-foreground-muted:   rgba(255,255,255, 0.75);
  --color-border:             rgba(255,255,255, 0.1);
  --color-border-hover:       rgba(255,255,255, 0.2);
  --color-surface-faint:      rgba(255,255,255, 0.03);   /* NEU */
  --color-surface-dim:        rgba(255,255,255, 0.06);   /* NEU */
  --color-surface-muted:      rgba(255,255,255, 0.1);    /* NEU */

  /* === NEUTRALS === */
  --color-neutral-50 bis --color-neutral-900 (unverändert)

  /* === TYPOGRAPHY SCALE === */
  --font-size-xs:      0.75rem;
  --font-size-sm:      0.875rem;
  --font-size-base:    1rem;
  --font-size-lg:      1.125rem;
  --font-size-xl:      1.25rem;
  --font-size-2xl:     1.5rem;
  --font-size-3xl:     2rem;
  --font-size-4xl:     2.5rem;
  --font-size-5xl:     3.5rem;
  --font-size-6xl:     5rem;
  --font-size-7xl:     7rem;
  --font-size-8xl:     10rem;
  --font-size-display: clamp(4rem, 15vw, 12rem);

  /* === LINE HEIGHT === */
  --leading-display:   0.85;     /* NEU */
  --leading-tight:     1.0;      /* NEU */
  --leading-snug:      1.3;      /* NEU */
  --leading-normal:    1.6;      /* NEU */
  --leading-relaxed:   1.7;      /* NEU */

  /* === LETTER SPACING === */
  --tracking-tight:    -0.03em;  /* NEU */
  --tracking-normal:   -0.02em;  /* NEU */
  --tracking-wide:      0.05em;  /* NEU */
  --tracking-wider:     0.2em;   /* NEU */

  /* === SPACING === */
  --spacing-xs:            clamp(0.5rem, 1vw, 1rem);
  --spacing-sm:            clamp(1rem, 2vw, 1.5rem);
  --spacing-md:            clamp(1.5rem, 3vw, 2.5rem);
  --spacing-lg:            clamp(2rem, 5vw, 4rem);
  --spacing-xl:            clamp(3rem, 8vw, 6rem);
  --spacing-section-sm:    clamp(3rem, 6vh, 5rem);      /* NEU */
  --spacing-section:       clamp(6rem, 14vh, 12rem);     /* ANGEPASST: luftiger */
  --spacing-section-lg:    clamp(8rem, 18vh, 16rem);     /* NEU */
  --spacing-container:     clamp(1.5rem, 5vw, 3rem);

  /* === TRANSITIONS === (unverändert) */
  --transition-fast:    150ms ease;
  --transition-base:    300ms ease;
  --transition-slow:    500ms ease;
  --transition-slower:  800ms cubic-bezier(0.16, 1, 0.3, 1);

  /* === Z-INDEX === (unverändert) */
}
```

---

## 11. Hinweis zu "luftiger"

Die aktuelle Seite wirkt teilweise eng weil:
1. **Section-Padding zu klein** auf Desktop (py-24 = 6rem ist wenig bei 1920px)
2. **Line-Heights auf Headlines zu tight** (0.85-0.9 für Body-nahe Texte)
3. **Letter-Spacing auf Labels inkonsistent** (0.2em bis 0.4em)
4. **Kein vertikaler Rhythmus** zwischen Elementen innerhalb der Sections

Die Token-Anpassungen oben (besonders `--spacing-section` auf `clamp(6rem, 14vh, 12rem)`) und konsistente Line-Heights werden die Seite spürbar luftiger machen, ohne die Effekte oder das Layout zu verändern.
