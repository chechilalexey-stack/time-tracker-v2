import type { TasksRead } from "@/generated/models/TasksModel";
import type { days } from "@/shared/types/sharedtypes";
//import type { TimeEntry } from "@/shared/types/sharedtypes";
import type { TimeEntriesRead } from "@/generated/models/TimeEntriesModel";
import { useMemo } from "react";
//import type { Comment } from "@/shared/types/sharedtypes";
type Props = {
  task: TasksRead;
  days: days;
  timeEntries: TimeEntriesRead[];

  //comments: Comment[];
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
export default function TimeSheetRowTask({
  task,
  days,
  timeEntries,
  handleHoursChange,
  setHoveredDay,
}: Props) {
  //const [hover, setHover] = useState(false);

  const entriesMap = useMemo(() => {
    const map = new Map<string, number>();

    timeEntries.forEach((e) => {
      map.set(`${e.TaskID}-${e.Date}`, e.Hours || 0);
    });

    return map;
  }, [timeEntries]);

  return (
    <>
      <tr className="bg-white ">
        <td className="border-b border-r border-slate-300 sticky left-0 bg-white p-2 pl-8  border-l border-slate-300">
          {task.Title}
        </td>

        {days.map((day) => {
          const hours = entriesMap.get(`${task.ID}-${day.date}`) || 0;

          const additionalClass =
            hours === 0
              ? " text-gray-300"
           
                : " text-gray-800";
          return (
            <td
              key={day.day}
              className={`border-b border-r  border-slate-300 p-0 h-8 hover:bg-gray-200  ${day.isWeekend ? "bg-gray-100 " : ""}`}
              onClick={(e) =>
                handleHoursChange(
                  e.clientX,
                  e.clientY,
                  task.ID,
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
            .filter((e) => e.TaskID === task.ID)
            .reduce((acc, entry) => acc + (entry.Hours || 0), 0)}
        </td>
      </tr>
    </>
  );
}
/*<input
                className={
                  "w-full h-full text-center outline-none" + additionalClass
                }
                id={`input-${task["ProjectName#Id"]}-${task.ID}-${day.weekday}-${day.day}`}
                value={hours}
                onChange={(e) =>
                  handleHoursChange(task.ID!, day.date, e.target.value)
                }
              />*/

/*{hoverPos && (
        <div
          className="absolute px-2 py-2 text-xs bg-white text-black border border-gray-200 rounded shadow-sm pointer-events-none z-50 flex flex-col gap-1"
          style={{
            top: hoverPos.y + 10, // немного ниже курсора
            left: hoverPos.x + 10, // немного правее курсора
            position: "fixed", // фиксируем относительно окна
          }}
        >
          {
            <p
              className={`m-0 text-xs leading-tight ${hoverPos.day.isWeekend ? "text-red-600" : "text-gray-700"}`}
            >
              {hoverPos.day.weekday} {hoverPos.day.date}
            </p>
          }
          {
            <p className="m-0 text-xs font-bold text-gray-800">
              {task.ProjectName?.Value}
            </p>
          }
          {
            <p className="m-0 text-xs font-semibold text-gray-800">
              {task.Title}
            </p>
          }
        </div>
      )}*/
