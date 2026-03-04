import { useState, useRef } from "react";
import type { TasksRead } from "@/generated/models/TasksModel";

type Props = {
  hours: number | "";
  comment: string;
  task: TasksRead;
  date: string;
  weekday: string;
  onClose: () => void;
  onSubmit: (hours: number | "", comment: string) => Promise<void>;
  isWeekend: boolean;
};

export default function AddTimeEntryPopup({
  hours: initialHours,
  comment: initialComment,
  onClose,
  onSubmit,
  task,
  date,
  weekday,

  isWeekend,
}: Props) {
  const [hours, setHours] = useState<number | "">(initialHours);
  const [comment, setComment] = useState(initialComment);
  const [isSaving, setIsSaving] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  /* const { x, y } = calculateCoordinates(
    position.x,
    position.y,
    selfSize,
    parentWidth,
    parentHeight,
  );*/
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (isSaving) return; // если уже идёт сохранение, игнорируем повторный клик
    setIsSaving(true);
    try {
      await onSubmit(hours, comment);
      onClose(); // закрываем после успешного сохранения
    } finally {
      setIsSaving(false);
    }
  };
  const localDate = new Date(date)
    .toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .replace(/^\d+\s+\p{L}/u, (match) =>
      match.replace(/.$/, (c) => c.toUpperCase()),
    );
  return (
    <div
      className="fixed inset-0 bg-black flex items-center justify-center z-40 animate-fadeIn"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      onMouseDown={handleBackgroundClick} // клик на фон закрывает Popup
    >
      <div
        ref={divRef}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -60%)",
          zIndex: 50,
        }}
        className="bg-white border border-slate-300 shadow-lg rounded-xl w-200 p-4 flex flex-col gap-3 transition-all duration-15 "
      >
        {/* Заголовок */}
        <div className="mb-2">
          <p
            className={`text-sm text-gray-500 ${isWeekend ? "text-red-600" : "text-gray-700"}`}
          >
            {weekday + " " + localDate}{" "}
          </p>

          <h2 className="font-bold text-lg text-gray-800">
            {task.ProjectName?.Value}
          </h2>

          <h3 className="text-md font-medium text-gray-700 mt-1">
            {task.Title}
          </h3>
        </div>

        {/* Форма */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Часы</span>
            <input
              required
              type="number"
              min={0.1}
              max={24}
              step={0.1}
              inputMode="decimal"
              className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={hours}
              onChange={(e) => {
                const value = e.target.value.replace(",", ".");
                setHours(e.target.value === "" ? "" : Number(value));
              }}
            />
          </label>

          <label className="block ">
            <span className="text-sm font-medium text-gray-700">
              Комментарий
            </span>

            <textarea
              required
              className="mt-1 w-full h-24 border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none "
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Введите комментарий"
            />
          </label>

          <div className="text-sm font-medium text-gray-400 self-end p-0 m-0">
            {comment.length}
          </div>
          {/* Кнопки */}
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md transition-colors"
              onClick={onClose}
            >
              Отмена
            </button>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition-colors"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
