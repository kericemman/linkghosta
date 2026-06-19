import { useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/shared/Container.jsx";

function Section({ title, children }) {
  return <section className="border-t border-black/10 pt-8"><h2 className="text-xl font-extrabold text-ink sm:text-2xl">{title}</h2><div className="mt-3 space-y-4 text-base leading-8 text-neutral-700">{children}</div></section>;
}

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="-mx-4 -mb-8 bg-white text-ink">
      <header className="border-b border-black/10 bg-surface-warm px-4 py-14 sm:py-20"><Container><div className="mx-auto max-w-4xl"><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-700">Legal</p><h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">Privacy Policy</h1><p className="mt-4 max-w-2xl text-base leading-8 text-neutral-600">This policy explains what personal information LinkGhosta collects, why we use it, and the choices available to you.</p><p className="mt-5 text-sm font-semibold text-neutral-500">Effective date: 18 June 2026</p></div></Container></header>
      <main className="px-4 py-14 sm:py-20"><Container><article className="mx-auto max-w-4xl space-y-10">
        <Section title="1. Who we are"><p>LinkGhosta is a LinkedIn personal branding and ghostwriting agency based in Nairobi, Kenya. For questions about this policy or our handling of personal data, contact us at <a className="font-bold text-brand-700" href="mailto:hello@linkghosta.com">hello@linkghosta.com</a>.</p></Section>
        <Section title="2. Information we collect"><p>When you use our contact or discovery forms, we may collect your name, email address, telephone number, company or organisation, role, preferred contact method, service interests, budget range, and any information included in your message.</p><p>When you subscribe to LinkGhosta Insights, we collect your email address, subscription status, and subscription date. We may also receive basic technical information needed to operate and secure the website, such as IP address, browser type, device information, requested pages, and submission timestamps.</p></Section>
        <Section title="3. How we use your information"><p>We use personal information to respond to enquiries, assess whether our services are a suitable fit, arrange discovery calls, prepare proposals, provide requested services, maintain business records, prevent misuse, and improve the website and client experience.</p><p>If you subscribe to LinkGhosta Insights, we use your email address to notify you when a new article is published. Every article email includes an unsubscribe link, and you may withdraw your subscription at any time.</p><p>We process information only for legitimate, specified purposes and limit collection to what is reasonably necessary for those purposes.</p></Section>
        <Section title="4. Storage, security, and retention"><p>Form submissions are stored in our secured website database and may also be delivered to authorised LinkGhosta administrators by email. We use reasonable administrative and technical safeguards designed to protect information against unauthorised access, alteration, disclosure, or loss.</p><p>We retain enquiry information only for as long as reasonably needed to respond, maintain business and legal records, or establish and defend legal claims. Data may be processed by trusted hosting, database, cloud-storage, and email-delivery providers acting on our behalf.</p></Section>
        <Section title="5. Sharing and sale of data"><p>We do not sell, rent, or trade personal information to third parties. We may share limited information with service providers that help us operate the website and deliver our services, where they are required to protect it and use it only for the agreed purpose.</p><p>We may also disclose information where required by law, a court order, or a lawful request from a competent authority.</p></Section>
        <Section title="6. Cookies and analytics"><p>The website may use essential cookies required for security, authentication, and basic operation. We do not currently use non-essential advertising or analytics cookies.</p><p>If analytics tools are introduced, this policy and any relevant cookie notice will be updated to explain the provider, information collected, purpose, retention period, and available consent or opt-out controls.</p></Section>
        <Section title="7. International processing"><p>Some technology providers may process information outside Kenya. Where this occurs, we take reasonable steps to use providers and safeguards that offer an appropriate level of data protection, consistent with applicable Kenyan law.</p></Section>
        <Section title="8. Your rights and deletion requests"><p>Subject to applicable law, you may ask to access, correct, object to the processing of, or request deletion of personal information held about you. To make a request, email <a className="font-bold text-brand-700" href="mailto:hello@linkghosta.com?subject=Data%20privacy%20request">hello@linkghosta.com</a> with the subject “Data privacy request”.</p><p>We may request information needed to verify your identity before acting on a request. Certain information may be retained where required by law or needed for legitimate legal and business records.</p></Section>
        <Section title="9. Changes to this policy"><p>We may update this policy when our practices, services, or legal obligations change. The effective date at the top of this page will show when the latest version took effect.</p></Section>
        <Section title="10. Applicable law"><p>This policy is governed by the laws of the Republic of Kenya, including the Data Protection Act, 2019, as amended or replaced from time to time.</p></Section>
        <p className="rounded-lg bg-brand-50 p-5 text-sm leading-7 text-neutral-700">Please also review our <Link to="/terms" className="font-extrabold text-brand-700">Terms of Use</Link>.</p>
      </article></Container></main>
    </div>
  );
}
