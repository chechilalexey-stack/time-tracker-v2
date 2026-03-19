import TimeSheetRowTask from "@/widgets/TimeSheetTable/TimeSheetRowTask";

import type {
  days,
  Project,
  Task,
  TimeEntry,
} from "@/shared/types/sharedtypes";

import { useState } from "react";
//import { time } from "node:console";

type Props = {
  project: Project;
  days: days;
  timeEntries: TimeEntry[];
  handleHoursChange: (
    x: number,
    y: number,
    taskId: any,
    day: string,
    weekday: string,
    task: Task,
    isWeekend: boolean,
  ) => void;
  setHoveredDay: (data: { task: Task; day: days[number] } | null) => void;
};

export default function TimeSheetRowProject({
  project,
  //tasks,
  days,
  timeEntries,
  handleHoursChange,
  setHoveredDay,
}: Props) {
  const [openProjects, setOpenProjects] = useState<Record<number, boolean>>({});
  const toggleProject = (projectId: number) => {
    setOpenProjects((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };
  const isOpen = openProjects[project.id!];
  return (
    <tbody key={project.id} className="bg-white mb-2  ">
      <tr className="bg-gray-100">
        <td
          className="sticky left-0 bg-gray-200 border-t  p-2 font-semibold cursor-pointer hover:bg-gray-300 border-l border-b border-r border-slate-300 z-10"
          onClick={() => toggleProject(project.id!)}
        >
          <span className="inline-flex items-center gap-2 min-w-40">
            <span className="w-4">{isOpen ? "-" : "+"}</span>
            {project.title}
          </span>
        </td>
        {days.map((day) => (
          <td
            key={day.day + 1}
            className={`border-b border-r border-t   border-slate-300 p-0 h-8 ${day.isWeekend ? "bg-gray-200" : "bg-gray-100"}`}
            onClick={() => toggleProject(project.id!)}
          >
            <input
              className="w-full h-full text-center cursor-pointer outline-none font-semibold cursor-default transparent text-zinc-600"
              id={`project-${project.id}-${day.weekday}-${day.day + 1}`}
              value={
                timeEntries
                  .filter((entry) => entry.date === day.date&&entry.projectId === project.id)
                  .reduce((acc, entry) => acc + (entry.hours || 0), 0) || ""
              }
              readOnly
            />
          </td>
        ))}
        <td className="border-b border-r border-t text-white border-slate-800 p-2 text-center bg-gray-700 sticky right-0 font-semibold z-10">
          {timeEntries.filter((entry) => entry.projectId === project.id).
          reduce((acc, entry) => acc + (entry.hours || 0), 0)}
        </td>
      </tr>

      {isOpen &&
        project.tasks.map((task) => (
          <TimeSheetRowTask
            key={task.id}
            task={task}
            days={days}
            handleHoursChange={handleHoursChange}
            setHoveredDay={setHoveredDay}
            timeEntries={timeEntries}
          />
        ))}
      <tr className="h-4  bg-transparent border-0"></tr>
    </tbody>
  );
}
