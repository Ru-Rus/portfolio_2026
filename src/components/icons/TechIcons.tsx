import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

// --- Frontend & UI Icons ---

export function ReactIcon(props: IconProps) {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor" {...props}>
      <circle cx="0" cy="0" r="2.05" />
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export function ReactNativeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <rect x="5" y="2" width="14" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="18" r="1" />
      <g transform="translate(12, 10) scale(0.4)">
        <circle cx="0" cy="0" r="2.5" />
        <ellipse rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <ellipse rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(60)" />
        <ellipse rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export function TypeScriptIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M1.5 0h21A1.5 1.5 0 0 1 24 1.5v21a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 0 22.5v-21A1.5 1.5 0 0 1 1.5 0Zm9.47 13.9H8.16v7.7H5.69v-7.7H2.86V11.8h8.11v2.1Zm5.05 4.3c.9.52 1.94.86 3.03.86 1.07 0 1.63-.44 1.63-1.12 0-.67-.53-1.04-1.87-1.53-2.12-.76-3.35-1.7-3.35-3.33 0-2.12 1.7-3.5 4.2-3.5 1.25 0 2.37.3 3.19.78l-.75 2c-.67-.39-1.54-.66-2.46-.66-1.03 0-1.63.48-1.63 1.07 0 .67.57 1 1.98 1.52 2.18.8 3.25 1.77 3.25 3.39 0 2.14-1.66 3.59-4.44 3.59-1.48 0-2.76-.41-3.6-1l.82-1.97Z" />
    </svg>
  );
}

export function JavaScriptIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M0 0h24v24H0V0Zm11.87 17.5c0 2.27-1.34 3.4-3.4 3.4-1.74 0-2.8-.87-3.33-1.87l1.73-1.07c.36.63.78 1.04 1.53 1.04.75 0 1.27-.3 1.27-1.34v-6.9h2.2v6.74Zm5.35.1c.7.4 1.57.73 2.53.73 1.13 0 1.76-.52 1.76-1.25 0-.74-.53-1.13-1.77-1.65-2.03-.84-3.23-1.84-3.23-3.47 0-2 1.6-3.39 3.96-3.39 1.3 0 2.29.35 2.97.77l-.76 1.77c-.5-.33-1.23-.62-2.19-.62-1 0-1.68.5-1.68 1.15 0 .67.55 1 1.83 1.53 2.14.9 3.2 1.93 3.2 3.63 0 2.14-1.67 3.51-4.26 3.51-1.46 0-2.67-.44-3.44-1.02l1.08-1.89Z" />
    </svg>
  );
}

export function TailwindIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
    </svg>
  );
}

export function AngularIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0L1.6 3.71 3.2 16.5 12 24l8.8-7.5 1.6-12.79L12 0zm0 3.32l5.77 12.92h-2.15l-1.18-2.95H9.56l-1.18 2.95H6.23L12 3.32zm1.7 8.35L12 7.64l-1.7 4.03h3.4z" />
    </svg>
  );
}

export function NextJsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0a12 12 0 1 0 12 12A12.013 12.013 0 0 0 12 0Zm5.4 17.76-6.66-8.52V18H8.76V6.24h2.22l6.66 8.52V6.24h1.98v11.52Z" />
    </svg>
  );
}

export function NodeJsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm0 3.1l8 4.62v9.24l-8 4.62-8-4.62V7.72l8-4.62zm-1.2 5.5v2.4h2.4v1.2h-2.4v2.4h2.4v1.2H9.6V8.6h2.4v1.2h-1.2z" />
    </svg>
  );
}

export function BootstrapIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <rect width="24" height="24" rx="5" />
      <path d="M7 6h5.2c2.2 0 3.8 1.1 3.8 2.8 0 1.2-.8 2.2-2 2.6 1.5.4 2.5 1.6 2.5 3 0 2-1.7 3.6-4.1 3.6H7V6zm3 4.2h2c.8 0 1.4-.4 1.4-1.1 0-.7-.6-1.1-1.4-1.1H10v2.2zm0 5.6h2.4c1 0 1.6-.5 1.6-1.3 0-.8-.7-1.3-1.6-1.3H10v2.6z" fill="#fff" />
    </svg>
  );
}

