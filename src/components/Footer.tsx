import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Linkedin,
  Github,
  Mail,
  Phone,
  ArrowUp,
  FileText,
  Sliders,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, theme, setIsResumeModalOpen, setIsCustomizerOpen } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="main-footer"
      className={`border-t py-14 transition-colors ${
        theme === 'light'
          ? 'bg-slate-50 border-slate-200 text-slate-600'
          : 'bg-[#050505] border-white/10 text-slate-400'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Col 1: Identity */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-sm ${
                  theme === 'light'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20'
                }`}
              >
                DV
              </div>
              <span
                className={`text-lg font-bold tracking-tight ${
                  theme === 'light' ? 'text-slate-900' : 'text-white'
                }`}
              >
                {data.fullName}
              </span>
            </div>
            <p className="text-xs sm:text-sm max-w-sm leading-relaxed text-slate-400">
              {data.tagline}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                id="footer-linkedin-link"
                href={data.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-indigo-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              {data.githubUrl && (
                <a
                  id="footer-github-link"
                  href={data.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}

              <a
                id="footer-email-link"
                href={`mailto:${data.email}`}
                className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-purple-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                id="footer-phone-link"
                href={`tel:${data.phone}`}
                className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-emerald-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                title="Call Diwakar"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4
              className={`text-xs font-mono font-bold uppercase tracking-wider mb-4 ${
                theme === 'light' ? 'text-slate-900' : 'text-white'
              }`}
            >
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#about" className="hover:text-indigo-400 transition-colors">
                  About & Background
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-indigo-400 transition-colors">
                  Technical Skills
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-indigo-400 transition-colors">
                  Featured Projects
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-indigo-400 transition-colors">
                  Experience & Education
                </a>
              </li>
              <li>
                <a href="#hardware-lab" className="hover:text-cyan-400 transition-colors">
                  Silicon & IoT Lab
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-indigo-400 transition-colors">
                  Contact & Connect
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Actions & Tools */}
          <div>
            <h4
              className={`text-xs font-mono font-bold uppercase tracking-wider mb-4 ${
                theme === 'light' ? 'text-slate-900' : 'text-white'
              }`}
            >
              Portfolio Tools
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => setIsResumeModalOpen(true)}
                  className="hover:text-indigo-400 flex items-center gap-2 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Resume Viewer (PDF)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsCustomizerOpen(true)}
                  className="hover:text-indigo-400 flex items-center gap-2 transition-colors"
                >
                  <Sliders className="w-3.5 h-3.5 text-purple-400" />
                  <span>Customize Portfolio</span>
                </button>
              </li>
              <li>
                <a
                  href={data.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-400 flex items-center gap-2 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-indigo-400" />
                  <span>LinkedIn Profile</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            &copy; {new Date().getFullYear()} {data.fullName}. Built with precision.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-500">
              Crafted for high performance & modern scale
            </span>

            <button
              onClick={scrollToTop}
              className={`p-2.5 rounded-2xl border flex items-center gap-1 transition-all ${
                theme === 'light'
                  ? 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                  : 'border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
              }`}
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
