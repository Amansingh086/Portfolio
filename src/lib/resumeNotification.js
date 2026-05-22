import emailjs from '@emailjs/browser';

const SESSION_KEY = 'portfolio_resume_view_notification_sent';

export async function sendResumeViewNotification(profile) {
  if (typeof window === 'undefined') {
    return { ok: false, reason: 'browser-only' };
  }

  if (sessionStorage.getItem(SESSION_KEY) === 'true') {
    return { ok: false, reason: 'already-sent' };
  }

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const toEmail = import.meta.env.VITE_RESUME_NOTIFY_TO_EMAIL || profile?.email;

  if (!serviceId || !templateId || !publicKey || !toEmail) {
    return { ok: false, reason: 'missing-config' };
  }

  const viewedAt = new Date().toLocaleString();
  const pageUrl = window.location.href;

  await emailjs.send(
    serviceId,
    templateId,
    {
      to_email: toEmail,
      to_name: profile?.name || 'Aman Singh',
      subject: 'Someone opened your resume',
      message: 'Thank you for seeing my resume.',
      resume_owner: profile?.name || 'Aman Singh',
      viewed_at: viewedAt,
      page_url: pageUrl,
    },
    { publicKey }
  );

  sessionStorage.setItem(SESSION_KEY, 'true');
  return { ok: true };
}
