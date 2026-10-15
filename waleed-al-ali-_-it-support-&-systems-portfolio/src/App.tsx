/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { CertificationsSection } from './components/CertificationsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CertificateModal } from './components/CertificateModal';
import { CVModal } from './components/CVModal';
import { FluidRibbonBackground } from './components/FluidRibbonBackground';
import { CertificateItem } from './data/portfolioData';

export default function App() {
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
  const [isCVOpen, setIsCVOpen] = useState(false);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCertificate(null);
        setIsCVOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#F3F4F6] flex flex-col selection:bg-[#2B2F38] selection:text-[#F3F4F6] relative">
      {/* 3D Fluid Metallic Ribbon Animated Background */}
      <FluidRibbonBackground />

      {/* Top Navigation */}
      <Navbar onOpenCV={() => setIsCVOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-grow relative z-10">
        {/* Hero Section */}
        <Hero onOpenCV={() => setIsCVOpen(true)} />

        {/* About Me Section */}
        <AboutSection />

        {/* Technical Skills Section */}
        <SkillsSection />

        {/* Certifications & Technical Courses Section */}
        <CertificationsSection onSelectCertificate={(cert) => setSelectedCertificate(cert)} />

        {/* Hands-On Virtual Labs & Projects Section */}
        <ProjectsSection />

        {/* Contact Section */}
        <ContactSection onOpenCV={() => setIsCVOpen(true)} />
      </main>

      {/* Clean Footer */}
      <Footer onOpenCV={() => setIsCVOpen(true)} />

      {/* Certificate Viewer Lightbox Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />

      {/* Interactive CV Viewer Modal */}
      <CVModal
        isOpen={isCVOpen}
        onClose={() => setIsCVOpen(false)}
      />
    </div>
  );
}
