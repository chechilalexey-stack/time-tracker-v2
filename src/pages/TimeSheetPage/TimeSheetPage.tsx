import useTimeSheetData from "@/shared/api/useTimeSheetData";
import LoaderTable from "@/shared/sceletonLoading/LoaderTable";
import { useState } from "react";
import TimeSheetTable from "@/widgets/TimeSheetTable/TimeSheetTable";
import MonthYearSwitch from "@/widgets/TimeSheetTable/components/MonthYearSwitch";
import type { GraphUser_V1 } from "@/generated/models/Office365UsersModel";

type Props = {
  userProfile?: GraphUser_V1;
  formattedDate: string;
};

export default function TimeSheetPage({ userProfile, formattedDate }: Props) {
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth(),
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear(),
  );

  const {
    loading,

    projects,
  } = useTimeSheetData({ userProfile, currentMonth, currentYear });
 const initialTimeEnries =
    projects
      .flatMap((project) => project.tasks)
      .flatMap((task) => task.timeEntries)
  ;
  return (
    <div className="p-4 bg-white rounded shadow w-full">
      <div className=" flex justify-between pl-4 pr-4 ">
        <h2 className="text-2xl font-bold w-126">Time Sheet</h2>
        <MonthYearSwitch
          selectedMonth={currentMonth}
          onChange={setCurrentMonth}
          selectedYear={currentYear}
          onChangeYear={setCurrentYear}
        />
        <div className="w-126"></div>
      </div>
      {loading ? (
        <LoaderTable />
      ) : projects.length > 0 ? (
        <TimeSheetTable
          projects={projects}
          currentMonth={currentMonth + 1}
          currentYear={currentYear}
          formattedDate={formattedDate}
          initialTimeEntries = {initialTimeEnries}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-center gap-2">
          <p className="text-gray-600 text-lg font-medium">
            Проектов, назначенных на вас, не обнаружено
          </p>
          <p className="text-gray-500 text-sm">
            Пока можно заполнить данные в базе SharePoint:{" "}
            <a
              href="https://awarappdemo.sharepoint.com/sites/TimeSheetCodeApp/Lists/projects_assignment/AllItems.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700 transition-colors"
            >
              перейти к списку проектов
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
