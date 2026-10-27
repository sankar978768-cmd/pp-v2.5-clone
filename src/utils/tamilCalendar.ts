import { PakshaType, DayOfWeek } from '../types';
import { getLunarDayInfo, LunarDayInfo } from './lunarCalendar';

export interface TamilMonthDef {
  index: number; // 0 to 11
  nameTa: string;
  nameEn: string;
  zodiacRasiTa: string;
  zodiacRasiEn: string;
  thaniyaDates: number[];
  rulingBirdTa: string;
  rulingBirdEn: string;
  emoji: string;
}

export const TAMIL_MONTHS: TamilMonthDef[] = [
  {
    index: 0,
    nameTa: 'சித்திரை',
    nameEn: 'Chithirai',
    zodiacRasiTa: 'மேஷம்',
    zodiacRasiEn: 'Aries',
    thaniyaDates: [3, 20],
    rulingBirdTa: 'சேவல் / வல்லூறு',
    rulingBirdEn: 'Rooster / Vulture',
    emoji: '♈',
  },
  {
    index: 1,
    nameTa: 'வைகாசி',
    nameEn: 'Vaikasi',
    zodiacRasiTa: 'ரிஷபம்',
    zodiacRasiEn: 'Taurus',
    thaniyaDates: [9, 22],
    rulingBirdTa: 'ஆந்தை',
    rulingBirdEn: 'Owl',
    emoji: '♉',
  },
  {
    index: 2,
    nameTa: 'ஆனி',
    nameEn: 'Aani',
    zodiacRasiTa: 'மிதுனம்',
    zodiacRasiEn: 'Gemini',
    thaniyaDates: [8, 22],
    rulingBirdTa: 'காகம்',
    rulingBirdEn: 'Crow',
    emoji: '♊',
  },
  {
    index: 3,
    nameTa: 'ஆடி',
    nameEn: 'Aadi',
    zodiacRasiTa: 'கடகம்',
    zodiacRasiEn: 'Cancer',
    thaniyaDates: [7, 20],
    rulingBirdTa: 'கிளி',
    rulingBirdEn: 'Parrot',
    emoji: '♋',
  },
  {
    index: 4,
    nameTa: 'ஆவணி',
    nameEn: 'Aavani',
    zodiacRasiTa: 'சிம்மம்',
    zodiacRasiEn: 'Leo',
    thaniyaDates: [7, 18],
    rulingBirdTa: 'மயில்',
    rulingBirdEn: 'Peacock',
    emoji: '♌',
  },
  {
    index: 5,
    nameTa: 'புரட்டாசி',
    nameEn: 'Purattasi',
    zodiacRasiTa: 'கன்னி',
    zodiacRasiEn: 'Virgo',
    thaniyaDates: [9, 26],
    rulingBirdTa: 'சேவல் / வல்லூறு',
    rulingBirdEn: 'Rooster / Vulture',
    emoji: '♍',
  },
  {
    index: 6,
    nameTa: 'ஐப்பசி',
    nameEn: 'Aippasi',
    zodiacRasiTa: 'துலாம்',
    zodiacRasiEn: 'Libra',
    thaniyaDates: [8, 19],
    rulingBirdTa: 'ஆந்தை',
    rulingBirdEn: 'Owl',
    emoji: '♎',
  },
  {
    index: 7,
    nameTa: 'கார்த்திகை',
    nameEn: 'Karthigai',
    zodiacRasiTa: 'விருச்சிகம்',
    zodiacRasiEn: 'Scorpio',
    thaniyaDates: [8, 14],
    rulingBirdTa: 'காகம்',
    rulingBirdEn: 'Crow',
    emoji: '♏',
  },
  {
    index: 8,
    nameTa: 'மார்கழி',
    nameEn: 'Margazhi',
    zodiacRasiTa: 'தனுசு',
    zodiacRasiEn: 'Sagittarius',
    thaniyaDates: [8, 26],
    rulingBirdTa: 'கிளி',
    rulingBirdEn: 'Parrot',
    emoji: '♐',
  },
  {
    index: 9,
    nameTa: 'தை',
    nameEn: 'Thai',
    zodiacRasiTa: 'மகரம்',
    zodiacRasiEn: 'Capricorn',
    thaniyaDates: [8, 15],
    rulingBirdTa: 'மயில்',
    rulingBirdEn: 'Peacock',
    emoji: '♑',
  },
  {
    index: 10,
    nameTa: 'மாசி',
    nameEn: 'Masi',
    zodiacRasiTa: 'கும்பம்',
    zodiacRasiEn: 'Aquarius',
    thaniyaDates: [15, 24],
    rulingBirdTa: 'சேவல் / வல்லூறு',
    rulingBirdEn: 'Rooster / Vulture',
    emoji: '♒',
  },
  {
    index: 11,
    nameTa: 'பங்குனி',
    nameEn: 'Panguni',
    zodiacRasiTa: 'மீனம்',
    zodiacRasiEn: 'Pisces',
    thaniyaDates: [18, 24],
    rulingBirdTa: 'ஆந்தை',
    rulingBirdEn: 'Owl',
    emoji: '♓',
  },
];