export function JqueryIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M11.95 0C5.35 0 0 5.35 0 11.95S5.35 24 11.95 24 24 18.55 24 11.95 18.55 0 11.95 0zm6.3 7.85c-.4 1.4-1.2 2.4-2.4 3.1 1.4.3 2.5 1.1 3.1 2.3-.8.2-1.7.3-2.6.2-1.2-.2-2.1-.8-2.7-1.7-.8 1.5-2.2 2.4-3.9 2.5-2.5.1-4.6-1.8-4.7-4.3-.1-2.5 1.8-4.6 4.3-4.7 1.8-.1 3.3.8 4.1 2.2.6-.6 1.4-1 2.3-1.2.9-.2 1.7-.1 2.5.2v1.4z" />
    </svg>
  );
}

export function HtmlIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm16.9 6.2H5.6l.4 4.5h11.9l-.5 5.5-5.4 1.5-5.4-1.5-.3-3.2H4.1l.5 5.2 7.4 2.1 7.4-2.1 1-12z" />
    </svg>
  );
}

export function CssIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm16.9 6.2H5.6l.4 4.5h8.2l-.4 4.5-3.8 1-3.8-1-.2-2.3H3.9l.4 4.3 7.7 2.1 7.7-2.1 1-11.5-.3-1h-2z" />
    </svg>
  );
}

export function DevExpressIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <rect x="2" y="4" width="20" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M6 8h3c1.7 0 3 1.3 3 3s-1.3 3-3 3H6V8zm5 8l4-8m-1 8l4-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// --- Backend, APIs & Architecture Icons ---

export function CSharpIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm-1.8 16.5c-2.7 0-4.5-1.9-4.5-4.5s1.8-4.5 4.5-4.5c1.5 0 2.8.6 3.6 1.7l-1.6 1.2c-.5-.7-1.2-1-2-1-1.5 0-2.5 1.1-2.5 2.6s1 2.6 2.5 2.6c.8 0 1.5-.3 2-1l1.6 1.2c-.8 1.1-2.1 1.7-3.6 1.7zm8.3-4.8h-.8v-.8h.8v-.9h.8v.9h.9v.8h-.9v.8h.9v.8h-.9v.9h-.8v-.9h-.8v.9h-.8v-.9h-.9v-.8h.9v-.8h-.9v-.8h.9v-.9h.8v.9h.8v.8zm-.8.8h.8v-.8h-.8v.8z" />
    </svg>
  );
}

export function DotNetIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <circle cx="4" cy="18" r="2.5" />
      <path d="M9.5 5.5v13h2.8l5.2-7.8v7.8h2.8v-13h-2.8L12.3 13V5.5H9.5z" />
    </svg>
  );
}

export function WindowsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M0 3.45L9.82 2.1v9.23H0V3.45zm0 8.64h9.82v9.23L0 20.02V12.09zm10.9-10.15L24 0v11.33h-13.1V1.94zM24 12.09V24l-13.1-1.85V12.09H24z" />
    </svg>
  );
}

export function MvcIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

export function PythonIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M11.927 0C6.012 0 6.368 2.56 6.368 2.56l.006 2.651h5.64v.8H4.074S0 5.556 0 11.517s3.551 5.753 3.551 5.753h2.12v-2.973s-.118-3.551 3.492-3.551h5.58v-.827S15.2 6.09 15.2 2.62 12.927 0 11.927 0zm-2.07 1.545a.96.96 0 1 1 0 1.92.96.96 0 0 1 0-1.92zm2.216 22.455c5.915 0 5.559-2.56 5.559-2.56l-.006-2.651h-5.64v-.8h7.94s4.074.455 4.074-5.506-3.551-5.753-3.551-5.753h-2.12v2.973s.118 3.551-3.492 3.551h-5.58v.827s-.457 3.827-.457 7.297 2.273 2.62 3.273 2.62zm2.07-1.545a.96.96 0 1 1 0-1.92.96.96 0 0 1 0 1.92z" />
    </svg>
  );
}

