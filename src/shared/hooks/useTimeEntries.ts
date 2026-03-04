import { toast } from "react-toastify";
import type { TimeEntry } from "@/shared/types/sharedtypes";

export function useTimeEntries(
  timeEntries: TimeEntry[],
  updateEntry: Function,
  getProjectDayTotal: Function,
) {
  const handleHoursChange = (
    projectId: number,
    taskId: number,
    date: string,
    value: number,
  ) => {
    let hours = Number(value);
    const currentTotal = getProjectDayTotal(date);

    const existing =
      timeEntries.find(
        (entry) =>
          entry.projectId === projectId &&
          entry.taskId === taskId &&
          entry.date === date,
      )?.hours || 0;

    const maxAllowed = Math.max(0, 24 - (currentTotal - existing));

    if (isNaN(hours)) {
      hours = 0;
      toast.error("Введите корректное число часов");
    } else if (hours < 0) {
      toast.error("Количество часов не может быть меньше 0");
      hours = 0;
    } else if (hours > 24) {
      toast.error("Количество часов не может быть больше 24");
      hours = 24;
    } else if (hours > maxAllowed) {
      toast.error("Суммарно нельзя вводить больше 24 часов в день.");
      hours = maxAllowed;
    } else {
      updateEntry(projectId, taskId, date, hours);
    }
  };

  return { handleHoursChange };
}
