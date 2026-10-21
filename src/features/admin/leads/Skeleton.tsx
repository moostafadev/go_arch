export const LeadsSkeleton = () => {
  return (
    <div className="border border-border bg-card overflow-hidden">
      <div className="border-b border-border bg-background/50 p-3 flex gap-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-3 w-1/6 bg-border animate-pulse" />
        ))}
      </div>

      {[1, 2, 3, 4].map((row) => (
        <div
          key={row}
          className="border-b border-border/50 p-3 flex gap-3 items-center"
        >
          {[1, 2, 3, 4, 5, 6].map((col) => (
            <div key={col} className="h-3 w-1/6 bg-border animate-pulse" />
          ))}
        </div>
      ))}
    </div>
  );
};
