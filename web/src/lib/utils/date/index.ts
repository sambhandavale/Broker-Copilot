export function isDateWithinWindow(targetDateStr: string, daysWindow: number): boolean {
  if (!targetDateStr) return false;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 1. Try standard parsing first
  let targetDate = new Date(targetDateStr);
  
  // 2. FIX: Handle DD-MM-YYYY or DD/MM/YYYY format if standard parsing fails
  if (isNaN(targetDate.getTime())) {
    // Check if it looks like DD-MM-YYYY or DD/MM/YYYY
    // Regex matches: 2 digits, separator, 2 digits, separator, 4 digits
    const ddmmyyyy = targetDateStr.match(/^(\d{2})[-/](\d{2})[-/](\d{4})$/);
    
    if (ddmmyyyy) {
       // ddmmyyyy[1] = Day, [2] = Month, [3] = Year
       // Month is 0-indexed in JS Date (0 = Jan, 11 = Dec)
       targetDate = new Date(
         parseInt(ddmmyyyy[3]), 
         parseInt(ddmmyyyy[2]) - 1, 
         parseInt(ddmmyyyy[1])
       );
    } else {
       console.warn(`[Date Helper] Date format not recognized: "${targetDateStr}". Expected YYYY-MM-DD or DD-MM-YYYY.`);
       return false;
    }
  }
  
  // Calculate the cutoff (Today + Window)
  const cutoffDate = new Date(today);
  cutoffDate.setDate(today.getDate() + daysWindow);

  // Logic: Must be in the future (>= today) AND within the window
  // We use .getTime() for safer numeric comparison
  const isFuture = targetDate.getTime() >= today.getTime();
  const isWithinCutoff = targetDate.getTime() <= cutoffDate.getTime();

  return isFuture && isWithinCutoff;
}

export function getDaysAgoISO(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}