import { eachDayOfInterval, format, isToday } from "date-fns";
import { getCurrentSundayWeek, getGreeting } from "@/lib/time";

export const Time = () => {
  const currentWeek = getCurrentSundayWeek();
  const weekDays = eachDayOfInterval({
    start: currentWeek.from,
    end: currentWeek.to,
  });

  const dayAbbreviations = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-center text-lg">{getGreeting()}</h2>
      <div className="flex gap-4 lg:gap-8">
        {weekDays.map((day, index) => {
          const isTodayDate = isToday(day);
          return (
            <div
              className={`flex min-w-12 flex-col items-center justify-center rounded-md p-2 ${isTodayDate ? "border" : ""}`}
              key={day.toISOString()}
            >
              <span className="font-medium text-xs">
                {dayAbbreviations[index]}
              </span>
              <span className="text-sm">{format(day, "d")}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
