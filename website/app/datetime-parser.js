const readline = require('readline');

// Create readline interface for terminal input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Extracts and parses time from input string
 * @param {string} input - Input string that may contain time
 * @returns {Object} - {hours, minutes, hasTime, cleanedInput}
 */
function extractTime(input) {
  const inputLower = input.toLowerCase().trim();
  
  // Pattern 1: at 6:30pm, at 6:30 pm (with "at")
  let match = inputLower.match(/\bat\s+(\d{1,2}):(\d{2})\s*(am|pm)\b/i);
  if (match) {
    let hours = parseInt(match[1]);
    let minutes = parseInt(match[2]);
    const meridiem = match[3];
    
    if (meridiem === 'pm' && hours < 12) hours += 12;
    if (meridiem === 'am' && hours === 12) hours = 0;
    
    const cleanedInput = inputLower.replace(match[0], '').trim();
    return { hours, minutes, hasTime: true, cleanedInput };
  }
  
  // Pattern 2: at 6pm, at 6 pm (with "at", no minutes)
  match = inputLower.match(/\bat\s+(\d{1,2})\s*(am|pm)\b/i);
  if (match) {
    let hours = parseInt(match[1]);
    const meridiem = match[2];
    
    if (meridiem === 'pm' && hours < 12) hours += 12;
    if (meridiem === 'am' && hours === 12) hours = 0;
    
    const cleanedInput = inputLower.replace(match[0], '').trim();
    return { hours, minutes: 0, hasTime: true, cleanedInput };
  }
  
  // Pattern 3: 6:30pm, 6:30 pm (without "at")
  match = inputLower.match(/\b(\d{1,2}):(\d{2})\s*(am|pm)\b/i);
  if (match) {
    let hours = parseInt(match[1]);
    let minutes = parseInt(match[2]);
    const meridiem = match[3];
    
    if (meridiem === 'pm' && hours < 12) hours += 12;
    if (meridiem === 'am' && hours === 12) hours = 0;
    
    const cleanedInput = inputLower.replace(match[0], '').trim();
    return { hours, minutes, hasTime: true, cleanedInput };
  }
  
  // Pattern 4: 6pm, 6 pm (without "at", no minutes)
  match = inputLower.match(/\b(\d{1,2})\s*(am|pm)\b/i);
  if (match) {
    let hours = parseInt(match[1]);
    const meridiem = match[2];
    
    if (meridiem === 'pm' && hours < 12) hours += 12;
    if (meridiem === 'am' && hours === 12) hours = 0;
    
    const cleanedInput = inputLower.replace(match[0], '').trim();
    return { hours, minutes: 0, hasTime: true, cleanedInput };
  }
  
  // Pattern 5: 18:30, 14:00 (24-hour format)
  match = inputLower.match(/\b(\d{1,2}):(\d{2})\b/);
  if (match) {
    const hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    
    if (hours >= 0 && hours <= 23) {
      const cleanedInput = inputLower.replace(match[0], '').trim();
      return { hours, minutes, hasTime: true, cleanedInput };
    }
  }
  
  return { hours: 12, minutes: 0, hasTime: false, cleanedInput: inputLower };
}

/**
 * Parses natural language date/time input and converts to timestamp
 * @param {string} input - Natural language date/time string
 * @param {Date} baseDate - Base date for relative calculations (defaults to now)
 * @returns {Date}
 */
