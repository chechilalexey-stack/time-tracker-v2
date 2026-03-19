import type { GraphUser_V1 } from "@/generated/models/Office365UsersModel";
import type { page } from "@/shared/types/sharedtypes";
import getInitials from "@/shared/utils/getInitials";
import { MENU_ITEMS } from "@/constants/constants";
import { useState } from "react";
type Props = {
  userProfile?: GraphUser_V1;
  loading?: boolean;
  photoUrl?: string | null;
  setCurrentPage: (page: page) => void;
};
export default function Header({
  userProfile,
  loading,
  photoUrl,
  setCurrentPage,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 w-full z-30 bg-gray-800 text-white p-4 flex items-center justify-between relative">
      <div className="sm:hidden relative">
        <button
          className=" text-gray-300 mr-10"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
        {/* Мобильное меню */}
        {isOpen && (
          <nav className="sm:hidden absolute mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
            <ul className="flex flex-col space-y-2">
              {MENU_ITEMS.map((item) => (
                <li
                  key={item.page}
                  onClick={() => {
                    setCurrentPage(item.page);
                    setIsOpen(false);
                  }}
                  className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-white/5 hover:text-gray-600"
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
      <h1 className="text-2xl font-semibold  w-100">Time Tracker</h1>
      {/* Бургер (только на мобильных) */}

      <nav className="hidden sm:block">
        <ul className="flex space-x-4 list-disk">
          {MENU_ITEMS.map((item) => (
            <li
              key={item.page}
              onClick={() => setCurrentPage(item.page)}
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
            >
              <button>{item.title}</button>
            </li>
          ))}
        </ul>
      </nav>

      {loading ? (
        <div className="flex items-center justify-end space-x-4 w-100">
          <div className="animate-pulse bg-gray-700 w-32 h-8 rounded"></div>
          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-sm font-medium"></div>
        </div>
      ) : (
        <div className="flex items-center justify-end space-x-4  w-100">
          <div className="flex flex-col text-right">
            <span className="font-medium">{userProfile?.displayName}</span>
            <span className="text-sm text-gray-300">
              {userProfile?.jobTitle}
            </span>
          </div>
          {photoUrl ? (
            <img
              src={photoUrl}
              alt="User Photo"
              className="w-10 h-10 rounded-full object-cover "
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-sm font-medium">
              {userProfile?.displayName
                ? getInitials(userProfile?.displayName)
                : ""}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
