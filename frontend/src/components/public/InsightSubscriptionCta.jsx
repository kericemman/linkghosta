import { ArrowRight, Check, Mail } from "lucide-react";
import { useState } from "react";
import { subscriberService } from "../../services/subscriberService.js";
import { getErrorMessage } from "../../utils/getErrorMessage.js";

export default function InsightSubscriptionCta() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");
  const [message, setMessage] = useState("");

  async function submit(event) {
    event.preventDefault();
    setState("loading");
    setMessage("");
    try {
      const { data } = await subscriberService.subscribe({ email, source: "article" });
      setState("success");
      setMessage(data.message);
      setEmail("");
    } catch (error) {
      setState("error");
      setMessage(getErrorMessage(error));
    }
  }

  return (
    <section className="overflow-hidden bg-ink text-white">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-white/10 px-6 py-10 sm:px-10 sm:py-12 lg:border-b-0 lg:border-r lg:px-12 lg:py-14">
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-600 text-white"><Mail size={20} /></span>
          <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.14em] text-brand-400">LinkGhosta Insights</p>
          <h2 className="mt-3 max-w-xl text-3xl font-extrabold leading-tight sm:text-4xl">Ideas worth showing up for.</h2>
        </div>
        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
          <p className="max-w-xl text-base leading-7 text-neutral-300">Get practical thinking on LinkedIn, authority, and personal branding when a new article goes live.</p>
          {state === "success" ? (
            <div className="mt-6 flex items-center gap-3 text-sm font-bold text-white"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600"><Check size={17} /></span>{message}</div>
          ) : (
            <form onSubmit={submit} className="mt-6 flex max-w-xl flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="insight-subscription-email">Email address</label>
              <input id="insight-subscription-email" required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" className="min-h-12 min-w-0 flex-1 rounded-md border border-white/20 bg-white px-4 text-sm text-ink outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30" />
              <button disabled={state === "loading"} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-brand-600 px-5 text-sm font-extrabold text-white transition hover:bg-brand-500 disabled:cursor-wait disabled:opacity-70">{state === "loading" ? "Joining..." : "Subscribe"}<ArrowRight size={17} /></button>
            </form>
          )}
          {state === "error" && <p className="mt-3 text-sm font-semibold text-red-300" role="alert">{message}</p>}
          <p className="mt-3 text-xs leading-5 text-neutral-500">No noise. Unsubscribe whenever you like.</p>
        </div>
      </div>
    </section>
  );
}
