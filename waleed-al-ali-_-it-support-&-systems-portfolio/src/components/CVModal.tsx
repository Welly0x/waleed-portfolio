import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { 
  X, 
  Download, 
  Printer, 
  MapPin, 
  Phone, 
  Mail, 
  Linkedin, 
  GraduationCap, 
  Briefcase, 
  Award, 
  CheckCircle2 
} from 'lucide-react';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
    >
      <div 
        className="relative w-full max-w-4xl bg-[#1E2126] border border-[#D1D5DB]/30 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden max-h-[92vh] flex flex-col blueprint-corner"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#3A3E45] bg-[#22252A] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1B1D22] border border-[#D1D5DB]/30 flex items-center justify-center font-bold text-xs text-[#F3F4F6] font-mono shadow-inner">
              CV
            </div>
            <div>
              <span id="cv-modal-title" className="text-sm font-bold text-[#F3F4F6]">
                Waleed Al-Ali — Official Curriculum Vitae
              </span>
              <div className="text-[11px] text-[#B8BEC7]">
                IT Support · System Administration · Networking
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold btn-graphite-3d rounded-lg cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <a
              href="/Waleed_Al-Ali_CV.pdf"
              download="Waleed_Al-Ali_CV.pdf"
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold btn-silver-3d rounded-lg"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 text-[#B8BEC7] hover:text-[#F3F4F6] rounded-lg hover:bg-[#2A2E35] transition-colors ml-1 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Area in 3D Charcoal & Silver */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 bg-[#17191C] text-[#B8BEC7]">
          
          {/* Header Block */}
          <div className="flex flex-col md:flex-row md:items-start justify-between border-b border-[#3A3E45] pb-8 gap-6">
            <div>
              <h1 className="text-3xl font-extrabold text-[#F3F4F6] tracking-tight">
                {PORTFOLIO_DATA.personal.name}
              </h1>
              <div className="text-base font-semibold text-[#D1D5DB] mt-1">
                {PORTFOLIO_DATA.personal.role}
              </div>
              <p className="text-xs text-[#B8BEC7] mt-3 max-w-xl leading-relaxed">
                {PORTFOLIO_DATA.personal.intro}
              </p>
            </div>

            <div className="space-y-1.5 text-xs text-[#B8BEC7] shrink-0">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D1D5DB] shrink-0" />
                <span>{PORTFOLIO_DATA.personal.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D1D5DB] shrink-0" />
                <a href={PORTFOLIO_DATA.personal.phoneHref} className="hover:text-white">
                  {PORTFOLIO_DATA.personal.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D1D5DB] shrink-0" />
                <a href={PORTFOLIO_DATA.personal.emailHref} className="hover:text-white">
                  {PORTFOLIO_DATA.personal.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="w-3.5 h-3.5 text-[#D1D5DB] shrink-0" />
                <a 
                  href={PORTFOLIO_DATA.personal.linkedin} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-white"
                >
                  linkedin.com/in/waleed-al-ali
                </a>
              </div>
            </div>
          </div>

          {/* Education & Languages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-[#3A3E45] pb-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#D1D5DB] mb-3 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                <span>Education</span>
              </div>
              <div className="text-sm font-bold text-[#F3F4F6]">
                {PORTFOLIO_DATA.personal.education.degree}
              </div>
              <div className="text-xs text-[#B8BEC7] mt-0.5">
                {PORTFOLIO_DATA.personal.education.university}
              </div>
              <div className="text-xs text-[#8C93A0] font-mono mt-0.5">
                {PORTFOLIO_DATA.personal.education.period}
              </div>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#D1D5DB] mb-3">
                Languages
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between text-[#B8BEC7]">
                  <span className="font-medium text-[#F3F4F6]">Arabic:</span>
                  <span>Native Speaker</span>
                </div>
                <div className="flex items-center justify-between text-[#B8BEC7]">
                  <span className="font-medium text-[#F3F4F6]">English:</span>
                  <span>Very Good (Professional Working)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Practical Projects & Labs */}
          <div className="border-b border-[#3A3E45] pb-8 space-y-6">
            <div className="text-xs font-bold uppercase tracking-wider text-[#D1D5DB] flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>Practical Projects &amp; Virtual Labs</span>
            </div>

            <div className="space-y-5">
              {PORTFOLIO_DATA.projects.map((proj) => (
                <div key={proj.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-sm font-bold text-[#F3F4F6]">
                      {proj.title}
                    </h4>
                    <span className="text-xs text-[#D1D5DB] font-medium">
                      {proj.category}
                    </span>
                  </div>
                  <ul className="space-y-1.5 pl-1">
                    {proj.bullets.map((b, i) => (
                      <li key={i} className="text-xs text-[#B8BEC7] flex items-start gap-2">
                        <span className="text-[#D1D5DB] font-bold leading-none mt-0.5">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Official Certifications & Coursework */}
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#D1D5DB] flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Certifications &amp; Professional Coursework</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PORTFOLIO_DATA.certifications.map((cert) => (
                <div key={cert.id} className="p-3.5 rounded-lg bg-[#22252A] border border-[#3A3E45] shadow-sm">
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-xs font-bold text-[#F3F4F6] leading-snug">
                      {cert.title}
                    </div>
                    {cert.isOfficialCredential && (
                      <span className="text-[10px] text-[#D1D5DB] font-medium shrink-0 flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3 text-[#D1D5DB]" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-[#8C93A0] mt-1">
                    {cert.issuer} {cert.date ? `· ${cert.date}` : ''}
                  </div>
                  {cert.credentialId && (
                    <div className="text-[10px] text-[#D1D5DB] font-mono mt-1 truncate">
                      ID: {cert.credentialId}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-4 border-t border-[#3A3E45] bg-[#22252A] flex items-center justify-between shrink-0">
          <span className="text-xs text-[#B8BEC7]">
            Available for immediate employment in Dubai, UAE
          </span>

          <div className="flex items-center gap-2">
            <a
              href="/Waleed_Al-Ali_CV.pdf"
              download="Waleed_Al-Ali_CV.pdf"
              className="px-4 py-2 text-xs font-semibold btn-silver-3d rounded-lg flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#B8BEC7] hover:text-[#F3F4F6] bg-[#1B1D22] hover:bg-[#2A2E35] border border-[#3A3E45] rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
