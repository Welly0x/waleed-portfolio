import React, { useState } from 'react';
import { PORTFOLIO_DATA, CertificateItem } from '../data/portfolioData';
import { 
  Award, 
  Eye, 
  CheckCircle2, 
  BookOpen 
} from 'lucide-react';

interface CertificationsSectionProps {
  onSelectCertificate: (cert: CertificateItem) => void;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ onSelectCertificate }) => {
  const [filter, setFilter] = useState<'all' | 'official' | 'windows' | 'security'>('all');

  const filteredCerts = PORTFOLIO_DATA.certifications.filter((cert) => {
    if (filter === 'all') return true;
    if (filter === 'official') return cert.isOfficialCredential;
    if (filter === 'windows') return cert.category === 'windows';
    if (filter === 'security') return cert.category === 'security' || cert.category === 'in-progress';
    return true;
  });

  return (
    <section id="certifications" className="py-20 md:py-28 relative border-t border-[#3A3E45]/80 bg-[#17191C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with 3D Architectural Marker */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#D1D5DB] mb-2 px-2.5 py-0.5 rounded bg-[#22252A] border border-[#D1D5DB]/20 shadow-sm">
              <span>03</span>
              <span className="text-[#3A3E45]">/</span>
              <span>Credentials &amp; Training</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F3F4F6] tracking-tight">
              Certifications &amp; Technical Courses
            </h2>
            <div className="flex items-center gap-2 mt-3">
              <div className="h-[2px] w-12 bg-[#D1D5DB]" />
              <div className="h-[1px] w-24 bg-[#3A3E45]" />
            </div>
            <p className="text-[#B8BEC7] text-sm mt-4">
              All credentials are substantiated by verified certificates from LinkedIn Learning, TryHackMe, and structured vendor coursework.
            </p>
          </div>

          {/* 3D Segmented Filter Controls */}
          <div className="flex items-center gap-1 p-1 bg-[#22252A] border border-[#3A3E45] rounded-xl self-start md:self-auto overflow-x-auto max-w-full shadow-inner">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                filter === 'all'
                  ? 'btn-silver-3d'
                  : 'text-[#B8BEC7] hover:text-[#F3F4F6]'
              }`}
            >
              All Credentials ({PORTFOLIO_DATA.certifications.length})
            </button>
            <button
              onClick={() => setFilter('official')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                filter === 'official'
                  ? 'btn-silver-3d'
                  : 'text-[#B8BEC7] hover:text-[#F3F4F6]'
              }`}
            >
              Official Verified ({PORTFOLIO_DATA.certifications.filter(c => c.isOfficialCredential).length})
            </button>
            <button
              onClick={() => setFilter('windows')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                filter === 'windows'
                  ? 'btn-silver-3d'
                  : 'text-[#B8BEC7] hover:text-[#F3F4F6]'
              }`}
            >
              Windows &amp; AD
            </button>
            <button
              onClick={() => setFilter('security')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                filter === 'security'
                  ? 'btn-silver-3d'
                  : 'text-[#B8BEC7] hover:text-[#F3F4F6]'
              }`}
            >
              Security &amp; SOC
            </button>
          </div>
        </div>

        {/* Certifications Grid in 3D Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => {
            const isOfficial = cert.isOfficialCredential;
            const isCoursework = cert.type === 'Coursework' || cert.type === 'In Progress';

            return (
              <div
                key={cert.id}
                className="relative rounded-2xl card-3d p-6 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Row: Issuer & Status */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#1B1D22] border border-[#3A3E45] flex items-center justify-center text-[#D1D5DB] shrink-0 shadow-inner">
                        {isCoursework ? <BookOpen className="w-4 h-4" /> : <Award className="w-4 h-4" />}
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-[#F3F4F6]">
                          {cert.issuer}
                        </span>
                        {cert.duration && (
                          <div className="text-[10px] text-[#8C93A0] font-mono">
                            {cert.duration}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Unboxed Status (Zero-Pill discipline) */}
                    {isOfficial ? (
                      <span className="text-[11px] font-medium text-[#D1D5DB] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D1D5DB]" />
                        <span>Completed</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium text-[#B8BEC7]">
                        {cert.type}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-[#F3F4F6] group-hover:text-white transition-colors leading-snug tracking-tight mb-2">
                    {cert.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#B8BEC7] leading-relaxed mb-4">
                    {cert.description}
                  </p>

                  {/* Skills tags (clean unboxed text with bullets) */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-[#B8BEC7] mb-6">
                    {cert.skills.map((skill, i) => (
                      <React.Fragment key={skill}>
                        <span>{skill}</span>
                        {i < cert.skills.length - 1 && <span className="text-[#3A3E45]">·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Date & View Button */}
                <div className="pt-4 border-t border-[#3A3E45]/80 flex items-center justify-between gap-3">
                  <div className="text-[11px] text-[#8C93A0] font-mono">
                    {cert.date || 'Active Curriculum'}
                  </div>

                  <button
                    onClick={() => onSelectCertificate(cert)}
                    className="px-3.5 py-1.5 text-xs font-semibold btn-graphite-3d rounded-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#D1D5DB]" />
                    <span>View Certificate</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verification transparency banner */}
        <div className="mt-12 p-5 rounded-xl card-3d flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B8BEC7]">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#D1D5DB] shrink-0" />
            <span>
              All certificate IDs, dates, and course curriculums are verbatim from official LinkedIn Learning and TryHackMe completion records.
            </span>
          </div>
          <span className="text-[#D1D5DB] font-medium shrink-0">
            100% Genuine Records
          </span>
        </div>

      </div>
    </section>
  );
};
