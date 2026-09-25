import React from 'react';

/**
 * Vanta / Aurora-inspired atmospheric mesh glow backdrop
 * Uses smooth, non-distracting radial gradients in Emerald Green & Warm Lime
 * Strictly NO grid background or repeated patterns.
 */
const AmbientMeshBackground = ({
  glowPrimary = 'bg-emerald-500/10',
  glowSecondary = 'bg-lime-500/8',
  glowAccent = 'bg-emerald-600/6',
  className = '',
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Primary Top-Center Ambient Glow */}
      <div
        className={`absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[500px] ${glowPrimary} blur-[150px] rounded-full animate-pulse-slow`}
      />

      {/* Secondary Right Ambient Glow (Warm Lime touch) */}
      <div
        className={`absolute top-1/3 -right-24 w-[550px] h-[400px] ${glowSecondary} blur-[140px] rounded-full animate-float-slow`}
      />

      {/* Third Accent Bottom-Left Glow */}
      <div
        className={`absolute -bottom-28 -left-20 w-[500px] h-[380px] ${glowAccent} blur-[130px] rounded-full animate-float-reverse`}
      />

      {/* Soft Center Lighting Node */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-400/5 blur-[120px] rounded-full"
      />
    </div>
  );
};

export default AmbientMeshBackground;

