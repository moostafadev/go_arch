export const CoursesSkeleton = () => {
  return (
    <div className="border border-border bg-card overflow-hidden">
      <div className="border-b border-border bg-background/50 p-2 sm:p-4 flex gap-2 sm:gap-4">
        <div className="h-3 sm:h-4 w-1/4 bg-border animate-pulse rounded-none" />
        <div className="h-3 sm:h-4 w-1/4 bg-border animate-pulse rounded-none" />
        <div className="h-3 sm:h-4 w-1/4 bg-border animate-pulse rounded-none" />
      </div>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="border-b border-border/50 p-2 sm:p-4 flex gap-2 sm:gap-4 items-center"
        >
          <div className="h-10 w-16 bg-border animate-pulse rounded-none" />
          <div className="h-3 sm:h-4 w-1/4 bg-border animate-pulse rounded-none" />
          <div className="h-3 sm:h-4 w-1/4 bg-border animate-pulse rounded-none" />
        </div>
      ))}
    </div>
  );
};
