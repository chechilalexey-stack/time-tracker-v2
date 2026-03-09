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
type Props = {
  userProfile?: GraphUser_V1;
  currentYear: number;
  currentMonth: number;
};
function buildProjects(
  assignedProjects: Projects_assignmentRead[],
  assignedTasks: TasksRead[],
  timeEntries: TimeEntriesRead[],
) {
  const entriesByTask = new Map<number, TimeEntry[]>();

  timeEntries.forEach((entry) => {
    const taskId = entry.TaskID ?? 0;

    const mappedEntry: TimeEntry = {
      id: entry.ID ?? 0,
      projectId: entry.projectId ?? 0,
      taskId,
      date: entry.Date ?? "",
      hours: entry.Hours ?? 0,
    };

    if (!entriesByTask.has(taskId)) {
      entriesByTask.set(taskId, []);
    }

    entriesByTask.get(taskId)!.push(mappedEntry);
  });

  const tasksByProject = new Map<number, Task[]>();

  assignedTasks.forEach((task) => {
    const projectId = task["Project_x0020_Name_x003a__x0020_#Id"] ?? 0;
    const projectTitle = task.ProjectName?.Value ?? "";
    const taskId = task.ID ?? 0;

    const mappedTask: Task = {
      id: taskId,
      projectId: projectId,
      projectTitle: projectTitle,
      title: task.Title ?? "",
      timeEntries: entriesByTask.get(taskId) ?? [],
    };

    if (!tasksByProject.has(projectId)) {
      tasksByProject.set(projectId, []);
    }

    tasksByProject.get(projectId)!.push(mappedTask);
  });
  const mappedProjects: Project[] = assignedProjects.map((p) => {
    const projectId = p["Project#Id"] ?? 0;

    return {
      id: projectId,
      title: p.Project?.Value ?? "",
      tasks: tasksByProject.get(projectId) ?? [],
    };
  });
  return mappedProjects;
}

export default function useTimeSheetData({
  userProfile,
  currentMonth,
  currentYear,
}: Props) {
  //const [projects, setProjects] = useState<Projects_codeRead[][]>([]);
  //const [tasks, setTasks] = useState<TasksRead[]>([]);
  const [assignedProjects, setAssignedProjects] = useState<
    Projects_assignmentRead[]
  >([]);

  const [assignedTasks, setAssignedTasks] = useState<TasksRead[]>([]);
  const [timeEntries, setTimeEntries] = useState<TimeEntriesRead[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const loading = loadingProjects || loadingTasks || loadingProfile;
  //console.log(userProfile?.mail==="achechil@AwaraPPDemo.onmicrosoft.com");

  //Загрузка проектов доступнах пользователю
  useEffect(() => {
    const startDate = new Date(currentYear, currentMonth, 2)
      .toISOString()
      .split("T")[0]; // YYYY-MM-DDT00:00:00Z
    const endDate = new Date(currentYear, currentMonth + 1, 1)
      .toISOString()
      .split("T")[0]; // последний день месяца
    const oDataFilterProjects = `User/EMail eq '${userProfile?.mail}'`;
    const oDataFilterEntries = `Author/EMail eq '${userProfile?.mail}' and Date ge '${startDate}' and Date le '${endDate}'`;

    //console.log(oDataFilterEntries);
    if (!userProfile?.userPrincipalName) {
      setLoadingProfile(false);
      return;
    } else {
      setLoadingProfile(false);
    }

    const fetchData = async () => {
      try {
        setLoadingProjects(true);
        //Полчение назначенных проектов
        const assignedProjectsResponce =
          await Projects_assignmentService.getAll({
            filter: oDataFilterProjects,
            select: ["ID", "User", "Project", "UserUPN"],
          });
        setAssignedProjects(assignedProjectsResponce.data);
        //console.log(assignedProjectsResponce.data);
        //получение введенных данных

        const timeEntries = await TimeEntriesService.getAll({
          filter: oDataFilterEntries,
        });
        setTimeEntries(timeEntries.data);
        //console.log(timeEntries);
      } catch (error) {
        toast.error(
          "Не удалось загрузить данные. Пожалуйста, попробуйте позже.",
        );
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchData();
  }, [userProfile?.mail, currentMonth, currentYear]);
  //получение тасок по проектам

  useEffect(() => {
    if (!assignedProjects.length) {
      return;
    }

    const fetchTasks = async () => {
      setLoadingTasks(true);
      try {
        const projectIds = assignedProjects
          .map((p) => p["Project#Id"])
          .filter((id): id is number => !!id);
        const promises = projectIds.map((id) =>
          TasksService.getAll({
            filter: `ProjectName/Id eq ${id}`,
          }),
        );
        const results = await Promise.all(promises);
        const allTasks = results.flatMap((r) => r.data ?? []);
        setAssignedTasks(allTasks);
      } catch (error) {
        toast.error(
          "Не удалось загрузить данные. Пожалуйста, попробуйте позже.",
        );
      } finally {
        setLoadingTasks(false);
      }
    };
    fetchTasks();
  }, [assignedProjects]);
  const projects = useMemo(
    () => buildProjects(assignedProjects, assignedTasks, timeEntries),
    [assignedProjects, assignedTasks, timeEntries],
  );
  //console.log(projects);
  return {
    loading,
    // assignedProjects,
    // assignedTasks,
    // timeEntries,
    projects,
  };
}

// Create promises for each project

/*const promises = assignedProjects.map((project) =>
          TasksService.getAll({
            filter: `ProjectName/Id eq ${project["Project#Id"]}`, // adjust path if needed
          }),
        );

        // Wait for all tasks to be fetched
        const results = await Promise.all(promises);

        // Flatten all tasks into a single array
        const allTasks = results.flatMap((r) => r.data);*/

/*
  // Fetch tasks for assigned projects in parallel
  useEffect(() => {
    const fetchAssignedTasks = async () => {
      setLoading(true);
      try {
      } catch (error) {
        toast.error(
          "Не удалось загрузить задачи. Пожалуйста, попробуйте позже.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (assignedProjects.length > 0) {
      fetchAssignedTasks();
    }
  }, [assignedProjects]);

  useEffect(() => {
    const fetchTimeEntries = async () => {
      setLoading(true);
      const oDataFilter = `Author/EMail eq '${userProfile?.mail}'`;
      try {
        const timeEntries = await TimeEntriesService.getAll({
          filter: oDataFilter,
        });
        setTimeEntries(timeEntries.data);
      } catch (error) {
        toast.error(
          "Не удалось загрузить заполненные часы. Пожалуйста, попробуйте позже.",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchTimeEntries();
  }, [userProfile?.userPrincipalName, currentMonth, currentYear]);*/
