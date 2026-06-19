import { ArrowRight, ArrowUpRight, CalendarDays, CheckCircle2, Mail, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Container from "../../components/shared/Container.jsx";
import { serviceRequestService } from "../../services/serviceRequestService.js";
import { getErrorMessage } from "../../utils/getErrorMessage.js";

const services = [
  "LinkedIn Ghostwriting & Management",
  "Personal Brand Strategy",
  "Profile Makeover",
  "LinkedIn Training & Workshops",
  "Not sure yet"
];

const inputClass = "mt-2 w-full rounded-md border border-neutral-300 bg-white px-3 py-3 text-sm outline-none focus:border-brand-500";

export default function ContactPage() {
  const calendlyUrl = import.meta.env.VITE_CALENDLY_URL?.trim();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    serviceType: "Not sure yet",
    budgetRange: "",
    preferredContactMethod: "Email",
    message: ""
  });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.title = "Contact - LinkGhosta";
    window.scrollTo(0, 0);
  }, []);

  const field = (name) => ({
    value: form[name],
    onChange: (event) => setForm((current) => ({ ...current, [name]: event.target.value }))
  });

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    try {
      await serviceRequestService.submitServiceRequest(form);
      setDone(true);
      toast.success("Your request has been sent");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="-mx-4 -mb-8 bg-white">
      <section className="bg-ink px-4 py-16 text-white sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-400">Discovery call</p>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-6xl">Let's make LinkedIn work harder for you.</h1>
            </div>
            <p className="max-w-xl text-lg leading-8 text-white/65">Tell us what you're building and where your LinkedIn presence stands today. We'll respond with an honest recommendation.</p>
          </div>
        </Container>
      </section>

      <section className="px-4 py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.62fr_1fr]">
            <aside>
              <h2 className="text-2xl font-extrabold">What happens next</h2>
              <div className="mt-6 space-y-5">
                {["We review your goals and current presence.", "We reply within two business days.", "If there is a fit, we schedule a free 30-minute call."].map((item) => (
                  <p key={item} className="flex gap-3 text-sm leading-7 text-neutral-700"><CheckCircle2 size={20} className="mt-1 shrink-0 text-brand-600" />{item}</p>
                ))}
              </div>
              <div className="mt-8 flex flex-col items-start gap-4">
                <a href="mailto:hello@linkghosta.com" className="inline-flex items-center gap-2 text-sm font-bold text-brand-700"><Mail size={17} />hello@linkghosta.com</a>
                <a href="https://calendly.com/hello-linkghosta/30min"className="inline-flex items-center gap-2  text-sm font-bold  text-brand-700"><CalendarDays size={17} />Book on Calendly</a>
              </div>
            </aside>

            {done ? (
              <div className="flex min-h-96 flex-col items-center justify-center rounded-lg border border-brand-300 bg-brand-50 p-8 text-center">
                <MessageSquare size={40} className="text-brand-700" />
                <h2 className="mt-5 text-3xl font-extrabold">We've got it.</h2>
                <p className="mt-3 max-w-md leading-7 text-neutral-600">Thank you for reaching out. We'll review your request and get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="rounded-lg border border-black/10 bg-surface-warm p-6 sm:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="text-sm font-bold">Name<input required {...field("name")} className={inputClass} /></label>
                  <label className="text-sm font-bold">Email<input required type="email" {...field("email")} className={inputClass} /></label>
                  <label className="text-sm font-bold">Phone<input {...field("phone")} className={inputClass} /></label>
                  <label className="text-sm font-bold">Company<input {...field("company")} className={inputClass} /></label>
                  <label className="text-sm font-bold">Your role<input {...field("role")} className={inputClass} /></label>
                  <label className="text-sm font-bold">Service<select {...field("serviceType")} className={inputClass}>{services.map((service) => <option key={service}>{service}</option>)}</select></label>
                  <label className="text-sm font-bold">Budget range<select {...field("budgetRange")} className={inputClass}><option value="">Select a range</option><option>$350 - $800</option><option>$809 - $1,250/month</option><option>$1,251 - $1,799/month</option><option>$1,800+/month</option></select></label>
                  <label className="text-sm font-bold">Preferred contact<select {...field("preferredContactMethod")} className={inputClass}><option>Email</option><option>Phone</option><option>WhatsApp</option></select></label>
                  <label className="text-sm font-bold sm:col-span-2">What would you like LinkedIn to do for you?<textarea rows="5" {...field("message")} className={inputClass} /></label>
                </div>
                <button disabled={busy} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-600 px-6 py-3.5 text-sm font-extrabold text-white hover:bg-brand-700 disabled:opacity-50 sm:w-auto">{busy ? "Sending..." : "Book your discovery call"}<ArrowRight size={17} /></button>
              </form>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}
