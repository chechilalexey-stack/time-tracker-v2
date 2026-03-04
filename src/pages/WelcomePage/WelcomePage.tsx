import { useState } from "react";
import MonthYearSwitch from "@/widgets/TimeSheetTable/components/MonthYearSwitch";

export default function WelcomePage() {
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth(),
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear(),
  );
  return (
    <div className = "p-4 bg-white rounded shadow w-full">
      <div className=" flex justify-between pl-4 pr-4 ">
        <h2 className="text-2xl font-bold w-126">Главная</h2>
        <MonthYearSwitch
          selectedMonth={currentMonth}
          onChange={setCurrentMonth}
          selectedYear={currentYear}
          onChangeYear={setCurrentYear}
        />
        <div className="w-126"></div>
      </div>
      <div className="p-4 ">Тут будет главная страница</div>
    </div>
  );
}
