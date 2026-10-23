export const ImagesSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
      {[1, 2].map((item) => (
        <div
          key={item}
          className="flex flex-col gap-3 border border-border bg-card p-3 sm:p-4"
        >
          <div className="flex flex-col gap-2">
            <div className="h-3 w-32 animate-pulse bg-border" />
            <div className="h-3 w-48 animate-pulse bg-border/60" />
          </div>
          <div className="h-36 w-full animate-pulse bg-border/50" />
        </div>
      ))}
    </div>
  );
};
