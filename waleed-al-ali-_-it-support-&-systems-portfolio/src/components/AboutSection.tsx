import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Cpu, Users, Wrench, ShieldCheck, BookOpen } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const highlights = [
    {
      title: "Systematic Troubleshooting",
      description: "Structured root-cause isolation across OS failures, peripheral malfunctions, and software conflicts.",
      icon: Wrench,
    },
    {
      title: "Active Directory & Policy Control",
      description: "Hands-on experience deploying Windows Server 2025, domain services, user OU structures, and GPO baselines.",
      icon: Cpu,
    },
    {
      title: "User-Centric Technical Support",
      description: "Effective verbal and written communication in English & Arabic, delivering patient end-user guidance.",
      icon: Users,
    },
    {
      title: "Network Fundamentals & Security",
      description: "Solid grasp of TCP/IP, DNS, DHCP subnetting, packet inspection, and modern defensive security concepts.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 relative border-t border-[#3A3E45]/80 bg-[#17191C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with 3D Metallic Architectural Accent */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#D1D5DB] mb-2 px-2.5 py-0.5 rounded bg-[#22252A] border border-[#D1D5DB]/20 shadow-sm">
            <span>01</span>
            <span className="text-[#3A3E45]">/</span>
            <span>Profile &amp; Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F3F4F6] tracking-tight">
            About Me
          </h2>
          <div className="flex items-center gap-2 mt-3">
            <div className="h-[2px] w-12 bg-[#D1D5DB]" />
            <div className="h-[1px] w-24 bg-[#3A3E45]" />
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Biography Text */}
          <div className="lg:col-span-7 space-y-6 text-[#B8BEC7] leading-relaxed text-base sm:text-lg">
            {PORTFOLIO_DATA.personal.aboutParagraphs.map((para, index) => (
              <p key={index} className="text-pretty">
                {para}
              </p>
            ))}

            {/* Quick Education Card in 3D Frame */}
            <div className="mt-8 p-5.5 rounded-xl card-3d flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-lg bg-[#1B1D22] border border-[#3A3E45] flex items-center justify-center text-[#D1D5DB] shrink-0 shadow-inner">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#F3F4F6]">
                    {PORTFOLIO_DATA.personal.education.degree}
                  </div>
                  <div className="text-xs text-[#B8BEC7] mt-0.5">
                    {PORTFOLIO_DATA.personal.education.university} · {PORTFOLIO_DATA.personal.education.period}
                  </div>
                </div>
              </div>
              <div className="text-xs text-[#D1D5DB] font-mono px-2.5 py-1 rounded bg-[#1B1D22] border border-[#3A3E45] sm:text-right shrink-0">
                Dubai, UAE Focus
              </div>
            </div>
          </div>

          {/* Right: Core Working Principles in 3D Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-5 rounded-xl card-3d group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#1B1D22] border border-[#3A3E45] flex items-center justify-center text-[#D1D5DB] group-hover:text-white group-hover:border-[#D1D5DB]/40 transition-colors shrink-0 shadow-inner">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#F3F4F6] tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#B8BEC7] mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
