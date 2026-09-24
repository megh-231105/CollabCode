import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import {
  Code2,
  ShieldCheck,
  DoorOpen,
  Layers,
  Bookmark,
  Users2,
  Sliders,
  Terminal,
  Play,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  GitBranch,
  Cpu,
  Globe
} from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Secure Authentication',
      desc: 'JWT-based secure user access with hashed passwords and protected sessions.',
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30',
    },
    {
      icon: DoorOpen,
      title: 'Coding Rooms',
      desc: 'Create instant collaborative coding rooms or join team sessions with unique Room IDs.',
      color: 'from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/30',
    },
    {
      icon: Layers,
      title: 'Multi-Language',
      desc: 'Seamlessly practice and build in C, C++, Java, Python, and modern JavaScript.',
      color: 'from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30',
    },
    {
      icon: Bookmark,
      title: 'Save Your Code',
      desc: 'Keep your best algorithms and training exercises organized in your personal catalog.',
      color: 'from-indigo-500/20 to-purple-500/10 text-indigo-400 border-indigo-500/30',
    },
    {
      icon: Users2,
      title: 'User & Admin Roles',
      desc: 'Role-based access control separating regular developer workspaces from moderation tools.',
      color: 'from-purple-500/20 to-pink-500/10 text-purple-400 border-purple-500/30',
    },
    {
      icon: Sliders,
      title: 'Admin Dashboard',
      desc: 'Dedicated oversight panel to manage registered users, monitor active rooms, and inspect telemetry.',
      color: 'from-rose-500/20 to-red-500/10 text-rose-400 border-rose-500/30',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/15 blur-[130px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Pill Tag */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-xs font-semibold text-emerald-400 mb-6 shadow-inner animate-fadeIn">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Modern Collaborative Development</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6 leading-[1.15]">
              Code. Collaborate.{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Create.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed font-normal">
              A simple collaborative coding workspace for students and developers.
              Real-time multi-language practice, room management, and code cataloging in one unified platform.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl text-base shadow-xl shadow-emerald-500/25 transition transform hover:-translate-y-0.5"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold rounded-xl text-base transition"
              >
                <span>Login</span>
              </Link>
            </div>
          </div>

          {/* Visual Code Editor Graphic (Pure CSS & Tailwind) */}
          <div className="mt-16 max-w-5xl mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur">
            {/* Editor Window Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                <span className="ml-3 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  collabcode_workspace.cpp
                </span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  2 Members Live
                </span>
                <span className="bg-slate-800 px-2.5 py-1 rounded text-emerald-300 font-mono text-[11px]">
                  C++ 17
                </span>
              </div>
            </div>

            {/* Editor Body Simulator */}
            <div className="grid grid-cols-1 md:grid-cols-12 font-mono text-xs sm:text-sm">
              {/* Code Area */}
              <div className="md:col-span-8 p-5 bg-slate-950/70 border-r border-slate-800 text-slate-300 space-y-1 overflow-x-auto">
                <div className="flex gap-4">
                  <span className="text-slate-600 select-none w-5 text-right">1</span>
                  <span className="text-purple-400">#include</span> <span className="text-emerald-300">&lt;iostream&gt;</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-600 select-none w-5 text-right">2</span>
                  <span className="text-purple-400">#include</span> <span className="text-emerald-300">&lt;vector&gt;</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-600 select-none w-5 text-right">3</span>
                  <span className="text-blue-400">using namespace</span> <span className="text-amber-300">std</span>;
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-600 select-none w-5 text-right">4</span>
                  <span></span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-600 select-none w-5 text-right">5</span>
                  <span className="text-blue-400">int</span> <span className="text-yellow-300 font-bold">main</span>() &#123;
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-600 select-none w-5 text-right">6</span>
                  <span className="pl-4 text-slate-400">// CollabCode Real-time Session</span>
                </div>
                <div className="flex gap-4 bg-emerald-500/10 -mx-5 px-5 py-0.5 border-l-2 border-emerald-400">
                  <span className="text-slate-600 select-none w-5 text-right">7</span>
                  <span className="pl-4 text-emerald-300">cout &lt;&lt; <span className="text-amber-200">"Code. Collaborate. Create."</span> &lt;&lt; endl;</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-600 select-none w-5 text-right">8</span>
                  <span className="pl-4 text-blue-400">return</span> <span className="text-orange-400">0</span>;
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-600 select-none w-5 text-right">9</span>
                  <span>&#125;</span>
                </div>
              </div>

              {/* Sidebar Info in Graphic */}
              <div className="md:col-span-4 p-5 bg-slate-900/60 flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Active Room Members
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                        <span className="text-slate-200 font-sans text-xs font-semibold">Meghana (You)</span>
                      </div>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-sans">
                        Host
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                        <span className="text-slate-200 font-sans text-xs font-semibold">Rahul</span>
                      </div>
                      <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-sans">
                        Member
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <p className="text-[11px] font-sans text-slate-400">Room Status</p>
                  <p className="text-xs font-mono font-bold text-emerald-400 mt-0.5">ROOM ID: ABC123</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-28 bg-slate-900/40 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
              Everything You Need
            </h2>
            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Powerful Features for Developers
            </h3>
            <p className="mt-3 text-slate-400 text-sm sm:text-base">
              Explore the core capabilities built for modern academic and collaborative programming sessions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition hover:-translate-y-1 duration-200 shadow-lg group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} border flex items-center justify-center mb-5 group-hover:scale-105 transition`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 tracking-tight">
                    {feature.title}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-950 border-t border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
            <Code2 className="w-6 h-6" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
            Built for Students, Engineers & Pair Programmers
          </h3>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-8">
            CollabCode is crafted as a modular Full Stack Development project, blending modern React ergonomics with clean architecture and developer tooling.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition shadow-lg shadow-emerald-500/20"
          >
            <span>Launch CollabCode Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-10 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-slate-300">CollabCode</span>
            <span>— Collaborative Code Editor</span>
          </div>
          <p className="text-slate-400">© 2026 CollabCode. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
