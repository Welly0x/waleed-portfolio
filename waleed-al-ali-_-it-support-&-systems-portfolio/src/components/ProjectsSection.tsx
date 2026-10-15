import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Server, Network, ShieldCheck, Code, CheckCircle2 } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const getProjectIcon = (category: string) => {
    if (category.includes('System')) return <Server className="w-5 h-5" />;
    if (category.includes('Networking')) return <Network className="w-5 h-5" />;
    if (category.includes('Cybersecurity')) return <ShieldCheck className="w-5 h-5" />;
    return <Code className="w-5 h-5" />;
  };

  return (
    <section id="projects" className="py-20 md:py-28 relative border-t border-[#3A3E45]/80 bg-[#17191C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with 3D Architectural Marker */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#D1D5DB] mb-2 px-2.5 py-0.5 rounded bg-[#22252A] border border-[#D1D5DB]/20 shadow-sm">
            <span>04</span>
            <span className="text-[#3A3E45]">/</span>
            <span>Practical Implementation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F3F4F6] tracking-tight">
            Hands-On Labs &amp; Academic Projects
          </h2>
          <div className="flex items-center gap-2 mt-3">
            <div className="h-[2px] w-12 bg-[#D1D5DB]" />
            <div className="h-[1px] w-24 bg-[#3A3E45]" />
          </div>
          <p className="text-[#B8BEC7] text-sm sm:text-base mt-4 leading-relaxed">
            Real-world lab configurations in virtual environments, network simulation suites, and security sandboxes reflecting enterprise IT practices.
          </p>
        </div>

        {/* Bento Grid Layout in 3D Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PORTFOLIO_DATA.projects.map((proj, idx) => (
            <div
              key={proj.id}
              className="p-7 rounded-2xl card-3d flex flex-col justify-between group blueprint-corner"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1B1D22] border border-[#3A3E45] text-[#D1D5DB] flex items-center justify-center shrink-0 shadow-inner">
                      {getProjectIcon(proj.category)}
                    </div>
                    <div>
                      <span className="text-xs font-mono text-[#D1D5DB]">
                        {proj.category}
                      </span>
                      <h3 className="text-lg font-bold text-[#F3F4F6] group-hover:text-white transition-colors tracking-tight">
                        {proj.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#8C93A0] hidden sm:inline px-2 py-0.5 rounded bg-[#1B1D22] border border-[#3A3E45]">
                    Lab {idx + 1}
                  </span>
                </div>

                {/* Tagline */}
                <p className="text-xs text-[#B8BEC7] font-medium mb-4 leading-relaxed">
                  {proj.tagline}
                </p>

                {/* Bullets */}
                <ul className="space-y-2.5 mb-6">
                  {proj.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-[#B8BEC7] leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D1D5DB] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags Footer (Zero-Pill discipline: unboxed clean text with · separators) */}
              <div className="pt-4 border-t border-[#3A3E45]/80 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-[#B8BEC7]">
                <span className="text-[#8C93A0] font-mono">Tech:</span>
                {proj.tags.map((tag, tIndex) => (
                  <React.Fragment key={tag}>
                    <span className="text-[#F3F4F6] font-medium">{tag}</span>
                    {tIndex < proj.tags.length - 1 && <span className="text-[#3A3E45]">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
