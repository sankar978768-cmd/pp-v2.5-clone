// Timezone utility service supporting coordinate-based timezone offset detection,
// IANA timezone offset calculations, and Local <-> IST conversions.

import { Jama, SubPeriod, BirdId } from '../types';

export interface LocationCoords {
  lat: number;
  lng: number;
  timezone?: string;
  timezoneOffset?: number;
}

export interface LocationTimezoneInfo {
  offsetMinutes: number;
  offsetHours: number;
  timezoneName: string;
}

export interface TargetLocationCurrentMoment {
  localDate: Date;
  dateString: string;
  timeString: string;
  timeString24: string;
  hours: number;
  minutes: number;
  seconds: number;
  dayName: string;
  dayOfWeek: number;
  formattedText: string;
  offsetMinutes: number;
}

/**
 * High precision IANA timezone offset calculation using native Intl.DateTimeFormat.
 * Accounts for Daylight Saving Time (DST) transitions accurately.
 */
export function getTimezoneOffsetFromIana(tzName: string, date: Date = new Date()): number | null {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: tzName,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hourCycle: 'h23',
    });
    const parts = formatter.formatToParts(date);
    const p: Record<string, number> = {};
    for (const part of parts) {
      if (part.type !== 'literal') {
        p[part.type] = parseInt(part.value, 10);
      }
    }
    if (!p.year || !p.month || !p.day) return null;

    const targetUtcMs = Date.UTC(p.year, p.month - 1, p.day, p.hour ?? 0, p.minute ?? 0, p.second ?? 0);
    const realUtcMs = Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    );
    return Math.round((targetUtcMs - realUtcMs) / 60000);
  } catch {
    return null;
  }
}

/**
 * Calculates timezone information for given geographic coordinates.
 * Provides accurate offline timezone offsets for major regions and coordinates.
 */
