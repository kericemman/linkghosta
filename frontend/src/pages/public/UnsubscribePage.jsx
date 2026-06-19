import { Check } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../../components/shared/Container.jsx";
import { subscriberService } from "../../services/subscriberService.js";
import { getErrorMessage } from "../../utils/getErrorMessage.js";

export default function UnsubscribePage() {
  const { token } = useParams();
  const [state, setState] = useState("idle");
  const [message, setMessage] = useState("");

  async function unsubscribe() {
    setState("loading");
    try {
      const { data } = await subscriberService.unsubscribe(token);
      setMessage(data.message);
      setState("success");
    } catch (error) {
      setMessage(getErrorMessage(error));
      setState("error");
    }
  }

  return (
    <section className="-mx-4 -mb-8 bg-surface-warm px-4 py-20 sm:py-28">
      <Container className="max-w-2xl text-center">
        {state === "success" ? <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white"><Check size={22} /></span> : <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-700">Email preferences</p>}
        <h1 className="mt-5 text-4xl font-extrabold sm:text-5xl">{state === "success" ? "You are unsubscribed." : "Leave LinkGhosta Insights?"}</h1>
        <p className="mx-auto mt-5 max-w-xl leading-7 text-neutral-600">{message || "You will stop receiving new article emails. You can subscribe again from any article whenever you are ready."}</p>
        {state !== "success" && <button onClick={unsubscribe} disabled={state === "loading"} className="mt-8 rounded-md bg-ink px-6 py-3 text-sm font-extrabold text-white disabled:opacity-60">{state === "loading" ? "Updating..." : "Unsubscribe"}</button>}
        <Link to="/insights" className="mt-6 block text-sm font-bold text-brand-700">Return to Insights</Link>
      </Container>
    </section>
  );
}
