import { ArrowUpRight, PenLine, Sparkles, TrendingUp } from "lucide-react";

export default function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[590px] lg:ml-auto" aria-hidden="true">
      <div className="absolute -inset-10 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="absolute left-8 top-8 h-32 w-32 rounded-full border border-brand-400/15" />
      <div className="absolute bottom-8 right-8 h-44 w-44 rounded-full border border-white/10" />

      <div className="relative rounded-[2.25rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur">
        <div className="rounded-[1.75rem] border border-white/10 bg-[#11100f]/95 p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 rounded-3xl bg-gradient-to-br from-neutral-200 via-neutral-500 to-neutral-900 shadow-inner">
                <span className="absolute -right-1 bottom-2 h-5 w-5 rounded-full border-2 border-[#11100f] bg-brand-500 shadow-[0_0_18px_rgba(249,115,22,0.65)]" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-200">Signal</p>
                <div className="mt-3 h-3 w-44 rounded-full bg-white/18" />
                <div className="mt-2 h-2.5 w-28 rounded-full bg-white/10" />
              </div>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-400/25 bg-brand-500/10 text-brand-200">
              <Sparkles size={18} />
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.025] p-5">
            <div className="grid gap-3">
              <div className="h-3 w-full rounded-full bg-white/12" />
              <div className="h-3 w-10/12 rounded-full bg-white/10" />
              <div className="h-3 w-7/12 rounded-full bg-white/8" />
            </div>

            <div className="mt-8 flex items-end gap-2">
              {[36, 52, 44, 68, 58, 84, 74].map((height, index) => (
                <span
                  key={index}
                  className="flex-1 rounded-t-full bg-gradient-to-t from-brand-900/40 to-brand-400/85"
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <PenLine size={18} className="text-brand-300" />
              <p className="mt-3 text-xs font-semibold text-neutral-300">Voice</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <TrendingUp size={18} className="text-brand-300" />
              <p className="mt-3 text-xs font-semibold text-neutral-300">Reach</p>
            </div>
          </div>
        </div>

        <div className="absolute -right-2 top-20 max-w-[160px] rounded-2xl border border-white/10 bg-[#171311]/95 p-4 shadow-2xl shadow-black/30 backdrop-blur motion-safe:animate-float sm:-right-7">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-bold text-white">Visible</p>
            <ArrowUpRight size={16} className="text-brand-300" />
          </div>
          <div className="mt-4 flex items-end gap-1.5">
            <span className="h-5 flex-1 rounded-full bg-brand-900/70" />
            <span className="h-8 flex-1 rounded-full bg-brand-700/80" />
            <span className="h-12 flex-1 rounded-full bg-brand-500" />
          </div>
        </div>

        <div className="absolute -bottom-4 left-2 max-w-[200px] rounded-2xl border border-brand-400/20 bg-[#171311]/95 p-4 shadow-2xl shadow-black/30 backdrop-blur sm:-left-7">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-300">Ghostwritten</p>
          <p className="mt-2 text-sm font-semibold leading-5 text-white">still sounds like you.</p>
        </div>
      </div>
    </div>
  );
}
