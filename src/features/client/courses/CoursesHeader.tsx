export const CoursesHeader = () => {
  return (
    <section className="relative overflow-hidden border-b border-border bg-card py-16 pt-28 lg:py-24 lg:pt-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-accent/50 to-transparent" />
        <div className="absolute inset-0 bg-arch-grid-fade" />
        <div className="absolute left-1/2 top-0 h-75 w-150 -translate-x-1/2 bg-accent/10 blur-[100px] animate-[float-glow_12s_ease-in-out_infinite_alternate]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h1
          className="mb-4 text-4xl font-black uppercase tracking-tight text-foreground sm:text-5xl lg:text-6xl animate-[hero-fade-up_0.5s_cubic-bezier(0.22,1,0.36,1)_both]"
          style={{ animationDelay: "0.05s" }}
        >
          Explore Our <span className="text-accent-text">Courses</span>
        </h1>

        <p
          className="mx-auto max-w-2xl text-base text-foreground-second lg:text-lg animate-[hero-fade-up_0.5s_cubic-bezier(0.22,1,0.36,1)_both]"
          style={{ animationDelay: "0.15s" }}
        >
          Choose your path. Whether you want to master a single tool or become a
          complete professional architect, we have the right program for you.
        </p>
      </div>
    </section>
  );
};
