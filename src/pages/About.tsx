export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="text-sm font-medium text-primary">About</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        From building interfaces to building the systems behind them.
      </h1>

      <div className="mt-8 space-y-6 text-base leading-relaxed text-muted-foreground">
        <p>
          I started my career building desktop applications with Windows
          Forms and tools that people relied on daily,
          which taught me a lot about how software actually behaves once
          it leaves your editor. That experience gave me an instinct for
          reliability and edge cases that I still carry into backend work
          today.
        </p>

        <p>
          My focus is backend development: designing REST and gRPC APIs,
          working across SQL
          Server and MongoDB, breaking monoliths into microservices, and
          getting hands-on with system design fundamentals like load
          balancing and horizontal scaling, all on Azure. It's the part of
          the stack I care most about: the layer nobody sees, that has to
          work anyway.
        </p>

        <p>
          I like backend work because it rewards precision. A frontend bug
          is usually visible immediately — a backend bug can hide for
          weeks before it becomes an outage. That's the kind of problem
          I enjoy thinking through: what happens under load, what happens
          when a dependency goes down, what happens at 2am when no one's
          watching.
        </p>

        <p>
          I'm still early in this specialization, and I'm deliberately
          building this portfolio to go deep rather than wide — real
          case studies, an interactive system design playground, and
          projects that reflect how I actually think through
          architecture decisions, not just a list of technologies.
        </p>
      </div>

      <div className="mt-12 rounded-lg border p-6">
        <h2 className="text-sm font-semibold">Currently</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Backend Developer, focused on APIs, microservices, and system
          design.
        </p>
      </div>
    </div>
  );
}