export const THANIYA_NAATKAL_DICT: Record<number, number[]> = {
  0: [3, 20],
  1: [9, 22],
  2: [8, 22],
  3: [7, 20],
  4: [7, 18],
  5: [9, 26],
  6: [8, 19],
  7: [8, 14],
  8: [8, 26],
  9: [8, 15],
  10: [15, 24],
  11: [18, 24],
};

export const TAMIL_YEAR_NAMES = [
  { ta: 'பிரபவ', en: 'Prabhava' },
  { ta: 'விபவ', en: 'Vibhava' },
  { ta: 'சுக்ல', en: 'Shukla' },
  { ta: 'பிரமோதூத', en: 'Pramodoota' },
  { ta: 'பிரஜோற்பத்தி', en: 'Prajotpatti' },
  { ta: 'ஆங்கீரச', en: 'Angirasa' },
  { ta: 'ஸ்ரீமுக', en: 'Srimukha' },
  { ta: 'பவ', en: 'Bhava' },
  { ta: 'யுவ', en: 'Yuva' },
  { ta: 'தாது', en: 'Dhatu' },
  { ta: 'ஈஸ்வர', en: 'Ishvara' },
  { ta: 'வெகுதானிய', en: 'Vehudhanya' },
  { ta: 'பிரமாதி', en: 'Pramathi' },
  { ta: 'விக்ரம', en: 'Vikrama' },
  { ta: 'விருஷ', en: 'Vrusha' },
  { ta: 'சித்திரபானு', en: 'Chitrabhanu' },
  { ta: 'சுபானு', en: 'Subhanu' },
  { ta: 'தாரண', en: 'Tarana' },
  { ta: 'பார்த்திப', en: 'Parthiba' },
  { ta: 'வியய', en: 'Vyaya' },
  { ta: 'சர்வசித்து', en: 'Sarvajitu' },
  { ta: 'சர்வதாரி', en: 'Sarvadhari' },
  { ta: 'विरोதி', en: 'Virodhi' },
  { ta: 'விக்ருதி', en: 'Vikruthi' },
  { ta: 'கர', en: 'Khara' },
  { ta: 'நந்தன', en: 'Nandana' },
  { ta: 'விஜய', en: 'Vijaya' },
  { ta: 'ஜய', en: 'Jaya' },
  { ta: 'மன்மத', en: 'Manmatha' },
  { ta: 'துன்முகி', en: 'Dunmukhi' },
  { ta: 'ஹேவிளம்பி', en: 'Hevilambi' },
  { ta: 'விளம்பி', en: 'Vilambi' },
  { ta: 'விகாரி', en: 'Vikari' },
  { ta: 'சார்வரி', en: 'Sharvari' },
  { ta: 'பிலவ', en: 'Plava' },
  { ta: 'சுபகிருது', en: 'Subhakritu' },
  { ta: 'சோபகிருது', en: 'Sobhakritu' },
  { ta: 'குரோதி', en: 'Krodhi' }, // 37 (2024-2025)
  { ta: 'விசுவாவசு', en: 'Visvavasu' }, // 38 (2025-2026)
  { ta: 'பராபவ', en: 'Parabhava' }, // 39 (2026-2027)
  { ta: 'பிலவங்க', en: 'Plavanga' },
  { ta: 'கீலக', en: 'Kilaka' },
  { ta: 'சௌமிய', en: 'Saumya' },
  { ta: 'சாதாரண', en: 'Sadharana' },
  { ta: 'விரோதகிருது', en: 'Virodhakritu' },
  { ta: 'பரிதாபி', en: 'Paridhabhi' },
  { ta: 'பிரமாதீச', en: 'Pramadheesa' },
  { ta: 'ஆனந்த', en: 'Ananda' },
  { ta: 'ராட்சச', en: 'Rakshasa' },
  { ta: 'நள', en: 'Nala' },
  { ta: 'பிங்கள', en: 'Pingala' },
  { ta: 'காளயுக்தி', en: 'Kalayukti' },
  { ta: 'சித்தார்த்தி', en: 'Siddharthi' },
  { ta: 'ரௌத்திரி', en: 'Raudri' },
  { ta: 'துன்மதி', en: 'Dunmathi' },
  { ta: 'துந்துபி', en: 'Dundubhi' },
  { ta: 'ருத்ரோத்காரி', en: 'Rudhirodgari' },
  { ta: 'ரக்தாட்சி', en: 'Raktakshi' },
  { ta: 'குரோதன', en: 'Krodhana' },
  { ta: 'அட்சய', en: 'Akshaya' },
];

