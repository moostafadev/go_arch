export const SocialSettingsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
      <div className="flex flex-col gap-4 border border-border bg-card p-3 sm:p-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-9 w-full animate-pulse bg-border/50" />
        ))}
        <div className="ml-auto h-9 w-32 animate-pulse bg-border" />
      </div>

      <div className="flex flex-col gap-3 border border-border bg-card p-3 sm:p-4">
        <div className="h-10 w-48 animate-pulse bg-border/50" />
        <div className="h-12 w-full animate-pulse bg-border/50" />
        <div className="h-12 w-full animate-pulse bg-border/50" />
      </div>
    </div>
  );
};
