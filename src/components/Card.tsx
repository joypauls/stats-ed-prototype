import { ReactNode } from "react";

type Props = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

export default function Card({ title, subtitle, children, className = "" }: Props) {
  return (
    <section
      className={[
        "rounded-3xl border border-white/60 bg-white/80 shadow-[0_12px_40px_rgba(15,23,42,0.08)]",
        "backdrop-blur-sm",
        className,
      ].join(" ")}
    >
      {(title || subtitle) && (
        <div className="border-b border-slate-200/70 px-5 py-4">
          {title ? <h2 className="text-base font-semibold tracking-tight text-slate-900">{title}</h2> : null}
          {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
        </div>
      )}

      <div className="p-4">{children}</div>
    </section>
  );
}
