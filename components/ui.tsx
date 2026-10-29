import { type ButtonHTMLAttributes, type ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={`rounded-2xl border border-line bg-white shadow-card ${className}`}>{children}</section>;
}

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
}) {
  const styles = {
    primary: "bg-brand-500 text-white shadow-sm hover:bg-brand-600",
    secondary: "border border-line bg-white text-ink hover:border-brand-100 hover:bg-brand-50",
    ghost: "text-muted hover:bg-canvas hover:text-ink",
    danger: "bg-[#fff0f1] text-coral hover:bg-[#ffe2e5]",
  };
  return (
    <button
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Badge({
  children,
  tone = "blue",
}: {
  children: ReactNode;
  tone?: "blue" | "green" | "amber" | "red" | "gray" | "purple";
}) {
  const tones = {
    blue: "bg-brand-50 text-brand-700",
    green: "bg-[#e8f8f2] text-[#26866f]",
    amber: "bg-[#fff5dd] text-[#a46f17]",
    red: "bg-[#fff0f1] text-[#c4525d]",
    gray: "bg-[#f0f2f6] text-[#687287]",
    purple: "bg-[#f3edff] text-[#7954b6]",
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ${tones[tone]}`}>{children}</span>;
}

export function Avatar({ initials, className = "" }: { initials: string; className?: string }) {
  return <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${className || "bg-brand-50 text-brand-700"}`}>{initials}</span>;
}

export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-brand-500">{eyebrow}</p>}
        <h1 className="text-[27px] font-bold tracking-[-0.03em] text-ink">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function ProgressBar({ value, color = "bg-brand-500" }: { value: number; color?: string }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-[#edf0f5]">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
    </div>
  );
}

