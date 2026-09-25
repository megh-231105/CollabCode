import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import ConstellationNetwork from '../components/effects/ConstellationNetwork';
import AmbientMeshBackground from '../components/effects/AmbientMeshBackground';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
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
  Globe,
  Database,
  Lock,
  Share2,
  Server,
  Zap,
  ChevronRight,
  ArrowDown
} from 'lucide-react';

const Landing = () => {
  const { currentUser, rooms } = useApp() || {};
  const { isAuthenticated } = useAuth();
  const [selectedDemoLang, setSelectedDemoLang] = useState('C++');

  // Dynamic preview information based on logged-in user and real rooms
  const activeUser = currentUser && currentUser.name && currentUser.name !== 'Guest User' ? currentUser : null;
  const previewRoom = rooms && rooms.length > 0 ? rooms[0] : null;

  const currentUserName = activeUser?.name || 'You';
  const previewRoomId = previewRoom?.id || 'ABC123';
  const previewLanguage = previewRoom?.language || 'C++';
  const previewMembersCount = previewRoom?.members?.length || 2;

  const sampleSnippets = {
    'C++': `#include <iostream>
#include <vector>
using namespace std;

int main() {
    // CollabCode Real-Time Session
    cout << "Code. Collaborate. Create." << endl;
    return 0;
}`,
    Python: `# CollabCode Real-Time Session
def solve():
    users = ["Alice", "Bob", "You"]
    print("Connecting developers in real-time...")
    return len(users)

if __name__ == "__main__":
    solve()`,
    Java: `public class CollabSession {
    public static void main(String[] args) {
        System.out.println("Code. Collaborate. Create.");
    }
}`,
    C: `#include <stdio.h>

int main() {
    printf("CollabCode C Real-Time Practice\\n");
    return 0;
}`,
    JavaScript: `// CollabCode Live Sandbox
const session = {
  status: "Active",
  members: ["You", "Peer"],
};
console.log("Welcome to CollabCode!");`,
  };

  const features = [
    {
      icon: ShieldCheck,
      title: 'Secure Authentication',
      desc: 'JWT-based authentication with bcrypt-encrypted passwords and token-protected routes.',
      badge: 'JWT + bcrypt',
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30',
    },
    {
      icon: DoorOpen,
      title: 'Coding Rooms',
      desc: 'Instant collaborative coding rooms with unique 6-character Room IDs and shareable invite links.',
      badge: 'Room Management',
      color: 'from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/30',
    },
    {
      icon: Layers,
      title: 'Multi-Language Support',
      desc: 'Practice algorithms in C, C++, Java, Python, and JavaScript with standard template starter code.',
      badge: '5 Core Languages',
      color: 'from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30',
    },
    {
      icon: Bookmark,
      title: 'Save Your Code',
      desc: 'Store your solved algorithms and training problems directly into your persistent personal catalog.',
      badge: 'Cloud Catalog',
      color: 'from-indigo-500/20 to-purple-500/10 text-indigo-400 border-indigo-500/30',
    },
    {
      icon: Users2,
      title: 'User & Admin Roles',
      desc: 'Strict role-based authorization dividing student developer workspaces from moderation panels.',
      badge: 'RBAC Security',
      color: 'from-purple-500/20 to-pink-500/10 text-purple-400 border-purple-500/30',
    },
    {
      icon: Database,
      title: 'MongoDB Atlas Workspace',
      desc: 'Fully persistent cloud database storage keeping your rooms, users, and saved snippets synchronized.',
      badge: 'MongoDB Atlas',
      color: 'from-rose-500/20 to-red-500/10 text-rose-400 border-rose-500/30',
    },
  ];

  const workflowSteps = [
    {
      number: '01',
      title: 'REGISTER',
      desc: 'Create your developer account with secure JWT token authorization.',
      icon: Lock,
    },
    {
      number: '02',
      title: 'CREATE / JOIN ROOM',
      desc: 'Launch a new room or enter an existing session using a unique 6-digit Room ID.',
      icon: DoorOpen,
    },
    {
      number: '03',
      title: 'WRITE CODE',
      desc: 'Practice algorithms and build programs in C, C++, Java, Python, or JavaScript.',
      icon: Terminal,
    },
    {
      number: '04',
      title: 'SAVE CODE',
      desc: 'Commit your solutions to your MongoDB cloud catalog with one click.',
      icon: Bookmark,
    },
    {
      number: '05',
      title: 'ACCESS IT LATER',
      desc: 'Retrieve, inspect, or relaunch your snippets anytime from any device.',
      icon: Zap,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950 relative overflow-x-hidden">
      <Navbar />

      {/* Hero Section with ThreeUI Constellation Network + Vanta Ambient Mesh */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[92vh]">
        {/* ThreeUI Interactive Constellation Canvas */}
        <ConstellationNetwork particleCount={60} maxDistance={150} speed={0.4} />

        {/* Vanta Ambient Mesh Backdrop */}
        <AmbientMeshBackground />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center max-w-4xl mx-auto">
            {/* Pill Tag */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 text-xs font-semibold text-emerald-400 mb-8 shadow-inner backdrop-blur-md animate-fadeIn">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Modern Collaborative Developer Workspace</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            </div>

            {/* Main Headline with React Bits Shimmer Effect */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6 leading-[1.1] font-sans">
              CODE. COLLABORATE.{' '}
              <span className="react-bits-shimmer-text block sm:inline">
                CREATE.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed font-normal">
              A modern collaborative coding workspace for students and developers. Real-time multi-language practice, room management, and code cataloging in one unified platform.
            </p>

            {/* Action Buttons (UIverse Styled) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to={isAuthenticated ? '/dashboard' : '/register'}
                className="uiverse-btn-glow w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-4 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 hover:from-emerald-300 hover:to-teal-200 text-slate-950 font-black rounded-xl text-base shadow-xl shadow-emerald-500/25 transition transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Start Coding</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </Link>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 hover:border-slate-600 text-slate-200 font-bold rounded-xl text-base backdrop-blur-md transition cursor-pointer"
              >
                <span>Explore Features</span>
                <ArrowDown className="w-4 h-4 text-emerald-400" />
              </a>
            </div>
          </div>

          {/* Visual Code Editor Graphic (Google Stitch & Shards Layout) */}
          <div className="mt-16 max-w-5xl mx-auto bg-slate-900/90 border border-slate-800/90 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl group hover:border-slate-700/80 transition-all duration-300">
            {/* Editor Window Bar */}
            <div className="flex items-center justify-between px-4 py-3.5 bg-slate-950 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                <span className="ml-3 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  collabcode_workspace.{previewLanguage === 'C++' ? 'cpp' : previewLanguage === 'Python' ? 'py' : 'java'}
                </span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="font-semibold text-slate-300">{previewMembersCount} Members Live</span>
                </span>
                <span className="bg-slate-800/90 px-2.5 py-1 rounded text-emerald-300 font-mono text-[11px] border border-slate-700">
                  {previewLanguage === 'C++' ? 'C++ 17' : previewLanguage}
                </span>
              </div>
            </div>

            {/* Editor Body Simulator */}
            <div className="grid grid-cols-1 md:grid-cols-12 font-mono text-xs sm:text-sm">
              {/* Code Area */}
              <div className="md:col-span-8 p-6 bg-slate-950/70 border-r border-slate-800 text-slate-300 space-y-1.5 overflow-x-auto">
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
                  <span className="pl-4 text-slate-400">// CollabCode Real-time Practice Session</span>
                </div>
                <div className="flex gap-4 bg-emerald-500/10 -mx-6 px-6 py-0.5 border-l-2 border-emerald-400">
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
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                    <span>Active Room Members</span>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                      Live
                    </span>
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                        <span className="text-slate-200 font-sans text-xs font-semibold">
                          {activeUser ? `${activeUser.name} (You)` : 'You (Host)'}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-sans">
                        Host
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
                        <span className="text-slate-200 font-sans text-xs font-semibold">
                          {previewRoom?.members && previewRoom.members.length > 1
                            ? previewRoom.members.find((m) => m.name !== currentUserName)?.name || 'Peer Collaborator'
                            : 'Peer Collaborator'}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-sans">
                        Member
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <p className="text-[11px] font-sans text-slate-400 font-medium">Room Status</p>
                  <p className="text-xs font-mono font-bold text-emerald-400">
                    ROOM ID: <span className="tracking-wider">{previewRoomId}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION (Workflow Chain) */}
      <section id="how-it-works" className="py-20 md:py-28 bg-slate-900/40 border-t border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold text-cyan-400 mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>Step-By-Step Workflow</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              How CollabCode Works
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base">
              From registration to cloud cataloging, collaborate seamlessly in 5 straightforward steps.
            </p>
          </div>

          {/* Workflow Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {workflowSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition hover:-translate-y-1 shadow-lg relative group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-emerald-400/80 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                        {step.number}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center group-hover:text-emerald-400 transition">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-2 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {idx < workflowSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-700 z-10">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CORE FEATURES SECTION (Shards-style Component Cards) */}
      <section id="features" className="py-20 md:py-28 bg-slate-950 border-t border-slate-800/80 relative">
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
                  className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition hover:-translate-y-1 duration-200 shadow-lg group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} border flex items-center justify-center group-hover:scale-105 transition`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                        {feature.badge}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-emerald-300 transition">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MULTI-LANGUAGE SANDBOX SHOWCASE */}
      <section id="languages" className="py-20 md:py-28 bg-slate-900/40 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Description */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400">
                <Layers className="w-3.5 h-3.5" />
                <span>Multi-Language Practice</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Code In Your Favorite Language
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Whether preparing for technical interviews, solving university data structures assignments, or collaborating with peers, switch between 5 popular languages effortlessly.
              </p>

              {/* Language Pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['C++', 'Python', 'Java', 'C', 'JavaScript'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedDemoLang(lang)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition cursor-pointer ${
                      selectedDemoLang === lang
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  to="/rooms"
                  className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-400 hover:text-emerald-300"
                >
                  <span>Launch a multi-language coding room</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Interactive Code Box */}
            <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-2xl font-mono text-xs overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 text-slate-400">
                <span className="text-emerald-400 font-bold flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  solution.{selectedDemoLang === 'C++' ? 'cpp' : selectedDemoLang === 'Python' ? 'py' : selectedDemoLang === 'Java' ? 'java' : selectedDemoLang === 'C' ? 'c' : 'js'}
                </span>
                <span className="text-[11px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  Ready to Run
                </span>
              </div>
              <pre className="text-slate-300 leading-6 overflow-x-auto whitespace-pre">
                {sampleSnippets[selectedDemoLang]}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-slate-950 to-slate-900 border-t border-slate-800 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Ready to Start Coding?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Create instant rooms, share code snippets with classmates, and manage your algorithm practice in one modern workspace.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={isAuthenticated ? '/dashboard' : '/register'}
              className="uiverse-btn-glow w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black rounded-xl text-base shadow-xl shadow-emerald-500/20 transition cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold rounded-xl text-base transition cursor-pointer"
            >
              <span>Login to Account</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 bg-slate-950 border-t border-slate-900 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-6 h-6 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
              <Code2 className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-200">CollabCode</span>
            <span>— Full-Stack Collaborative Code Editor</span>
          </div>

          <div className="flex items-center space-x-4 text-slate-400">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>MongoDB Atlas Cloud Live</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
