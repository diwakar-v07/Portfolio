import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../types';
import {
  ExternalLink,
  Github,
  Search,
  Filter,
  Sparkles,
  ArrowUpRight,
  Code,
  Layers,
  Star,
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { data, theme, setSelectedProject } = usePortfolio();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full-Stack' },
    { id: 'cloud-ai', label: 'AI & Cloud' },
    { id: 'backend', label: 'Backend APIs' },
    { id: 'frontend', label: 'Frontend / UI' },
  ];

  const filteredProjects = data.projects.filter((project) => {
    const matchesCategory = filterCategory === 'all' || project.category === filterCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-20 relative">
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
              Featured Works
            </span>
            <h2
              id="projects-heading"
              className={`text-3xl sm:text-4xl font-bold tracking-tight mt-2 ${
                theme === 'light' ? 'text-slate-900' : 'text-white'
              }`}
            >
              Built for Scale & Impact
            </h2>
            <p
              className={`mt-2 text-sm sm:text-base max-w-2xl ${
                theme === 'light' ? 'text-slate-600' : 'text-slate-400'
              }`}
            >
              A showcase of production-ready systems, distributed backends, AI agents, and high-performance UI architectures.
            </p>
          </div>

          {/* Search bar */}
          <div className="w-full sm:w-72 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tech or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 text-xs rounded-2xl border focus:outline-none transition-all ${
                theme === 'light'
                  ? 'bg-white border-slate-200 text-slate-900'
                  : 'bg-[#0c0c0c] border-white/10 text-slate-100 placeholder-slate-500 focus:border-indigo-500/50'
              }`}
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all border ${
                filterCategory === cat.id
                  ? theme === 'light'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                    : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent shadow-lg shadow-indigo-500/20'
                  : theme === 'light'
                  ? 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  : 'bg-white/5 text-slate-400 border-white/5 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div
            className={`p-12 text-center rounded-3xl border ${
              theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#0c0c0c] border-white/5'
            }`}
          >
            <p className="text-slate-400 text-sm">No projects matched your criteria.</p>
            <button
              onClick={() => {
                setFilterCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-indigo-400 font-semibold hover:underline"
            >
              Clear filters and view all projects
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className={`group rounded-3xl border overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                  theme === 'light'
                    ? 'bg-white border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300'
                    : 'bg-[#0c0c0c] border-white/10 hover:border-indigo-500/40 shadow-2xl'
                }`}
              >
                {/* Project Image Preview */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent opacity-90" />

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                      <Star className="w-3 h-3 fill-indigo-300" />
                      <span>Featured</span>
                    </div>
                  )}

                  {/* Index / Category */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    0{idx + 1} // {project.category}
                  </div>

                  {/* Overlay Quick Deep Dive CTA */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    aria-label={`View architecture details for ${project.title}`}
                  >
                    <span className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold uppercase tracking-wider shadow-2xl flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <span>Explore Architecture</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3
                      className={`text-xl font-bold group-hover:text-indigo-400 transition-colors ${
                        theme === 'light' ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={`text-xs font-semibold mt-1 line-clamp-1 ${
                        theme === 'light' ? 'text-blue-600' : 'text-indigo-400'
                      }`}
                    >
                      {project.tagline}
                    </p>
                    <p
                      className={`text-xs mt-2.5 leading-relaxed line-clamp-3 ${
                        theme === 'light' ? 'text-slate-600' : 'text-slate-400'
                      }`}
                    >
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack badges */}
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className={`text-[10px] px-2.5 py-1 rounded-lg font-mono uppercase tracking-wider border ${
                            theme === 'light'
                              ? 'bg-slate-100 text-slate-700 border-slate-200'
                              : 'bg-white/5 text-slate-400 border-white/5'
                          }`}
                        >
                          #{tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span
                          className={`text-[10px] px-2 py-1 rounded-lg font-mono text-slate-500`}
                        >
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Bottom Card Action Links */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                      >
                        <span>SYSTEM DESIGN</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-2 rounded-xl border transition-colors ${
                              theme === 'light'
                                ? 'border-slate-200 text-slate-600 hover:bg-slate-100'
                                : 'border-white/5 bg-white/5 text-slate-400 hover:text-white hover:border-white/20'
                            }`}
                            title="GitHub Source"
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-colors"
                            title="Live Demo"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
