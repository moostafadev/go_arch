export const CategoriesSkeleton = () => {
  return (
    <div className="border border-border bg-card overflow-hidden">
      <div className="border-b border-border bg-background/50 p-3 flex gap-3 sm:p-4 sm:gap-4">
        <div className="h-3 w-1/4 bg-border animate-pulse sm:h-4" />
        <div className="h-3 w-1/4 bg-border animate-pulse sm:h-4" />
        <div className="h-3 w-1/4 bg-border animate-pulse sm:h-4" />
      </div>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="border-b border-border/50 p-3 flex gap-3 items-center sm:p-4 sm:gap-4"
        >
          <div className="h-3 w-1/4 bg-border animate-pulse sm:h-4" />
          <div className="h-3 w-1/4 bg-border animate-pulse sm:h-4" />
          <div className="h-5 w-16 bg-border animate-pulse sm:h-6 sm:w-20" />
        </div>
      ))}
    </div>
  );
};
