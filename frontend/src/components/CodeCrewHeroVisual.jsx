import React, { useState, useEffect } from 'react';
import {
  Code2,
  Play,
  Terminal,
  Users,
  CheckCircle2,
  Sparkles,
  Zap,
  ArrowRight,
  Shield,
  Layers,
  Cpu
} from 'lucide-react';

/**
 * ThreeUI & React Bits-inspired Animated Crew Collaboration Visual
 * Visualizes: Multiple connected developers converging on one central CodeCrew Room
 * with animated connection lines, orbiting crew member nodes, floating code tags,
 * and an animated WRITE -> RUN -> OUTPUT terminal lifecycle.
 */
const CodeCrewHeroVisual = () => {
  const [activeStep, setActiveStep] = useState(0); // 0: WRITE, 1: RUN, 2: OUTPUT

  const steps = [
    { label: 'WRITE', color: 'text-lime-400 bg-lime-500/15 border-lime-500/30' },
    { label: 'RUN', color: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30' },
    { label: 'OUTPUT', color: 'text-emerald-300 bg-emerald-400/20 border-emerald-400/40' },
  ];

  // Automated step cycle (WRITE -> RUN -> OUTPUT -> repeat)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const crewMembers = [
    {
      id: 1,
      name: 'Elena',
      role: 'Host',
      lang: 'Python',
      avatar: 'E',
      color: 'from-emerald-500 to-teal-400',
      pos: 'top-2 -left-3 sm:-top-4 sm:left-4',
      badgePos: 'bottom-0 right-0',
      action: 'Writing solve()',
    },
    {
      id: 2,
      name: 'Marcus',
      role: 'Crew',
      lang: 'C++',
      avatar: 'M',
      color: 'from-lime-400 to-emerald-500',
      pos: 'top-1 -right-3 sm:-top-3 sm:right-6',
      badgePos: 'bottom-0 left-0',
      action: 'Reviewing logic',
    },
    {
      id: 3,
      name: 'Kai',
      role: 'Crew',
      lang: 'JavaScript',
      avatar: 'K',
      color: 'from-emerald-400 to-lime-300',
      pos: '-bottom-3 -left-2 sm:-bottom-4 sm:left-6',
      badgePos: 'top-0 right-0',
      action: 'Adding test cases',
    },
    {
      id: 4,
      name: 'You',
      role: 'Dev',
      lang: 'Ready',
      avatar: 'U',
      color: 'from-lime-500 to-emerald-400',
      pos: '-bottom-3 -right-2 sm:-bottom-4 sm:right-6',
      badgePos: 'top-0 left-0',
      action: 'Executing workspace',
    },
  ];

  return (
    <div className="relative w-full max-w-xl mx-auto py-6 sm:py-8 select-none">
      {/* Subtle Radial Glow Backing */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-emerald-500/15 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-lime-500/10 blur-[90px] rounded-full pointer-events-none" />

      {/* Floating Code Snippets / Geometry Particles */}
      <div className="absolute -top-6 left-1/3 px-2 py-1 rounded-md bg-charcoal-900/90 border border-emerald-500/30 text-[11px] font-mono text-emerald-400 shadow-lg shadow-emerald-500/10 animate-float-slow hidden sm:flex items-center gap-1">
        <span className="text-lime-400">&lt;/&gt;</span> const crew = [&apos;Elena&apos;, &apos;You&apos;]
      </div>
      <div className="absolute top-1/2 -left-8 px-2.5 py-1 rounded-md bg-charcoal-900/90 border border-lime-500/30 text-[10px] font-mono text-lime-300 shadow-lg animate-floatReverse hidden sm:flex items-center gap-1">
        <span>&#123; &#125;</span> fn solve() =&gt; 01
      </div>
      <div className="absolute top-2/3 -right-6 px-2 py-0.5 rounded-md bg-charcoal-900/90 border border-emerald-500/30 text-[10px] font-mono text-emerald-300 shadow-lg animate-float hidden sm:flex items-center gap-1">
        <span>=&gt;</span> exit(0) • 42ms
      </div>

      {/* Main Central Card Container (The Central CodeCrew Room) */}
      <div className="relative z-10 glass-card bg-charcoal-900/90 border border-charcoal-700/80 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-emerald-500/40">
        {/* Room Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-charcoal-750">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-lime-400 flex items-center justify-center text-charcoal-950 shadow-md shadow-emerald-500/20">
              <Users className="w-4 h-4 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                  Crew Room <span className="text-emerald-400">#CREW-709</span>
                </h3>
                <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping" />
              </div>
              <p className="text-[10px] font-mono text-slate-400">Collaborative Workspace • 4 Members</p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 bg-charcoal-950 px-2.5 py-1 rounded-lg border border-charcoal-750">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span className="text-[11px] font-mono font-bold text-emerald-300">Python 3.11</span>
          </div>
        </div>

        {/* Step Indicator Flow (WRITE -> RUN -> OUTPUT) */}
        <div className="py-3.5 flex items-center justify-between gap-1 border-b border-charcoal-750">
          <div className="flex items-center space-x-1 sm:space-x-2">
            {steps.map((step, idx) => {
              const isCurrent = activeStep === idx;
              return (
                <div key={idx} className="flex items-center">
                  <button
                    onClick={() => setActiveStep(idx)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono font-bold tracking-wider transition-all duration-300 cursor-pointer ${
                      isCurrent
                        ? `${step.color} shadow-sm`
                        : 'text-slate-500 hover:text-slate-300 bg-charcoal-950 border border-charcoal-800'
                    }`}
                  >
                    {idx + 1}. {step.label}
                  </button>
                  {idx < steps.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-charcoal-600 mx-1 sm:mx-1.5 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            <Sparkles className="w-3 h-3 mr-1" />
            Live Sync
          </div>
        </div>

        {/* Dynamic Code / Terminal Viewport */}
        <div className="mt-3.5 bg-charcoal-950 rounded-2xl border border-charcoal-800 p-4 font-mono text-xs relative overflow-hidden min-h-[160px] flex flex-col justify-between">
          {activeStep === 0 && (
            <div className="space-y-1.5 text-slate-300 animate-fadeIn">
              <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-charcoal-850 pb-1.5 mb-2">
                <span className="text-lime-400 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                  workspace.py
                </span>
                <span>Elena is editing line 4...</span>
              </div>
              <p className="text-slate-500"># CodeCrew Shared Algorithm Workspace</p>
              <p className="text-emerald-400">
                <span className="text-lime-300">def</span> solve_crew_problem(members, target):
              </p>
              <p className="pl-4 text-slate-300">
                total = <span className="text-lime-300">sum</span>(members)
              </p>
              <p className="pl-4 text-emerald-300 bg-emerald-500/10 -mx-4 px-4 py-0.5 border-l-2 border-lime-400">
                <span className="text-lime-300">return</span> total * target # Handled by Marcus
              </p>
              <p className="text-slate-500 pl-4"># Real-time synchronization active</p>
            </div>
          )}

          {activeStep === 1 && (
            <div className="space-y-2 text-slate-300 animate-fadeIn my-auto text-center py-4">
              <div className="w-10 h-10 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 animate-bounce">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>
              <p className="text-xs font-bold text-white tracking-tight">Compiling In Cloud Sandbox</p>
              <p className="text-[11px] text-slate-400 font-sans">
                Transmitting solution to execution engine...
              </p>
              <div className="w-40 h-1 bg-charcoal-800 rounded-full mx-auto overflow-hidden">
                <div className="w-3/4 h-full bg-gradient-to-r from-emerald-400 to-lime-400 rounded-full animate-pulse" />
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-2 animate-fadeIn">
              <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-charcoal-850 pb-1.5 mb-1.5">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Terminal className="w-3 h-3" /> Execution Terminal
                </span>
                <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
                  Status: 0 (Success)
                </span>
              </div>
              <div className="bg-charcoal-900/90 rounded-xl p-2.5 border border-charcoal-800 text-[11px] text-slate-200 space-y-1">
                <p className="text-slate-400">$ python workspace.py</p>
                <p className="text-emerald-300 font-bold">&gt;&gt;&gt; [42] Solution Verified for Crew</p>
                <p className="text-lime-400">&gt;&gt;&gt; All 4 unit test cases passed in 0.04s</p>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                <span>Output saved to room</span>
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3 h-3" /> Ready to Save
                </span>
              </div>
            </div>
          )}

          {/* Bottom Execution Pulse Bar */}
          <div className="mt-3 pt-2.5 border-t border-charcoal-850 flex items-center justify-between text-[10px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-semibold">Live Room Engine</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lime-400 font-mono font-bold">2.4k ops/s</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">0 latency</span>
            </div>
          </div>
        </div>
      </div>

      {/* Orbiting / Surrounding Crew Member Nodes */}
      {crewMembers.map((member) => (
        <div
          key={member.id}
          className={`absolute ${member.pos} z-20 flex items-center space-x-2 bg-charcoal-900/95 border border-charcoal-700 hover:border-emerald-400/60 p-2 sm:p-2.5 rounded-2xl shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-105 group cursor-default`}
        >
          {/* Avatar with gradient */}
          <div className="relative">
            <div
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr ${member.color} flex items-center justify-center text-charcoal-950 font-black text-xs shadow-md`}
            >
              {member.avatar}
            </div>
            <span
              className={`absolute ${member.badgePos} w-2 h-2 rounded-full bg-lime-400 border border-charcoal-950 animate-pulse`}
            />
          </div>

          {/* Member Details */}
          <div className="text-left leading-tight hidden xs:block">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition">
                {member.name}
              </span>
              <span className="text-[9px] font-mono px-1 rounded bg-charcoal-800 text-slate-400 border border-charcoal-700">
                {member.role}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 block font-mono">{member.action}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CodeCrewHeroVisual;
