import type { TasksRead } from "@/generated/models/TasksModel"; 
export type days = {
  day: number;
  weekday: string;
  isWeekend: boolean;
  date: string;
}[];

export type TimeEntry = {
  projectId: number;
  taskId: number;
  date: string;
  hours: number;
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
  task: TasksRead;
  isWeekend:boolean;
};

export type page = "main" | "log"|"report" |"about";