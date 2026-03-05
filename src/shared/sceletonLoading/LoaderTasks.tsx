type Props = {
  rows?: number;
};

export default function TimeEntriesSkeleton({ rows = 6 }: Props) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-3 border border-gray-200 rounded-lg shadow-sm bg-white"
        >
          <div className="flex flex-col space-y-2">
            <div className="h-4 w-48 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="h-4 w-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
      ))}
    </>
  );
}