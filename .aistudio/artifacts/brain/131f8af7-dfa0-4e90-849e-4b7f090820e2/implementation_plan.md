# Streamlined 10 Jamas Dashboard with Categorized Side Menu

Streamlines the Pancha Pakshi application so that the Main Dashboard is dedicated exclusively to the 10 Jama Calculations and real-time sub-period insights. All secondary controls—Date & Paksha selection, Location & Sunrise/Sunset adjustments, Bird selection & relationships, and Analytics views (Chart & Master Table)—are packaged into a responsive, touch-optimized Side Menu navigation drawer designed for mobile and Android environments.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The primary dashboard is now decluttered from multi-tier header blocks and section stacks. The 10 Jama cards take center stage with instant visibility upon launch, while secondary controls are neatly organized into categorized drawer sections.

- **Confirmed Decision (Phase 1)**: Organized secondary controls in the side menu under categorized sections: **Date & Calendar**, **Location & Solar**, **Bird Selection**, and **Analytics & Tools**.
- **Mobile & Android Touch Optimization**: 
  - Standardized $\ge 44\text{px}$ touch hitboxes for all drawer items, toggle switches, and buttons.
  - Native drawer slide-out with backdrop scrim and hardware-accelerated transforms (`translate-x-0` / `-translate-x-full`).
  - Added safe-area padding (`pb-safe`, `pt-safe`) for Android status bar and gesture navigation bar compatibility.
- **Main Dashboard Information Density**:
  - The sticky app bar is reduced to a single compact row ($\le 56\text{px}$): Drawer menu trigger, active Bird badge with current running Jama status, quick Day/Night filter, and quick date indicator.
  - 100% of the screen below the compact header is dedicated to the 10 Jamas, active Jama expansion, sub-periods (Anthardasa), star ratings, and bird activities.

---

## 1. Overview & Core Concept

- **What It Does**: Provides users with instant, zero-distraction access to the 10 Vedic Jamas (5 Day Jamas + 5 Night Jamas) for the active bird. Users can seamlessly see current auspicious/inauspicious activities (Ruling, Eating, Walking, Sleeping, Dying), exact start/end timings, and Anthardasa sub-cycles.
- **Target Audience / Persona**: Astrological practitioners, Vedic scholars, and everyday users checking bird timings throughout the day on mobile phones, tablets, and Android web views.
- **Key Value**: Eliminates vertical page bloat and tedious scrolling past 4 heavy configuration panels before reaching the Jama calculations. Everything is reachable via an intuitive side drawer without losing any functionality.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Zero-State Launch**: User opens the app; the Main Dashboard immediately renders the 10 Jama cards with the current running Jama auto-expanded and highlighted with live countdown progress.
2. **Accessing Secondary Settings**: User taps the hamburger menu icon (or swipes from left on touch screens); a smooth side drawer slides in displaying categorized sections with clear visual headers and active indicators.
3. **Switching Date or Bird in Drawer**: User selects a different bird or Paksha/Day; the drawer updates live, and closing the drawer immediately presents the newly computed 10 Jamas on the dashboard.
4. **Accessing Deep Analytics**: User taps "Activity Chart" or "Master Table" in the Analytics section of the side menu; an optimized view/modal presents the charts and tabular data without cluttering the main calculation dashboard.

### Visual Identity & Theme
- **Aesthetic Direction**: Vedic Sacred Geometry meets modern Material 3 / Android touch ergonomics. Warm Ivory (`#FAF6EE`) canvas in light mode and Deep Obsidian Slate (`#020617`) in dark mode, paired with Deep Forest Green (`#1B4332`) and Antique Gold (`#C29738`) accents.
- **Anti-Slop & Zero-Pill Discipline**: Metadata uses clean unboxed typography with typographic separators (`·`). Interactive tabs and drawer items use structured container fills rather than pill badges.
- **Mobile Ergonomics**: All interactive elements strictly maintain $\ge 44\text{px}$ touch hitboxes. Drawer width is capped at `min(100vw - 48px, 380px)` ensuring comfortable thumb reach.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Slide-Out Drawer vs. Persistent Desktop Sidebar**
  - *Chosen Approach*: Responsive overlay drawer on mobile/Android that slides out smoothly from the left, with an optional toggleable layout for desktop.
  - *Why*: Preserves maximal viewport height and width for the 10 Jama cards, critical for Android devices where vertical screen real estate is restricted by on-screen navigation and keyboards.
  - *Alternatives Considered*: Permanent split sidebar on all viewports (rejected because it crushes the detailed Jama card sub-period tables on mobile screens).

