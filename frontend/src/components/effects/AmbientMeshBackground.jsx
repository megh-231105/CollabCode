import React from 'react';

/**
 * Vanta / Aurora-inspired subtle atmospheric mesh glow backdrop
 * Smooth, non-distracting multi-radial gradients for tech SaaS ambiance
 */
const AmbientMeshBackground = ({
  glowPrimary = 'bg-emerald-500/12',
  glowSecondary = 'bg-cyan-500/10',
  glowAccent = 'bg-teal-500/8',
  className = '',
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Primary Top-Center Ambient Glow */}
      <div
        className={`absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[440px] ${glowPrimary} blur-[140px] rounded-full animate-pulse-slow`}
      />

      {/* Secondary Right Ambient Glow */}
      <div
        className={`absolute top-1/3 -right-20 w-[500px] h-[380px] ${glowSecondary} blur-[130px] rounded-full animate-float`}
      />

      {/* Third Accent Bottom-Left Glow */}
      <div
        className={`absolute -bottom-20 -left-20 w-[450px] h-[350px] ${glowAccent} blur-[120px] rounded-full`}
      />

      {/* Subtle Grid Lines Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"
      />
    </div>
  );
};

export default AmbientMeshBackground;