export function FastApiIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.75 4.5l5.25 7.5h-4.5v7.5l-5.25-7.5h4.5V4.5z" />
    </svg>
  );
}

export function RestApiIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 12h16M14 6l6 6-6 6M10 18l-6-6 6-6" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  );
}

export function GrpcIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.4l7.6 3.8v7.6L12 19.6 4.4 15.8V8.2L12 4.4zm-2 5.2h4v1.6h-4v-1.6zm0 3.2h4v1.6h-4v-1.6z" />
    </svg>
  );
}

export function LoadBalancingIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="9" y="2" width="6" height="5" rx="1" fill="currentColor" fillOpacity="0.2" />
      <rect x="2" y="17" width="5" height="5" rx="1" fill="currentColor" fillOpacity="0.2" />
      <rect x="9.5" y="17" width="5" height="5" rx="1" fill="currentColor" fillOpacity="0.2" />
      <rect x="17" y="17" width="5" height="5" rx="1" fill="currentColor" fillOpacity="0.2" />
      <path d="M12 7v5M12 12l-7.5 5M12 12v5M12 12l7.5 5" />
    </svg>
  );
}

export function SystemDesignIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor" fillOpacity="0.15" />
      <rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor" fillOpacity="0.15" />
      <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor" fillOpacity="0.15" />
      <rect x="14" y="14" width="7" height="7" rx="1" fill="currentColor" fillOpacity="0.15" />
      <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4" />
    </svg>
  );
}

export function MicroservicesIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <circle cx="4" cy="6" r="2.5" />
      <circle cx="20" cy="6" r="2.5" />
      <circle cx="4" cy="18" r="2.5" />
      <circle cx="20" cy="18" r="2.5" />
      <path d="M6 7.5l4 3M18 7.5l-4 3M6 16.5l4-3M18 16.5l-4-3" />
    </svg>
  );
}

export function SwaggerIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <text x="12" y="16" fontSize="12" fontWeight="bold" textAnchor="middle" fill="currentColor">
        {"{}"}
      </text>
    </svg>
  );
}

export function XUnitIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

// --- Database, Messaging & Cloud Icons ---

export function SqlServerIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4zm0 2c4.42 0 8 1.34 8 2s-3.58 2-8 2-8-1.34-8-2 3.58-2 8-2zm0 6c4.42 0 8 1.34 8 2s-3.58 2-8 2-8-1.34-8-2 3.58-2 8-2zm0 6c4.42 0 8 1.34 8 2s-3.58 2-8 2-8-1.34-8-2 3.58-2 8-2z" />
    </svg>
  );
}

export function MySqlIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 3C6.5 3 2 7.5 2 13c0 2.2.7 4.3 2 6l1.5-1.5C4.6 16.2 4 14.7 4 13c0-4.4 3.6-8 8-8s8 3.6 8 8c0 1.7-.6 3.2-1.5 4.5L20 19c1.3-1.7 2-3.8 2-6 0-5.5-4.5-10-10-10zm-1 6v5h2V9h-2zm-3 2v3h2v-3H8zm6 0v3h2v-3h-2z" />
    </svg>
  );
}

export function PostgreSqlIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2a9.98 9.98 0 0 0-7.3 3.16C3.2 6.74 2.3 8.87 2.1 11.2c-.4 4.8 2.8 9.2 7.5 10.3 1.2.3 2.5.4 3.7.2 4.4-.6 8.1-4 8.6-8.5.5-4.6-2.3-8.9-6.7-10.4C14.1 2.3 13 2 12 2zm0 3.5c2.6 0 4.8 1.8 5.4 4.3.4 1.7-.1 3.5-1.3 4.7-.8.8-1.8 1.4-2.9 1.6l-.3-2.1c.6-.2 1.2-.5 1.6-1 .7-.7 1-1.7.7-2.6-.4-1.6-1.8-2.7-3.4-2.7-1.4 0-2.6.9-3.1 2.2-.3.9-.2 1.9.4 2.7.4.5.9.9 1.5 1.1l-.6 2c-1.1-.4-2-.9-2.7-1.7-1.1-1.3-1.5-3.1-1-4.7.7-2.2 2.7-3.7 5.1-3.7z" />
    </svg>
  );
}

