import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { soundFx } from '../utils/soundEffects';
import {
  Code,
  FileText,
  Sliders,
  Sun,
  Moon,
  Menu,
  X,
  Linkedin,
  Github,
  Terminal,
  ExternalLink,
  Sparkles,
  Cpu,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { data, theme, setTheme, setIsResumeModalOpen, setIsCustomizerOpen } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Hardware Lab', href: '#hardware-lab' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const cycleTheme = () => {
    soundFx.playGateToggle(true);
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('emerald');
    else if (theme === 'emerald') setTheme('indigo');
    else setTheme('dark');
  };

  const getThemeBadge = () => {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'emerald':
        return 'Emerald';
      case 'indigo':
        return 'Indigo';
      default:
        return 'Dark';
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? theme === 'light'
            ? 'bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-3'
            : 'bg-[#070b12]/90 backdrop-blur-xl border-b border-cyan-500/20 shadow-2xl shadow-cyan-950/40 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          id="nav-brand-logo"
          href="#"
          onMouseEnter={() => soundFx.playChipBlip(1100, 0.03)}
          className="flex items-center gap-3.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-xl p-1"
        >
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-lg transition-transform duration-300 group-hover:scale-105 ${
              theme === 'light'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/20'
                : 'bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 text-white shadow-2xl shadow-cyan-500/30'
            }`}
          >
            <span>DV</span>
          </div>
          <div className="flex flex-col">
            <span
              className={`font-bold tracking-tight text-base sm:text-lg flex items-center gap-1.5 ${
                theme === 'light' ? 'text-slate-900' : 'text-white'
              }`}
            >
              {data.fullName}
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold uppercase tracking-wider ${
                  theme === 'light'
                    ? 'bg-slate-100 text-slate-600 border border-slate-200'
                    : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                }`}
              >
                VLSI &bull; IOT
              </span>
            </span>
            <span
              className={`text-[11px] font-mono tracking-wide uppercase ${
                theme === 'light' ? 'text-slate-500' : 'text-cyan-400/80'
              } hidden sm:inline-block`}
            >
              Hardware &bull; Software Systems
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
              href={link.href}
              onMouseEnter={() => soundFx.playChipBlip(1300, 0.02)}
              onClick={() => soundFx.playGateToggle(true)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                theme === 'light'
                  ? 'text-slate-600 hover:text-cyan-600 hover:bg-slate-100'
                  : 'text-slate-400 hover:text-cyan-300 hover:bg-white/5'
              }`}
            >
              {link.name === 'Hardware Lab' && (
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              )}
              <span>{link.name}</span>
            </a>
          ))}
        </nav>

        {/* Action Controls & Socials */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* LinkedIn Quick Link */}
          <a
            id="nav-linkedin-link"
            href={data.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="View LinkedIn Profile"
            onMouseEnter={() => soundFx.playChipBlip(1200, 0.03)}
            className={`p-2 px-3 rounded-xl border text-xs font-mono tracking-wider transition-all flex items-center gap-1.5 ${
              theme === 'light'
                ? 'border-slate-200 text-slate-700 hover:bg-cyan-50 hover:text-cyan-600'
                : 'border-white/10 bg-white/5 text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-300 hover:border-cyan-500/30'
            }`}
          >
            <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
            <span>LINKEDIN</span>
          </a>

          {/* GitHub Quick Link */}
          {data.githubUrl && (
            <a
              id="nav-github-link"
              href={data.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Profile"
              onMouseEnter={() => soundFx.playChipBlip(1200, 0.03)}
              className={`p-2 rounded-xl border text-xs transition-all ${
                theme === 'light'
                  ? 'border-slate-200 text-slate-700 hover:bg-slate-100'
                  : 'border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <Github className="w-4 h-4" />
            </a>
          )}

          {/* Theme Cycler */}
          <button
            id="nav-theme-toggle"
            onClick={cycleTheme}
            title={`Current: ${getThemeBadge()} Theme (Click to switch)`}
            className={`px-2.5 py-2 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all ${
              theme === 'light'
                ? 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:border-cyan-500/30'
            }`}
          >
            {theme === 'light' ? (
              <Sun className="w-3.5 h-3.5 text-amber-500" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-cyan-400" />
            )}
            <span>{getThemeBadge()}</span>
          </button>

          {/* Resume Modal Trigger */}
          <button
            id="nav-resume-btn"
            onClick={() => {
              soundFx.playGateToggle(true);
              setIsResumeModalOpen(true);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all border ${
              theme === 'light'
                ? 'border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200'
                : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white hover:border-white/20'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>CV</span>
          </button>

          {/* Live Customizer Trigger */}
          <button
            id="nav-customizer-btn"
            onClick={() => {
              soundFx.playGateToggle(true);
              setIsCustomizerOpen(true);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg transition-all ${
              theme === 'light'
                ? 'bg-cyan-600 text-white hover:bg-cyan-700 shadow-cyan-500/20'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black hover:from-cyan-400 hover:to-blue-500 shadow-cyan-500/30'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>CONFIG</span>
          </button>
        </div>

        {/* Mobile controls & Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            id="mobile-theme-btn"
            onClick={cycleTheme}
            className={`p-2 rounded-xl border text-xs ${
              theme === 'light'
                ? 'border-slate-200 text-slate-700'
                : 'border-white/10 bg-white/5 text-slate-300'
            }`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-cyan-400" />}
          </button>

          <button
            id="mobile-customizer-btn"
            onClick={() => {
              soundFx.playGateToggle(true);
              setIsCustomizerOpen(true);
            }}
            className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black text-xs font-medium shadow-md shadow-cyan-500/20"
            title="Edit Portfolio"
          >
            <Sliders className="w-4 h-4" />
          </button>

          <button
            id="mobile-menu-toggle"
            onClick={() => {
              soundFx.playGateToggle(true);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className={`p-2 rounded-xl border ${
              theme === 'light'
                ? 'border-slate-200 text-slate-700'
                : 'border-white/10 bg-white/5 text-slate-300'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-dropdown-menu"
          className={`lg:hidden px-4 pt-3 pb-6 border-b transition-all ${
            theme === 'light'
              ? 'bg-white border-slate-200 shadow-xl text-slate-800'
              : 'bg-[#070b12] border-white/10 shadow-2xl text-slate-200'
          }`}
        >
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  soundFx.playGateToggle(true);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2.5 rounded-xl text-sm font-semibold tracking-wider uppercase font-mono ${
                  theme === 'light'
                    ? 'hover:bg-slate-100 text-slate-700'
                    : 'hover:bg-white/5 text-slate-300 hover:text-cyan-300'
                }`}
              >
                {link.name}
              </a>
            ))}

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              <a
                href={data.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-medium text-xs tracking-wider uppercase font-mono"
              >
                <Linkedin className="w-4 h-4" />
                <span>Visit Diwakar's LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5 ml-auto" />
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsResumeModalOpen(true);
                }}
                className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border font-medium text-sm ${
                  theme === 'light'
                    ? 'border-slate-300 bg-slate-100 text-slate-800'
                    : 'border-white/10 bg-white/5 text-slate-200'
                }`}
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>View Full Resume</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

