import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { 
  Headphones, 
  Server, 
  Network, 
  ShieldCheck, 
  Terminal, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Headphones':
        return <Headphones className="w-5 h-5" />;
      case 'Server':
        return <Server className="w-5 h-5" />;
      case 'Network':
        return <Network className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'Terminal':
      default:
        return <Terminal className="w-5 h-5" />;
    }
  };

  return (
    <section id="skills" className="py-20 md:py-28 relative border-t border-[#3A3E45]/80 bg-[#17191C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with 3D Metallic Architectural Accent */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#D1D5DB] mb-2 px-2.5 py-0.5 rounded bg-[#22252A] border border-[#D1D5DB]/20 shadow-sm">
            <span>02</span>
            <span className="text-[#3A3E45]">/</span>
            <span>Technical Infrastructure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F3F4F6] tracking-tight">
            Technical Skills &amp; Infrastructure
          </h2>
          <div className="flex items-center gap-2 mt-3">
            <div className="h-[2px] w-12 bg-[#D1D5DB]" />
            <div className="h-[1px] w-24 bg-[#3A3E45]" />
          </div>
          <p className="text-[#B8BEC7] text-sm sm:text-base mt-4 leading-relaxed">
            Focused on enterprise helpdesk, endpoint support, directory management, and robust network connectivity grounded in university training and practical virtualized labs.
          </p>
        </div>

        {/* 5-Category Grid with 3D Depth */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.skills.map((category, index) => (
            <div
              key={category.id}
              className={`p-6 rounded-2xl card-3d flex flex-col justify-between ${
                index === 0 ? 'lg:col-span-1' : ''
              }`}
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1B1D22] border border-[#3A3E45] text-[#D1D5DB] flex items-center justify-center shrink-0 shadow-inner">
                    {getIcon(category.icon)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#F3F4F6] tracking-tight">
                      {category.name}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-[#B8BEC7] mb-5 leading-relaxed">
                  {category.description}
                </p>

                {/* Skill Items List (Zero-Pill discipline: clean unboxed list) */}
                <ul className="space-y-2.5 pt-2 border-t border-[#3A3E45]/80">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2.5 text-xs font-medium text-[#B8BEC7] group/item"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D1D5DB] shrink-0" />
                      <span className="group-hover/item:text-[#F3F4F6] transition-colors">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="mt-6 pt-3 border-t border-[#3A3E45]/60 flex items-center justify-between text-[11px] text-[#8C93A0]">
                <span>{category.skills.length} core capabilities</span>
                <span className="text-[#D1D5DB] font-mono">Verified · Hands-On</span>
              </div>
            </div>
          ))}
        </div>

        {/* Operating Systems & Environment Footnote Strip */}
        <div className="mt-10 p-5 rounded-xl card-3d flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#F3F4F6]">Supported OS Environments:</span>
            <div className="flex items-center gap-2 text-xs text-[#B8BEC7]">
              <span className="text-[#F3F4F6] font-medium">Windows 11 / 10</span>
              <span>·</span>
              <span className="text-[#F3F4F6] font-medium">Windows Server (2025/2022)</span>
              <span>·</span>
              <span className="text-[#B8BEC7]">Linux (Ubuntu / Debian fundamentals)</span>
            </div>
          </div>
          <a
            href="#projects"
            className="text-xs font-semibold text-[#D1D5DB] hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>See practical lab deployments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
