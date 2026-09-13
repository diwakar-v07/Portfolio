import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechMouseTracker } from './components/TechMouseTracker';
import { IotVlsiInteractiveLab } from './components/IotVlsiInteractiveLab';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectModal } from './components/ProjectModal';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { ResumeModal } from './components/ResumeModal';
import { CustomizerModal } from './components/CustomizerModal';
import { Footer } from './components/Footer';

const PortfolioMain: React.FC = () => {
  const { theme, selectedProject, setSelectedProject } = usePortfolio();

  const getThemeBackground = () => {
    switch (theme) {
      case 'light':
        return 'bg-slate-50 text-slate-900';
      case 'emerald':
        return 'bg-[#050505] text-slate-100 selection:bg-emerald-500';
      case 'indigo':
        return 'bg-[#050505] text-slate-100 selection:bg-indigo-500';
      default:
        return 'bg-[#050505] text-slate-200 selection:bg-cyan-500';
    }
  };

  return (
    <div id="portfolio-app-root" className={`min-h-screen ${getThemeBackground()} transition-colors duration-300 font-sans`}>
      {/* Background Subtle Silicon & Laser Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* Interactive Circuit & Laser Mouse Tracker */}
      <TechMouseTracker />

      {/* Background Grid Pattern Overlay */}
      <div
        className={`fixed inset-0 pointer-events-none z-0 opacity-[0.02] ${
          theme === 'light' ? 'invert' : ''
        }`}
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Top Fixed Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero />
        <IotVlsiInteractiveLab />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        theme={theme}
      />
      <ResumeModal />
      <CustomizerModal />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioMain />
    </PortfolioProvider>
  );
}
