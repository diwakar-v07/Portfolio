import React from 'react';
import { Project, ThemeMode } from '../types';
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  theme: ThemeMode;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, theme }) => {
  if (!project) return null;

  return (
    <div
      id="project-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="project-modal-content"
        className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl transition-all my-8 ${
          theme === 'light'
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-[#0c0c0c] border-white/10 text-slate-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Image / Banner */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-950">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-85"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/50 to-transparent" />

          {/* Close Button */}
          <button
            id="project-modal-close-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/70 border border-white/10 text-slate-300 hover:text-white hover:bg-black/90 transition-all z-10"
            aria-label="Close Project Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title on Banner */}
          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white inline-block mb-2 shadow-md shadow-indigo-500/20">
              {project.category.toUpperCase()}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{project.title}</h2>
            <p className="text-sm text-slate-400 mt-1">{project.tagline}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Action Links & Metrics */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white flex items-center gap-1.5 transition-all shadow-lg shadow-indigo-500/25"
                >
                  <span>Live Preview</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider border flex items-center gap-1.5 transition-all ${
                    theme === 'light'
                      ? 'border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200'
                      : 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Source Code</span>
                </a>
              )}
            </div>

            {/* Metrics Chips */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono"
                  >
                    <span className="text-slate-400 mr-1.5">{m.label}:</span>
                    <span className="text-indigo-400 font-bold">{m.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h3
              className={`text-xs font-mono uppercase tracking-wider font-bold mb-2.5 ${
                theme === 'light' ? 'text-slate-500' : 'text-indigo-400'
              }`}
            >
              System Overview
            </h3>
            <p
              className={`text-sm sm:text-base leading-relaxed ${
                theme === 'light' ? 'text-slate-700' : 'text-slate-300'
              }`}
            >
              {project.description}
            </p>
          </div>

          {/* Engineering Challenge & Solution */}
          {(project.challenge || project.solution) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.challenge && (
                <div
                  className={`p-5 rounded-2xl border ${
                    theme === 'light'
                      ? 'bg-amber-50/70 border-amber-200 text-slate-800'
                      : 'bg-[#111111] border-amber-500/20 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>THE CHALLENGE</span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-400">{project.challenge}</p>
                </div>
              )}

              {project.solution && (
                <div
                  className={`p-5 rounded-2xl border ${
                    theme === 'light'
                      ? 'bg-emerald-50/70 border-emerald-200 text-slate-800'
                      : 'bg-[#111111] border-indigo-500/20 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 mb-2">
                    <Lightbulb className="w-4 h-4" />
                    <span>THE ARCHITECTURAL SOLUTION</span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-400">{project.solution}</p>
                </div>
              )}
            </div>
          )}

          {/* Key Engineering Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h3
                className={`text-xs font-mono uppercase tracking-wider font-bold mb-3 ${
                  theme === 'light' ? 'text-slate-500' : 'text-indigo-400'
                }`}
              >
                Key Highlights & Features
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                {project.highlights.map((hl, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span className={theme === 'light' ? 'text-slate-700' : 'text-slate-300'}>
                      {hl}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies Used */}
          <div>
            <h3
              className={`text-xs font-mono uppercase tracking-wider font-bold mb-3 ${
                theme === 'light' ? 'text-slate-500' : 'text-indigo-400'
              }`}
            >
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className={`text-xs px-3 py-1.5 rounded-xl font-mono border ${
                    theme === 'light'
                      ? 'bg-slate-100 text-slate-800 border-slate-200'
                      : 'bg-white/5 text-slate-300 border-white/5'
                  }`}
                >
                  #{tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 sm:p-6 bg-[#080808] border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider border ${
              theme === 'light'
                ? 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            Close Deep Dive
          </button>
        </div>
      </div>
    </div>
  );
};
