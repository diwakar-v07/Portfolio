import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Layers,
  Layout,
  Zap,
  Cpu,
  CheckCircle,
  FileText,
  Linkedin,
  Github,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Award,
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { data, theme, setIsResumeModalOpen } = usePortfolio();

  const getPhilosophyIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      case 'Layout':
        return <Layout className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
                theme === 'light'
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
              }`}
            >
              Background & Principles
            </span>
          </div>
          <h2
            id="about-heading"
            className={`text-3xl sm:text-4xl font-bold tracking-tight ${
              theme === 'light' ? 'text-slate-900' : 'text-white'
            }`}
          >
            Engineering with Precision & Purpose
          </h2>
          <p
            className={`mt-2 text-sm sm:text-base max-w-3xl ${
              theme === 'light' ? 'text-slate-600' : 'text-slate-400'
            }`}
          >
            A look into who I am, how I approach software problems, and my core architectural principles.
          </p>
        </div>

        {/* 2-Column Story & Key Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Narrative Column */}
          <div
            className={`lg:col-span-7 p-6 sm:p-8 rounded-3xl border ${
              theme === 'light'
                ? 'bg-white border-slate-200 shadow-sm text-slate-700'
                : 'bg-[#0c0c0c] border-white/10 text-slate-300 backdrop-blur-sm'
            }`}
          >
            <h3
              className={`text-xl font-bold mb-4 ${
                theme === 'light' ? 'text-slate-900' : 'text-white'
              }`}
            >
              About {data.fullName}
            </h3>

            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-400">
              {data.fullBio.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Quick Contacts within About */}
            <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>
                  <strong className={theme === 'light' ? 'text-slate-900' : 'text-slate-200'}>Location:</strong>{' '}
                  {data.location}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="truncate">
                  <strong className={theme === 'light' ? 'text-slate-900' : 'text-slate-200'}>Email:</strong>{' '}
                  <a href={`mailto:${data.email}`} className="text-purple-400 hover:underline">
                    {data.email}
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong className={theme === 'light' ? 'text-slate-900' : 'text-slate-200'}>Phone:</strong>{' '}
                  <a href={`tel:${data.phone}`} className="text-emerald-400 hover:underline">
                    {data.phone}
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>
                  <strong className={theme === 'light' ? 'text-slate-900' : 'text-slate-200'}>LinkedIn:</strong>{' '}
                  <a
                    href={data.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:underline"
                  >
                    diwakar-v-a131a12bb
                  </a>
                </span>
              </div>
              {data.githubUrl && (
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>
                    <strong className={theme === 'light' ? 'text-slate-900' : 'text-slate-200'}>GitHub:</strong>{' '}
                    <a
                      href={data.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:underline"
                    >
                      github.com/diwakar-v07
                    </a>
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong className={theme === 'light' ? 'text-slate-900' : 'text-slate-200'}>Academics:</strong>{' '}
                  <span className="font-semibold text-amber-400">9.16 CGPA (Dept. Topper)</span>
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                id="about-resume-trigger-btn"
                onClick={() => setIsResumeModalOpen(true)}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider border transition-all ${
                  theme === 'light'
                    ? 'border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white hover:border-indigo-500/30'
                }`}
              >
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Review Full Resume (PDF)</span>
              </button>
            </div>
          </div>

          {/* Core Strengths Checklist & Education snippet */}
          <div className="lg:col-span-5 space-y-4">
            <div
              className={`p-6 sm:p-8 rounded-3xl border ${
                theme === 'light'
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-[#0c0c0c] border-white/10'
              }`}
            >
              <h4
                className={`text-lg font-bold mb-4 ${
                  theme === 'light' ? 'text-slate-900' : 'text-white'
                }`}
              >
                Engineering Focus & Strengths
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm">
                {[
                  'B.E. Electronics & Communication Engineering at KPR Institute of Engineering & Technology — Department CGPA Topper (9.16 / 10.0)',
                  'Embedded Systems & IoT: Practical Arduino & ESP32 development integrating GPS, GSM, IR sensors, and servo motors',
                  'Antenna Fabrication & RF Prototyping: Hands-on training with Enthu Tech fabrication machinery on copper boards',
                  'PCB Design & Circuit Simulation: KiCad, Proteus, DipTrace CAD, and professional internship at SAN Technovation',
                  'Sensors & Automation: Smart street-light monitoring, relay load switching, LDR analog sensing, and SIH 2026 participant',
                  'Languages & Software Tools: C, C++, Python, HTML, MATLAB & Simulink Onramp certified, and Git/GitHub',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span className={theme === 'light' ? 'text-slate-700' : 'text-slate-300'}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* LinkedIn Verification Callout */}
            <div
              className={`p-6 rounded-3xl border flex items-center gap-4 ${
                theme === 'light'
                  ? 'bg-blue-50/70 border-blue-200 text-slate-800'
                  : 'bg-[#111111] border-white/5 text-slate-200 hover:border-indigo-500/30 transition-all'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-500/20">
                <Linkedin className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white">Connect on LinkedIn</div>
                <div className="text-xs text-slate-400 mt-0.5">
                  View endorsements, career history, and credentials.
                </div>
                <a
                  href={data.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-xs font-mono font-bold tracking-wider text-indigo-400 hover:text-indigo-300"
                >
                  VIEW PROFILE &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Philosophy Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.philosophy.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl border transition-all ${
                theme === 'light'
                  ? 'bg-white border-slate-200 shadow-sm hover:border-blue-300'
                  : 'bg-[#111111] border-white/5 hover:border-indigo-500/40'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-4 ${
                  theme === 'light'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                }`}
              >
                {getPhilosophyIcon(item.icon)}
              </div>
              <h4
                className={`text-base font-bold mb-2 ${
                  theme === 'light' ? 'text-slate-900' : 'text-white'
                }`}
              >
                {item.title}
              </h4>
              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  theme === 'light' ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
