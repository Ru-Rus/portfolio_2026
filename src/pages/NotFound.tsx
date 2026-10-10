import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 sm:py-32">
      <p className="text-sm font-medium text-foreground">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 text-muted-foreground">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <NavLink
        to="/"
        className="mt-8 inline-flex h-10 items-center justify-center rounded-md border border-neutral-700 bg-black px-5 text-sm font-semibold text-foreground transition-colors hover:border-neutral-500 hover:bg-neutral-900"
      >
        Back to Home
      </NavLink>
    </div>
  );
}