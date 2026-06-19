import resend from "../config/resend.js";

const brand = {
  orange: "#ea580c",
  orangeLight: "#fff7ed",
  ink: "#0b0b0b",
  muted: "#666666",
  border: "#e5e5e5"
};

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function emailShell({ eyebrow, title, intro, content, button }) {
  const buttonMarkup = button
    ? `<tr><td style="padding:8px 40px 40px"><a href="${escapeHtml(button.href)}" style="display:inline-block;background:${brand.orange};color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:13px 20px;border-radius:6px">${escapeHtml(button.label)}</a></td></tr>`
    : "";

  return `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
  <body style="margin:0;background:#f6f6f4;font-family:Arial,Helvetica,sans-serif;color:${brand.ink}">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f6f4;padding:28px 12px">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid ${brand.border};border-radius:8px;overflow:hidden">
          <tr><td style="background:${brand.ink};padding:24px 40px"><div style="font-size:20px;font-weight:800;color:#ffffff">Link<span style="color:#fb923c">Ghosta</span></div></td></tr>
          <tr><td style="padding:40px 40px 12px"><div style="font-size:12px;line-height:18px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:${brand.orange}">${escapeHtml(eyebrow)}</div><h1 style="margin:10px 0 0;font-size:30px;line-height:38px;color:${brand.ink}">${escapeHtml(title)}</h1></td></tr>
          <tr><td style="padding:0 40px 24px"><p style="margin:0;font-size:16px;line-height:27px;color:${brand.muted}">${escapeHtml(intro)}</p></td></tr>
          <tr><td style="padding:0 40px 30px">${content}</td></tr>
          ${buttonMarkup}
          <tr><td style="border-top:1px solid ${brand.border};padding:22px 40px;font-size:12px;line-height:20px;color:#888888">LinkGhosta &middot; LinkedIn personal branding for leaders who are too busy building to explain themselves.</td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

function detailRows(details) {
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid ${brand.border};border-radius:6px;overflow:hidden">
    ${details.filter(([, value]) => value).map(([label, value], index) => `<tr><td style="width:34%;padding:12px 14px;background:${index % 2 ? "#ffffff" : brand.orangeLight};border-bottom:1px solid ${brand.border};font-size:12px;font-weight:700;text-transform:uppercase;color:#777777">${escapeHtml(label)}</td><td style="padding:12px 14px;background:${index % 2 ? "#ffffff" : brand.orangeLight};border-bottom:1px solid ${brand.border};font-size:14px;line-height:22px;color:${brand.ink};white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join("")}
  </table>`;
}

async function sendEmail(payload) {
  if (!resend) {
    if (process.env.NODE_ENV !== "test") console.warn("RESEND_API_KEY is not configured; email delivery skipped.");
    return { skipped: true };
  }
  const result = await resend.emails.send(payload);
  if (result.error) throw new Error(result.error.message || "Email delivery failed");
  return result.data;
}

function addresses() {
  return {
    from: process.env.EMAIL_FROM || "LinkGhosta <no-reply@onboarding.linkghosta.com>",
    admin: process.env.INQUIRY_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL
  };
}

async function deliverPair({ adminEmail, userEmail }) {
  const deliveries = await Promise.allSettled([sendEmail(adminEmail), sendEmail(userEmail)]);
  deliveries.forEach((delivery) => {
    if (delivery.status === "rejected") console.error("LinkGhosta email delivery failed:", delivery.reason?.message || delivery.reason);
  });
  return deliveries;
}

export async function sendContactInquiryEmails(inquiry) {
  const { from, admin } = addresses();
  if (!admin) {
    console.warn("ADMIN_EMAIL or INQUIRY_NOTIFICATION_EMAIL is required for admin notifications.");
  }
  const dashboardUrl = `${process.env.CLIENT_URL || "http://localhost:5174"}/admin/inquiries/${inquiry._id}`;
  const adminContent = detailRows([["Name", inquiry.name], ["Email", inquiry.email], ["Company", inquiry.company], ["Role", inquiry.role], ["Subject", inquiry.subject], ["Message", inquiry.message]]);
  const userContent = `<div style="padding:18px;background:${brand.orangeLight};border-left:3px solid ${brand.orange};font-size:14px;line-height:24px;color:${brand.muted}">We review every enquiry personally. You can expect a response within two business days.</div>`;

  return deliverPair({
    adminEmail: { from, to: admin || from, replyTo: inquiry.email, subject: `New LinkGhosta enquiry from ${inquiry.name}`, html: emailShell({ eyebrow: "New website enquiry", title: inquiry.subject || "A new contact enquiry has arrived", intro: `${inquiry.name} submitted the LinkGhosta contact form.`, content: adminContent, button: { label: "Open enquiry", href: dashboardUrl } }), text: `New LinkGhosta enquiry\n\nName: ${inquiry.name}\nEmail: ${inquiry.email}\nCompany: ${inquiry.company || "-"}\nSubject: ${inquiry.subject || "-"}\nMessage: ${inquiry.message}\n\nOpen: ${dashboardUrl}` },
    userEmail: { from, to: inquiry.email, replyTo: admin || undefined, subject: "We received your LinkGhosta enquiry", html: emailShell({ eyebrow: "Enquiry received", title: `Thank you, ${inquiry.name.split(" ")[0]}.`, intro: "Your message is with the LinkGhosta team.", content: userContent }), text: `Thank you, ${inquiry.name.split(" ")[0]}. We received your LinkGhosta enquiry and will respond within two business days.` }
  });
}

export async function sendServiceRequestEmails(request) {
  const { from, admin } = addresses();
  if (!admin) {
    console.warn("ADMIN_EMAIL or INQUIRY_NOTIFICATION_EMAIL is required for admin notifications.");
  }
  const dashboardUrl = `${process.env.CLIENT_URL || "http://localhost:5174"}/admin/service-requests/${request._id}`;
  const adminContent = detailRows([["Name", request.name], ["Email", request.email], ["Phone", request.phone], ["Company", request.company], ["Role", request.role], ["Service", request.serviceType], ["Budget", request.budgetRange], ["Preferred contact", request.preferredContactMethod], ["Message", request.message]]);
  const userContent = `<div style="padding:18px;background:${brand.orangeLight};border-left:3px solid ${brand.orange};font-size:14px;line-height:24px;color:${brand.muted}"><strong style="color:${brand.ink}">What happens next</strong><br>We will review your goals and current LinkedIn presence, then respond within two business days. If there is a fit, we will arrange a free 30-minute discovery call.</div>`;

  return deliverPair({
    adminEmail: { from, to: admin || from, replyTo: request.email, subject: `New ${request.serviceType || "service"} request from ${request.name}`, html: emailShell({ eyebrow: "New discovery request", title: "A potential client is ready to talk", intro: `${request.name} submitted a service request through the LinkGhosta website.`, content: adminContent, button: { label: "Review request", href: dashboardUrl } }), text: `New LinkGhosta service request\n\nName: ${request.name}\nEmail: ${request.email}\nService: ${request.serviceType || "-"}\nBudget: ${request.budgetRange || "-"}\nMessage: ${request.message || "-"}\n\nOpen: ${dashboardUrl}` },
    userEmail: { from, to: request.email, replyTo: admin || undefined, subject: "Your LinkGhosta discovery request is in", html: emailShell({ eyebrow: "Discovery request received", title: `Thank you, ${request.name.split(" ")[0]}.`, intro: "We have received your request and the LinkGhosta team will review it shortly.", content: userContent }), text: `Thank you, ${request.name.split(" ")[0]}. We received your LinkGhosta discovery request and will respond within two business days.` }
  });
}

export async function sendArticleToSubscribers(article, subscribers) {
  if (!subscribers.length) return { sent: 0, failed: 0, skipped: 0 };
  const { from } = addresses();
  const clientUrl = process.env.CLIENT_URL || "http://localhost:5174";
  const articleUrl = `${clientUrl}/insights/${article.slug}`;
  const cover = article.coverImage
    ? `<img src="${escapeHtml(article.coverImage)}" alt="" width="560" style="display:block;width:100%;height:auto;max-height:320px;object-fit:cover;border-radius:6px;margin-bottom:22px">`
    : "";

  const results = [];
  for (let index = 0; index < subscribers.length; index += 20) {
    const batch = subscribers.slice(index, index + 20);
    const deliveries = await Promise.allSettled(batch.map((subscriber) => {
      const unsubscribeUrl = `${clientUrl}/unsubscribe/${subscriber.unsubscribeToken}`;
      const content = `${cover}<p style="margin:0 0 22px;font-size:15px;line-height:25px;color:${brand.muted}">${escapeHtml(article.excerpt)}</p><p style="margin:0;font-size:12px;line-height:20px;color:#888888">You are receiving this because you subscribed to LinkGhosta Insights. <a href="${escapeHtml(unsubscribeUrl)}" style="color:${brand.orange}">Unsubscribe</a></p>`;
      return sendEmail({
        from,
        to: subscriber.email,
        subject: article.title,
        html: emailShell({ eyebrow: article.category || "New insight", title: article.title, intro: "Fresh thinking from LinkGhosta, written for leaders building visible, trusted brands.", content, button: { label: "Read the article", href: articleUrl } }),
        text: `${article.title}\n\n${article.excerpt}\n\nRead the article: ${articleUrl}\n\nUnsubscribe: ${unsubscribeUrl}`
      });
    }));
    results.push(...deliveries);
  }

  results.forEach((delivery) => {
    if (delivery.status === "rejected") console.error("Newsletter delivery failed:", delivery.reason?.message || delivery.reason);
  });
  return {
    sent: results.filter((result) => result.status === "fulfilled" && !result.value?.skipped).length,
    skipped: results.filter((result) => result.status === "fulfilled" && result.value?.skipped).length,
    failed: results.filter((result) => result.status === "rejected").length
  };
}

export const sendContactInquiryNotification = sendEmail;
export const sendContactInquiryAcknowledgement = sendEmail;
export const sendPasswordResetEmail = sendEmail;
