import type { page } from "@/shared/types/sharedtypes";
export const TABLE_STYLE = "border-l border-l-slate-300";
export const THEAD_TH_STYLE ="border-t ";
export const TH_TD_STYLE =""
export const MONTHS_NAMES = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
export const TIME_OUT_GET_DATA = 5000;
type MenuItem = {
  title: string;
  page: page;
};
export const MENU_ITEMS: MenuItem[]  = [
{title: "Главная",page:"main" },
{title: "Лог времени",page:"log" },
{title: "Отчeты",page:"report" }
];
