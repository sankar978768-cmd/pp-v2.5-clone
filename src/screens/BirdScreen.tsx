import React from 'react';
import { BirdId, Jama, DayCalculationMeta, PakshaType } from '../types';
import { BIRDS } from '../data/panchaPakshiData';
import { BirdSelector } from '../components/BirdSelector';
import { CurrentStatusBanner } from '../components/CurrentStatusBanner';
import { BirdRelationshipsView } from '../components/BirdRelationshipsView';
import { useLanguage } from '../context/LanguageContext';
import { Feather, Compass, Globe, Sparkles } from 'lucide-react';

export interface BirdScreenProps {
  selectedBird: BirdId;
  onSelectBird: (birdId: BirdId) => void;
  dayMeta?: DayCalculationMeta;
  paksha: PakshaType;
  customJamas: Jama[];
  currentMinutes: number;
  isOtherLocation: boolean;
  timeDisplayMode: 'local' | 'ist';
  tzAbbreviation: string;
  locationName: string;
}

export const BirdScreen: React.FC<BirdScreenProps> = ({
  selectedBird,
  onSelectBird,
  dayMeta,
  paksha,
  customJamas,
  currentMinutes,
  isOtherLocation,
  timeDisplayMode,
  tzAbbreviation,
  locationName,
}) => {
  const { language, t, getBirdName, getElementName, getPlanetName, getDirectionName, getBirdDescription } = useLanguage();
  const currentBird = BIRDS[selectedBird];

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Screen Title Banner */}
      <section className="bg-white dark:bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-[#E8DFCE] dark:border-slate-800 shadow-xs">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-400 text-xs font-bold mb-1.5">
              <Feather className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? 'பட்சி விபரம் & தேர்வு' : 'Bird Profile & Selection'}</span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-tight">
              {getBirdName(selectedBird)}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              {getBirdDescription(selectedBird)}
            </p>
          </div>
        </div>

        {/* Bird Astrological Characteristics Pill Strip */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="bg-[#FAF6EE] dark:bg-slate-800/80 p-2.5 rounded-xl border border-[#E8DFCE] dark:border-slate-700/80">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-bold">
              {language === 'ta' ? 'பூதம் / Element' : 'Element'}
            </span>
            <span className="font-extrabold text-slate-900 dark:text-white mt-0.5 block truncate">
              {getElementName(selectedBird)}
            </span>
          </div>

          <div className="bg-[#FAF6EE] dark:bg-slate-800/80 p-2.5 rounded-xl border border-[#E8DFCE] dark:border-slate-700/80">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-bold">
              {language === 'ta' ? 'கிரகம் / Planet' : 'Ruling Planet'}
            </span>
            <span className="font-extrabold text-slate-900 dark:text-white mt-0.5 block truncate">
              {getPlanetName(selectedBird)}
            </span>
          </div>

          <div className="bg-[#FAF6EE] dark:bg-slate-800/80 p-2.5 rounded-xl border border-[#E8DFCE] dark:border-slate-700/80">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-bold">
              {language === 'ta' ? 'திசை / Direction' : 'Direction'}
            </span>
            <span className="font-extrabold text-slate-900 dark:text-white mt-0.5 block truncate">
              {getDirectionName(selectedBird)}
            </span>
          </div>
        </div>
      </section>

      {/* Real-Time Current Status of Selected Bird */}
      <section aria-label="Current Bird Status Banner">
        <CurrentStatusBanner
          selectedBird={selectedBird}
          customJamas={customJamas}
          currentMinutes={currentMinutes}
          isOtherLocation={isOtherLocation}
          timeDisplayMode={timeDisplayMode}
          tzAbbreviation={tzAbbreviation}
          locationName={locationName}
        />
      </section>

      {/* 5 Birds Selector Grid with Ruling/Dying Roles */}
      <section aria-label="Choose Bird" className="bg-white dark:bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-[#E8DFCE] dark:border-slate-800 shadow-xs space-y-3">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <span>{language === 'ta' ? '5 பட்சிகளில் ஒன்றைத் தேர்ந்தெடுக்கவும்' : 'Select From The 5 Birds'}</span>
        </h2>
        <BirdSelector
          selectedBird={selectedBird}
          onSelectBird={onSelectBird}
          dayMeta={dayMeta}
          paksha={paksha}
        />
      </section>

      {/* Bird Relationships & Friendship Compatibility Matrix */}
      <section aria-label="Bird Relationships Matrix" className="bg-white dark:bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-[#E8DFCE] dark:border-slate-800 shadow-xs space-y-3">
        <BirdRelationshipsView
          selectedBird={selectedBird}
          onSelectBird={onSelectBird}
          paksha={paksha}
        />
      </section>
    </div>
  );
};