- **Decision 2: Categorized Drawer Architecture**
  - *Chosen Approach*: Four distinct drawer categories with clear section headers:
    1. *Date & Paksha*: Valarpirai / Theipirai selector, day buttons, panchang calendar trigger.
    2. *Location & Solar*: Sunrise/sunset times, location search, IST vs. local time toggle.
    3. *Bird Selection*: 5 birds with ruling status, friendship matrix, and profile attributes.
    4. *Analytics & Reports*: Full activity cycle chart, 24-hour master comparison table, time lookup utility.
  - *Why*: Direct match for user's confirmed preference, preventing drawer scrolling overload and grouping related astrological variables together.

- **Decision 3: Sticky Top Bar Simplification**
  - *Chosen Approach*: Streamline the fixed top header from a tall multi-line bar down to a single clean 52px app bar with drawer trigger, title, active bird indicator, and Day/Night filter.
  - *Why*: Complies with the 15% mobile sticky surface cap rule while keeping vital contextual state visible.

---

## 4. Technical Architecture & Data Strategy

### Architecture & Component Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                        MAIN APP CONTROLLER                             │
│       (App.tsx: State for Bird, Paksha, Day, Location, Timezone)        │
└──────────────────────────┬──────────────────────────────┬──────────────┘
                           │                              │
         ┌─────────────────┴───────────────┐              │
         ▼                                 ▼              ▼
┌───────────────────┐             ┌────────────────────────────────────┐
│ COMPACT APP BAR   │             │       CATEGORIZED SIDE DRAWER      │
│ - Menu Button     │             │        (SideNavigationDrawer)      │
│ - Bird & Jama Info│             ├────────────────────────────────────┤
│ - Day/Night Filter│             │ 1. Date & Paksha Section           │
│ - Calendar Trigger│             │    - PakshaDaySelector controls    │
└───────────────────┘             │ 2. Location & Solar Section        │
         │                        │    - SunriseSunsetBar & Location   │
         │                        │ 3. Bird Selection Section          │
         │                        │    - BirdSelector & Status Matrix  │
         ▼                        │ 4. Analytics & Modals Section      │
┌───────────────────────────────┐ │    - Activity Chart launcher       │
│     MAIN DASHBOARD VIEW       │ │    - Master Table launcher         │
│  (10 Jama Calculations Only)  │ │    - Time Lookup launcher          │
├───────────────────────────────┤ │ 5. App Preferences                 │
│ • Filter Bar (All/Day/Night)  │ │    - Language (EN/TA) & Theme      │
│ • Running Jama Highlight      │ └────────────────────────────────────┘
│ • 10 x JamaCard Items         │
│   - Jama Timings & Duration   │
│   - Main Bird Activity        │
│   - Anthardasa Sub-Periods    │
│   - Star Ratings & Matrix     │
└───────────────────────────────┘
```

### State & Handler Strategy
- **Drawer Open State**: `isSideMenuOpen` boolean with smooth transition backdrop overlay, closing on backdrop tap or item selection.
- **Analytics Modal State**: Modals for Activity Chart and Master Table open seamlessly on demand from drawer navigation or header shortcuts.
- **10 Jamas Calculations Preservation**: The core calculation pipeline (`recalculateJamas`, solar calculator, timezone conversion, Anthardasa breakdown) remains completely untouched, operating with 100% mathematical fidelity.
- **Android Ergonomics**: Uses touch-action manipulation, prevention of body scroll when drawer is open, and safe area padding.