export function MongoDbIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0S6 5.5 6 12.5c0 4.8 3.5 8.7 6 11.5 2.5-2.8 6-6.7 6-11.5C18 5.5 12 0 12 0zm.4 21.6v-7.2h-.8v7.2c-1.8-2-4.1-4.9-4.1-8.6 0-3.8 3.1-7.7 4.5-9.6 1.4 1.9 4.5 5.8 4.5 9.6 0 3.7-2.3 6.6-4.1 8.6z" />
    </svg>
  );
}

export function SupabaseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.36 15.35c-.46-.72-1.3-.92-2-.52l-5.69 3.25V4.65c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v9.85L5.03 11.4c-.73-.42-1.66-.17-2.08.56-.42.73-.17 1.66.56 2.08l10.32 5.9c.47.27 1.05.27 1.52 0l5.48-3.13c.7-.4.9-1.29.53-1.46z" />
    </svg>
  );
}

export function RedisIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0L2 5v14l10 5 10-5V5L12 0zm0 2.5l7.5 3.75L12 10 4.5 6.25 12 2.5zM4 8.25l7 3.5v7.5l-7-3.5V8.25zm16 0v7.5l-7 3.5v-7.5l7-3.5z" />
    </svg>
  );
}

export function KafkaIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <circle cx="12" cy="4" r="2.5" />
      <circle cx="5" cy="9" r="2.5" />
      <circle cx="19" cy="9" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M10 5.5l-3.5 2M14 5.5l3.5 2M6.5 11l4 5M17.5 11l-4 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function NginxIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm0 2.6l8.4 4.8v9.6L12 21.8 3.6 17V7.4L12 2.6zm-3.6 5.4v8h2.4l4.8-5.6v5.6h2.4V8h-2.4L10.8 13.6V8H8.4z" />
    </svg>
  );
}

export function AzureIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.05 1.5L6.6 14.4l4.95 5.7L18.45 1.5h-5.4zM5.55 16.5l-4.05 4.5h8.1l-1.95-4.5H5.55zM13.65 8.7l-4.5 9 2.4 2.4h9.9l-7.8-11.4z" />
    </svg>
  );
}

export function GitIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.5 10.9L13.1.5c-.6-.6-1.6-.6-2.2 0l-2.2 2.2 2.8 2.8c.6-.2 1.4 0 1.9.5.5.5.7 1.3.5 1.9l2.7 2.7c.6-.2 1.4 0 1.9.5.8.8.8 2.1 0 2.8s-2.1.8-2.8 0c-.6-.6-.7-1.5-.4-2.2L12.7 6.1v6.7c.2.1.4.3.6.5.8.8.8 2.1 0 2.8s-2.1.8-2.8 0c-.8-.8-.8-2.1 0-2.8.2-.2.4-.4.6-.5V6c-.2-.1-.4-.3-.6-.5-.6-.6-.7-1.5-.4-2.2L7.3.5.5 7.3c-.6.6-.6 1.6 0 2.2l10.4 10.4c.6.6 1.6.6 2.2 0l10.4-10.4c.6-.6.6-1.6 0-2.2z" />
    </svg>
  );
}

export function PostmanIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.2 2.3l-8.4 4.8c-.8.5-1.3 1.3-1.3 2.2v9.6c0 .9.5 1.7 1.3 2.2l8.4 4.8c.8.5 1.8.5 2.6 0l8.4-4.8c.8-.5 1.3-1.3 1.3-2.2V9.3c0-.9-.5-1.7-1.3-2.2l-8.4-4.8c-.8-.4-1.9-.4-2.6 0zm-1.2 5.5l5.5 3.2-5.5 3.2-5.5-3.2 5.5-3.2zm-6 4.7l5 2.9v5.8l-5-2.9v-5.8zm12 0v5.8l-5 2.9v-5.8l5-2.9z" />
    </svg>
  );
}

