import { TimeEntriesService } from "@/generated/services/TimeEntriesService";
import type { PopupData } from "@/shared/types/sharedtypes";
import { toast } from "react-toastify";
import type { TimeEntry } from "@/shared/types/sharedtypes";

export default function useSaveData() {
  const save = async (
    hours: number | "",
    comment: string,
    popup: PopupData | null,
  ): Promise<TimeEntry | null> => {
    if (!popup) return null;

    try {
      const newEntry = await toast.promise(
        TimeEntriesService.create({
          Title: "Time entry",
          Hours: hours === "" ? 0 : hours,
          Comment: comment,
          Date: popup.day,
          TaskID: popup.taskId,
          projectId: popup.task.projectId,
        }),
        {
          pending: "Сохранение...",
          success: "Запись сохранена",
          error: "Ошибка сохранения",
        },
      );
         const raw = newEntry.data;

      if (!raw) return null;

      // ✅ Маппим API объект в UI тип TimeEntry
      const mapped: TimeEntry = {
        id: raw.ID ?? 0, // или raw.Id если приходит так
        projectId: raw.projectId ?? raw.projectId ?? 0,
        taskId: raw.TaskID ?? 0,
        date: raw.Date ?? "",
        hours: raw.Hours ?? 0,
      };

      return mapped;
      

    } catch {
      toast.error("Что-то пошло не так.");
      return null;
    }
  };

  return { save };
}
