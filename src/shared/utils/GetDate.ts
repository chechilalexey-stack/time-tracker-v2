export default function getDaysInMonthWithWeekdays(
  year: number,
  month: number,
) {
  const totalDays = new Date(year, month, 0).getDate();
  const weekdayNames = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

  return Array.from({ length: totalDays }, (_, i) => {
    const date = new Date(year, month - 1, i + 1);
    const dayOfWeek = date.getDay();

    // Формируем строку даты в локальном времени
    const yearStr = date.getFullYear();
    const monthStr = String(date.getMonth() + 1).padStart(2, "0");
    const dayStr = String(date.getDate()).padStart(2, "0");

    return {
      day: i + 1,
      weekday: weekdayNames[dayOfWeek],
      isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
      date: `${yearStr}-${monthStr}-${dayStr}`, // YYYY-MM-DD локально
    };
  });
}