

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 mb-20 bg-white rounded shadow w-full">
      {/* Заголовок */}
      <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
        🕒 Time Tracker App
      </h1>

    

      {/* Краткое описание */}
      <p className="text-gray-700 text-lg">
        <strong>Time Tracker</strong> — веб-приложение для учета рабочего времени сотрудников с интерактивной таблицей проектов и задач.
      </p>

      <hr className="border-gray-300" />

      {/* Основные возможности */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">🚀 Основные возможности</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>✅ Просмотр назначенных проектов и задач</li>
          <li>✅ Внесение часов и комментариев</li>
          <li>✅ Подсветка текущего дня и выходных</li>
          <li>✅ Sticky header таблицы при прокрутке</li>
          <li>✅ Hover подсказки и гайдлайны на ячейках</li>
          <li>✅ Автоматическое суммирование часов по дням и месяцу</li>
          <li>✅ Уведомления через Toast (<code>react-toastify</code>)</li>
        </ul>
      </section>

      {/* Технологии */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">🧩 Технологии</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>React 18+ и TypeScript</li>
          <li>TailwindCSS для стилизации</li>
          <li>React Toastify для уведомлений</li>
          <li>Power Apps & MS Graph API для данных пользователя</li>
          <li>OData фильтры для запросов проектов и часов</li>
        </ul>
      </section>

      {/* Файловая структура */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">📄 Краткое описание файлов</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Путь</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Назначение</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              <tr>
                <td className="px-4 py-2">src/App.tsx</td>
                <td className="px-4 py-2">Главный компонент приложения</td>
              </tr>
              <tr>
                <td className="px-4 py-2">src/pages/TimeSheetPage/TimeSheetPage.tsx</td>
                <td className="px-4 py-2">Страница таймшита, оборачивает таблицу</td>
              </tr>
              <tr>
                <td className="px-4 py-2">src/widgets/Header/Header.tsx</td>
                <td className="px-4 py-2">Шапка приложения</td>
              </tr>
              <tr>
                <td className="px-4 py-2">src/widgets/Footer/Footer.tsx</td>
                <td className="px-4 py-2">Футер приложения</td>
              </tr>
              <tr>
                <td className="px-4 py-2">src/shared/api/useUser.ts</td>
                <td className="px-4 py-2">Хук для получения данных пользователя</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}