import TimeSheetRowTask from "@/widgets/TimeSheetTable/TimeSheetRowTask";
import type { Projects_assignmentRead } from "@/generated/models/Projects_assignmentModel";
import type { TasksRead } from "@/generated/models/TasksModel";
import type { days } from "@/shared/types/sharedtypes";
//import type { TimeEntry } from "@/shared/types/sharedtypes";
import { useState } from "react";
import type { TimeEntriesRead } from "@/generated/models/TimeEntriesModel";

type Props = {
  project: Projects_assignmentRead;
  tasks: TasksRead[];
  days: days;
  timeEntries: TimeEntriesRead[];
  handleHoursChange: (
    x: number,
    y: number,
    taskId: any,
    day: string,
    weekday: string,
    task: TasksRead,
    isWeekend: boolean,
  ) => void;
  setHoveredDay: (data: { task: TasksRead; day: days[number] } | null) => void;
};

export default function TimeSheetRowProject({
  project,
  tasks,
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
  const isOpen = openProjects[project["Project#Id"]!];
  return (
    <tbody key={project["Project#Id"]} className="bg-white mb-2  ">
      <tr className="bg-gray-100">
        <td
          className="sticky left-0 bg-gray-200 border-t  p-2 font-semibold cursor-pointer hover:bg-gray-300 border-l border-b border-r border-slate-300"
          onClick={() => toggleProject(project["Project#Id"]!)}
        >
          <span className="inline-flex items-center gap-2 min-w-40">
            <span className="w-4">{isOpen ? "-" : "+"}</span>
            {project.Project?.Value}
          </span>
        </td>
        {days.map((day) => (
          <td
            key={day.day + 1}
            className={`border-b border-r border-t   border-slate-300 p-0 h-8 ${day.isWeekend ? "bg-gray-200" : "bg-gray-100"}`}
            onClick={() => toggleProject(project["Project#Id"]!)}
          >
            <input
              className="w-full h-full text-center cursor-pointer outline-none font-semibold cursor-default transparent text-zinc-600"
              id={`project-${project["Project#Id"]}-${day.weekday}-${day.day + 1}`}
              value={
                timeEntries
                  .filter(
                    (e) =>
                      e.projectId === project["Project#Id"] &&
                      e.Date === day.date,
                  )
                  .reduce((acc, entry) => acc + (entry.Hours || 0), 0) || ""
              }
              readOnly
            />
          </td>
        ))}
        <td className="border-b border-r border-t text-white border-slate-800 p-2 text-center bg-gray-700 sticky right-0 font-semibold">
          {timeEntries
            .filter((e) => e.projectId === project["Project#Id"])
            .reduce((acc, entry) => acc + (entry.Hours || 0), 0)}
        </td>
      </tr>

      {isOpen && timeEntries&& 
        tasks.map((task) => (
          <TimeSheetRowTask
            key={task.ID}
            task={task}
            days={days}
            timeEntries={timeEntries}
            handleHoursChange={handleHoursChange}
            setHoveredDay={setHoveredDay}
          />
        ))}
      <tr className="h-4  bg-transparent border-0"></tr>
    </tbody>
  );
}
