import type { page } from "@/shared/types/sharedtypes";
type FooterProps = {
  setCurrentPage: (page: page) => void; // типизируем допустимые страницы
};

export default function Footer({ setCurrentPage }: FooterProps) {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 flex items-center justify-between">
      <div>A.C.</div>
      <div className="flex items-center gap-4">
        <span>2026 год</span>
        <button
          className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md transition-colors text-sm"
          onClick={() => setCurrentPage("about")} // вызываем переход
        >
          О приложении
        </button>
      </div>
    </footer>
  );
}