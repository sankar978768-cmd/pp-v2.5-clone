# Display Day Ruler, Night Ruler & Dying Bird in JamasScreen Top Bar

Display the three pivotal astrological birds—**Day Ruler** (பகல் அரசு), **Night Ruler** (இரவு அரசு), and **Dying Bird** (சாவுப் பட்சி)—directly in the top bar and status section of `JamasScreen` so users can instantly identify the ruling and maranam energies for the active day without navigating away.

## User Review & Critical Decisions

> [!IMPORTANT]
> The top bar is a critical mobile touch area. We are implementing a clean, high-contrast, responsive presentation that adapts effortlessly across mobile viewports (375px–430px) and desktop screens without exceeding the 15% sticky header cap or cluttering existing controls (IST switcher, side menu, theme/language toggles).

- **Confirmed Feature Scope**: Display **Day Ruler (பகல் அரசு)**, **Night Ruler (இரவு அரசு)**, and **Dying Bird (சாவுப் பட்சி)** with bird emojis, distinct semantic color accents (Gold for Day Ruler, Indigo for Night Ruler, Rose/Red for Dying Bird), and bilingual Tamil/English labels.
- **Placement Strategy**:
  1. **Sticky Top Header Strip**: A dedicated, ultra-sleek quick-indicator bar inside the sticky header when on `JamasScreen`, displaying the 3 bird avatars and roles cleanly.
  2. **JamasScreen Top Hero Card**: An expanded, interactive 3-card indicator cluster in `JamasScreen` showing full bird details, Tamil titles, and star influence.
- **Interactivity**: Tapping any ruler or dying bird badge navigates or opens that bird's specific Jama view or quick details modal.

---

## 1. Overview & Core Concept

In traditional **Pancha Pakshi Shastra**, every day is governed by specific bird states according to the Moon's phase (Valarpirai / Shukla Paksha vs. Theipirai / Krishna Paksha) and the Day of the Week:
1. **Day Ruler (பகல் அரசு பட்சி)**: The bird that holds supreme royal strength during daytime Jamas 1–5.
2. **Night Ruler (இரவு அரசு பட்சி)**: The bird that holds supreme royal strength during nighttime Jamas 6–10.
3. **Dying Bird (சாவுப் பட்சி / மரணப் பட்சி)**: The bird in the extreme vulnerable state for that day. Activities undertaken during this period by this bird are traditionally avoided.

This feature elevates these 3 crucial data points to the top of `JamasScreen`, providing immediate astrological clarity at the exact moment a user opens the applet.

---

## 2. User Experience & Visual Design

### Key User Flow
1. User enters `JamasScreen` (default screen on launch or via bottom navigation).
2. Directly within the top bar zone, user sees:
   - ☀️ **Day Ruler (பகல் அரசு)**: e.g. `🦅 Vulture (கழுகு)` with a golden crown icon.
   - 🌙 **Night Ruler (இரவு அரசு)**: e.g. `🪶 Crow (காகம்)` with an evening crescent moon icon.
   - ⚠️ **Dying Bird (சாவு)**: e.g. `🦉 Owl (ஆந்தை)` with an alert/maranam badge in rose red.
3. When the user changes the Date or Paksha via the Calendar or Side Menu, all three birds dynamically update in real time.
4. Tapping any of the three bird chips reveals a helpful micro-summary of that bird's role for the day.

### Visual Styling & Design System
- **Color Discipline (60-30-10)**:
  - Day Ruler: Amber/Gold accent (`text-amber-600 dark:text-amber-400`, `bg-amber-500/10`, `border-amber-500/30`).
  - Night Ruler: Indigo/Violet accent (`text-indigo-600 dark:text-indigo-400`, `bg-indigo-500/10`, `border-indigo-500/30`).
  - Dying Bird: Rose/Crimson accent (`text-rose-600 dark:text-rose-400`, `bg-rose-500/10`, `border-rose-500/30`).
- **Typography**: Clean font sizes (`text-xs` / `text-[11px]`) with bold Tamil typography (`font-bold` / `font-black`) and unboxed semantic dividers.
- **Mobile Ergonomics**:
  - Compact height fits within touch standards ($\ge 44\text{px}$ touch targets).
  - Preserves $<15\%$ sticky surface budget on mobile devices.
  - Responsive collapse: on narrow mobile screens (375px), labels seamlessly adapt to icon + short Tamil name (e.g., ☀️ கழுகு · 🌙 காகம் · ⚠️ ஆந்தை) to prevent overflow or wrapping.

---

## 3. Key Product Decisions & Trade-Offs

- **Dual-Level Visibility**:
  - *Level 1 (Sticky Top Header)*: Compact pill chips integrated into `FixedTopHeader` visible during scroll.
  - *Level 2 (JamasScreen Header Section)*: Rich informative card cluster right above the Jama timeline with explanations and quick actions.
- **Data Source Consistency**:
  - Uses the existing canonical `PANCHA_PAKSHI_DAYS` registry in `src/data/panchaPakshiRegistry.ts` which already maps `dayRulingBird`, `nightRulingBird`, and `dyingBird` for all 14 Paksha-Day combinations.
  - Zero external API dependencies; instant, deterministic calculation.

---

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                       App State                             │
│  selectedPaksha ('valarpirai'|'theipirai')                  │
│  selectedDay ('sunday'..'saturday')                         │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│             panchaPakshiRegistry (PANCHA_PAKSHI_DAYS)        │
│  id: 'valarpirai_sunday'                                    │
│  dayRulingBird: 'vulture'                                   │
│  nightRulingBird: 'crow'                                    │
│  dyingBird: 'owl'                                           │
└──────────────────────────────┬──────────────────────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
┌──────────────────────────────┐    ┌──────────────────────────────┐
│       FixedTopHeader         │    │         JamasScreen          │
│  Sticky quick ruler strip:   │    │  Top Status Bar:             │
│  • ☀️ Day Ruler Chip         │    │  • Day Ruler (பகல் அரசு)     │
│  • 🌙 Night Ruler Chip       │    │  • Night Ruler (இரவு அரசு)   │
│  • ⚠️ Dying Bird Chip        │    │  • Dying Bird (சாவுப் பட்சி) │
│  (Mobile responsive)         │    │  (Detailed & Interactive)    │
└──────────────────────────────┘    └──────────────────────────────┘
```

### Affected Files
1. `src/components/FixedTopHeader.tsx`: Accept `dayMeta` or calculate ruler birds for the current day/paksha; render the compact ruler strip.
2. `src/screens/JamasScreen.tsx`: Add the dedicated Day Ruler, Night Ruler, and Dying Bird presentation block inside the top controls section.
3. `src/App.tsx`: Pass `dayMeta` (already available in `App.tsx`) to `FixedTopHeader` and `JamasScreen`.
4. Verification: Run `compile_applet` and `lint_applet` to confirm zero type or build regressions.
