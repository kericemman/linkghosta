import { Clock, FileText, PenLine } from "lucide-react";
import Container from "../../../shared/Container.jsx";

export default function ProblemSection() {
  return (
    <section className="-mx-4 bg-surface-warm py-10 text-ink sm:py-20 lg:py-20">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-7xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-700">The problem</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            LinkedIn rewards the consistent. It ignores everyone else.
          </h2>

          <div className="mt-7 space-y-5 text-base leading-8 text-neutral-700 sm:text-lg">
            <p>
              You know you need to be on LinkedIn. You know your ideas are worth hearing, your work is worth seeing, and
              your name is worth knowing. But between running your business, leading your team, and actually doing the
              work, sitting down to write a post that sounds like you, performs well, and lands with the right people
              never quite makes it to the top of the list.
            </p>
            <p className="font-extrabold text-ink">And it won't.</p>
            <p>
              Not because you lack the discipline. Because you lack the time. That's not a character flaw. That's a
              resource problem. And it has a solution.
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-7xl">
          <div className="absolute -inset-5 rounded-[2rem] bg-brand-500/10 blur-3xl" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[2rem] border border-brand-500/15 bg-white shadow-[0_24px_70px_rgba(124,45,18,0.12)]">
            <div className="relative h-64 overflow-hidden sm:h-80 lg:h-[390px]">
              <img
                src="/assets/problem-stressed-businessman.jpg"
                alt="Overwhelmed professional facing laptop workload pressure"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink/45 via-brand-900/10 to-brand-500/25" aria-hidden="true" />
              <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-white/90 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-brand-700 shadow-lg backdrop-blur">
                Resource problem
              </div>
            </div>

            <div className="grid gap-3 p-5 sm:grid-cols-3 sm:p-6">
              <div className="rounded-2xl border border-ink/10 bg-surface-warm p-4">
                <Clock className="text-brand-600" size={22} aria-hidden="true" />
                <p className="mt-3 text-sm font-extrabold text-ink">No time</p>
                <p className="mt-1 text-sm leading-6 text-neutral-600">The ideas exist. The calendar wins.</p>
              </div>
              <div className="rounded-2xl border border-ink/10 bg-surface-warm p-4">
                <PenLine className="text-brand-600" size={22} aria-hidden="true" />
                <p className="mt-3 text-sm font-extrabold text-ink">Hard to write</p>
                <p className="mt-1 text-sm leading-6 text-neutral-600">The post has to sound like you.</p>
              </div>
              <div className="rounded-2xl border border-ink/10 bg-surface-warm p-4">
                <FileText className="text-brand-600" size={22} aria-hidden="true" />
                <p className="mt-3 text-sm font-extrabold text-ink">Easy to delay</p>
                <p className="mt-1 text-sm leading-6 text-neutral-600">Consistency becomes the casualty.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
