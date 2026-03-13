import { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import { TasksService } from "@/generated";
import type { TasksRead } from "@/generated/models/TasksModel";
import type { GraphUser_V1 } from "@/generated/models/Office365UsersModel";
import { Projects_assignmentService } from "@/generated";
import type { Projects_assignmentRead } from "@/generated/models/Projects_assignmentModel";
import { TimeEntriesService } from "@/generated";
import type { TimeEntriesRead } from "@/generated/models/TimeEntriesModel";
import type { Task, TimeEntry, Project } from "@/shared/types/sharedtypes";
import withTimeout from "@/shared/utils/loadingTimeOut";
import { TIME_OUT_GET_DATA } from "@/constants/table";
type Props = {
  userProfile?: GraphUser_V1;
  startDate: string;
  endDate: string;
};
const [assignedTasks, setAssignedTasks] = useState<TasksRead[]>([]);
const [timeEntries, setTimeEntries] = useState<TimeEntriesRead[]>([]);
const [loadingProjects, setLoadingProjects] = useState(true);
const [loadingTasks, setLoadingTasks] = useState(true);
const [loadingProfile, setLoadingProfile] = useState(true);
const [assignedProjects,setAssignedProjects] = useState<Projects_assignmentRead[]>([]);
export default function useTimeSheetDataV2({
  userProfile,
  startDate,
  endDate,
}: Props) {
  if (!userProfile) return null;
  const oDataFilterProjects = `User/EMail eq '${userProfile?.mail}'`;
  const oDataFilterEntries = `Author/EMail eq '${userProfile?.mail}' and Date ge '${startDate}' and Date le '${endDate}'`;
  useEffect(() => {
    // контроллер для отмены запросов если компонент размонтируется
    const controller = new AbortController();

    const fetchAssignedProjects = async () => {
      try {
        const projects = await toast.promise(
          withTimeout(
            Projects_assignmentService.getAll({ filter: oDataFilterProjects }),
            TIME_OUT_GET_DATA,
          ),
          {
            pending: "Загрузка проектов...",
            success: "Проекты загружены",
            error: "не удалось загрузить проекты",
          },
        );
        if (controller.signal.aborted) return;
        setAssignedProjects(projects.data)
      } catch (error) {
        toast.error("Не удалось загрузить проекты");
      }
    };
  });
}
