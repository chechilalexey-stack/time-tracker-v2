import { MONTHS_NAMES } from "@/constants/table";
import { useEffect, useRef, useState } from "react";

type Props = {
  selectedMonth: number;
  onChange: (monthIndex: number) => void;
  selectedYear: number;
  onChangeYear: (year: number) => void;
};

export default function MonthYearSwitch({
  selectedMonth,
  onChange,
  selectedYear,
  onChangeYear,
}: Props) {
  const selectedMonthName = MONTHS_NAMES[selectedMonth];
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 3 }, (_, i) => currentYear - 1 + i);
  const [dropdownMonth, setDropDownMonth] = useState(false);
  const [dropdownYear, setDropDownYear] = useState(false);
  const monthRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);

  const handlePopupMonth = () => {
    setDropDownMonth((v) => !v);
    setDropDownYear(false);
  };

  const handlePopupYear = () => {
    setDropDownYear((v) => !v);
    setDropDownMonth(false);
  };

  const handleMonthChange = (type: "inc" | "dec") => {
    switch (type) {
      case "inc":
        // логика для увеличения месяца
        onChange((selectedMonth + 1) % 12);
        if (selectedMonth === 11) {
          onChangeYear(selectedYear + 1);
        }

        break;
      case "dec":
        // логика для уменьшения месяца
        onChange((selectedMonth + 11) % 12);
        if (selectedMonth === 0) {
          onChangeYear(selectedYear - 1);
        }
        break;
    }
  };
  // закрытие при клике вне dropdown
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!monthRef.current?.contains(e.target as Node)) {
        setDropDownMonth(false);
      }
      if (!yearRef.current?.contains(e.target as Node)) {
        setDropDownYear(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative inline-block">
      <div className="flex gap-2">
        <button
          onClick={() => {
            handleMonthChange("dec"); // onChange(selectedMonth - 1 < 0 ? 11 : selectedMonth - 1);
          }}
          className="px-1 py-1  rounded-md bg-white hover:bg-gray-50 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={handlePopupMonth}
          className="px-3 py-1 border rounded-md bg-white hover:bg-gray-50 w-30"
        >
          {selectedMonthName}
        </button>
        <button
          onClick={handlePopupYear}
          className="px-3 py-1 border rounded-md bg-white hover:bg-gray-50 w-20"
        >
          {selectedYear}
        </button>
        <button
          title="Перейти к текущему месяцу"
          onClick={() => {
            const today = new Date();
            onChange(today.getMonth());
            onChangeYear(today.getFullYear());
          }}
          className="px-2 py-1 rounded-md bg-blue-100 text-blue-800 hover:bg-blue-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"
            />
          </svg>
        </button>
        <button
          className="px-1 py-1  rounded-md bg-white hover:bg-gray-50"
          onClick={() => {
            handleMonthChange("inc"); // onChange(selectedMonth + 1 > 11 ? 0 : selectedMonth + 1);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      {dropdownMonth && (
        <div
          ref={monthRef}
          className="left-10 absolute mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden"
        >
          {MONTHS_NAMES.map((month, index) => (
            <button
              key={month}
              onClick={() => {
                onChange(index);
                setDropDownMonth(false);
              }}
              className={`block w-full text-left px-3 py-2 hover:bg-blue-50 ${
                index === selectedMonth ? "bg-blue-100 font-medium" : ""
              }`}
            >
              {month}
            </button>
          ))}
        </div>
      )}
      {dropdownYear && (
        <div
          ref={yearRef}
          className="left-42 absolute mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden"
        >
          {yearOptions.map((year) => (
            <button
              key={year}
              onClick={() => {
                onChangeYear(year);
                setDropDownYear(false);
              }}
              className={`block w-full text-left px-3 py-2 hover:bg-blue-50 ${
                year === selectedYear ? "bg-blue-100 font-medium" : ""
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
