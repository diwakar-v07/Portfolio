import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const { data, theme } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'certifications'>('experience');

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-10">
          <span
            className={`text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
              theme === 'light'
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
            }`}
          >
            Career Milestones
          </span>
          <h2
            id="experience-heading"
            className={`text-3xl sm:text-4xl font-bold tracking-tight mt-2 ${
              theme === 'light' ? 'text-slate-900' : 'text-white'
            }`}
          >
            Experience, Education & Credentials
          </h2>
          <p
            className={`mt-2 text-sm sm:text-base max-w-2xl ${
              theme === 'light' ? 'text-slate-600' : 'text-slate-400'
            }`}
          >
            A chronological timeline of roles, impact delivered, technical certifications, and academic background.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2.5 mb-8 border-b border-white/10 pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all whitespace-nowrap border ${
              activeTab === 'experience'
                ? theme === 'light'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent shadow-lg shadow-indigo-500/20'
                : theme === 'light'
                ? 'text-slate-600 hover:bg-slate-100 border-transparent'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border-white/5'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Work Experience ({data.experiences.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('education')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all whitespace-nowrap border ${
              activeTab === 'education'
                ? theme === 'light'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent shadow-lg shadow-indigo-500/20'
                : theme === 'light'
                ? 'text-slate-600 hover:bg-slate-100 border-transparent'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border-white/5'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Education ({data.education.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('certifications')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all whitespace-nowrap border ${
              activeTab === 'certifications'
                ? theme === 'light'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent shadow-lg shadow-indigo-500/20'
                : theme === 'light'
                ? 'text-slate-600 hover:bg-slate-100 border-transparent'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border-white/5'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Certifications ({data.certifications.length})</span>
          </button>
        </div>

        {/* Tab 1: Work Experience */}
        {activeTab === 'experience' && (
          <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 sm:before:left-8 before:w-0.5 before:bg-white/10">
            {data.experiences.map((exp) => (
              <div key={exp.id} className="relative pl-10 sm:pl-16 group">
                {/* Timeline node icon */}
                <div
                  className={`absolute left-2 sm:left-6 -translate-x-1/2 top-6 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-transform group-hover:scale-110 ${
                    exp.isCurrent
                      ? 'bg-indigo-500 border-indigo-300 shadow-lg shadow-indigo-500/50'
                      : theme === 'light'
                      ? 'bg-blue-600 border-white shadow-md'
                      : 'bg-[#0c0c0c] border-indigo-500 text-indigo-400'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${exp.isCurrent ? 'bg-white' : 'bg-indigo-400'}`} />
                </div>

                {/* Experience Card */}
                <div
                  className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                    theme === 'light'
                      ? 'bg-white border-slate-200 shadow-sm hover:border-blue-300'
                      : 'bg-[#0c0c0c] border-white/10 hover:border-indigo-500/40 shadow-2xl'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3
                          className={`text-lg sm:text-xl font-bold ${
                            theme === 'light' ? 'text-slate-900' : 'text-white'
                          }`}
                        >
                          {exp.role}
                        </h3>
                        {exp.isCurrent && (
                          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                            Current Role
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-semibold text-indigo-400 mt-1">
                        {exp.company}
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end text-xs font-mono text-slate-400 space-y-1">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <p
                    className={`text-sm leading-relaxed mb-4 ${
                      theme === 'light' ? 'text-slate-600' : 'text-slate-400'
                    }`}
                  >
                    {exp.description}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-2.5 mb-6">
                    {exp.bulletPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                        <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        <span className={theme === 'light' ? 'text-slate-700' : 'text-slate-300'}>
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack used in this role */}
                  <div className="pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                    {exp.technologies.map((t) => (
                      <span
                        key={t}
                        className={`text-[10px] px-2.5 py-1 rounded-lg font-mono uppercase tracking-wider border ${
                          theme === 'light'
                            ? 'bg-slate-100 text-slate-700 border-slate-200'
                            : 'bg-white/5 text-slate-400 border-white/5'
                        }`}
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Education */}
        {activeTab === 'education' && (
          <div className="space-y-6">
            {data.education.map((edu) => (
              <div
                key={edu.id}
                className={`p-6 sm:p-8 rounded-3xl border ${
                  theme === 'light'
                    ? 'bg-white border-slate-200 shadow-sm'
                    : 'bg-[#0c0c0c] border-white/10 hover:border-indigo-500/40 transition-all shadow-2xl'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3
                      className={`text-lg sm:text-xl font-bold ${
                        theme === 'light' ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {edu.degree}
                    </h3>
                    <div className="text-sm font-semibold text-indigo-400 mt-1">
                      {edu.institution}
                    </div>
                  </div>

                  <div className="text-xs font-mono text-slate-400 flex flex-col sm:items-end space-y-1.5">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      {edu.period}
                    </span>
                    {edu.score && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {edu.score}
                      </span>
                    )}
                  </div>
                </div>

                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="space-y-2.5 mt-4 text-xs sm:text-sm">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        <span className={theme === 'light' ? 'text-slate-700' : 'text-slate-300'}>
                          {h}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Certifications */}
        {activeTab === 'certifications' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.certifications.map((cert) => (
              <div
                key={cert.id}
                className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between space-y-4 ${
                  theme === 'light'
                    ? 'bg-white border-slate-200 shadow-sm'
                    : 'bg-[#0c0c0c] border-white/10 hover:border-indigo-500/40 transition-all shadow-2xl'
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3
                    className={`text-base font-bold ${
                      theme === 'light' ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {cert.title}
                  </h3>
                  <div className="text-xs font-semibold text-indigo-400 mt-1">{cert.issuer}</div>
                  <div className="text-xs font-mono text-slate-500 mt-1">Issued: {cert.issueDate}</div>
                  {cert.credentialId && (
                    <div className="text-[10px] font-mono text-slate-400 mt-3 bg-white/5 p-2 rounded-xl border border-white/5">
                      ID: {cert.credentialId}
                    </div>
                  )}
                </div>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 pt-3 border-t border-white/5"
                  >
                    <span>VERIFY CREDENTIAL</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
