import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project, SkillCategory, Experience, Education } from '../types';
import {
  X,
  Save,
  RotateCcw,
  Download,
  Upload,
  User,
  FolderPlus,
  Check,
  Plus,
  Trash2,
  Linkedin,
  Cpu,
  GraduationCap,
  Briefcase,
  Edit3,
} from 'lucide-react';

export const CustomizerModal: React.FC = () => {
  const {
    data,
    updateProfile,
    resetToDefault,
    exportDataJson,
    importDataJson,
    isCustomizerOpen,
    setIsCustomizerOpen,
    theme,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'profile' | 'skills' | 'projects' | 'experience' | 'data'>('profile');
  const [formData, setFormData] = useState({ ...data });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [importJsonStr, setImportJsonStr] = useState('');
  const [importError, setImportError] = useState(false);

  // Synchronize with context when opened
  React.useEffect(() => {
    if (isCustomizerOpen) {
      setFormData({ ...data });
    }
  }, [isCustomizerOpen, data]);

  if (!isCustomizerOpen) return null;

  const handleSaveProfile = () => {
    updateProfile(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleImport = () => {
    const success = importDataJson(importJsonStr);
    if (success) {
      setImportError(false);
      setSaveSuccess(true);
      setFormData(data);
      setTimeout(() => setSaveSuccess(false), 2000);
    } else {
      setImportError(true);
    }
  };

  // Projects CRUD
  const handleAddProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: 'New Engineering Project',
      category: 'fullstack',
      tagline: 'PCB / Antenna / Simulation / Embedded Project',
      description: 'Detailed explanation of what you built, technologies used, and outcomes achieved.',
      technologies: ['Diptrace', 'Proteus', 'Antenna Fabrication', 'CopperCAM', 'Mach3Mill', 'C++'],
      liveUrl: '',
      githubUrl: formData.githubUrl || 'https://github.com/diwakar-v',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
      featured: true,
      highlights: ['Key feature or technical challenge solved', 'Verified design and testing process'],
    };

    const updated = [newProj, ...formData.projects];
    setFormData({ ...formData, projects: updated });
  };

  const handleUpdateProject = (index: number, partial: Partial<Project>) => {
    const updated = [...formData.projects];
    updated[index] = { ...updated[index], ...partial };
    setFormData({ ...formData, projects: updated });
  };

  const handleDeleteProject = (id: string) => {
    const updated = formData.projects.filter((p) => p.id !== id);
    setFormData({ ...formData, projects: updated });
  };

  // Skills CRUD
  const handleAddSkill = (catIndex: number) => {
    const updatedCats = [...formData.skillCategories];
    updatedCats[catIndex].skills.push({
      name: 'New Technical Skill',
      level: 85,
      isTop: true,
    });
    setFormData({ ...formData, skillCategories: updatedCats });
  };

  const handleRemoveSkill = (catIndex: number, skillIndex: number) => {
    const updatedCats = [...formData.skillCategories];
    updatedCats[catIndex].skills.splice(skillIndex, 1);
    setFormData({ ...formData, skillCategories: updatedCats });
  };

  const handleUpdateSkill = (catIndex: number, skillIndex: number, name: string, level: number) => {
    const updatedCats = [...formData.skillCategories];
    updatedCats[catIndex].skills[skillIndex] = {
      ...updatedCats[catIndex].skills[skillIndex],
      name,
      level,
    };
    setFormData({ ...formData, skillCategories: updatedCats });
  };

  return (
    <div
      id="customizer-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={() => setIsCustomizerOpen(false)}
    >
      <div
        id="customizer-modal-content"
        className={`relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border shadow-2xl my-6 flex flex-col ${
          theme === 'light'
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-[#070b12] border-cyan-500/30 text-slate-100 shadow-cyan-950/50'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2.5">
              <span>Profile & Portfolio Editor</span>
              {saveSuccess && (
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1 font-normal font-mono">
                  <Check className="w-3.5 h-3.5" /> Saved!
                </span>
              )}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Enter your real LinkedIn profile, exact skills, and authentic projects below.
            </p>
          </div>

          <button
            onClick={() => setIsCustomizerOpen(false)}
            className="p-2.5 rounded-2xl border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 sm:px-6 border-b border-white/10 flex items-center gap-2 sm:gap-3 overflow-x-auto">
          {[
            { id: 'profile', label: 'LinkedIn & Bio', icon: <Linkedin className="w-3.5 h-3.5 text-cyan-400" /> },
            { id: 'skills', label: 'Skills & Tools', icon: <Cpu className="w-3.5 h-3.5 text-cyan-400" /> },
            { id: 'projects', label: `Projects (${formData.projects.length})`, icon: <FolderPlus className="w-3.5 h-3.5 text-cyan-400" /> },
            { id: 'experience', label: 'Experience & College', icon: <Briefcase className="w-3.5 h-3.5 text-cyan-400" /> },
            { id: 'data', label: 'Import / Export', icon: <Download className="w-3.5 h-3.5 text-cyan-400" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 px-3 sm:px-4 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'border-cyan-400 text-cyan-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: Profile & LinkedIn */}
          {activeTab === 'profile' && (
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs">
                💡 <strong>LinkedIn Profile:</strong> Paste your actual LinkedIn URL below so visitors and recruiters can connect directly with you.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-slate-300">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://www.linkedin.com/in/your-profile-name"
                    value={formData.linkedInUrl}
                    onChange={(e) => setFormData({ ...formData, linkedInUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-black/60 border border-cyan-500/40 text-cyan-300 text-xs focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-slate-300">
                    GitHub Profile URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://github.com/your-username"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-black/60 border border-white/10 text-slate-100 text-xs focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-slate-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-black/60 border border-white/10 text-slate-100 text-xs focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-slate-300">
                    Primary Professional Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-black/60 border border-white/10 text-slate-100 text-xs focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-slate-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-black/60 border border-white/10 text-slate-100 text-xs focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-slate-300">
                    Location / City
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-black/60 border border-white/10 text-slate-100 text-xs focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5 text-slate-300">
                  Headline Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-black/60 border border-white/10 text-slate-100 text-xs focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5 text-slate-300">
                  Summary / Bio
                </label>
                <textarea
                  rows={3}
                  value={formData.bioSummary}
                  onChange={(e) => setFormData({ ...formData, bioSummary: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-black/60 border border-white/10 text-slate-100 text-xs focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
            </div>
          )}

          {/* TAB 2: Skills Editor */}
          {activeTab === 'skills' && (
            <div className="space-y-6 text-xs sm:text-sm">
              <p className="text-xs text-slate-400">
                Customize your technical competencies across VLSI, Embedded IoT, and Software tools.
              </p>

              {formData.skillCategories.map((cat, catIdx) => (
                <div key={cat.id || catIdx} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-cyan-300 text-sm">{cat.title}</h3>
                    <button
                      onClick={() => handleAddSkill(catIdx)}
                      className="px-3 py-1 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Skill</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {cat.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => handleUpdateSkill(catIdx, sIdx, e.target.value, skill.level)}
                          className="flex-1 px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/10 text-slate-200 text-xs focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                        />
                        <input
                          type="number"
                          min={50}
                          max={100}
                          value={skill.level}
                          onChange={(e) => handleUpdateSkill(catIdx, sIdx, skill.name, Number(e.target.value))}
                          className="w-16 px-2 py-1.5 rounded-lg bg-black/60 border border-white/10 text-cyan-300 text-xs text-center font-mono"
                          title="Proficiency percentage (1-100)"
                        />
                        <button
                          onClick={() => handleRemoveSkill(catIdx, sIdx)}
                          className="p-1.5 text-rose-400 hover:text-rose-300 rounded-lg hover:bg-rose-950/30"
                          title="Delete skill"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Projects Editor */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  Add, edit, or remove your actual projects with genuine technical details.
                </p>
                <button
                  onClick={handleAddProject}
                  className="px-4 py-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.projects.map((proj, idx) => (
                  <div
                    key={proj.id}
                    className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={proj.title}
                          placeholder="Project Title"
                          onChange={(e) => handleUpdateProject(idx, { title: e.target.value })}
                          className="px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 text-white font-bold text-xs"
                        />
                        <input
                          type="text"
                          value={proj.tagline}
                          placeholder="Short Tagline"
                          onChange={(e) => handleUpdateProject(idx, { tagline: e.target.value })}
                          className="px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 text-slate-300 text-xs"
                        />
                      </div>

                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-2 rounded-xl text-rose-400 hover:bg-rose-950/40 border border-rose-900/40 transition-colors"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <textarea
                      rows={2}
                      value={proj.description}
                      placeholder="Project description and achievements..."
                      onChange={(e) => handleUpdateProject(idx, { description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-slate-200 text-xs"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-500 uppercase block mb-1">Technologies (comma separated)</label>
                        <input
                          type="text"
                          value={proj.technologies.join(', ')}
                          onChange={(e) =>
                            handleUpdateProject(idx, {
                              technologies: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                            })
                          }
                          className="w-full px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 text-cyan-300 font-mono text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-500 uppercase block mb-1">GitHub Repo Link</label>
                        <input
                          type="text"
                          placeholder="https://github.com/..."
                          value={proj.githubUrl || ''}
                          onChange={(e) => handleUpdateProject(idx, { githubUrl: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 text-slate-300 font-mono text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Experience & Education */}
          {activeTab === 'experience' && (
            <div className="space-y-5 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                <h3 className="font-bold text-cyan-300 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>Education Details</span>
                </h3>
                {formData.education.map((edu, eIdx) => (
                  <div key={eIdx} className="space-y-2">
                    <input
                      type="text"
                      value={edu.degree}
                      placeholder="Degree & Major (e.g. B.E. in Electronics & Communication)"
                      onChange={(e) => {
                        const updated = [...formData.education];
                        updated[eIdx].degree = e.target.value;
                        setFormData({ ...formData, education: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white font-bold text-xs"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={edu.institution}
                        placeholder="Institution / University Name"
                        onChange={(e) => {
                          const updated = [...formData.education];
                          updated[eIdx].institution = e.target.value;
                          setFormData({ ...formData, education: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 text-slate-200 text-xs"
                      />
                      <input
                        type="text"
                        value={edu.period}
                        placeholder="Years (e.g. 2020 - 2024)"
                        onChange={(e) => {
                          const updated = [...formData.education];
                          updated[eIdx].period = e.target.value;
                          setFormData({ ...formData, education: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 text-slate-200 text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Import / Export */}
          {activeTab === 'data' && (
            <div className="space-y-4 text-xs">
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10">
                <h4 className="font-bold text-white mb-1">Export Profile Data</h4>
                <p className="text-slate-400 mb-3">
                  Download or copy your complete portfolio profile configuration in JSON.
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(exportDataJson());
                    setSaveSuccess(true);
                    setTimeout(() => setSaveSuccess(false), 2000);
                  }}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold uppercase tracking-wider hover:from-cyan-400 hover:to-blue-500 flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Copy Configuration JSON</span>
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-black/40 border border-white/10">
                <h4 className="font-bold text-white mb-1">Import Configuration</h4>
                <p className="text-slate-400 mb-3">Paste a JSON backup to restore your exact profile.</p>
                <textarea
                  rows={4}
                  placeholder="Paste JSON configuration here..."
                  value={importJsonStr}
                  onChange={(e) => setImportJsonStr(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-black/60 border border-white/10 text-slate-200 font-mono text-xs mb-3 focus:outline-none focus:border-cyan-500"
                />
                {importError && (
                  <p className="text-rose-400 text-xs mb-2">Invalid JSON structure. Please check and try again.</p>
                )}
                <button
                  onClick={handleImport}
                  className="px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-slate-200 font-bold uppercase tracking-wider hover:bg-white/10 flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Import & Apply JSON</span>
                </button>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    if (window.confirm('Reset portfolio back to default preset?')) {
                      resetToDefault();
                      setFormData(data);
                      setSaveSuccess(true);
                      setTimeout(() => setSaveSuccess(false), 2000);
                    }
                  }}
                  className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All to Default</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-white/10 bg-[#040810] flex items-center justify-between">
          <button
            onClick={() => setIsCustomizerOpen(false)}
            className="px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
          >
            Cancel
          </button>

          <button
            onClick={handleSaveProfile}
            className="px-6 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 text-black hover:from-cyan-400 hover:to-blue-500 flex items-center gap-1.5 shadow-lg shadow-cyan-500/25"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};