export function getLocationTimezoneInfo(coords: LocationCoords, refDate: Date = new Date()): LocationTimezoneInfo {
  const { lat, lng, timezone } = coords;

  // 1. If explicit IANA timezone string is available, compute exact offset
  if (timezone && typeof timezone === 'string') {
    const ianaOffset = getTimezoneOffsetFromIana(timezone, refDate);
    if (ianaOffset !== null) {
      return {
        offsetMinutes: ianaOffset,
        offsetHours: ianaOffset / 60,
        timezoneName: timezone,
      };
    }
  }

  // 2. If explicit numeric timezoneOffset (in hours) is provided
  if (typeof coords.timezoneOffset === 'number' && !isNaN(coords.timezoneOffset)) {
    const offsetHours = coords.timezoneOffset;
    const offsetMinutes = Math.round(offsetHours * 60);
    return {
      offsetMinutes,
      offsetHours,
      timezoneName: coords.timezone || 'UTC',
    };
  }

  // 3. Geographic bounding boxes for major metropolitan hubs

  // Indian subcontinent (India & Sri Lanka: UTC+5:30)
  if (lat >= 5 && lat <= 38 && lng >= 68 && lng <= 98) {
    return {
      offsetMinutes: 330,
      offsetHours: 5.5,
      timezoneName: 'Asia/Kolkata',
    };
  }

  // Singapore & Malaysia (UTC+8:00)
  if (lat >= 0.8 && lat <= 7.5 && lng >= 99 && lng <= 105) {
    return {
      offsetMinutes: 480,
      offsetHours: 8.0,
      timezoneName: 'Asia/Singapore',
    };
  }

  // United Arab Emirates / Gulf (UTC+4:00)
  if (lat >= 22 && lat <= 27 && lng >= 51 && lng <= 57) {
    return {
      offsetMinutes: 240,
      offsetHours: 4.0,
      timezoneName: 'Asia/Dubai',
    };
  }

  // Qatar / Bahrain (UTC+3:00)
  if (lat >= 24 && lat <= 27 && lng >= 50 && lng <= 52) {
    return {
      offsetMinutes: 180,
      offsetHours: 3.0,
      timezoneName: 'Asia/Qatar',
    };
  }

  // Saudi Arabia (UTC+3:00)
  if (lat >= 16 && lat <= 32 && lng >= 34 && lng <= 55) {
    return {
      offsetMinutes: 180,
      offsetHours: 3.0,
      timezoneName: 'Asia/Riyadh',
    };
  }

  // Japan (UTC+9:00)
  if (lat >= 30 && lat <= 46 && lng >= 128 && lng <= 146) {
    return {
      offsetMinutes: 540,
      offsetHours: 9.0,
      timezoneName: 'Asia/Tokyo',
    };
  }

  // United Kingdom (Europe/London: UTC+0 or UTC+1 DST)
  if (lat >= 49 && lat <= 60 && lng >= -8 && lng <= 2) {
    const offset = getTimezoneOffsetFromIana('Europe/London', refDate) ?? 0;
    return {
      offsetMinutes: offset,
      offsetHours: offset / 60,
      timezoneName: 'Europe/London',
    };
  }

  // France / Western Europe (Europe/Paris: UTC+1 or UTC+2 DST)
  if (lat >= 42 && lat <= 52 && lng >= -5 && lng <= 10) {
    const offset = getTimezoneOffsetFromIana('Europe/Paris', refDate) ?? 60;
    return {
      offsetMinutes: offset,
      offsetHours: offset / 60,
      timezoneName: 'Europe/Paris',
    };
  }

  // Eastern Australia / Sydney & Melbourne (UTC+10 or UTC+11 DST)
  if (lat <= -10 && lat >= -44 && lng >= 140 && lng <= 155) {
    const offset = getTimezoneOffsetFromIana('Australia/Sydney', refDate) ?? 600;
    return {
      offsetMinutes: offset,
      offsetHours: offset / 60,
      timezoneName: 'Australia/Sydney',
    };
  }

  // Eastern US & Canada / New York & Toronto (America/New_York: UTC-5 or UTC-4 DST)
  if (lat >= 24 && lat <= 50 && lng >= -85 && lng <= -65) {
    const offset = getTimezoneOffsetFromIana('America/New_York', refDate) ?? -300;
    return {
      offsetMinutes: offset,
      offsetHours: offset / 60,
      timezoneName: 'America/New_York',
    };
  }

  // Central US / Chicago (America/Chicago: UTC-6 or UTC-5 DST)
  if (lat >= 25 && lat <= 50 && lng >= -105 && lng < -85) {
    const offset = getTimezoneOffsetFromIana('America/Chicago', refDate) ?? -360;
    return {
      offsetMinutes: offset,
      offsetHours: offset / 60,
      timezoneName: 'America/Chicago',
    };
  }

  // Western US / California (America/Los_Angeles: UTC-8 or UTC-7 DST)
  if (lat >= 32 && lat <= 49 && lng >= -125 && lng < -114) {
    const offset = getTimezoneOffsetFromIana('America/Los_Angeles', refDate) ?? -480;
    return {
      offsetMinutes: offset,
      offsetHours: offset / 60,
      timezoneName: 'America/Los_Angeles',
    };
  }

  // General longitude estimation (15 degrees per hour, rounded to 30 min intervals)
  const estimatedHours = Math.round((lng / 15) * 2) / 2;
  const estimatedMinutes = Math.round(estimatedHours * 60);

  let systemTz = 'UTC';
  try {
    systemTz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch {
    systemTz = 'UTC';
  }

  return {
    offsetMinutes: estimatedMinutes,
    offsetHours: estimatedHours,
    timezoneName: coords.timezone || systemTz,
  };
}

/**
 * Returns clean standard timezone abbreviation (e.g. 'EDT', 'EST', 'JST', 'SGT', 'GST', 'BST', 'AEST', 'IST').
 */
export function getTzAbbreviation(tzName?: string, offsetMinutes: number = 330, date: Date = new Date()): string {
  if (Math.abs(offsetMinutes - 330) <= 1) {
    return 'IST';
  }

  if (tzName) {
    try {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: tzName,
        timeZoneName: 'short',
      }).formatToParts(date);
      const tzPart = parts.find((p) => p.type === 'timeZoneName');
      if (tzPart && tzPart.value) {
        return tzPart.value;
      }
    } catch {
      // fallback
    }
  }

  const sign = offsetMinutes >= 0 ? '+' : '-';
  const abs = Math.abs(offsetMinutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return m === 0 ? `UTC${sign}${h}` : `UTC${sign}${h}:${String(m).padStart(2, '0')}`;
}

/**
 * Checks whether the given offset corresponds to Indian Standard Time (UTC+5:30 = +330 min).
 */
export function isOffsetIst(offsetMinutes: number): boolean {
  return Math.abs(offsetMinutes - 330) <= 1;
}

/**
 * Calculates current moment and date representation in the target location's timezone.
 */
export function getTargetLocationCurrentMoment(
  offsetMinutes: number,
  refDate: Date = new Date()
): TargetLocationCurrentMoment {
  // Use UTC timestamp of refDate plus offsetMinutes
  const targetUtcMillis = refDate.getTime() + (offsetMinutes + refDate.getTimezoneOffset()) * 60 * 1000;
  const targetDateUtc = new Date(targetUtcMillis);

  const year = targetDateUtc.getFullYear();
  const month = targetDateUtc.getMonth();
  const date = targetDateUtc.getDate();
  const hours = targetDateUtc.getHours();
  const minutes = targetDateUtc.getMinutes();
  const seconds = targetDateUtc.getSeconds();
  const dayOfWeek = targetDateUtc.getDay();

  const localDate = new Date(year, month, date, hours, minutes, seconds);

  const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
  const timeString24 = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 === 0 ? 12 : hours % 12;
  const timeString = `${hours12}:${String(minutes).padStart(2, '0')} ${period}`;

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = dayNames[dayOfWeek];
  const formattedText = `${timeString}, ${dayName} (${dateString})`;

  return {
    localDate,
    dateString,
    timeString,
    timeString24,
    hours,
    minutes,
    seconds,
    dayName,
    dayOfWeek,
    formattedText,
    offsetMinutes,
  };
}

