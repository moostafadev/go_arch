export const SeoSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-9 w-24 animate-pulse bg-border" />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-4 border border-border bg-card p-3 sm:p-4">
          <div className="h-8 w-full animate-pulse bg-border/50" />
          <div className="h-20 w-full animate-pulse bg-border/50" />
          <div className="h-8 w-full animate-pulse bg-border/50" />
          <div className="h-36 w-full animate-pulse bg-border/50" />
        </div>

        <div className="flex flex-col gap-4 border border-border bg-card p-3 sm:p-4">
          <div className="h-24 w-full animate-pulse bg-border/50" />
          <div className="aspect-[1.91/1] w-full animate-pulse bg-border/50" />
        </div>
      </div>
    </div>
  );
};
