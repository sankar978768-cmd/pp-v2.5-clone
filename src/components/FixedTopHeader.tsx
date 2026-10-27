import React from 'react';
import { BirdId, PakshaType, DayOfWeek } from '../types';
import { BIRD_EMOJIS } from './BirdSelectModal';
import { useLanguage } from '../context/LanguageContext';
import {
  Menu,
  Sun,
  Moon,
} from 'lucide-react';

export interface FixedTopHeaderProps {
  onOpenSideMenu: () => void;
  selectedPaksha: PakshaType;
  selectedDay: DayOfWeek;
  selectedCalendarDate: Date | null;
  locationName: string;
  selectedBird: BirdId;
  theme: string;
  setTheme: (theme: 'bright' | 'dark') => void;
  language: string;
  setLanguage: (lang: 'en' | 'ta') => void;
  timeDisplayMode: 'local' | 'ist';
  onToggleTimeDisplayMode: (mode: 'local' | 'ist') => void;
  tzAbbreviation?: string;
}

export const FixedTopHeader: React.FC<FixedTopHeaderProps> = ({
  onOpenSideMenu,
  selectedBird,
  theme,
  setTheme,
  language,
  setLanguage,
  timeDisplayMode,
  onToggleTimeDisplayMode,
  tzAbbreviation = 'Local',
}) => {
  const { getBirdName } = useLanguage();

  return (
    <header
      id="fixed-top-header"
      className="fixed top-0 left-0 right-0 z-40 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-[#E8DFCE] dark:border-slate-800 shadow-xs transition-colors duration-150 pt-[calc(8px+env(safe-area-inset-top,0px))] pb-2"
    >
      <div className="max-w-7xl mx-auto px-2.5 sm:px-4">
        <div className="flex items-center justify-between gap-2 h-11 sm:h-12">
          {/* Left Zone: Hamburger Side Menu Button + Bird Mark & Title */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenSideMenu}
              id="top-side-menu-trigger-btn"
              className="min-h-[44px] min-w-[44px] px-2.5 rounded-xl bg-[#1B4332] hover:bg-[#133024] text-white flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-xs"
              title={language === 'ta' ? 'பக்க மெனுவை திறக்கவும்' : 'Open Side Menu'}
              aria-label={language === 'ta' ? 'பக்க மெனுவை திறக்கவும்' : 'Open Side Menu'}
            >
              <Menu className="w-5 h-5 text-amber-400" />
              <span className="hidden sm:inline font-bold">
                {language === 'ta' ? 'மெனு' : 'Menu'}
              </span>
            </button>

            {/* Bird Mark & App Title */}
            <button
              type="button"
              onClick={onOpenSideMenu}
              className="flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer text-left"
              title={language === 'ta' ? 'பட்சி மாற்ற மெனுவை திறக்கவும்' : 'Click to change bird or settings'}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center text-lg sm:text-xl font-black shadow-xs shrink-0 select-none">
                {BIRD_EMOJIS[selectedBird] || '🦅'}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight flex items-center gap-1.5">
                  <span className="truncate">Pancha Pakshi</span>
                  <span className="text-[11px] text-amber-800 dark:text-amber-400 font-bold bg-amber-500/15 px-1.5 py-0.2 rounded-md hidden sm:inline">
                    {getBirdName(selectedBird)}
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Center / Right Zone: Dedicated IST Switcher + Preferences */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* IST Switcher (Always accessible in top bar) */}
            <div
              id="header-ist-switcher"
              className="h-10 p-0.5 rounded-xl bg-[#FAF6EE] dark:bg-slate-900 border border-[#E8DFCE] dark:border-slate-800 flex items-center shadow-2xs select-none"
            >
              <button
                type="button"
                onClick={() => onToggleTimeDisplayMode('local')}
                id="header-switch-local-btn"
                className={`h-full min-h-[36px] px-2.5 sm:px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                  timeDisplayMode === 'local'
                    ? 'bg-[#1B4332] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                }`}
                title={language === 'ta' ? `உள்ளூர் சூரிய நேரம் (${tzAbbreviation})` : `Local Solar Time (${tzAbbreviation})`}
              >
                <span>📍</span>
                <span className="hidden min-[420px]:inline">{tzAbbreviation || 'Local'}</span>
                <span className="min-[420px]:hidden">Loc</span>
              </button>

              <button
                type="button"
                onClick={() => onToggleTimeDisplayMode('ist')}
                id="header-switch-ist-btn"
                className={`h-full min-h-[36px] px-2.5 sm:px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                  timeDisplayMode === 'ist'
                    ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                }`}
                title={language === 'ta' ? 'இந்திய நிலையான நேரம் (IST +05:30)' : 'Indian Standard Time (IST +05:30)'}
              >
                <span>🇮🇳</span>
                <span>IST</span>
              </button>
            </div>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'bright' : 'dark')}
              className="min-h-[44px] min-w-[44px] rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer flex items-center justify-center active:scale-95 shadow-2xs"
              title={language === 'ta' ? 'தோற்றம் மாற்றவும்' : 'Toggle Theme'}
              aria-label={language === 'ta' ? 'தோற்றம் மாற்றவும்' : 'Toggle Theme'}
            >
              <Sun className="w-4 h-4 dark:hidden text-amber-500" />
              <Moon className="w-4 h-4 hidden dark:block text-amber-400" />
            </button>

            {/* Language Toggle Button */}
            <button
              type="button"
              onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
              className="min-h-[44px] min-w-[44px] rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 text-xs font-bold flex items-center justify-center text-center transition-colors cursor-pointer active:scale-95 shadow-2xs"
              title={language === 'en' ? 'Switch to Tamil' : 'Switch to English'}
              aria-label={language === 'en' ? 'Switch to Tamil' : 'Switch to English'}
            >
              {language === 'en' ? 'த' : 'EN'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
