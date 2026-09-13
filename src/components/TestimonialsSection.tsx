import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { data, theme } = usePortfolio();

  if (!data.testimonials || data.testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-20 relative">
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
            Recommendations
          </span>
          <h2
            id="testimonials-heading"
            className={`text-3xl sm:text-4xl font-bold tracking-tight mt-2 ${
              theme === 'light' ? 'text-slate-900' : 'text-white'
            }`}
          >
            Endorsements & Feedback
          </h2>
          <p
            className={`mt-2 text-sm sm:text-base max-w-2xl ${
              theme === 'light' ? 'text-slate-600' : 'text-slate-400'
            }`}
          >
            What engineering leaders and teammates say about working with Diwakar.
          </p>
        </div>

        {/* Grid of testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.testimonials.map((item) => (
            <div
              key={item.id}
              className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between relative transition-all ${
                theme === 'light'
                  ? 'bg-white border-slate-200 shadow-sm'
                  : 'bg-[#0c0c0c] border-white/10 hover:border-indigo-500/40 shadow-2xl'
              }`}
            >
              <Quote
                className={`w-10 h-10 mb-4 opacity-25 ${
                  theme === 'light' ? 'text-blue-600' : 'text-indigo-400'
                }`}
              />

              <p
                className={`text-sm sm:text-base leading-relaxed italic mb-6 ${
                  theme === 'light' ? 'text-slate-700' : 'text-slate-300'
                }`}
              >
                "{item.content}"
              </p>

              <div className="pt-4 border-t border-white/10 flex items-center gap-3.5">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border border-white/10"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div
                    className={`font-bold text-sm ${
                      theme === 'light' ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {item.name}
                  </div>
                  <div className="text-xs text-indigo-400 font-semibold">
                    {item.role} &bull; {item.company}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{item.relationship}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
