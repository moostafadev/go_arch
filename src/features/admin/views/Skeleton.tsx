export const ViewsSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 sm:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="border border-border bg-card p-3 sm:p-4">
            <div className="mb-2 h-3 w-16 animate-pulse bg-border" />
            <div className="h-6 w-20 animate-pulse bg-border" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
        {[1, 2].map((col) => (
          <div key={col} className="border border-border bg-card">
            <div className="border-b border-border p-3 sm:p-4">
              <div className="h-3 w-24 animate-pulse bg-border" />
            </div>
            {[1, 2, 3, 4].map((row) => (
              <div key={row} className="border-b border-border/50 p-3 sm:p-4">
                <div className="h-3 w-full animate-pulse bg-border" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
