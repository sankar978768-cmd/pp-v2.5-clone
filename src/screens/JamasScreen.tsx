import React from 'react';
import { BirdId, Jama, PakshaType, DayOfWeek } from '../types';
import { BIRD_EMOJIS } from '../components/BirdSelectModal';
import { JamaCard } from '../components/JamaCard';
import { useLanguage } from '../context/LanguageContext';
import { getTamilDateInfo } from '../utils/tamilCalendar';
import {
  Clock,
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  Sparkles,
  ShieldAlert,
  Flame,
} from 'lucide-react';

export interface JamasScreenProps {
  selectedBird: BirdId;
  selectedPaksha: PakshaType;
  selectedDay: DayOfWeek;
  locationName: string;
  runningJamaNumber: number;
  timeDisplayMode: 'local' | 'ist';
  displayJamasList: Jama[];
  activeCurrentMinutes: number;
  expandedJamas: number[];
  onToggleJama: (jamaNumber: number) => void;
  onExpandRunningOnly: () => void;
  onToggleExpandAll: () => void;
  onNavigateToTab: (tab: 'bird' | 'location' | 'calendar') => void;
  selectedCalendarDate?: Date | null;
}

export const JamasScreen: React.FC<JamasScreenProps> = ({
  selectedBird,
  selectedPaksha,
  selectedDay,
  locationName,
  runningJamaNumber,
  timeDisplayMode,
  displayJamasList,
  activeCurrentMinutes,
  expandedJamas,
  onToggleJama,
  onExpandRunningOnly,
  onToggleExpandAll,
  onNavigateToTab,
  selectedCalendarDate,
}) => {
  const { language, t, getBirdName, getPakshaName, getDayName } = useLanguage();
  const currentBirdDisplayName = getBirdName(selectedBird);

  const activeDate = selectedCalendarDate || new Date();
  const activeTamilInfo = getTamilDateInfo(activeDate);

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* 1. RED ALERT BANNER if current viewing date is a Thaniya Naal */}
      {activeTamilInfo.isThaniyaNaal && (
        <div className="bg-gradient-to-r from-rose-500/20 via-rose-500/10 to-red-600/20 border-2 border-rose-500/80 rounded-2xl p-3.5 sm:p-4 text-rose-950 dark:text-rose-100 shadow-md animate-scaleIn">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm animate-pulse">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white font-black text-xs uppercase tracking-wider shadow-xs">
                  🚨 {language === 'ta' ? 'சிவப்பு எச்சரிக்கை (RED ALERT)' : 'RED ALERT: NON-AUSPICIOUS'}
                </span>
                <span className="font-extrabold text-xs sm:text-sm text-rose-800 dark:text-rose-300">
                  {activeTamilInfo.tamilMonthNameTa} {activeTamilInfo.tamilDate}-ஆம் தேதி
                </span>
                <button
                  type="button"
                  onClick={() => onNavigateToTab('calendar')}
                  className="text-xs underline text-rose-700 dark:text-rose-300 font-bold hover:text-rose-900 cursor-pointer"
                >
                  {language === 'ta' ? 'நாட்காட்டியில் பார்க்க' : 'View Calendar'}
                </button>
              </div>

              <p className="text-xs sm:text-sm font-bold text-rose-900 dark:text-rose-100 leading-snug">
                {language === 'ta'
                  ? 'பஞ்சபட்சி சாஸ்திரப்படி இந்நாள் "தனிய நாள்" (சுபகாரியங்கள் தவிர்க்கப்பட வேண்டிய நாள்). இந்நாளில் பட்சி பலவீனம் அடைவதால் புதிய முயற்சிகள் அல்லது முக்கிய பயணங்களைத் தவிர்ப்பது நன்று.'
                  : 'According to Pancha Pakshi Shastra, today is an inauspicious "Thaniya Naal". Avoid commencing auspicious ceremonies, signing major contracts, or vital travel.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. Jamas Screen Top Status & Controls Strip */}
      <section
        aria-label="10 Jama Calculation Controls"
        className="bg-white dark:bg-slate-900/90 p-3.5 sm:p-5 rounded-2xl border border-[#E8DFCE] dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        {/* Active Bird, Paksha, Day, and Location summary */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigateToTab('bird')}
            className="w-12 h-12 rounded-2xl bg-[#1B4332] text-white flex items-center justify-center text-2xl shadow-xs shrink-0 cursor-pointer hover:scale-105 active:scale-95 transition-all select-none"
            title={language === 'ta' ? 'பட்சி மாற்ற கிளிக் செய்க' : 'Click to view bird profile'}
          >
            {BIRD_EMOJIS[selectedBird] || '🦅'}
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                {currentBirdDisplayName}
              </h1>
              <span className="text-[11px] font-bold text-amber-800 dark:text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>
                  {language === 'ta'
                    ? `சாமம் ${runningJamaNumber} நடப்பில்`
                    : `Jama ${runningJamaNumber} Running`}
                </span>
              </span>
              {timeDisplayMode === 'ist' && (
                <span className="text-[10px] text-emerald-800 dark:text-emerald-300 font-bold bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  🇮🇳 IST (+05:30)
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
              <button
                type="button"
                onClick={() => onNavigateToTab('calendar')}
                className="flex items-center gap-1 hover:text-[#1B4332] dark:hover:text-emerald-400 transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {activeTamilInfo.tamilMonthNameTa} {activeTamilInfo.tamilDate} ·
                </span>
                <span>{getPakshaName(selectedPaksha).split(' ')[0]} · {getDayName(selectedDay)}</span>
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => onNavigateToTab('location')}
                className="flex items-center gap-1 hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
                <span className="truncate max-w-[120px]">{locationName || (language === 'ta' ? 'சென்னை' : 'Chennai')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Expand/Contract Action Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <button
            type="button"
            onClick={onExpandRunningOnly}
            id="expand-running-jama-only-btn"
            className={`min-h-[42px] text-xs px-3 py-1.5 rounded-xl border transition-all cursor-pointer font-bold flex items-center gap-1.5 ${
              expandedJamas.length === 1 && expandedJamas[0] === runningJamaNumber
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-900 dark:text-amber-300'
                : 'bg-[#FAF6EE] dark:bg-slate-800 border-[#E8DFCE] dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
            title={t('runningJamaExpandedOnly')}
          >
            <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>{t('runningOnlyBtn')}</span>
          </button>

          <button
            type="button"
            onClick={onToggleExpandAll}
            id="toggle-expand-all-jamas-btn"
            className="min-h-[42px] text-xs px-3 py-1.5 rounded-xl border border-[#E8DFCE] dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {expandedJamas.length === 10 ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
                <span>{language === 'ta' ? 'அனைத்தையும் சுருக்கு' : 'Collapse All'}</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>{language === 'ta' ? '10 சாமங்களையும் விரி' : 'Expand All 10'}</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* 3. 10 Jamas Cards Grid */}
      <section aria-label="10 Jamas Schedule List" className="space-y-3">
        {displayJamasList.map((jama) => (
          <JamaCard
            key={jama.jamaNumber}
            jama={jama}
            selectedBird={selectedBird}
            currentMinutes={activeCurrentMinutes}
            isExpanded={expandedJamas.includes(jama.jamaNumber)}
            onToggleExpand={() => onToggleJama(jama.jamaNumber)}
            paksha={selectedPaksha}
            cycleStartMinutes={displayJamasList[0]?.startMinutesFromMidnight ?? 360}
          />
        ))}
      </section>
    </div>
  );
};
