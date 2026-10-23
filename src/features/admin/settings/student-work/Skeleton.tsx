export const StudentWorkSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="flex flex-col gap-3 border border-border bg-card p-3 sm:p-4"
        >
          <div className="aspect-4/3 w-full animate-pulse bg-border/50" />
          <div className="flex items-center justify-between gap-3">
            <div className="h-3 w-32 animate-pulse bg-border" />
            <div className="h-3 w-8 animate-pulse bg-border/60" />
          </div>
        </div>
      ))}
    </div>
  );
};
