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
        "flex flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/85 shadow-[0_8px_32px_rgba(15,23,42,0.07),0_1px_2px_rgba(15,23,42,0.04)]",
        "backdrop-blur-sm ring-1 ring-slate-900/[0.03]",
        className,
      ].join(" ")}
    >
      {(title || subtitle) && (
        <div className="shrink-0 border-b border-slate-100 px-5 py-4">
          {title ? <h2 className="text-[15px] font-semibold tracking-tight text-slate-900">{title}</h2> : null}
          {subtitle ? <p className="mt-0.5 text-xs leading-5 text-slate-400">{subtitle}</p> : null}
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 pt-4">{children}</div>
    </section>
  );
}
