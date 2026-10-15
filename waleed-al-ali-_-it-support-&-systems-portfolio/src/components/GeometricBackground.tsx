import React from 'react';

/**
 * Atmospheric lighting backdrop complementing the 3D Liquid Chrome background.
 * Provides subtle radial illumination and deep monochromatic contrast without
 * clashing geometric wireframes.
 */
export const GeometricBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
      {/* Soft upper overhead silver aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-gradient-to-b from-white/[0.03] via-transparent to-transparent blur-3xl" />
      
      {/* Right side portrait ambient glow */}
      <div className="absolute top-20 right-[10%] w-[480px] h-[480px] bg-gradient-to-tr from-white/[0.02] via-[#C5CBD3]/[0.03] to-transparent rounded-full blur-[100px]" />
      
      {/* Subtle bottom edge shadow boundary */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0D10] to-transparent" />
    </div>
  );
};
