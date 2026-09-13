import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Mail,
  Linkedin,
  Github,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Copy,
  ExternalLink,
  MessageSquare,
  Clock,
  Loader2,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const { data, theme } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState<{
    method: 'web3forms' | 'formspree' | 'mailto';
    message: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const web3FormsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
  const hasConfiguredService = Boolean(web3FormsKey || formspreeId);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(data.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyMessage = () => {
    const formatted = `To: ${data.email}\nFrom: ${formData.name} <${formData.email}>\nSubject: ${formData.subject || 'Portfolio Inquiry'}\n\n${formData.message}`;
    navigator.clipboard.writeText(formatted);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  const launchMailto = () => {
    const subject = encodeURIComponent(
      formData.subject.trim() || `Portfolio Contact from ${formData.name.trim() || 'Visitor'}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${data.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // 1. Web3Forms Service (Preferred for silent web-to-email forwarding)
      if (web3FormsKey) {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            name: formData.name.trim(),
            email: formData.email.trim(),
            subject: formData.subject.trim() || `Portfolio Message from ${formData.name.trim()}`,
            message: formData.message.trim(),
            from_name: `${formData.name.trim()} (Diwakar Portfolio)`,
            replyto: formData.email.trim(),
          }),
        });

        const result = await response.json();
        if (result.success) {
          setDeliveryStatus({
            method: 'web3forms',
            message: `Delivered directly to ${data.email} via Web3Forms gateway.`,
          });
          setIsSubmitted(true);
          try {
            confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 } });
          } catch {
            // ignore
          }
          return;
        } else {
          throw new Error(result.message || 'Web3Forms service did not confirm message reception.');
        }
      }

      // 2. Formspree Service (Alternative web-to-email gateway)
      if (formspreeId) {
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            subject: formData.subject.trim() || `Portfolio Message from ${formData.name.trim()}`,
            message: formData.message.trim(),
            _replyto: formData.email.trim(),
          }),
        });

        if (response.ok) {
          setDeliveryStatus({
            method: 'formspree',
            message: `Delivered directly to ${data.email} via Formspree gateway.`,
          });
          setIsSubmitted(true);
          try {
            confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 } });
          } catch {
            // ignore
          }
          return;
        } else {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || 'Formspree service returned an error.');
        }
      }

      // 3. Fallback: Direct Mail Client Dispatch when neither key is yet configured
      launchMailto();
      setDeliveryStatus({
        method: 'mailto',
        message: `Opened your mail client pre-addressed to ${data.email}. Click send in your mail app to finalize delivery.`,
      });
      setIsSubmitted(true);
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    } catch (err: any) {
      console.error('Contact submission error:', err);
      setErrorMessage(
        err.message || 'Failed to dispatch via web service. You can use direct email instead.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span
            className={`text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
              theme === 'light'
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
            }`}
          >
            Get In Touch
          </span>
          <h2
            id="contact-heading"
            className={`text-3xl sm:text-4xl font-bold tracking-tight mt-2 ${
              theme === 'light' ? 'text-slate-900' : 'text-white'
            }`}
          >
            Let's Build Something Exceptional
          </h2>
          <p
            className={`mt-2 text-sm sm:text-base ${
              theme === 'light' ? 'text-slate-600' : 'text-slate-400'
            }`}
          >
            Have a project in mind, an open engineering role, or just want to connect? Reach out anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Contact Cards Column */}
          <div className="lg:col-span-5 space-y-4">
            {/* LinkedIn Spotlight Card */}
            <a
              id="contact-linkedin-spotlight"
              href={data.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-6 sm:p-8 rounded-3xl border block transition-all group ${
                theme === 'light'
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-400 shadow-sm'
                  : 'bg-[#0c0c0c] border-white/10 hover:border-indigo-500/40 shadow-2xl'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
                    <Linkedin className="w-7 h-7" />
                  </div>
                  <div>
                    <h3
                      className={`text-base sm:text-lg font-bold group-hover:text-indigo-400 transition-colors ${
                        theme === 'light' ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      Connect on LinkedIn
                    </h3>
                    <p className="text-xs text-indigo-400 mt-0.5 font-mono">diwakar-v-a131a12bb</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p
                className={`text-xs sm:text-sm mt-4 leading-relaxed ${
                  theme === 'light' ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                Reach out on LinkedIn for fastest response on full-time opportunities and technical discussions.
              </p>
            </a>

            {/* Email Card */}
            <div
              className={`p-6 sm:p-8 rounded-3xl border ${
                theme === 'light'
                  ? 'bg-white border-slate-200 shadow-sm'
                  : 'bg-[#0c0c0c] border-white/10 shadow-2xl'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <Mail className="w-7 h-7" />
                  </div>
                  <div>
                    <h3
                      className={`text-base sm:text-lg font-bold ${
                        theme === 'light' ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      Direct Email
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5 font-mono">{data.email}</p>
                  </div>
                </div>

                <button
                  id="contact-copy-email-btn"
                  onClick={handleCopyEmail}
                  className={`p-2.5 rounded-xl border text-xs flex items-center gap-1 transition-all ${
                    copiedEmail
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      : theme === 'light'
                      ? 'border-slate-200 text-slate-600 hover:bg-slate-100'
                      : 'border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="mt-5 flex gap-2">
                <a
                  href={`mailto:${data.email}`}
                  className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold uppercase tracking-wider text-xs text-center hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/20"
                >
                  Open Mail Client
                </a>
              </div>
            </div>

            {/* Direct Phone Card */}
            <div
              className={`p-6 sm:p-8 rounded-3xl border ${
                theme === 'light'
                  ? 'bg-white border-slate-200 shadow-sm'
                  : 'bg-[#0c0c0c] border-white/10 shadow-2xl'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Phone className="w-7 h-7" />
                  </div>
                  <div>
                    <h3
                      className={`text-base sm:text-lg font-bold ${
                        theme === 'light' ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      Direct Phone
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5 font-mono">{data.phone}</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex gap-2">
                <a
                  href={`tel:${data.phone}`}
                  className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold uppercase tracking-wider text-xs text-center hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/20"
                >
                  Call {data.phone}
                </a>
              </div>
            </div>

            {/* GitHub Card */}
            {data.githubUrl && (
              <a
                id="contact-github-card"
                href={data.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-6 sm:p-8 rounded-3xl border block transition-all group ${
                  theme === 'light'
                    ? 'bg-white border-slate-200 hover:border-slate-400 shadow-sm'
                    : 'bg-[#0c0c0c] border-white/10 hover:border-cyan-500/40 shadow-2xl'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-white/10 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Github className="w-7 h-7" />
                    </div>
                    <div>
                      <h3
                        className={`text-base sm:text-lg font-bold group-hover:text-cyan-400 transition-colors ${
                          theme === 'light' ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        GitHub Profile
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5 font-mono">github.com/diwakar-v07</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p
                  className={`text-xs sm:text-sm mt-4 leading-relaxed ${
                    theme === 'light' ? 'text-slate-600' : 'text-slate-400'
                  }`}
                >
                  Check out repositories, circuit schematics, and embedded source code.
                </p>
              </a>
            )}

            {/* Location & Availability Card */}
            <div
              className={`p-6 sm:p-8 rounded-3xl border ${
                theme === 'light'
                  ? 'bg-white border-slate-200 shadow-sm'
                  : 'bg-[#0c0c0c] border-white/10 shadow-2xl'
              }`}
            >
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>
                    <strong className={theme === 'light' ? 'text-slate-900' : 'text-white'}>
                      Location:
                    </strong>{' '}
                    <span className="text-slate-400">{data.location} (Open to Remote / Relocation)</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    <strong className={theme === 'light' ? 'text-slate-900' : 'text-white'}>
                      Availability:
                    </strong>{' '}
                    <span className="text-slate-400">{data.availability}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Message Form Column */}
          <div
            className={`lg:col-span-7 p-6 sm:p-8 rounded-3xl border ${
              theme === 'light'
                ? 'bg-white border-slate-200 shadow-sm'
                : 'bg-[#0c0c0c] border-white/10 shadow-2xl'
            }`}
          >
            {isSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3
                    className={`text-xl font-bold ${
                      theme === 'light' ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    Transmission Dispatched!
                  </h3>
                  <p
                    className={`text-xs sm:text-sm max-w-md mx-auto ${
                      theme === 'light' ? 'text-slate-600' : 'text-slate-400'
                    }`}
                  >
                    {deliveryStatus?.message ||
                      `Your transmission was routed to Diwakar's inbox (${data.email}).`}
                  </p>
                </div>

                {/* Message Summary Card */}
                <div
                  className={`p-4 rounded-2xl text-left border max-w-lg mx-auto text-xs font-mono space-y-1.5 ${
                    theme === 'light'
                      ? 'bg-slate-50 border-slate-200 text-slate-700'
                      : 'bg-black/60 border-white/10 text-slate-300'
                  }`}
                >
                  <div className="flex justify-between border-b border-white/5 pb-1 text-[11px]">
                    <span className="text-slate-500">Destination:</span>
                    <span className="font-semibold text-indigo-400">{data.email}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1 text-[11px]">
                    <span className="text-slate-500">From:</span>
                    <span className="truncate max-w-[240px]">
                      {formData.name} ({formData.email})
                    </span>
                  </div>
                  {formData.subject && (
                    <div className="flex justify-between border-b border-white/5 pb-1 text-[11px]">
                      <span className="text-slate-500">Subject:</span>
                      <span className="truncate max-w-[240px]">{formData.subject}</span>
                    </div>
                  )}
                  <p className="pt-1.5 text-slate-400 text-xs italic line-clamp-3">
                    "{formData.message}"
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setDeliveryStatus(null);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/20"
                  >
                    Send Another Message
                  </button>

                  <button
                    onClick={handleCopyMessage}
                    className="px-4 py-2.5 rounded-2xl text-xs font-semibold border flex items-center gap-2 transition-all bg-white/5 border-white/10 hover:bg-white/10 text-slate-300"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedMessage ? 'Copied to Clipboard!' : 'Copy Formatted Text'}</span>
                  </button>

                  <button
                    onClick={launchMailto}
                    className="px-4 py-2.5 rounded-2xl text-xs font-semibold border flex items-center gap-2 transition-all bg-white/5 border-white/10 hover:bg-white/10 text-slate-300"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Open in Email App</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-indigo-400" />
                    <h3
                      className={`text-base font-bold ${
                        theme === 'light' ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      Send a Direct Note
                    </h3>
                  </div>

                  {hasConfiguredService ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <ShieldCheck className="w-3 h-3" />
                      <span>Web-to-Email Gateway Active</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20">
                      <Mail className="w-3 h-3" />
                      <span>Direct Inbox Delivery to {data.email}</span>
                    </span>
                  )}
                </div>

                {errorMessage && (
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div className="flex-1 space-y-2">
                      <p>{errorMessage}</p>
                      <button
                        type="button"
                        onClick={launchMailto}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-[11px] font-semibold transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Open pre-filled in your email client instead</span>
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className={`block text-xs font-semibold mb-1.5 ${
                        theme === 'light' ? 'text-slate-700' : 'text-slate-300'
                      }`}
                    >
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-3 text-xs sm:text-sm rounded-2xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                        theme === 'light'
                          ? 'bg-slate-50 border-slate-200 text-slate-900'
                          : 'bg-black/60 border-white/10 text-slate-100 placeholder-slate-600 focus:border-indigo-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className={`block text-xs font-semibold mb-1.5 ${
                        theme === 'light' ? 'text-slate-700' : 'text-slate-300'
                      }`}
                    >
                      Your Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 text-xs sm:text-sm rounded-2xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                        theme === 'light'
                          ? 'bg-slate-50 border-slate-200 text-slate-900'
                          : 'bg-black/60 border-white/10 text-slate-100 placeholder-slate-600 focus:border-indigo-500'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className={`block text-xs font-semibold mb-1.5 ${
                      theme === 'light' ? 'text-slate-700' : 'text-slate-300'
                    }`}
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="Embedded Project / Job Opportunity / Hardware Collaboration"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={`w-full px-4 py-3 text-xs sm:text-sm rounded-2xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                      theme === 'light'
                        ? 'bg-slate-50 border-slate-200 text-slate-900'
                        : 'bg-black/60 border-white/10 text-slate-100 placeholder-slate-600 focus:border-indigo-500'
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className={`block text-xs font-semibold mb-1.5 ${
                      theme === 'light' ? 'text-slate-700' : 'text-slate-300'
                    }`}
                  >
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Describe your project, embedded engineering requirements, timeline, or open role..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-3 text-xs sm:text-sm rounded-2xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                      theme === 'light'
                        ? 'bg-slate-50 border-slate-200 text-slate-900'
                        : 'bg-black/60 border-white/10 text-slate-100 placeholder-slate-600 focus:border-indigo-500'
                    }`}
                  />
                </div>

                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 rounded-2xl font-bold uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                    isSubmitting
                      ? 'opacity-80 cursor-wait bg-indigo-600 text-white'
                      : theme === 'light'
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/25'
                      : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-indigo-500/25'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting to {data.email}...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Message to Inbox</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-slate-500 font-mono">
                  Incoming transmissions are routed directly to {data.email}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
