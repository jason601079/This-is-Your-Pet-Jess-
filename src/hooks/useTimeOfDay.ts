import { useState, useEffect } from "react";

export type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

export function useTimeOfDay(): TimeOfDay {
  const [time, setTime] = useState<TimeOfDay>(getTimeOfDay());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeOfDay());
    }, 60000); // check every minute
    return () => clearInterval(interval);
  }, []);

  return time;
}

function getTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
}

export function getTimeGreeting(time: TimeOfDay): string {
  switch (time) {
    case "morning": return "good morning";
    case "afternoon": return "good afternoon";
    case "evening": return "good evening";
    case "night": return "it's late...";
  }
}