/**
 * Calculates human-readable time difference relative to IST (+5:30).
 */
export function getTimeDifferenceFromIstText(offsetMinutes: number, language: string = 'en'): string {
  const diffMinutes = offsetMinutes - 330;
  if (Math.abs(diffMinutes) <= 1) {
    return language === 'ta' ? 'இந்திய நேரப் பிரதேசம் (IST)' : 'IST (Same Timezone)';
  }

  const isAhead = diffMinutes > 0;
  const absDiff = Math.abs(diffMinutes);
  const hours = Math.floor(absDiff / 60);
  const minutes = absDiff % 60;

  const durationStr = minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;

  if (language === 'ta') {
    const durTa = minutes > 0 ? `${hours} மணி ${minutes} நிமிடம்` : `${hours} மணி`;
    return isAhead ? `இந்தியாவை விட ${durTa} முன்னால்` : `இந்தியாவை விட ${durTa} பின்னால்`;
  }

  return isAhead ? `${durationStr} ahead of IST` : `${durationStr} behind IST`;
}

/**
 * Converts a time minute count from target location's local time to Indian Standard Time (+05:30).
 */
export function convertMinutesToIst(minutesFromMidnight: number, targetOffsetMinutes: number): number {
  const delta = 330 - targetOffsetMinutes;
  let normalized = (minutesFromMidnight + delta) % 1440;
  if (normalized < 0) normalized += 1440;
  return normalized;
}

/**
 * Converts a time string (either 'HH:MM' 24h or 'h:mm A' 12h) from target location local time to IST.
 */
export function convertTimeToIst(timeStr: string, targetOffsetMinutes: number, format24h: boolean = false): string {
  if (!timeStr) return timeStr;
  const delta = 330 - targetOffsetMinutes;
  if (delta === 0) return timeStr;

  const clean = timeStr.trim();
  const is12h = clean.toUpperCase().includes('AM') || clean.toUpperCase().includes('PM');

  let totalMinutes = 0;

  if (is12h) {
    const [tPart, modifier] = clean.split(' ');
    const [hStr, mStr] = tPart.split(':');
    let h = parseInt(hStr, 10) || 0;
    const m = parseInt(mStr, 10) || 0;
    if (modifier?.toUpperCase() === 'PM' && h < 12) h += 12;
    if (modifier?.toUpperCase() === 'AM' && h === 12) h = 0;
    totalMinutes = h * 60 + m;
  } else {
    const [hStr, mStr] = clean.split(':');
    const h = parseInt(hStr, 10) || 0;
    const m = parseInt(mStr, 10) || 0;
    totalMinutes = h * 60 + m;
  }

  let istMinutes = (totalMinutes + delta) % 1440;
  if (istMinutes < 0) istMinutes += 1440;

  const hours = Math.floor(istMinutes / 60);
  const minutes = istMinutes % 60;

  if (format24h || !is12h) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }

  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hours12}:${String(minutes).padStart(2, '0')} ${period}`;
}

/**
 * Converts all Jama and Anthardasa sub-period clock times into Indian Standard Time (+05:30).
 * CRITICAL: Astrological order, bird activities, stars, and durations remain 100% UNCHANGED.
 * Only the clock display numbers are shifted to IST.
 */
export function convertJamasToIst(jamas: Jama[], targetOffsetMinutes: number): Jama[] {
  const delta = 330 - targetOffsetMinutes;
  if (delta === 0) return jamas;

  return jamas.map((j) => {
    const newStartMin = Math.round((j.startMinutesFromMidnight + delta) * 100) / 100;
    const newEndMin = Math.round((j.endMinutesFromMidnight + delta) * 100) / 100;

    const newColumns: any = {};
    for (const birdKey of Object.keys(j.columns) as BirdId[]) {
      const col = j.columns[birdKey];
      const newSubPeriods: SubPeriod[] = col.subPeriods.map((sp: SubPeriod) => ({
        ...sp,
        startTime: convertTimeToIst(sp.startTime, targetOffsetMinutes, false),
        endTime: convertTimeToIst(sp.endTime, targetOffsetMinutes, false),
        startMinutesFromMidnight: Math.round((sp.startMinutesFromMidnight + delta) * 100) / 100,
        endMinutesFromMidnight: Math.round((sp.endMinutesFromMidnight + delta) * 100) / 100,
      }));

      newColumns[birdKey] = {
        ...col,
        subPeriods: newSubPeriods,
      };
    }

    return {
      ...j,
      startTime: convertTimeToIst(j.startTime, targetOffsetMinutes, false),
      endTime: convertTimeToIst(j.endTime, targetOffsetMinutes, false),
      startMinutesFromMidnight: newStartMin,
      endMinutesFromMidnight: newEndMin,
      columns: newColumns,
    };
  });
}