export interface TamilDateInfo {
  gregorianDate: Date;
  dateString: string;
  tamilMonthIndex: number; // 0 to 11
  tamilMonthNameTa: string;
  tamilMonthNameEn: string;
  tamilDate: number; // 1 to 32
  tamilYearNumber: number;
  tamilYearNameTa: string;
  tamilYearNameEn: string;
  isThaniyaNaal: boolean;
  thaniyaDates: number[];
  dayOfWeek: DayOfWeek;
  paksha: PakshaType;
  tithiNameTa: string;
  tithiNameEn: string;
  moonEmoji: string;
  isToday: boolean;
  warningTextTa?: string;
  warningTextEn?: string;
}

const toRad = (deg: number) => (deg * Math.PI) / 180;

/**
 * Calculates Nirayana Sidereal Sun longitude for a given date
 */
function getNirayanaSunLongitude(date: Date): number {
  const jd = date.getTime() / 86400000 + 2440587.5;
  const d = jd - 2451545.0; // days since J2000.0

  const L_sun = (280.4665 + 0.98564736 * d) % 360;
  const M_sun = (357.5291 + 0.98560028 * d) % 360;
  const C_sun = 1.9148 * Math.sin(toRad(M_sun)) + 0.02 * Math.sin(toRad(2 * M_sun));
  const sunTrueLong = (L_sun + C_sun + 360) % 360;

  // Lahiri Ayanamsha
  const ayanamsha = 23.857 + (d / 365.25) * 0.013969;
  let nirayanaSun = (sunTrueLong - ayanamsha + 360) % 360;
  if (nirayanaSun < 0) nirayanaSun += 360;
  return nirayanaSun;
}

/**
 * Finds the Sankranti (month start) date for a target Tamil month in a given Gregorian cycle
 */
export function getTamilMonthStartDate(gregorianYear: number, monthIndex: number): Date {
  // Approximate Gregorian start day for each Tamil month
  // Month 0 (Chithirai): Apr 14
  // Month 1 (Vaikasi): May 15
  // Month 2 (Aani): Jun 15
  // Month 3 (Aadi): Jul 16
  // Month 4 (Aavani): Aug 17
  // Month 5 (Purattasi): Sep 17
  // Month 6 (Aippasi): Oct 17
  // Month 7 (Karthigai): Nov 16
  // Month 8 (Margazhi): Dec 16
  // Month 9 (Thai): Jan 14
  // Month 10 (Masi): Feb 13
  // Month 11 (Panguni): Mar 14
  const approxMonths = [
    { m: 3, d: 14 }, // Apr
    { m: 4, d: 14 }, // May
    { m: 5, d: 15 }, // Jun
    { m: 6, d: 16 }, // Jul
    { m: 7, d: 17 }, // Aug
    { m: 8, d: 17 }, // Sep
    { m: 9, d: 17 }, // Oct
    { m: 10, d: 16 }, // Nov
    { m: 11, d: 16 }, // Dec
    { m: 0, d: 14 }, // Jan
    { m: 1, d: 13 }, // Feb
    { m: 2, d: 14 }, // Mar
  ];

  const approx = approxMonths[monthIndex];
  const targetYear = monthIndex >= 9 ? gregorianYear + 1 : gregorianYear;
  const testDate = new Date(targetYear, approx.m, approx.d, 12, 0, 0);

  // Target longitude boundary in degrees: monthIndex * 30
  const targetDegree = monthIndex * 30;

  // Search within [-2, +2] days for the exact day Sun crosses the boundary
  let bestDate = new Date(testDate);
  for (let offset = -2; offset <= 3; offset++) {
    const candidate = new Date(testDate.getTime() + offset * 86400000);
    const sunLong = getNirayanaSunLongitude(candidate);
    let diff = (sunLong - targetDegree + 360) % 360;
    if (diff < 1.5) {
      bestDate = new Date(candidate.getFullYear(), candidate.getMonth(), candidate.getDate(), 12, 0, 0);
      break;
    }
  }

  return bestDate;
}

/**
 * Calculates accurate Tamil date, month, and Thaniya Naatkal status for any Date
 */
