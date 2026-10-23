export const TestimonialsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="flex flex-col gap-3 border border-border bg-card p-3 sm:p-4"
        >
          <div className="flex items-center gap-3">
            <div className="size-10 shrink-0 animate-pulse bg-border" />
            <div className="flex flex-1 flex-col gap-2">
              <div className="h-3 w-24 animate-pulse bg-border" />
              <div className="h-3 w-16 animate-pulse bg-border/60" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="h-3 w-full animate-pulse bg-border/60" />
            <div className="h-3 w-full animate-pulse bg-border/60" />
            <div className="h-3 w-2/3 animate-pulse bg-border/60" />
          </div>
        </div>
      ))}
    </div>
  );
};
