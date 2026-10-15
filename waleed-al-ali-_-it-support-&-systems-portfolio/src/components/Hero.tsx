import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GeometricBackground } from './GeometricBackground';
import { 
  Download, 
  Mail, 
  MapPin, 
  FileText, 
  CheckCircle2, 
  Briefcase, 
  GraduationCap, 
  Languages, 
  Sparkles 
} from 'lucide-react';

interface HeroProps {
  onOpenCV: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCV }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-transparent">
      {/* 3D Blueprint & Isometric Wireframe Background */}
      <GeometricBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Two-Column Grid: Left (Typography, 3D Metas & CTAs) | Right (3D Framed Static Portrait) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Status Label with 3D metallic detail */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#22252A] border border-[#D1D5DB]/20 shadow-sm text-xs font-semibold tracking-wide text-[#F3F4F6]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D1D5DB] shadow-[0_0_8px_#D1D5DB]" />
              <MapPin className="w-3.5 h-3.5 text-[#D1D5DB] shrink-0" />
              <span>{PORTFOLIO_DATA.personal.locationShort}</span>
              <span className="text-[#4B515B]">·</span>
              <span className="text-[#B8BEC7]">Open for Opportunities</span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#F3F4F6] tracking-tight leading-[1.1] text-balance drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                {PORTFOLIO_DATA.personal.name}
              </h1>
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-8 bg-gradient-to-r from-[#D1D5DB] to-transparent rounded-full" />
                <p className="text-xl sm:text-2xl font-semibold text-[#D1D5DB] tracking-tight">
                  {PORTFOLIO_DATA.personal.role}
                </p>
              </div>
            </div>

            {/* Introduction Paragraph */}
            <p className="text-base sm:text-lg text-[#B8BEC7] leading-relaxed font-normal max-w-2xl text-pretty">
              {PORTFOLIO_DATA.personal.intro}
            </p>

            {/* Action Buttons with 3D Depth */}
            <div className="pt-2 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              {/* Primary 1: Download actual CV */}
              <a
                href="/Waleed_Al-Ali_CV.pdf"
                download="Waleed_Al-Ali_CV.pdf"
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold btn-silver-3d rounded-xl flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                <span>Download CV</span>
              </a>

              {/* Primary 2: Get in Touch (Smooth scroll to contact) */}
              <a
                href="#contact"
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold btn-graphite-3d rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#D1D5DB]" />
                <span>Get in Touch</span>
              </a>

              {/* Secondary Helper: Preview CV Modal */}
              <button
                onClick={onOpenCV}
                className="w-full sm:w-auto px-4 py-3.5 text-sm font-medium text-[#B8BEC7] hover:text-[#F3F4F6] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#D1D5DB]" />
                <span>Preview Resume</span>
              </button>
            </div>

            {/* Quick trust metrics with subtle 3D silver borders */}
            <div className="pt-5 flex flex-wrap items-center gap-y-2.5 gap-x-6 text-xs text-[#B8BEC7] border-t border-[#3A3E45]/80 w-full">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D1D5DB] shrink-0" />
                <span>CS Graduate (2026)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D1D5DB] shrink-0" />
                <span>Hands-on AD &amp; GPO Labs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D1D5DB] shrink-0" />
                <span>Cisco &amp; TryHackMe Certified</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Layered Metallic Portrait Frame (Static & Non-Editable) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[390px] sm:max-w-[430px]">
              
              {/* Layer 1: Ambient 3D Shadow Backdrop */}
              <div 
                className="absolute -inset-2 bg-gradient-to-tr from-white/[0.04] via-[#D1D5DB]/[0.05] to-transparent rounded-3xl blur-2xl opacity-70 pointer-events-none" 
                aria-hidden="true"
              />

              {/* Layer 2: Metallic Beveled Outer Enclosure with Blueprint Corners */}
              <div className="relative rounded-2xl p-[1.5px] bg-gradient-to-b from-white/30 via-[#3A3E45] to-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] blueprint-corner">
                
                {/* Layer 3: Inner Graphite Chamfer Frame */}
                <div className="rounded-[15px] bg-[#22252A] p-2.5 sm:p-3 border border-[#3A3E45]">
                  
                  {/* Layer 4: The Profile Image Container with 4:5 Aspect Ratio */}
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#1B1D22] flex items-center justify-center shadow-inner">
                    <img
                      src="/images/me.jpg"
                      alt="Waleed Al-Ali - IT Support & System Administration Professional"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.endsWith('/me.jpg')) {
                          target.src = '/me.jpg';
                        }
                      }}
                      className="w-full h-full object-cover object-top select-none pointer-events-none transition-transform duration-700 hover:scale-[1.01] filter grayscale contrast-[1.08] brightness-[0.98]"
                      loading="eager"
                    />

                    {/* Subtle 3D Depth Vignette & Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/95 via-transparent to-transparent pointer-events-none" />

                    {/* Top Specular Sheen (Reflecting 3D light) */}
                    <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />

                    {/* Layer 5: Floating Brushed Metallic Identity Badge */}
                    <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-[#0B0D10]/90 backdrop-blur-md border border-[#D1D5DB]/25 shadow-[0_8px_20px_rgba(0,0,0,0.6)]">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-[#F3F4F6] tracking-wide">
                            Waleed Al-Ali
                          </div>
                          <div className="text-[11px] text-[#B8BEC7] font-medium mt-0.5">
                            IT Support &amp; Systems
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#22252A] border border-[#D1D5DB]/25 text-[10px] text-[#F3F4F6] font-medium shadow-sm">
                          <MapPin className="w-3 h-3 text-[#D1D5DB]" />
                          <span>Dubai, UAE</span>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Full-Width Key Value Strip below Hero Split in 3D Cards */}
        <div className="mt-16 pt-8 border-t border-[#3A3E45]/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 rounded-xl card-3d flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#1B1D22] border border-[#3A3E45] flex items-center justify-center text-[#D1D5DB] shrink-0 mt-0.5 shadow-inner">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#F3F4F6]">Education</div>
              <div className="text-xs text-[#B8BEC7] mt-0.5">B.Sc. in Computer Science</div>
              <div className="text-[11px] text-[#8C93A0]">Al-Balqa Applied University (2026)</div>
            </div>
          </div>

          <div className="p-4 rounded-xl card-3d flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#1B1D22] border border-[#3A3E45] flex items-center justify-center text-[#D1D5DB] shrink-0 mt-0.5 shadow-inner">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#F3F4F6]">Location &amp; Availability</div>
              <div className="text-xs text-[#B8BEC7] mt-0.5">Dubai, United Arab Emirates</div>
              <div className="text-[11px] text-[#D1D5DB] font-medium">Ready for Immediate Hire</div>
            </div>
          </div>

          <div className="p-4 rounded-xl card-3d flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#1B1D22] border border-[#3A3E45] flex items-center justify-center text-[#D1D5DB] shrink-0 mt-0.5 shadow-inner">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#F3F4F6]">Target Roles</div>
              <div className="text-xs text-[#B8BEC7] mt-0.5">IT Support &amp; Help Desk</div>
              <div className="text-[11px] text-[#8C93A0]">Junior System Administration</div>
            </div>
          </div>

          <div className="p-4 rounded-xl card-3d flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#1B1D22] border border-[#3A3E45] flex items-center justify-center text-[#D1D5DB] shrink-0 mt-0.5 shadow-inner">
              <Languages className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#F3F4F6]">Language Proficiency</div>
              <div className="text-xs text-[#B8BEC7] mt-0.5">Arabic (Native)</div>
              <div className="text-[11px] text-[#8C93A0]">English (Professional Working)</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
