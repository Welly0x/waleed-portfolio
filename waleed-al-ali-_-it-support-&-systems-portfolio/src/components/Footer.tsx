import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ArrowUp, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenCV: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCV }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#131518] border-t border-[#3A3E45]/80 text-[#B8BEC7] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#3A3E45]/60">
          
          {/* Brand Info with 3D Monogram and Details */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1">
            <span className="text-lg font-bold text-[#F3F4F6] tracking-tight">
              {PORTFOLIO_DATA.personal.name}
            </span>
            <p className="text-xs text-[#8C93A0]">
              Computer Science Graduate · IT Support &amp; Junior System Administration
            </p>
            <div className="flex items-center gap-1.5 text-xs text-[#D1D5DB] pt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Based in Dubai, United Arab Emirates</span>
            </div>
          </div>

          {/* Quick Nav Anchors */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-[#B8BEC7]">
            <a href="#about" className="hover:text-[#F3F4F6] transition-colors">
              About
            </a>
            <a href="#skills" className="hover:text-[#F3F4F6] transition-colors">
              Skills
            </a>
            <a href="#certifications" className="hover:text-[#F3F4F6] transition-colors">
              Certifications
            </a>
            <a href="#projects" className="hover:text-[#F3F4F6] transition-colors">
              Labs
            </a>
            <a href="#contact" className="hover:text-[#F3F4F6] transition-colors">
              Contact
            </a>
            <button
              onClick={onOpenCV}
              className="text-[#D1D5DB] hover:text-white transition-colors cursor-pointer"
            >
              Resume
            </button>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl btn-graphite-3d text-[#B8BEC7] hover:text-white transition-all cursor-pointer flex items-center gap-2 text-xs"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C93A0] text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} {PORTFOLIO_DATA.personal.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[#B8BEC7]">
            <a 
              href={PORTFOLIO_DATA.personal.linkedin} 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-[#F3F4F6] transition-colors"
            >
              LinkedIn
            </a>
            <span>·</span>
            <a 
              href={PORTFOLIO_DATA.personal.emailHref} 
              className="hover:text-[#F3F4F6] transition-colors"
            >
              Email
            </a>
            <span>·</span>
            <a 
              href={`${import.meta.env.BASE_URL}Waleed_Al-Ali_CV.pdf`} 
              download="Waleed_Al-Ali_CV.pdf" 
              className="hover:text-[#F3F4F6] transition-colors"
            >
              Download CV
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