function parseDateTime(input, baseDate = new Date()) {
  const now = new Date(baseDate);
  
  // Extract time information first
  const timeInfo = extractTime(input);
  const inputLower = timeInfo.cleanedInput;
  
  // Helper to set time to noon (12:00 PM) or specified time
  const setToNoon = (date) => {
    date.setHours(12, 0, 0, 0);
    return date;
  };
  
  // Helper to set specific time
  const setTime = (date, hours, minutes) => {
    date.setHours(hours, minutes, 0, 0);
    return date;
  };
  
  // Helper to get next occurrence of a weekday
  const getNextWeekday = (targetDay) => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDay = now.getDay();
    const targetDayIndex = days.indexOf(targetDay);
    
    if (targetDayIndex === -1) return null;
    
    let daysToAdd = targetDayIndex - currentDay;
    if (daysToAdd <= 0) daysToAdd += 7;
    
    const result = new Date(now);
    result.setDate(now.getDate() + daysToAdd);
    return timeInfo.hasTime ? setTime(result, timeInfo.hours, timeInfo.minutes) : setToNoon(result);
  };
  
  // Helper to get this occurrence of a weekday
  const getThisWeekday = (targetDay) => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDay = now.getDay();
    const targetDayIndex = days.indexOf(targetDay);
    
    if (targetDayIndex === -1) return null;
    
    let daysToAdd = targetDayIndex - currentDay;
    if (daysToAdd < 0) daysToAdd += 7;
    
    const result = new Date(now);
    result.setDate(now.getDate() + daysToAdd);
    return timeInfo.hasTime ? setTime(result, timeInfo.hours, timeInfo.minutes) : setToNoon(result);
  };
  
  // Today
  if (inputLower === 'today' || inputLower === 'now') {
    return timeInfo.hasTime ? setTime(new Date(now), timeInfo.hours, timeInfo.minutes) : now;
  }
  
  // Just a time (e.g., "6pm", "3:30pm", or bare number like "6") - assume next occurrence
  if (inputLower === '' && timeInfo.hasTime) {
    return setTime(new Date(now), timeInfo.hours, timeInfo.minutes);
  }
  
  // Bare number (1-12) - assume next occurrence of that hour
  const bareNumberMatch = inputLower.match(/^(\d{1,2})$/);
  if (bareNumberMatch) {
    const hour = parseInt(bareNumberMatch[1]);
    
    if (hour >= 1 && hour <= 12) {
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      
      // Try AM first
      let targetHourAM = hour === 12 ? 0 : hour;
      // Try PM
      let targetHourPM = hour === 12 ? 12 : hour + 12;
      
      // Determine which is next
      let targetHour;
      if (currentHour < targetHourAM || (currentHour === targetHourAM && currentMinute < 0)) {
        // AM is still in the future today
        targetHour = targetHourAM;
      } else if (currentHour < targetHourPM || (currentHour === targetHourPM && currentMinute < 0)) {
        // PM is still in the future today
        targetHour = targetHourPM;
      } else {
        // Both have passed, use AM tomorrow
        const result = new Date(now);
        result.setDate(now.getDate() + 1);
        return setTime(result, targetHourAM, 0);
      }
      
      return setTime(new Date(now), targetHour, 0);
    }
  }
  
  // Tomorrow
  if (inputLower === 'tomorrow') {
    const result = new Date(now);
    result.setDate(now.getDate() + 1);
    return timeInfo.hasTime ? setTime(result, timeInfo.hours, timeInfo.minutes) : setToNoon(result);
  }
  
  // Yesterday
  if (inputLower === 'yesterday') {
    const result = new Date(now);
    result.setDate(now.getDate() - 1);
    return timeInfo.hasTime ? setTime(result, timeInfo.hours, timeInfo.minutes) : setToNoon(result);
  }
  
  // Next week
  if (inputLower === 'next week') {
    const result = new Date(now);
    result.setDate(now.getDate() + 7);
    return timeInfo.hasTime ? setTime(result, timeInfo.hours, timeInfo.minutes) : setToNoon(result);
  }
  
  // Next [weekday]
  const nextDayMatch = inputLower.match(/^next (monday|tuesday|wednesday|thursday|friday|saturday|sunday)$/);
  if (nextDayMatch) {
    return getNextWeekday(nextDayMatch[1]);
  }
  
  // This [weekday]
  const thisDayMatch = inputLower.match(/^this (monday|tuesday|wednesday|thursday|friday|saturday|sunday)$/);
  if (thisDayMatch) {
    return getThisWeekday(thisDayMatch[1]);
  }
  
  // Just a weekday name (treat as "this [weekday]")
  const weekdayMatch = inputLower.match(/^(monday|tuesday|wednesday|thursday|friday|saturday|sunday)$/);
  if (weekdayMatch) {
    return getThisWeekday(weekdayMatch[1]);
  }
  
  // In X days/weeks/months
  const inMatch = inputLower.match(/^in (\d+) (day|days|week|weeks|month|months|year|years)$/);
  if (inMatch) {
    const amount = parseInt(inMatch[1]);
    const unit = inMatch[2];
    const result = new Date(now);
    
    if (unit.startsWith('day')) {
      result.setDate(now.getDate() + amount);
    } else if (unit.startsWith('week')) {
      result.setDate(now.getDate() + (amount * 7));
    } else if (unit.startsWith('month')) {
      result.setMonth(now.getMonth() + amount);
    } else if (unit.startsWith('year')) {
      result.setFullYear(now.getFullYear() + amount);
    }
    
    return timeInfo.hasTime ? setTime(result, timeInfo.hours, timeInfo.minutes) : setToNoon(result);
  }
  
  // X days/weeks/months from now
  const fromNowMatch = inputLower.match(/^(\d+) (day|days|week|weeks|month|months|year|years) from now$/);
  if (fromNowMatch) {
    const amount = parseInt(fromNowMatch[1]);
    const unit = fromNowMatch[2];
    const result = new Date(now);
    
    if (unit.startsWith('day')) {
      result.setDate(now.getDate() + amount);
    } else if (unit.startsWith('week')) {
      result.setDate(now.getDate() + (amount * 7));
    } else if (unit.startsWith('month')) {
      result.setMonth(now.getMonth() + amount);
    } else if (unit.startsWith('year')) {
      result.setFullYear(now.getFullYear() + amount);
    }
    
    return timeInfo.hasTime ? setTime(result, timeInfo.hours, timeInfo.minutes) : setToNoon(result);
  }
  
  // X days/weeks/months ago
  const agoMatch = inputLower.match(/^(\d+) (day|days|week|weeks|month|months|year|years) ago$/);
  if (agoMatch) {
    const amount = parseInt(agoMatch[1]);
    const unit = agoMatch[2];
    const result = new Date(now);
    
    if (unit.startsWith('day')) {
      result.setDate(now.getDate() - amount);
    } else if (unit.startsWith('week')) {
      result.setDate(now.getDate() - (amount * 7));
    } else if (unit.startsWith('month')) {
      result.setMonth(now.getMonth() - amount);
    } else if (unit.startsWith('year')) {
      result.setFullYear(now.getFullYear() - amount);
    }
    
    return timeInfo.hasTime ? setTime(result, timeInfo.hours, timeInfo.minutes) : setToNoon(result);
  }
  
  // Month + Day formats (sept 13, september 13, jan 5, etc.)
  const monthNames = {
    'jan': 0, 'january': 0,
    'feb': 1, 'february': 1,
    'mar': 2, 'march': 2,
    'apr': 3, 'april': 3,
    'may': 4,
    'jun': 5, 'june': 5,
    'jul': 6, 'july': 6,
    'aug': 7, 'august': 7,
    'sep': 8, 'sept': 8, 'september': 8,
    'oct': 9, 'october': 9,
    'nov': 10, 'november': 10,
    'dec': 11, 'december': 11
  };
  
  // Pattern: "sept 13", "september 13", "jan 5"
  const monthDayPattern = new RegExp(`^(${Object.keys(monthNames).join('|')})\\s+(\\d{1,2})$`);
  const monthDayMatch = inputLower.match(monthDayPattern);
  if (monthDayMatch) {
    const month = monthNames[monthDayMatch[1]];
    const day = parseInt(monthDayMatch[2]);
    const result = new Date(now.getFullYear(), month, day);
    
    // If the date has already passed this year, use next year
    if (result < now) {
      result.setFullYear(now.getFullYear() + 1);
    }
    
    return timeInfo.hasTime ? setTime(result, timeInfo.hours, timeInfo.minutes) : setToNoon(result);
  }
  
  // Pattern: "sept 13 next year", "jan 5 2026", "december 25 2025"
  const monthDayYearPattern = new RegExp(`^(${Object.keys(monthNames).join('|')})\\s+(\\d{1,2})\\s+(next year|\\d{4})$`);
  const monthDayYearMatch = inputLower.match(monthDayYearPattern);
  if (monthDayYearMatch) {
    const month = monthNames[monthDayYearMatch[1]];
    const day = parseInt(monthDayYearMatch[2]);
    const yearPart = monthDayYearMatch[3];
    
    let year;
    if (yearPart === 'next year') {
      year = now.getFullYear() + 1;
    } else {
      year = parseInt(yearPart);
    }
    
    const result = new Date(year, month, day);
    return timeInfo.hasTime ? setTime(result, timeInfo.hours, timeInfo.minutes) : setToNoon(result);
  }
  
  // Try parsing as standard date format
  const parsedDate = new Date(input);
  if (!isNaN(parsedDate.getTime())) {
    // But avoid accepting very old dates from ambiguous inputs
    const yearDiff = Math.abs(parsedDate.getFullYear() - now.getFullYear());
    if (yearDiff < 100) {  // Only accept dates within 100 years
      return parsedDate;
    }
  }
  
  // If nothing matches, return null
  return null;
}

