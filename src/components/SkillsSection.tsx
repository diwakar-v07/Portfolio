import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Monitor,
  Server,
  Database,
  Cloud,
  Check,
  Copy,
  Sparkles,
  Layers,
  Flame,
  Terminal,
} from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const { data, theme } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copied, setCopied] = useState(false);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'frontend':
        return <Monitor className="w-4 h-4" />;
      case 'backend':
        return <Server className="w-4 h-4" />;
      case 'databases':
        return <Database className="w-4 h-4" />;
      case 'devops-tools':
        return <Cloud className="w-4 h-4" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  const allSkills = data.skillCategories.flatMap((cat) =>
    cat.skills.map((s) => ({ ...s, categoryTitle: cat.title, categoryId: cat.id }))
  );

  const displayedCategories =
    selectedCategory === 'all'
      ? data.skillCategories
      : data.skillCategories.filter((c) => c.id === selectedCategory);

  const handleCopyTechStack = () => {
    const stackList = allSkills.map((s) => s.name).join(', ');
    navigator.clipboard.writeText(
      `Diwakar V's Tech Stack:\n${stackList}\nLinkedIn: ${data.linkedInUrl}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span
              className={`text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
                theme === 'light'
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
              }`}
            >
              Technical Expertise
            </span>
            <h2
              id="skills-heading"
              className={`text-3xl sm:text-4xl font-bold tracking-tight mt-2 ${
                theme === 'light' ? 'text-slate-900' : 'text-white'
              }`}
            >
              Skills & Tech Matrix
            </h2>
            <p
              className={`mt-2 text-sm sm:text-base max-w-2xl ${
                theme === 'light' ? 'text-slate-600' : 'text-slate-400'
              }`}
            >
              A categorized breakdown of technologies, frameworks, and architectural tools I leverage daily.
            </p>
          </div>

          {/* Quick Copy Action */}
          <button
            id="copy-tech-stack-btn"
            onClick={handleCopyTechStack}
            className={`self-start sm:self-auto px-5 py-2.5 rounded-2xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 border transition-all ${
              copied
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : theme === 'light'
                ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>TECH STACK COPIED!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-indigo-400" />
                <span>COPY TECH STACK</span>
              </>
            )}
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 border transition-all ${
              selectedCategory === 'all'
                ? theme === 'light'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent shadow-lg shadow-indigo-500/20'
                : theme === 'light'
                ? 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                : 'bg-white/5 text-slate-400 border-white/5 hover:text-white hover:bg-white/10'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>ALL ({allSkills.length})</span>
          </button>

          {data.skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 border transition-all ${
                selectedCategory === cat.id
                  ? theme === 'light'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                    : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent shadow-lg shadow-indigo-500/20'
                  : theme === 'light'
                  ? 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  : 'bg-white/5 text-slate-400 border-white/5 hover:text-white hover:bg-white/10'
              }`}
            >
              {getCategoryIcon(cat.id)}
              <span>
                {cat.title} ({cat.skills.length})
              </span>
            </button>
          ))}
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedCategories.map((cat) => (
            <div
              key={cat.id}
              className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                theme === 'light'
                  ? 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
                  : 'bg-[#0c0c0c] border-white/10 hover:border-indigo-500/40 shadow-2xl'
              }`}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                    theme === 'light'
                      ? 'bg-blue-50 text-blue-600'
                      : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                  }`}
                >
                  {getCategoryIcon(cat.id)}
                </div>
                <div>
                  <h3
                    className={`text-lg font-bold ${
                      theme === 'light' ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {cat.title}
                  </h3>
                  <p
                    className={`text-xs ${
                      theme === 'light' ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Skills Progress Bars */}
              <div className="mt-6 space-y-4">
                {cat.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 font-medium">
                        <span className={theme === 'light' ? 'text-slate-800' : 'text-slate-300'}>
                          {skill.name}
                        </span>
                        {skill.isTop && (
                          <span
                            className="inline-flex items-center gap-0.5 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                            title="Primary Core Competency"
                          >
                            <Flame className="w-2.5 h-2.5 text-indigo-400" />
                            Core
                          </span>
                        )}
                      </div>
                      <span
                        className={`font-mono text-xs ${
                          theme === 'light' ? 'text-slate-500' : 'text-slate-500'
                        }`}
                      >
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div
                      className={`h-2 w-full rounded-full overflow-hidden ${
                        theme === 'light' ? 'bg-slate-100' : 'bg-white/5'
                      }`}
                    >
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          theme === 'light'
                            ? 'bg-gradient-to-r from-blue-600 to-cyan-500'
                            : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                        }`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Banner */}
        <div
          className={`mt-10 p-6 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
            theme === 'light'
              ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-slate-800'
              : 'bg-[#111111] border-white/5 text-slate-200'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Continuous Innovation & Scale</div>
              <div className="text-xs text-slate-400 mt-0.5">
                Currently architecting distributed consensus flows, multimodal agentic workflows, and high-performance WebAssembly.
              </div>
            </div>
          </div>

          <a
            href={data.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono font-bold tracking-wider text-indigo-400 hover:text-indigo-300 shrink-0 flex items-center gap-1"
          >
            <span>SKILLS ON LINKEDIN</span>
            <span>&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
};
