/*import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Projects_codeService } from "@/generated";
import { TasksService } from "@/generated";
import type { Projects_codeRead } from "@/generated/models/Projects_codeModel";
import type { TasksRead } from "@/generated/models/TasksModel";
import type { GraphUser_V1 } from "@/generated/models/Office365UsersModel";
type Props = {
  userProfile?: GraphUser_V1;
};
export default function useTimeSheetData({ userProfile }: Props) {
  const [projects, setProjects] = useState<Projects_codeRead[]>([]);
  const [tasks, setTasks] = useState<TasksRead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Projects_codeService.getAll();
        setProjects(response.data);
        const tasksResponse = await TasksService.getAll();
        setTasks(tasksResponse.data);
      } catch (error) {
        toast.error(
          "Не удалось загрузить данные. Пожалуйста, попробуйте позже.",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return { projects, tasks, loading };
}
*/