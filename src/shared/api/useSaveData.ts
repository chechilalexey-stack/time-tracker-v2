import { TimeEntriesService } from "@/generated/services/TimeEntriesService";
import type { PopupData } from "@/shared/types/sharedtypes";
import { toast } from "react-toastify";
import type { TimeEntriesRead } from "@/generated/models/TimeEntriesModel";
export default function useSaveData() {
  const save = async (
    hours: number | "",
    comment: string,
    popup: PopupData | null,
  ): Promise<TimeEntriesRead | null> => {
    if (!popup) return null;

    try {
      const newEntry = await toast.promise(
        TimeEntriesService.create({
          Title: "Time entry",
          Hours: hours === "" ? 0 : hours,
          Comment: comment,
          Date: popup.day,
          TaskID: popup.taskId,
          projectId: popup.task["ProjectName#Id"],
        }),
        {
          pending: "Сохранение...",
          success: "Запись сохранена",
          error: "Ошибка сохранения",
        },
      );

      return newEntry.data;
    } catch {
      toast.error("Что-то пошло не так.");
      return null;
    }
  };

  return { save };
}
