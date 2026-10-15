import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Download, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenCV: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCV }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Labs & Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0D10]/92 backdrop-blur-md border-b border-[#23272F]/90 shadow-2xl shadow-black/70'
          : 'bg-[#0B0D10]/30 backdrop-blur-xs border-b border-white/[0.04]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar 3-Zone Contract: Zone 1 (Wordmark) — Zone 2 (Nav links) — Zone 3 (CTA) */}
        <div className="flex items-center justify-between h-20 gap-8">
          
          {/* Zone 1: Wordmark with 3D Metallic Monogram */}
          <a
            href="#"
            className="flex items-center gap-3 group whitespace-nowrap shrink-0"
            aria-label="Waleed Al-Ali Portfolio Home"
          >
            <div className="flex flex-col">
              <span className="text-base font-bold text-[#F3F4F6] tracking-tight group-hover:text-white transition-colors">
                {PORTFOLIO_DATA.personal.name}
              </span>
              <span className="text-xs text-[#B8BEC7] font-normal">
                IT Support &amp; Systems
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (single line, unboxed, hover underline in silver) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#B8BEC7]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="whitespace-nowrap shrink-0 hover:text-[#F3F4F6] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#D1D5DB] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action CTA with 3D Buttons */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenCV}
              className="px-3.5 py-2 text-xs font-semibold btn-graphite-3d rounded-lg flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Preview CV</span>
            </button>

            <a
              href={`${import.meta.env.BASE_URL}Waleed_Al-Ali_CV.pdf`}
              download="Waleed_Al-Ali_CV.pdf"
              className="px-4 py-2 text-xs font-semibold btn-silver-3d rounded-lg flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CV</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="/Waleed_Al-Ali_CV.pdf"
              download="Waleed_Al-Ali_CV.pdf"
              className="p-2 text-[#D1D5DB] hover:text-[#F3F4F6] bg-[#22252A] border border-[#3A3E45] rounded-lg text-xs"
              aria-label="Download CV"
            >
              <Download className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#B8BEC7] hover:text-[#F3F4F6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D1D5DB] rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0E1116] border-b border-[#23272F] px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-[#AEB4BE] hover:text-[#F3F4F6] hover:bg-[#1A1D23] rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-[#23272F] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCV();
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-[#F3F4F6] bg-[#16191F] border border-[#2A2E36] rounded-lg"
            >
              Preview Full CV
            </button>
            <a
              href="/Waleed_Al-Ali_CV.pdf"
              download="Waleed_Al-Ali_CV.pdf"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-sm font-semibold btn-silver-3d rounded-lg flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download CV (PDF)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
