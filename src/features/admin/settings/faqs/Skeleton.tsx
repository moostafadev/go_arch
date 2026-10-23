export const FaqsSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="flex flex-col gap-3 border border-border bg-card p-3 sm:p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-1 flex-col gap-2">
              <div className="h-4 w-2/3 animate-pulse bg-border" />
              <div className="h-3 w-full animate-pulse bg-border/60" />
              <div className="h-3 w-4/5 animate-pulse bg-border/60" />
            </div>
            <div className="h-5 w-8 shrink-0 animate-pulse bg-border/60" />
          </div>
        </div>
      ))}
    </div>
  );
};