/**
 * Formats a date object to a readable string
 * @param {Date} date
 * @returns {string}
 */
function formatDateTime(date) {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  };
  
  return date.toLocaleString('en-US', options);
}

/**
 * Main function to handle user input and date/time parsing
 */
async function main() {
  console.log('=== Natural Language Date/Time Parser ===\n');
  console.log('Examples: "next friday", "tomorrow 6pm", "sept 13 next year", "in 3 days at 2:30pm"\n');
  
  rl.question('Enter a date/time expression: ', (input) => {
    if (!input.trim()) {
      console.log('Error: Please provide a valid date/time expression.');
      rl.close();
      return;
    }

    console.log(`\nProcessing: "${input}"...\n`);

    try {
      const now = new Date();
      const result = parseDateTime(input);
      
      if (result === null) {
        console.log('❌ Could not parse date/time expression.');
        console.log('\nSupported formats:');
        console.log('- "today", "tomorrow", "yesterday"');
        console.log('- "next friday", "this monday"');
        console.log('- "in 3 days", "in 2 weeks"');
        console.log('- "5 days from now", "2 weeks ago"');
        console.log('- "sept 13", "december 25 next year", "jan 5 2026"');
        console.log('- Time only: "6" (next 6 o\'clock), "6pm", "3:30pm", "14:00"');
        console.log('- With time: "tomorrow 6pm", "next friday at 3:30pm"');
        console.log('- Standard date formats (e.g., "2025-12-25")');
      } else {
        console.log('✓ Date/Time parsed successfully!\n');
        console.log('Formatted:', formatDateTime(result));
        console.log('\nISO 8601:', result.toISOString());
        console.log('Unix Timestamp:', Math.floor(result.getTime() / 1000));
        console.log('JavaScript Timestamp:', result.getTime());
        
        // Show relative time from now
        const diffMs = result.getTime() - now.getTime();
        const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
        
        if (diffDays > 0) {
          console.log(`\nRelative: ${diffDays} day${diffDays !== 1 ? 's' : ''} from now`);
        } else if (diffDays < 0) {
          console.log(`\nRelative: ${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''} ago`);
        } else {
          console.log('\nRelative: Today');
        }
      }
      
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      rl.close();
    }
  });
}

// Run the program
main();

