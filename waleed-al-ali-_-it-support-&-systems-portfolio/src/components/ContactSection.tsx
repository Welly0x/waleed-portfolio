import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Copy, 
  Check, 
  ExternalLink, 
  Clock 
} from 'lucide-react';

interface ContactSectionProps {
  onOpenCV: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenCV }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [dubaiTime, setDubaiTime] = useState<string>('');

  useEffect(() => {
    const updateDubaiTime = () => {
      const now = new Date();
      // Dubai is UTC+4
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Dubai',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setDubaiTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateDubaiTime();
    const timer = setInterval(updateDubaiTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative border-t border-[#3A3E45]/80 bg-[#17191C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with 3D Architectural Marker */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#D1D5DB] mb-2 px-2.5 py-0.5 rounded bg-[#22252A] border border-[#D1D5DB]/20 shadow-sm">
            <span>05</span>
            <span className="text-[#3A3E45]">/</span>
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F3F4F6] tracking-tight">
            Contact &amp; Professional Inquiries
          </h2>
          <div className="flex items-center gap-2 mt-3">
            <div className="h-[2px] w-12 bg-[#D1D5DB]" />
            <div className="h-[1px] w-24 bg-[#3A3E45]" />
          </div>
          <p className="text-[#B8BEC7] text-base sm:text-lg mt-4 leading-relaxed font-normal">
            {PORTFOLIO_DATA.personal.closingLine}
          </p>
        </div>

        {/* Contact Cards Grid in 3D Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Email */}
          <div className="p-6 rounded-2xl card-3d flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#1B1D22] border border-[#3A3E45] flex items-center justify-center text-[#D1D5DB] mb-5 shadow-inner group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#8C93A0] mb-1">
                Direct Email
              </div>
              <a
                href={PORTFOLIO_DATA.personal.emailHref}
                className="text-sm sm:text-base font-bold text-[#F3F4F6] hover:text-white transition-colors break-all"
              >
                {PORTFOLIO_DATA.personal.email}
              </a>
              <p className="text-xs text-[#B8BEC7] mt-2">
                Fastest channel for recruiter inquiries and interview scheduling.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#3A3E45]/80 flex items-center justify-between">
              <a
                href={PORTFOLIO_DATA.personal.emailHref}
                className="text-xs font-semibold text-[#D1D5DB] hover:text-white flex items-center gap-1"
              >
                <span>Compose Mail</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={() => copyToClipboard(PORTFOLIO_DATA.personal.email, 'email')}
                className="px-2.5 py-1 text-xs text-[#B8BEC7] hover:text-[#F3F4F6] bg-[#1B1D22] hover:bg-[#2A2E35] border border-[#3A3E45] rounded transition-colors flex items-center gap-1 cursor-pointer"
                title="Copy email to clipboard"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3 h-3 text-[#D1D5DB]" />
                    <span className="text-[11px] text-[#D1D5DB]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span className="text-[11px]">Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Card 2: Phone */}
          <div className="p-6 rounded-2xl card-3d flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#1B1D22] border border-[#3A3E45] flex items-center justify-center text-[#D1D5DB] mb-5 shadow-inner group-hover:scale-105 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#8C93A0] mb-1">
                Phone &amp; WhatsApp
              </div>
              <a
                href={PORTFOLIO_DATA.personal.phoneHref}
                className="text-base sm:text-lg font-bold text-[#F3F4F6] hover:text-white transition-colors font-mono"
              >
                {PORTFOLIO_DATA.personal.phone}
              </a>
              <p className="text-xs text-[#B8BEC7] mt-2">
                Available for phone screenings, voice calls, and messages.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#3A3E45]/80 flex items-center justify-between">
              <a
                href={PORTFOLIO_DATA.personal.phoneHref}
                className="text-xs font-semibold text-[#D1D5DB] hover:text-white flex items-center gap-1"
              >
                <span>Call Directly</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={() => copyToClipboard(PORTFOLIO_DATA.personal.phone, 'phone')}
                className="px-2.5 py-1 text-xs text-[#B8BEC7] hover:text-[#F3F4F6] bg-[#1B1D22] hover:bg-[#2A2E35] border border-[#3A3E45] rounded transition-colors flex items-center gap-1 cursor-pointer"
                title="Copy phone to clipboard"
              >
                {copiedPhone ? (
                  <>
                    <Check className="w-3 h-3 text-[#D1D5DB]" />
                    <span className="text-[11px] text-[#D1D5DB]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span className="text-[11px]">Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Card 3: LinkedIn */}
          <div className="p-6 rounded-2xl card-3d flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#1B1D22] border border-[#3A3E45] flex items-center justify-center text-[#D1D5DB] mb-5 shadow-inner group-hover:scale-105 transition-transform">
                <Linkedin className="w-6 h-6" />
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#8C93A0] mb-1">
                LinkedIn Profile
              </div>
              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-sm sm:text-base font-bold text-[#F3F4F6] hover:text-white transition-colors line-clamp-1"
              >
                in/waleed-al-ali
              </a>
              <p className="text-xs text-[#B8BEC7] mt-2">
                Connect professionally, review endorsements, and view network updates.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#3A3E45]/80">
              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-[#D1D5DB] hover:text-white flex items-center gap-1.5"
              >
                <span>View LinkedIn</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Card 4: Location & Dubai Local Time */}
          <div className="p-6 rounded-2xl card-3d flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#1B1D22] border border-[#3A3E45] flex items-center justify-center text-[#D1D5DB] mb-5 shadow-inner group-hover:scale-105 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#8C93A0] mb-1">
                Current Location
              </div>
              <div className="text-base font-bold text-[#F3F4F6]">
                {PORTFOLIO_DATA.personal.location}
              </div>
              <p className="text-xs text-[#D1D5DB] mt-1 font-medium">
                Immediate local availability
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#3A3E45]/80 flex items-center justify-between text-xs text-[#B8BEC7] font-mono">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D1D5DB]" />
                <span>GST (UTC+4):</span>
              </span>
              <span className="text-[#F3F4F6] font-semibold tabular-nums">{dubaiTime || 'Loading...'}</span>
            </div>
          </div>

        </div>

        {/* Action Callout Box with 3D Depth */}
        <div className="mt-12 p-8 rounded-2xl card-3d flex flex-col md:flex-row items-center justify-between gap-6 blueprint-corner">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-xl font-bold text-[#F3F4F6] tracking-tight">
              Ready to Discuss an Opportunity?
            </h3>
            <p className="text-sm text-[#B8BEC7] max-w-xl">
              I am actively interviewing for IT Support, Help Desk, IT Assistant, and Junior System Administration positions across Dubai and the UAE.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenCV}
              className="px-5 py-2.5 text-xs font-semibold btn-graphite-3d rounded-xl cursor-pointer"
            >
              View Full CV
            </button>

            <a
              href={PORTFOLIO_DATA.personal.emailHref}
              className="px-6 py-2.5 text-xs font-semibold btn-silver-3d rounded-xl flex items-center gap-2 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Send An Email</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
