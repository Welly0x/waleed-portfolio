import React, { useState } from 'react';
import { CertificateItem } from '../data/portfolioData';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Copy, 
  Check, 
  Award, 
  Clock, 
  Calendar, 
  Building2, 
  Printer 
} from 'lucide-react';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!certificate) return null;

  const handleCopyId = () => {
    if (certificate.credentialId) {
      navigator.clipboard.writeText(certificate.credentialId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const isLinkedIn = certificate.issuer.includes('LinkedIn');
  const isTryHackMe = certificate.issuer.includes('TryHackMe');

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
    >
      <div 
        className="relative w-full max-w-2xl bg-[#1E2126] border border-[#D1D5DB]/30 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden max-h-[90vh] flex flex-col blueprint-corner"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#3A3E45] bg-[#22252A]">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-[#D1D5DB]" />
            <span className="text-sm font-semibold text-[#F3F4F6]">Credential Verification</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#B8BEC7] hover:text-[#F3F4F6] rounded-lg hover:bg-[#2A2E35] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Certificate Visual Frame in 3D Charcoal & Silver */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Certificate Authentic Layout Container */}
          <div className="relative rounded-xl border border-[#3A3E45] bg-[#17191C] p-6 sm:p-8 shadow-inner overflow-hidden">
            
            {/* Header branding in subtle monochrome */}
            <div className="flex items-start justify-between border-b border-[#3A3E45] pb-5">
              <div className="flex items-center gap-3">
                {isLinkedIn ? (
                  <div className="flex items-center gap-1.5 font-bold text-lg tracking-tight text-[#F3F4F6]">
                    <span>Linked</span>
                    <span className="bg-[#2D3138] border border-[#D1D5DB]/30 text-[#F3F4F6] text-xs px-1.5 py-0.5 rounded font-black">in</span>
                    <span className="text-[#B8BEC7] text-sm font-semibold ml-1">Learning</span>
                  </div>
                ) : isTryHackMe ? (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-[#22252A] border border-[#D1D5DB]/30 flex items-center justify-center font-mono font-bold text-[#F3F4F6] text-xs">
                      THM
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#F3F4F6] tracking-tight">TryHackMe</div>
                      <div className="text-[10px] text-[#8C93A0] font-mono">Hands-on Cyber Security</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm font-bold text-[#D1D5DB]">
                    {certificate.issuer}
                  </div>
                )}
              </div>

              {certificate.isOfficialCredential && (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D1D5DB] bg-[#22252A] border border-[#D1D5DB]/30 px-2.5 py-1 rounded-full shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D1D5DB]" />
                  <span>Verified Credential</span>
                </div>
              )}
            </div>

            {/* Certificate Body */}
            <div className="py-6 text-center space-y-3">
              <div className="text-[11px] font-mono font-medium tracking-widest uppercase text-[#8C93A0]">
                Certificate of Completion
              </div>
              <div className="text-xs text-[#B8BEC7]">
                This is to acknowledge that
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#F3F4F6] tracking-tight py-1 font-serif">
                Waleed Al-Ali
              </div>
              <div className="text-xs text-[#B8BEC7]">
                has successfully completed the curriculum for
              </div>
              <h3 id="cert-modal-title" className="text-lg sm:text-xl font-bold text-[#D1D5DB] max-w-lg mx-auto tracking-tight pt-1">
                {certificate.title}
              </h3>
            </div>

            {/* Certificate Metadata strip */}
            <div className="pt-4 border-t border-[#3A3E45] grid grid-cols-2 sm:grid-cols-3 gap-3 text-left text-xs text-[#B8BEC7]">
              {certificate.date && (
                <div className="space-y-0.5">
                  <div className="text-[10px] uppercase text-[#8C93A0] font-semibold flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#D1D5DB]" />
                    <span>Completion Date</span>
                  </div>
                  <div className="font-medium text-[#F3F4F6]">{certificate.date}</div>
                </div>
              )}

              {certificate.duration && (
                <div className="space-y-0.5">
                  <div className="text-[10px] uppercase text-[#8C93A0] font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#D1D5DB]" />
                    <span>Duration</span>
                  </div>
                  <div className="font-medium text-[#F3F4F6]">{certificate.duration}</div>
                </div>
              )}

              <div className="space-y-0.5 col-span-2 sm:col-span-1">
                <div className="text-[10px] uppercase text-[#8C93A0] font-semibold flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-[#D1D5DB]" />
                  <span>Issuing Body</span>
                </div>
                <div className="font-medium text-[#F3F4F6]">{certificate.issuer}</div>
              </div>
            </div>

            {/* Top Skills Tagged on Certificate */}
            {certificate.skills.length > 0 && (
              <div className="mt-5 pt-4 border-t border-[#3A3E45]">
                <div className="text-[11px] font-semibold text-[#8C93A0] mb-2">
                  Top Skills Covered:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {certificate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded bg-[#22252A] text-[#B8BEC7] text-xs border border-[#3A3E45]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Signatory / Authentic Footer */}
            <div className="mt-6 pt-4 border-t border-[#3A3E45] flex flex-wrap items-end justify-between gap-4 text-left">
              <div>
                <div className="font-serif italic text-base text-[#B8BEC7] select-none">
                  {isLinkedIn ? "Shea Hanson" : isTryHackMe ? "Ben Spring & Ashu Savani" : "Authorized Instructor"}
                </div>
                <div className="text-[10px] text-[#8C93A0] font-mono">
                  {isLinkedIn ? "Head of Learning Content Strategy, LinkedIn" : isTryHackMe ? "CEO & CTO, TryHackMe" : "Verified Instructor"}
                </div>
              </div>

              {certificate.credentialId && (
                <div className="text-right">
                  <div className="text-[10px] text-[#8C93A0] font-mono">Credential ID</div>
                  <div className="font-mono text-xs text-[#D1D5DB] select-all">
                    {certificate.credentialId}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Description & Verification Actions */}
          <div className="space-y-4">
            <p className="text-xs text-[#B8BEC7] leading-relaxed">
              {certificate.description}
            </p>

            {certificate.credentialId && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#22252A] border border-[#3A3E45]">
                <div className="text-xs font-mono text-[#B8BEC7] truncate max-w-[280px] sm:max-w-md">
                  <span className="text-[#8C93A0]">ID: </span>
                  <span className="text-[#F3F4F6]">{certificate.credentialId}</span>
                </div>
                <button
                  onClick={handleCopyId}
                  className="px-3 py-1 text-xs font-medium text-[#F3F4F6] hover:text-white bg-[#1B1D22] hover:bg-[#2A2E35] border border-[#3A3E45] rounded transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer shadow-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#D1D5DB]" />
                      <span className="text-[#D1D5DB]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy ID</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-[#3A3E45] bg-[#22252A] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-semibold btn-graphite-3d rounded-lg flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print View</span>
          </button>

          <div className="flex items-center gap-2">
            {certificate.verifyUrl && (
              <a
                href={certificate.verifyUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-xs font-semibold btn-silver-3d rounded-lg flex items-center gap-1.5"
              >
                <span>Verify on {certificate.issuer}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#B8BEC7] hover:text-[#F3F4F6] bg-transparent hover:bg-[#1B1D22] rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
