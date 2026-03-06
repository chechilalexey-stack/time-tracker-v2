//import type { TasksRead } from "@/generated/models/TasksModel";
import type { days,Task } from "@/shared/types/sharedtypes";
type Props = {
  task: Task;
  hoverPos: {
    x: number;
    y: number;
    day: days[number];
  };
};

export default function HoverCellPopup({ task, hoverPos }: Props) {
  return (
    <div
      className="absolute px-2 py-2 text-xs bg-white text-black border border-gray-200 rounded shadow-sm pointer-events-none z-40 flex flex-col gap-1"
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
          {task.projectTitle}
        </p>
      }
      {<p className="m-0 text-xs font-semibold text-gray-800">{task.title}</p>}
    </div>
  );
}