// Map tech name to matching icon component (case-insensitive lookup helper included)
// oxlint-disable-next-line react/only-export-components
export const techIconMap: Record<string, (props: IconProps) => import("react").JSX.Element> = {
  // Frontend
  React: ReactIcon,
  react: ReactIcon,
  "React Native": ReactNativeIcon,
  "react native": ReactNativeIcon,
  TypeScript: TypeScriptIcon,
  typescript: TypeScriptIcon,
  JavaScript: JavaScriptIcon,
  javascript: JavaScriptIcon,
  "Tailwind CSS": TailwindIcon,
  tailwind: TailwindIcon,
  "tailwind css": TailwindIcon,
  Angular: AngularIcon,
  angular: AngularIcon,
  "Next.js": NextJsIcon,
  "next.js": NextJsIcon,
  "Node.js": NodeJsIcon,
  "node.js": NodeJsIcon,
  HTML: HtmlIcon,
  HTML5: HtmlIcon,
  CSS: CssIcon,
  CSS3: CssIcon,
  Bootstrap: BootstrapIcon,
  bootstrap: BootstrapIcon,
  jQuery: JqueryIcon,
  jquery: JqueryIcon,
  DevExpress: DevExpressIcon,
  devexpress: DevExpressIcon,

  // Backend & Languages
  "C#": CSharpIcon,
  csharp: CSharpIcon,
  "Windows Forms": WindowsIcon,
  "windows forms": WindowsIcon,
  "ASP.NET": DotNetIcon,
  "asp.net": DotNetIcon,
  ".NET": DotNetIcon,
  MVC: MvcIcon,
  mvc: MvcIcon,
  Python: PythonIcon,
  python: PythonIcon,
  FastAPI: FastApiIcon,
  fastapi: FastApiIcon,
  "Python / FastAPI": FastApiIcon,
  "REST APIs": RestApiIcon,
  "rest apis": RestApiIcon,
  REST: RestApiIcon,
  "REST API": RestApiIcon,
  gRPC: GrpcIcon,
  grpc: GrpcIcon,
  Swagger: SwaggerIcon,
  swagger: SwaggerIcon,
  xUnit: XUnitIcon,
  xunit: XUnitIcon,

  // Architecture & Concepts
  "Load Balancing": LoadBalancingIcon,
  "load balancing": LoadBalancingIcon,
  "System Design": SystemDesignIcon,
  "system design": SystemDesignIcon,
  Microservices: MicroservicesIcon,
  microservices: MicroservicesIcon,

  // Databases & Storage
  MySQL: MySqlIcon,
  mysql: MySqlIcon,
  "SQL Server": SqlServerIcon,
  "sql server": SqlServerIcon,
  SQL: SqlServerIcon,
  PostgreSQL: PostgreSqlIcon,
  postgresql: PostgreSqlIcon,
  MongoDB: MongoDbIcon,
  mongodb: MongoDbIcon,
  Redis: RedisIcon,
  redis: RedisIcon,
  Supabase: SupabaseIcon,
  supabase: SupabaseIcon,

  // Cloud & DevOps
  "Apache Kafka": KafkaIcon,
  "apache kafka": KafkaIcon,
  Kafka: KafkaIcon,
  kafka: KafkaIcon,
  Nginx: NginxIcon,
  nginx: NginxIcon,
  NGINX: NginxIcon,
  Azure: AzureIcon,
  azure: AzureIcon,
  Git: GitIcon,
  git: GitIcon,
  "Git / GitHub": GitIcon,
  GitHub: GitIcon,
  Postman: PostmanIcon,
  postman: PostmanIcon,
};

export function TechIcon({
  name,
  className = "h-5 w-5",
}: {
  name: string;
  className?: string;
}) {
  const Icon = techIconMap[name] || techIconMap[name.toLowerCase()];
  if (!Icon) return null;
  return <Icon className={className} aria-hidden="true" />;
}
