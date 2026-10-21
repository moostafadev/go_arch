export const SalesSkeleton = () => {
  return (
    <div className="border border-border bg-card overflow-hidden">
      <div className="border-b border-border bg-background/50 p-3 flex gap-3 sm:p-4 sm:gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-3 w-1/5 bg-border animate-pulse" />
        ))}
      </div>

      {[1, 2, 3, 4].map((row) => (
        <div
          key={row}
          className="border-b border-border/50 p-3 flex gap-3 items-center sm:p-4 sm:gap-4"
        >
          {[1, 2, 3, 4, 5].map((col) => (
            <div key={col} className="h-3 w-1/5 bg-border animate-pulse" />
          ))}
        </div>
      ))}
    </div>
  );
};
