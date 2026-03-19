import type { days, Task, TimeEntry } from "@/shared/types/sharedtypes";
import { useMemo, useState } from "react";
import React from "react";
import PortalDropdown from "@/shared/dropDownPortal/DropDownPortal";
type Props = {
  task: Task;
  days: days;
  timeEntries: TimeEntry[];

  //comments: Comment[];
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
export default function TimeSheetRowTask({
  task,
  days,
  timeEntries,
  handleHoursChange,
  setHoveredDay,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  //const [hover, setHover] = useState(false);
  const entriesByTaskDay = useMemo(() => {
    const map = new Map<string, TimeEntry>();
    for (const e of timeEntries) {
      map.set(`${e.taskId}-${e.date}`, e);
    }
    return map;
  }, [timeEntries]);
  return (
    <>
      <tr className="bg-white ">
        <td className="border-b border-r border-slate-300 sticky left-0 bg-white p-2 pl-8  border-l border-slate-300  z-10">
          <div className="flex justify-between gap-1 items-center">
            {task.title}{" "}
            <div className="relative">
              <button
                ref={buttonRef}
                title=""
                className="px-1 py-1  rounded-md bg-white hover:bg-gray-100 z-10"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {"\u22EE"}
              </button>
              <PortalDropdown
                isOpen={menuOpen}
                anchorRef={buttonRef}
                onClose={() => setMenuOpen(false)}
              >
                <ul className="flex flex-col space-y-1 py-1 min-w-[120px] overflow-hidden">
                  <li className="px-3 py-1 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer transition-colors duration-150">
                    Edit
                  </li>
                  <li className="px-3 py-1 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer transition-colors duration-150">
                    Delete
                  </li>
                </ul>
              </PortalDropdown>
            </div>
          </div>
        </td>

        {days.map((day) => {
          // const hours = task.timeEntries. || 0;

          /*const entryForDay = task.timeEntries.find((e) => e.date === day.date);
          const hours = entryForDay?.hours ?? 0;*/
          const key = `${task.id}-${day.date}`;
          const hours = entriesByTaskDay.get(key)?.hours ?? 0;
          const additionalClass =
            hours === 0 ? " text-gray-300" : " text-gray-800";
          return (
            <td
              key={day.day}
              className={`border-b border-r  border-slate-300 p-0 h-8 hover:bg-gray-200  ${day.isWeekend ? "bg-gray-100 " : ""}`}
              onClick={(e) =>
                handleHoursChange(
                  e.clientX,
                  e.clientY,
                  task.id,
                  day.date,
                  day.weekday,
                  task,
                  day.isWeekend,
                )
              }
              onMouseEnter={() => setHoveredDay({ task, day })}
              onMouseLeave={() => setHoveredDay(null)}
            >
              <div
                className={
                  "w-full h-full flex items-center justify-center cursor-crosshair" +
                  additionalClass
                }
              >
                {hours}
              </div>
            </td>
          );
        })}
        <td className="border-b border-r p-2 text-center bg-gray-600 font-bold sticky right-0  text-white border-slate-800">
          {timeEntries
            .filter((e) => e.taskId === task.id)
            .reduce((acc, entry) => acc + (entry.hours || 0), 0)}
        </td>
      </tr>
    </>
  );
}
