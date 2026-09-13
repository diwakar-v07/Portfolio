import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  X,
  Printer,
  Download,
  Linkedin,
  Github,
  Mail,
  MapPin,
  Phone,
  Globe,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';

export const ResumeModal: React.FC = () => {
  const { data, isResumeModalOpen, setIsResumeModalOpen, theme } = usePortfolio();
  const [resumePhotoFailed, setResumePhotoFailed] = useState(false);

  if (!isResumeModalOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Diwakar_V_Resume_Data.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div
      id="resume-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={() => setIsResumeModalOpen(false)}
    >
      <div
        id="resume-modal-content"
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white text-slate-900 shadow-2xl my-6 p-6 sm:p-10 border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Action Controls (Hidden when printing) */}
        <div className="no-print sticky top-0 bg-white/95 backdrop-blur-md pb-4 pt-1 border-b border-slate-200 flex items-center justify-between gap-3 z-20 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono">
              Curriculum Vitae Preview
            </span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              (A4 Print Optimized)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={handleDownloadJSON}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 flex items-center gap-1.5 transition-all"
              title="Download structured JSON"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">JSON</span>
            </button>

            <button
              onClick={() => setIsResumeModalOpen(false)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              aria-label="Close Resume Preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet */}
        <div className="space-y-6 text-slate-800 font-sans text-sm leading-relaxed">
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {!resumePhotoFailed && (
                <img
                  src={data.avatarUrl}
                  onError={() => setResumePhotoFailed(true)}
                  alt={data.fullName}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover object-top border-2 border-slate-900 shadow-md shrink-0"
                />
              )}
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">{data.fullName}</h1>
                <h2 className="text-xs sm:text-sm font-bold text-blue-700 mt-0.5">{data.title}</h2>
                <div className="mt-1 inline-block text-[11px] font-mono font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded border border-amber-300">
                  9.16 CGPA &bull; Department Topper (ECE)
                </div>
              </div>
            </div>

            <div className="text-xs space-y-1 font-mono text-slate-600 sm:text-right">
              <div className="flex items-center sm:justify-end gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{data.location}</span>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <a href={`tel:${data.phone}`} className="text-blue-700 underline">
                  {data.phone}
                </a>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <a href={`mailto:${data.email}`} className="text-blue-700 underline">
                  {data.email}
                </a>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5">
                <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                <a
                  href={data.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 underline"
                >
                  linkedin.com/in/diwakar-v-a131a12bb
                </a>
              </div>
              {data.githubUrl && (
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Github className="w-3.5 h-3.5 text-slate-700" />
                  <a
                    href={data.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline"
                  >
                    github.com/diwakar-v07
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Professional Summary
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-normal">{data.fullBio}</p>
          </div>

          {/* Core Technical Competencies */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Technical Skill Matrix
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {data.skillCategories.map((cat) => (
                <div key={cat.id}>
                  <strong className="text-slate-900">{cat.title}:</strong>{' '}
                  <span className="text-slate-700">{cat.skills.map((s) => s.name).join(', ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
              Work Experience
            </h3>
            <div className="space-y-4">
              {data.experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start text-xs sm:text-sm font-bold">
                    <span className="text-slate-950">{exp.role} &bull; <span className="text-blue-700">{exp.company}</span></span>
                    <span className="font-mono text-slate-600 text-xs">{exp.period}</span>
                  </div>
                  <div className="text-xs text-slate-500 font-mono mb-1.5">{exp.location}</div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 pl-1">
                    {exp.bulletPoints.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                  <div className="text-[11px] font-mono text-slate-600 mt-1.5">
                    <strong>Tech Used:</strong> {exp.technologies.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Featured Projects */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
              Key Engineering Projects
            </h3>
            <div className="space-y-3">
              {data.projects.slice(0, 3).map((proj) => (
                <div key={proj.id} className="text-xs">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-slate-950 text-xs sm:text-sm">{proj.title}</span>
                    <span className="text-[11px] font-mono text-blue-700">{proj.technologies.slice(0, 4).join(', ')}</span>
                  </div>
                  <p className="text-slate-700 mt-0.5">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                Education
              </h3>
              {data.education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="font-bold text-slate-950">{edu.degree}</div>
                  <div className="text-blue-700">{edu.institution}</div>
                  <div className="text-slate-500 font-mono">{edu.period} | {edu.score}</div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                Certifications
              </h3>
              <div className="space-y-1.5 text-xs">
                {data.certifications.map((cert) => (
                  <div key={cert.id}>
                    <span className="font-semibold text-slate-900">{cert.title}</span> &bull;{' '}
                    <span className="text-slate-600">{cert.issuer} ({cert.issueDate})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
