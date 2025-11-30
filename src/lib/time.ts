import { endOfWeek, startOfWeek } from "date-fns";

/**
 * Returns the current week:
 * - Starts on Sunday
 * - Ends on Saturday
 * - Changes only when today becomes Sunday
 */
export const getCurrentSundayWeek = (date = new Date()) => {
  const weekStart = startOfWeek(date, { weekStartsOn: 0 }); // 0 = Sunday
  const weekEnd = endOfWeek(date, { weekStartsOn: 0 }); // → Saturday

  return {
    from: weekStart, // Sunday 00:00:00
    to: weekEnd, // Saturday 23:59:59.999
  };
};

export function getGreeting() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Good Morning";
  }
  if (hour >= 12 && hour < 18) {
    return "Good Afternoon";
  }
  return "Good Night";
}
