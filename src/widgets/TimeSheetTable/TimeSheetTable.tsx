import TimeSheetRowProject from "@/widgets/TimeSheetTable/timsSheetRowProject";
import getDaysInMonthWithWeekdays from "@/shared/utils/GetDate";
import type {
  days,
  Project,
  Task,
  TimeEntry,
} from "@/shared/types/sharedtypes";
import { useRef, useState, useMemo } from "react";
import AddTimeEntryPopup from "@/widgets/TimeSheetTable/components/AddTimeEntryPopup";
import type { PopupData } from "@/shared/types/sharedtypes";
import saveTimeEntry from "@/shared/api/useSaveData";
import HoverCellPopup from "@/widgets/TimeSheetTable/components/HoverCellPopup";
import HoverGuidlines from "@/widgets/TimeSheetTable/components/HoverGuidlines";
type Props = {
  projects: Project[];

  currentMonth: number;
  currentYear: number;

  initialTimeEntries: TimeEntry[];
  formattedDate: string;
};
type Coordinates = {
  x: number;
  y: number;
  dx: number;
  dy: number;
};
export default function TimeSheetTable({
  projects,

  currentMonth,
  currentYear,
  initialTimeEntries,
  formattedDate,
}: Props) {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>(initialTimeEntries);
//setTimeEntries(initialTimeEntries);
  const daysInMonth = getDaysInMonthWithWeekdays(currentYear, currentMonth);

  const [popup, setPopup] = useState<PopupData | null>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  const handleHoursChange = (
    x: number,
    y: number,
    taskId: number,
    day: string,
    weekday: string,
    task: Task,
    isWeekend: boolean,
  ) => {
    if (!tableRef.current) return;
    const rect = tableRef.current.getBoundingClientRect();
    let nx = x - rect.left;
    let ny = y - rect.top;
    setPopup({
      x: nx,
      y: ny,
      parentWidth: rect.width,
      parentHeight: rect.height,
      taskId: taskId,
      day,
      weekday,
      task,
      isWeekend,
    });
  };

  const [hoverPos, setHoverPos] = useState<Coordinates | null>(null);
  const [hoveredDay, setHoveredDay] = useState<{
    task: Task;
    day: days[number];
  } | null>(null);

  const handleSubmit = async (hours: number | "", comment: string) => {
    const { save } = saveTimeEntry();
    const newEntry = await save(hours, comment, popup);
    if (newEntry) {
      setTimeEntries((prev) => [...prev, newEntry]);
    }
    setPopup(null);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!tableRef.current) return;
    const rect = tableRef.current.getBoundingClientRect();

    setHoverPos({
      x: e.clientX,
      y: e.clientY,
      dx: rect.x,
      dy: rect.y,
    });
  };

  const handleMouseLeave = () => setHoverPos(null);

  const hoursByDate = useMemo(() => {
    const map: Record<string, number> = {};

    for (const entry of timeEntries) {
      const date = entry.date;
      if (!date) continue;

      if (!map[date]) map[date] = 0;
      map[date] += entry.hours || 0;
    }

    return map;
  }, [timeEntries]);

  return (
    <div className="m-4 relative animate-fadeIn">
      <div className="overflow-auto max-h-[500px]" ref={tableRef}>
        <table
          className="min-w-full border-separate  text-xs  border-spacing-0 "
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <thead className="sticky top-0 z-20 bg-gray-600">
            <tr>
              <th
                rowSpan={2}
                className="sticky left-0 z-30 bg-gray-600 text-white p-1 text-left font-bold border-b border-t border-l border-r border-slate-800"
              >
                <div className="flex gap-1 items-center">
                  Проект / Задача
                  <svg
                    className="p-1 rounded hover:bg-slate-200 transition"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                  </svg>
                </div>
              </th>

              {daysInMonth.map((day) => (
                <th
                  key={day.day + 1}
                  className={` border-r border-t border-slate-800 p-1  text-center ${
                    day.isWeekend
                      ? "bg-gray-700 text-red-300 "
                      : "bg-gray-600  text-white "
                  }${day.date === formattedDate ? " border-t-5  border-t-zinc-300  pt-3 " : "pt-4  "}`}
                >
                  {day.weekday}
                </th>
              ))}

              <th
                rowSpan={2}
                className="border-b border-r border-t border-slate-800 sticky right-0 z-20 bg-gray-700 text-white p-2 text-center "
              >
                Итого в месяц
              </th>
            </tr>

            <tr>
              {daysInMonth.map((day) => (
                <th
                  key={day.day + 1}
                  className={`border-b border-r border-slate-800  p-1  pb-3  text-center ${
                    day.isWeekend
                      ? "bg-gray-700 text-red-300"
                      : "bg-gray-600 text-white"
                  }   `}
                >
                  <div
                    className={`${day.date === formattedDate ? "px-1 py-1 rounded-md bg-white text-gray-800" : ""}  `}
                  >
                    {" "}
                    {day.day}
                  </div>
                </th>
              ))}
            </tr>
            <tr className="h-1  bg-transparent border-0"></tr>
          </thead>

          {projects.map((project) => (
            <TimeSheetRowProject
              key={project.id}
              project={project}
              //tasks={project.tasks}
              days={daysInMonth}
              timeEntries={timeEntries}
              handleHoursChange={handleHoursChange}
              setHoveredDay={setHoveredDay}
            />
          ))}
          <tfoot>
            <tr className="sticky left-0 bottom-0 bg-gray-500 text-white border p-2 text-left border-slate-800">
              <td
                className="border-r  p-1 pb-2 text-center font-bold border-slate-800 "
                id="summ"
              >
                Итого часов в день
              </td>
              {daysInMonth.map((day) => {
                const hoursInDay = hoursByDate[day.date] || 0;
                /*const hoursInDay = timeEntries
                  .filter((e) => e.Date === day.date)
                  .reduce((acc, entry) => acc + (entry.Hours || 0), 0);*/
                return (
                  <td
                    key={day.day}
                    className={`border-r h-8 text-center font-semibold border-slate-800 
                      ${day.date === formattedDate ? " border-b-5 border-b-zinc-300  pb-0 " : "pb-1  "}
                      ${day.isWeekend ? "bg-gray-700" : ""} 
                      ${hoursInDay >= 8 ? " text-emerald-300 " : day.date < formattedDate && hoursInDay < 8 && !day.isWeekend ? " text-red-300" : ""}
                     `}
                  >
                    {hoursInDay}
                  </td>
                );
              })}
              <td className="border-r p-1  pb-2 text-center font-bold border-slate-800">
                {timeEntries
                  /* .filter((e) => {
                    if (!e.Date) return false;
                    const time = new Date(e.Date).getTime();
                    console.log(time,start,end)
                    return time >= start && time <= end;
                   
                  })*/
                  .reduce((acc, entry) => acc + (entry.hours || 0), 0)}
              </td>
            </tr>
          </tfoot>
        </table>
        {hoverPos && hoveredDay && (
          <HoverGuidlines
            x={hoverPos.x}
            y={hoverPos.y}
            offsetHeight={tableRef.current?.offsetHeight ?? 0}
            offsetWidth={tableRef.current?.offsetWidth ?? 0}
            dx={hoverPos.dx}
            dy={hoverPos.dy}
          />
        )}
        {popup && (
          <AddTimeEntryPopup
            //position={{ x: popup.x, y: popup.y }}
            hours={0}
            comment={""}
            onClose={() => setPopup(null)}
            onSubmit={(hours, comment) => handleSubmit(hours, comment)}
            task={popup.task}
            date={popup.day}
            weekday={popup.weekday}
            //parentWidth={popup.parentWidth}
            //parentHeight={popup.parentHeight}
            isWeekend={popup.isWeekend}
          />
        )}
        {hoveredDay && hoverPos && (
          <HoverCellPopup
            task={hoveredDay.task} // или hoveredDay сама, если нужно больше данных
            hoverPos={{
              x: hoverPos.x,
              y: hoverPos.y,
              day: hoveredDay.day, // передаем объект дня
            }}
          />
        )}
      </div>
    </div>
  );
}
