import { Mail, Download } from "lucide-react";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

const contactLinks = [
  {
    label: "Email",
    value: "jmarquillero.r@gmail.com",
    href: "mailto:jmarquillero.r@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/Ru-Rus",
    href: "https://github.com/Ru-Rus",
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/rus-marq",
    href: "https://www.linkedin.com/in/rus-marq/",
    icon: LinkedinIcon,
  },
];

export default function Contact() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="text-sm font-medium text-primary">Contact</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        Let's talk.
      </h1>
      <p className="mt-4 text-muted-foreground">
        Reach out directly, or grab a copy of my resume below — I usually
        respond within a day.
      </p>

      <div className="mt-10 space-y-3">
        {contactLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="group flex items-center gap-4 rounded-lg border p-4 transition-colors hover:border-primary"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium">{link.label}</p>
                <p className="text-sm text-muted-foreground">{link.value}</p>
              </div>
            </a>
          );
        })}
      </div>

      <a
        href="/pdfs/resume.pdf"
        download
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 sm:w-auto"
      >
        <Download className="h-4 w-4" />
        Download Resume
      </a>
      <p className="mt-3 text-xs text-muted-foreground">
        Last updated September 2026
      </p>
    </div>
  );
}