export function getTamilDateInfo(inputDate: Date): TamilDateInfo {
  const date = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate(), 12, 0, 0);
  const lunarInfo = getLunarDayInfo(date);

  const nirayanaSun = getNirayanaSunLongitude(date);
  const tamilMonthIndex = Math.floor(nirayanaSun / 30) % 12;
  const monthDef = TAMIL_MONTHS[tamilMonthIndex];

  // Determine the start date of this Tamil month
  const calYear = date.getFullYear();
  const searchYear = tamilMonthIndex >= 9 && date.getMonth() < 4 ? calYear - 1 : calYear;
  const monthStartDate = getTamilMonthStartDate(searchYear, tamilMonthIndex);

  const diffDays = Math.round((date.getTime() - monthStartDate.getTime()) / 86400000);
  let tamilDate = diffDays + 1;
  if (tamilDate < 1) tamilDate = 1;
  if (tamilDate > 32) tamilDate = 32;

  // 60-year Tamil calendar cycle
  // In 2024 (Chithirai), Tamil Year was Krodhi (index 37)
  // Base: 2024 Chithirai = index 37
  const tamilYearOffset = (searchYear - 2024) % 60;
  let yearIndex = (37 + tamilYearOffset) % 60;
  if (yearIndex < 0) yearIndex += 60;
  const yearName = TAMIL_YEAR_NAMES[yearIndex] || { ta: 'பராபவ', en: 'Parabhava' };

  // Thaniya Naal Check (Inauspicious Red Alert date)
  const isThaniyaNaal = monthDef.thaniyaDates.includes(tamilDate);

  const warningTextTa = isThaniyaNaal
    ? `🚨 தனிய நாள்: ${monthDef.nameTa} மாதம் ${tamilDate}-ஆம் தேதி பஞ்சபட்சி சாஸ்திரப்படி தனிய நாளாகும். இந்நாளில் பட்சி பலவீனம் அடைகிறது. சுபகாரியங்கள், முக்கிய பயணங்கள் அல்லது புதிய முயற்சிகள் தொடங்குவதைத் தவிர்க்கவும்.`
    : undefined;

  const warningTextEn = isThaniyaNaal
    ? `🚨 Red Alert (Thaniya Naal): ${monthDef.nameEn} ${tamilDate} is an inauspicious bird day according to Pancha Pakshi Shastra. Avoid commencing auspicious rituals, key business, or vital journeys.`
    : undefined;

  return {
    gregorianDate: date,
    dateString: lunarInfo.dateString,
    tamilMonthIndex,
    tamilMonthNameTa: monthDef.nameTa,
    tamilMonthNameEn: monthDef.nameEn,
    tamilDate,
    tamilYearNumber: searchYear,
    tamilYearNameTa: yearName.ta,
    tamilYearNameEn: yearName.en,
    isThaniyaNaal,
    thaniyaDates: monthDef.thaniyaDates,
    dayOfWeek: lunarInfo.dayOfWeek,
    paksha: lunarInfo.paksha,
    tithiNameTa: lunarInfo.tithiNameTa,
    tithiNameEn: lunarInfo.tithiNameEn,
    moonEmoji: lunarInfo.moonEmoji,
    isToday: lunarInfo.isToday,
    warningTextTa,
    warningTextEn,
  };
}

/**
 * Builds the complete matrix of days for a selected Tamil Month (with leading empty slots for weekday alignment)
 */
export function getTamilMonthMatrix(
  gregorianYear: number,
  tamilMonthIndex: number
): {
  days: (TamilDateInfo | null)[];
  monthDef: TamilMonthDef;
  startDate: Date;
  totalDays: number;
} {
  const monthDef = TAMIL_MONTHS[tamilMonthIndex];
  const startDate = getTamilMonthStartDate(gregorianYear, tamilMonthIndex);

  // Determine next month's start date to get exact days in this month
  const nextMonthIndex = (tamilMonthIndex + 1) % 12;
  const nextYear = nextMonthIndex === 0 ? gregorianYear + 1 : gregorianYear;
  const nextStartDate = getTamilMonthStartDate(nextYear, nextMonthIndex);

  const totalDays = Math.max(29, Math.min(32, Math.round((nextStartDate.getTime() - startDate.getTime()) / 86400000)));

  const matrix: (TamilDateInfo | null)[] = [];

  // Starting weekday of Tamil day 1 (0 = Sunday, 1 = Monday ...)
  const startDayOfWeek = startDate.getDay();

  // Pre-fill empty slots
  for (let i = 0; i < startDayOfWeek; i++) {
    matrix.push(null);
  }

  // Populate all days of the Tamil Month
  for (let d = 1; d <= totalDays; d++) {
    const curDate = new Date(startDate.getTime() + (d - 1) * 86400000);
    const info = getTamilDateInfo(curDate);
    // Explicitly enforce the exact Tamil date in this sequence
    info.tamilDate = d;
    info.tamilMonthIndex = tamilMonthIndex;
    info.tamilMonthNameTa = monthDef.nameTa;
    info.tamilMonthNameEn = monthDef.nameEn;
    info.isThaniyaNaal = monthDef.thaniyaDates.includes(d);
    matrix.push(info);
  }

  // Fill tail for 7-column grid
  while (matrix.length % 7 !== 0) {
    matrix.push(null);
  }

  return {
    days: matrix,
    monthDef,
    startDate,
    totalDays,
  };
}
