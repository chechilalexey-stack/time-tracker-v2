import { useState } from "react";
import MonthYearSwitch from "@/widgets/TimeSheetTable/components/MonthYearSwitch";
import useTimeSheetData from "@/shared/api/useTimeSheetData";
import type { GraphUser_V1 } from "@/generated/models/Office365UsersModel";
import LoaderTasks from "@/shared/sceletonLoading/LoaderTasks";
type Props = {
  userProfile?: GraphUser_V1;
};
export default function TimeSheetEntries({ userProfile }: Props) {
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth(),
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear(),
  );
  if (!userProfile?.mail) return;
  const {
    /*projects, tasks,*/ loading,
    // assignedTasks,
    //assignedProjects,
    timeEntries,
  } = useTimeSheetData({ userProfile, currentMonth, currentYear });

  return (
    <>
      <div className="p-4 bg-white rounded shadow w-full">
        <div className=" flex justify-between pl-4 pr-4 ">
          <h2 className="text-2xl font-bold w-126">Введенные данные</h2>
          <MonthYearSwitch
            selectedMonth={currentMonth}
            onChange={setCurrentMonth}
            selectedYear={currentYear}
            onChangeYear={setCurrentYear}
          />
          <div className="w-126"></div>
        </div>
        <div className="p-4 space-y-3">
          {loading ? (
            <LoaderTasks rows={3}/>
          ) : (
            timeEntries.map((entry) => (
              <div
                key={entry.ID}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md hover:border-gray-300 transition"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">
                    {entry.Title}
                  </span>
                  <span className="text-sm text-gray-500">
                    ID: {entry.TaskID}
                  </span>
                  <span className="text-sm text-gray-500">
                    Дата: {entry.Date}
                  </span>
                </div>

                <div className="text-sm text-gray-400">#{entry.ID}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
