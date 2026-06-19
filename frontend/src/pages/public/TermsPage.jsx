import { useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/shared/Container.jsx";

function Section({ title, children }) {
  return <section className="border-t border-black/10 pt-8"><h2 className="text-xl font-extrabold text-ink sm:text-2xl">{title}</h2><div className="mt-3 space-y-4 text-base leading-8 text-neutral-700">{children}</div></section>;
}

export default function TermsPage() {
  useEffect(() => { document.title = "Terms - LinkGhosta"; window.scrollTo(0, 0); }, []);
  return (
    <div className="-mx-4 -mb-8 bg-white text-ink">
      <header className="border-b border-black/10 bg-surface-warm px-4 py-14 sm:py-20"><Container><div className="mx-auto max-w-4xl"><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-700">Legal</p><h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">Terms of Use</h1><p className="mt-4 max-w-2xl text-base leading-8 text-neutral-600">These terms govern your use of the LinkGhosta website and the information made available through it.</p><p className="mt-5 text-sm font-semibold text-neutral-500">Effective date: 18 June 2026</p></div></Container></header>
      <main className="px-4 py-14 sm:py-20"><Container><article className="mx-auto max-w-4xl space-y-10">
        <Section title="1. Acceptance of these terms"><p>By accessing or using this website, you agree to these Terms of Use and our <Link to="/privacy-policy" className="font-bold text-brand-700">Privacy Policy</Link>. If you do not agree, please do not use the website.</p></Section>
        <Section title="2. About the website"><p>This website provides general information about LinkGhosta, our LinkedIn ghostwriting, personal branding, profile, strategy, and training services, and examples of our work.</p><p>Website content is provided for general information and does not constitute legal, financial, investment, political, or other professional advice.</p></Section>
        <Section title="3. Enquiries and service agreements"><p>Submitting a contact form, discovery request, or email does not create a client relationship or require LinkGhosta to accept an engagement. Any paid service will be governed by a separate written proposal or agreement covering scope, fees, payment, timelines, approvals, confidentiality, intellectual property, and termination.</p></Section>
        <Section title="4. Acceptable use"><p>You must not misuse the website, attempt unauthorised access, introduce malicious code, interfere with its operation, scrape or reproduce substantial content without permission, impersonate another person, or use the website for unlawful, misleading, or abusive activity.</p></Section>
        <Section title="5. Intellectual property"><p>Unless otherwise stated, the LinkGhosta name, branding, website design, copy, articles, graphics, case-study presentation, and other original website materials belong to LinkGhosta or are used with permission.</p><p>You may view and share links to public pages for personal or business reference. You may not copy, republish, sell, modify, or commercially exploit website materials without prior written permission.</p></Section>
        <Section title="6. Client examples and results"><p>Case studies and results are provided to illustrate past work. Individual outcomes vary, and no follower growth, reach, lead generation, revenue, press, or other result is guaranteed.</p></Section>
        <Section title="7. Third-party links"><p>The website may link to LinkedIn, scheduling services, social platforms, or other third-party websites. LinkGhosta does not control those services and is not responsible for their availability, security, content, or privacy practices.</p></Section>
        <Section title="8. Availability and changes"><p>We may update, suspend, or withdraw any part of the website without notice. We aim to keep information accurate and the website available, but we do not guarantee that it will always be uninterrupted, current, or free from errors.</p></Section>
        <Section title="9. Limitation of liability"><p>To the extent permitted by law, LinkGhosta will not be liable for indirect, incidental, consequential, or business losses arising solely from use of, inability to use, or reliance on this website. Nothing in these terms excludes liability that cannot lawfully be excluded.</p></Section>
        <Section title="10. Privacy"><p>Personal information submitted through the website is handled as described in our <Link to="/privacy-policy" className="font-bold text-brand-700">Privacy Policy</Link>.</p></Section>
        <Section title="11. Governing law and jurisdiction"><p>These terms are governed by the laws of the Republic of Kenya. Subject to any mandatory dispute-resolution requirements under applicable law, the courts of Kenya will have jurisdiction over disputes relating to the website or these terms.</p></Section>
        <Section title="12. Contact"><p>Questions about these terms can be sent to <a className="font-bold text-brand-700" href="mailto:hello@linkghosta.com">hello@linkghosta.com</a>.</p></Section>
      </article></Container></main>
    </div>
  );
}
