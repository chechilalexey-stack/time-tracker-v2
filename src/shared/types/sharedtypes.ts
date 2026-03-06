
export type days = {
  day: number;
  weekday: string;
  isWeekend: boolean;
  date: string;
}[];

export type TimeEntry = {
  id: number;
  projectId: number;
  taskId: number;
  date: string;
  hours: number;
};
export type Task = {
  id: number;
  projectId: number;
  projectTitle: string;
  title: string;
  timeEntries: TimeEntry[];
};
export type Project = {
  id: number;
  title: string;
  tasks: Task[];
};
export type Comment = {
  projectId: number;
  taskId: number;
  date: string;
  text: string;
};

export type PopupData = {
  x: number;
  y: number;
  parentWidth: number;
  parentHeight: number;
  taskId: number;
  day: string;
  weekday: string;
  task: Task;
  isWeekend: boolean;
};

export type page = "main" | "log" | "report" | "about";
