export default function LoadTable({ rows = 5, columns = 4 }) {
  return (
    <div className="p-4 space-y-4">
      {/* Заголовок таблицы */}
      <div className="grid grid-cols-4 gap-2 mb-2">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="h-18 bg-gray-400 rounded animate-pulse"></div>
        ))}
      </div>

      {/* Ряды таблицы */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-4 gap-2">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="h-8 bg-gray-200 rounded animate-pulse"
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}
