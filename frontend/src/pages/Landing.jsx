import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import ConstellationNetwork from '../components/effects/ConstellationNetwork';
import AmbientMeshBackground from '../components/effects/AmbientMeshBackground';
import CodeCrewHeroVisual from '../components/CodeCrewHeroVisual';
import CodeCrewLogo from '../components/CodeCrewLogo';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  DoorOpen,
  Layers,
  Bookmark,
  Users2,
  Terminal,
  Play,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Database,
  Lock,
  Zap,
  ChevronRight,
  ArrowDown,
  AlertCircle,
  Copy,
  Check,
  Code2,
  Cpu,
  Share2,
  Clock
} from 'lucide-react';

const Landing = () => {
  const { currentUser, rooms } = useApp() || {};
  const { isAuthenticated } = useAuth();
  const [selectedDemoLang, setSelectedDemoLang] = useState('Python');
  const [showcaseState, setShowcaseState] = useState('success'); // 'success' | 'error'
  const [copiedId, setCopiedId] = useState(false);

  const sampleSnippets = {
    Python: `# CodeCrew Python Workspace
def solve_with_crew(arr):
    # Calculate sum and product with your team
    total = sum(arr)
    return f"Crew Output: Sum = {total}, Elements = {len(arr)}"

if __name__ == "__main__":
    test_data = [10, 20, 30, 40]
    print(solve_with_crew(test_data))`,
    'C++': `#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

int main() {
    // CodeCrew C++ Session
    vector<int> crewScores = {88, 92, 95, 100};
    int total = accumulate(crewScores.begin(), crewScores.end(), 0);
    cout << "Crew Total Score: " << total << endl;
    return 0;
}`,
    Java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        // CodeCrew Java Workspace
        List<String> crew = Arrays.asList("Alex", "Jordan", "Taylor", "You");
        System.out.println("Active Crew Members: " + crew.size());
        System.out.println("Welcome to the shared workspace!");
    }
}`,
    C: `#include <stdio.h>

int main() {
    // CodeCrew C Practice Session
    int crewCount = 4;
    printf("CodeCrew C Sandbox Initialized!\\n");
    printf("Connecting %d developers to workspace.\\n", crewCount);
    return 0;
}`,
    JavaScript: `// CodeCrew JavaScript Workspace
const crewSession = {
  room: "Algorithm Sprint",
  members: ["Elena", "Marcus", "Kai", "You"],
  status: "Active"
};

console.log(\`Running \${crewSession.room} with \${crewSession.members.length} developers!\`);`,
  };

  const features = [
    {
      icon: DoorOpen,
      title: 'Create a Crew Room',
      desc: 'Launch a dedicated coding room for your team or study group with a unique 6-character Room ID.',
      badge: 'Dedicated Rooms',
      color: 'from-emerald-500/20 to-lime-500/10 text-emerald-400 border-emerald-500/30',
    },
    {
      icon: Users2,
      title: 'Join Instantly',
      desc: 'Collaborate with friends in seconds by entering a Room ID or opening a direct invite link.',
      badge: 'Instant Access',
      color: 'from-lime-500/20 to-emerald-500/10 text-lime-400 border-lime-500/30',
    },
    {
      icon: Layers,
      title: 'Multi-Language Coding',
      desc: 'Write programs in Python, C++, Java, C, and JavaScript with tailored starter templates.',
      badge: '5 Core Languages',
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30',
    },
    {
      icon: Play,
      title: 'Run Your Code',
      desc: 'Execute your programs directly inside the workspace using the real-time cloud compiler sandbox.',
      badge: 'Execution Engine',
      color: 'from-lime-500/20 to-amber-500/10 text-lime-400 border-lime-500/30',
    },
    {
      icon: Terminal,
      title: 'Compiler-Style Results',
      desc: 'Inspect program output, feed custom stdin, and debug syntax or runtime error diagnostics.',
      badge: 'Output & Diagnostics',
      color: 'from-emerald-500/20 to-lime-500/10 text-emerald-400 border-emerald-500/30',
    },
    {
      icon: Bookmark,
      title: 'Save Your Code',
      desc: 'Persist your solved algorithms and code files directly to your MongoDB Atlas cloud catalog.',
      badge: 'Cloud Catalog',
      color: 'from-lime-500/20 to-emerald-500/10 text-lime-400 border-lime-500/30',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Accounts',
      desc: 'Industry-standard JWT authentication and bcrypt password encryption protect every developer account.',
      badge: 'JWT + bcrypt',
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30',
    },
    {
      icon: Database,
      title: 'User & Admin Roles',
      desc: 'Role-based access control provides students with coding workspaces and admins with moderation consoles.',
      badge: 'RBAC Security',
      color: 'from-lime-500/20 to-emerald-500/10 text-lime-400 border-lime-500/30',
    },
  ];

  const workflowSteps = [
    {
      number: '01',
      title: 'CREATE OR JOIN ROOM',
      desc: 'Launch a new room or join your peers using a unique 6-character room code.',
      icon: DoorOpen,
    },
    {
      number: '02',
      title: 'INVITE YOUR CREW',
      desc: 'Share the room code or direct link with classmates and friends to collaborate.',
      icon: Users2,
    },
    {
      number: '03',
      title: 'WRITE PROGRAMS',
      desc: 'Practice data structures and algorithms in Python, C++, Java, C, or JavaScript.',
      icon: Terminal,
    },
    {
      number: '04',
      title: 'RUN & DEBUG',
      desc: 'Pass custom input (stdin), execute instantly, and inspect compiler feedback.',
      icon: Play,
    },
    {
      number: '05',
      title: 'SAVE TO CLOUD',
      desc: 'Catalog your solutions in MongoDB Atlas and access them anytime from any device.',
      icon: Bookmark,
    },
  ];

  const handleCopyDemoId = () => {
    navigator.clipboard.writeText('CREW77');
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="min-h-screen bg-charcoal-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-charcoal-950 relative overflow-x-hidden">
      <Navbar />

      {/* 1. HERO SECTION — TWO-COLUMN LAYOUT */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-28 overflow-hidden min-h-[92vh] flex items-center">
        {/* Animated Constellation Canvas (No Grid) */}
        <ConstellationNetwork particleCount={55} maxDistance={140} speed={0.35} />

        {/* Vanta Ambient Mesh Backdrop (No Grid) */}
        <AmbientMeshBackground />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* LEFT COLUMN — MAIN CONTENT */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              {/* Small Label */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-charcoal-900/90 border border-emerald-500/40 text-xs font-bold text-emerald-400 shadow-inner backdrop-blur-md animate-fadeIn">
                <Sparkles className="w-3.5 h-3.5 text-lime-400 animate-pulse" />
                <span className="tracking-wider uppercase text-[11px] font-mono">
                  A COLLABORATIVE CODING WORKSPACE
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-ping"></span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.1] font-sans">
                Code together.{' '}
                <span className="codecrew-gradient-text block sm:inline">
                  Build together.
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                CodeCrew brings your coding crew into one shared workspace where you can join rooms, write programs, run code, see results, and save your work.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to={isAuthenticated ? '/dashboard' : '/register'}
                  className="uiverse-btn-glow w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-4 bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-400 hover:from-emerald-300 hover:to-lime-200 text-charcoal-950 font-black rounded-xl text-base shadow-xl shadow-emerald-500/25 transition transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Start a Crew</span>
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                </Link>
                <a
                  href="#how-it-works"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-charcoal-900/90 hover:bg-charcoal-850 border border-charcoal-700 hover:border-emerald-500/40 text-slate-200 font-bold rounded-xl text-base backdrop-blur-md transition cursor-pointer"
                >
                  <span>Explore CodeCrew</span>
                  <ArrowDown className="w-4 h-4 text-emerald-400" />
                </a>
              </div>

              {/* Supporting Line */}
              <p className="text-xs sm:text-sm font-mono text-slate-400 pt-2 flex items-center justify-center lg:justify-start gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Create a room. Invite your crew. Start coding.</span>
              </p>
            </div>

            {/* RIGHT COLUMN — ANIMATED CREW VISUAL */}
            <div className="lg:col-span-6">
              <CodeCrewHeroVisual />
            </div>

          </div>
        </div>
      </section>

      {/* 2. CREW COLLABORATION CONCEPT STRIP */}
      <section className="py-12 bg-charcoal-900/70 border-y border-charcoal-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-2xl bg-charcoal-950/60 border border-charcoal-800">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400">1-Click</span>
              <p className="text-xs text-slate-400 font-medium mt-1">Instant Room Creation</p>
            </div>
            <div className="p-4 rounded-2xl bg-charcoal-950/60 border border-charcoal-800">
              <span className="text-2xl sm:text-3xl font-black text-lime-400">5 Languages</span>
              <p className="text-xs text-slate-400 font-medium mt-1">Python, C++, Java, C, JS</p>
            </div>
            <div className="p-4 rounded-2xl bg-charcoal-950/60 border border-charcoal-800">
              <span className="text-2xl sm:text-3xl font-black text-emerald-300">Live Sandbox</span>
              <p className="text-xs text-slate-400 font-medium mt-1">Real-time Code Execution</p>
            </div>
            <div className="p-4 rounded-2xl bg-charcoal-950/60 border border-charcoal-800">
              <span className="text-2xl sm:text-3xl font-black text-lime-300">MongoDB Atlas</span>
              <p className="text-xs text-slate-400 font-medium mt-1">Cloud Code Catalog</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW CODECREW WORKS */}
      <section id="how-it-works" className="py-20 md:py-28 bg-charcoal-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-bold text-emerald-400 mb-3">
              <Zap className="w-3.5 h-3.5 text-lime-400" />
              <span>Step-By-Step Crew Workflow</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              How CodeCrew Works
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
              Your crew. Your code. Your workspace. Seamless collaboration in 5 clear steps.
            </p>
          </div>

          {/* Workflow Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {workflowSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-charcoal-900/80 border border-charcoal-800 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1.5 shadow-xl relative group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                        {step.number}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-charcoal-800 text-slate-300 flex items-center justify-center group-hover:text-lime-400 transition">
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
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-charcoal-700 z-10">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CORE FEATURES SECTION */}
      <section id="features" className="py-20 md:py-28 bg-charcoal-900/40 border-t border-charcoal-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-lime-400 mb-2 font-mono">
              Engineered For Collaboration
            </h2>
            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Powerful Features For Every Crew
            </h3>
            <p className="mt-3 text-slate-400 text-sm sm:text-base">
              Explore everything you need to join rooms, write code, run test cases, and save solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-charcoal-900/90 border border-charcoal-800 hover:border-charcoal-700 transition hover:-translate-y-1 duration-200 shadow-xl group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} border flex items-center justify-center group-hover:scale-105 transition`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold font-mono text-slate-400 bg-charcoal-950 px-2 py-1 rounded-lg border border-charcoal-800">
                        {feature.badge}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white mb-2 tracking-tight group-hover:text-emerald-300 transition">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CODE EXECUTION SHOWCASE (CODE -> INPUT -> RUN -> OUTPUT / ERROR) */}
      <section id="showcase" className="py-20 md:py-28 bg-charcoal-950 border-t border-charcoal-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-bold text-emerald-400 mb-3">
              <Terminal className="w-3.5 h-3.5" />
              <span>Real Execution Pipeline</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Code Execution Showcase
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base">
              See how CodeCrew processes source code, handles custom standard input (stdin), and delivers compiler &amp; runtime diagnostics.
            </p>
          </div>

          {/* Workflow Diagram Banner */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10 text-xs font-mono font-bold flex-wrap">
            <span className="px-3 py-1.5 rounded-xl bg-charcoal-900 border border-charcoal-750 text-slate-200">
              CODE
            </span>
            <span className="text-emerald-400">&rarr;</span>
            <span className="px-3 py-1.5 rounded-xl bg-charcoal-900 border border-charcoal-750 text-lime-400">
              INPUT (stdin)
            </span>
            <span className="text-emerald-400">&rarr;</span>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300">
              RUN
            </span>
            <span className="text-emerald-400">&rarr;</span>
            <span className="px-3 py-1.5 rounded-xl bg-charcoal-900 border border-charcoal-750 text-slate-200">
              OUTPUT / ERROR
            </span>
          </div>

          {/* Toggle Between Success Demo and Error Demo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <button
              onClick={() => setShowcaseState('success')}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition cursor-pointer ${
                showcaseState === 'success'
                  ? 'bg-emerald-400 text-charcoal-950 shadow-md shadow-emerald-500/20'
                  : 'bg-charcoal-900 text-slate-400 hover:text-white border border-charcoal-800'
              }`}
            >
              Demo: Successful Execution
            </button>
            <button
              onClick={() => setShowcaseState('error')}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition cursor-pointer ${
                showcaseState === 'error'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                  : 'bg-charcoal-900 text-slate-400 hover:text-white border border-charcoal-800'
              }`}
            >
              Demo: Diagnostic / Error Handling
            </button>
          </div>

          {/* Realistic Code & Output Showcase Box */}
          <div className="max-w-4xl mx-auto bg-charcoal-900/90 border border-charcoal-750 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-charcoal-950 border-b border-charcoal-800">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                <span className="ml-3 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  solution.py
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-charcoal-800 text-emerald-400 border border-charcoal-700">
                  Python 3.11 Sandbox
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 font-mono text-xs">
              {/* Code Panel */}
              <div className="md:col-span-7 p-5 bg-charcoal-950/80 border-b md:border-b-0 md:border-r border-charcoal-800 text-slate-300 space-y-1 leading-6 overflow-x-auto">
                {showcaseState === 'success' ? (
                  <>
                    <p className="text-slate-500"># Read two integers from standard input</p>
                    <p className="text-emerald-400">
                      a, b = <span className="text-lime-300">map</span>(int, input().split())
                    </p>
                    <p className="text-slate-400">sum_result = a + b</p>
                    <p className="text-slate-400">
                      <span className="text-lime-300">print</span>(f&quot;Computed Result: &#123;sum_result&#125;&quot;)
                    </p>
                    <p className="text-emerald-300 bg-emerald-500/10 -mx-5 px-5 py-0.5 border-l-2 border-emerald-400">
                      <span className="text-lime-300">print</span>(&quot;Status: Execution successful&quot;)
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-slate-500"># Syntax / Type diagnostic example</p>
                    <p className="text-emerald-400">
                      numbers = [10, 20, &quot;invalid&quot;]
                    </p>
                    <p className="text-rose-400 bg-rose-500/10 -mx-5 px-5 py-0.5 border-l-2 border-rose-500">
                      total = sum(numbers) # Causes TypeError
                    </p>
                    <p className="text-slate-400">print(total)</p>
                  </>
                )}
              </div>

              {/* Input + Output Panel */}
              <div className="md:col-span-5 p-5 bg-charcoal-900/80 flex flex-col justify-between space-y-4">
                <div>
                  {/* Stdin block */}
                  <div className="mb-4">
                    <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block mb-1">
                      INPUT (stdin)
                    </span>
                    <div className="p-2.5 rounded-xl bg-charcoal-950 border border-charcoal-800 text-lime-300 text-xs font-mono">
                      {showcaseState === 'success' ? '10 20' : '(No stdin required)'}
                    </div>
                  </div>

                  {/* Output block */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] uppercase font-mono font-bold text-slate-400">
                        OUTPUT
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          showcaseState === 'success'
                            ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                            : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                        }`}
                      >
                        {showcaseState === 'success' ? 'Exit Code 0' : 'Exit Code 1'}
                      </span>
                    </div>

                    <div
                      className={`p-3 rounded-xl border text-xs font-mono leading-5 ${
                        showcaseState === 'success'
                          ? 'bg-charcoal-950 border-emerald-500/30 text-slate-200'
                          : 'bg-charcoal-950 border-rose-500/30 text-rose-300'
                      }`}
                    >
                      {showcaseState === 'success' ? (
                        <>
                          <p className="text-emerald-400 font-bold">&gt; Computed Result: 30</p>
                          <p className="text-slate-400">&gt; Status: Execution successful</p>
                          <p className="text-slate-500 text-[10px] pt-1">Time: 0.04s • Memory: 12MB</p>
                        </>
                      ) : (
                        <>
                          <p className="text-rose-400 font-bold">TypeError: unsupported operand type</p>
                          <p className="text-slate-400 text-[11px]">in &lt;module&gt; line 3: sum(numbers)</p>
                          <p className="text-rose-300 text-[10px] pt-1">Diagnostic: Cannot add str to int</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-charcoal-800">
                  <span>Interactive Sandbox</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Direct Engine Link
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MULTI-LANGUAGE PRACTICE SHOWCASE */}
      <section id="languages" className="py-20 md:py-28 bg-charcoal-900/40 border-t border-charcoal-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Description */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-lime-500/10 border border-lime-500/25 text-xs font-bold text-lime-400">
                <Layers className="w-3.5 h-3.5" />
                <span>Multi-Language Practice</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Code In Your Favorite Language
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Whether preparing for data structure interviews, coding university assignments with classmates, or building algorithmic solutions, switch between 5 popular languages effortlessly.
              </p>

              {/* Language Pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['Python', 'C++', 'Java', 'C', 'JavaScript'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedDemoLang(lang)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition cursor-pointer ${
                      selectedDemoLang === lang
                        ? 'bg-gradient-to-r from-emerald-400 to-lime-300 text-charcoal-950 font-black shadow-md shadow-emerald-500/20'
                        : 'bg-charcoal-900 hover:bg-charcoal-800 text-slate-300 border border-charcoal-800'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              <div className="pt-3">
                <Link
                  to="/rooms"
                  className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-400 hover:text-lime-300 transition"
                >
                  <span>Launch a multi-language coding room</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Interactive Code Box */}
            <div className="lg:col-span-7 bg-charcoal-950 border border-charcoal-800 rounded-3xl p-6 shadow-2xl font-mono text-xs overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-charcoal-800 mb-4 text-slate-400">
                <span className="text-emerald-400 font-bold flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  solution.{selectedDemoLang === 'C++' ? 'cpp' : selectedDemoLang === 'Python' ? 'py' : selectedDemoLang === 'Java' ? 'java' : selectedDemoLang === 'C' ? 'c' : 'js'}
                </span>
                <span className="text-[11px] bg-charcoal-900 px-2.5 py-0.5 rounded-lg border border-charcoal-750 text-lime-400">
                  Ready to Run
                </span>
              </div>
              <pre className="text-slate-300 leading-6 overflow-x-auto whitespace-pre font-medium">
                {sampleSnippets[selectedDemoLang]}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY CODECREW SECTION */}
      <section className="py-20 md:py-28 bg-charcoal-950 border-t border-charcoal-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2 font-mono">
              Designed For Real Teams
            </h2>
            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Why Developers Choose CodeCrew
            </h3>
            <p className="mt-3 text-slate-400 text-sm sm:text-base">
              Built to make coding together feel natural, responsive, and completely friction-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-charcoal-900/80 border border-charcoal-800 hover:border-emerald-500/30 transition shadow-xl space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-4">
                <Users2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white tracking-tight">True Team Synergy</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Coding shouldn&apos;t be a solitary puzzle. CodeCrew lets you brainstorm, solve edge cases, and debug together in synchronized rooms.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-charcoal-900/80 border border-charcoal-800 hover:border-lime-500/30 transition shadow-xl space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-lime-500/10 border border-lime-500/25 flex items-center justify-center text-lime-400 mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white tracking-tight">Zero Local Setup</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                No need to install compilers, configure environment paths, or sync version managers. Open your browser and start coding right away.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-charcoal-900/80 border border-charcoal-800 hover:border-emerald-500/30 transition shadow-xl space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-4">
                <Database className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white tracking-tight">Persistent Cloud Storage</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every room and program snippet is securely synchronized to MongoDB Atlas so your code is always safe and ready whenever you return.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-charcoal-950 via-charcoal-900 to-charcoal-950 border-t border-charcoal-800 text-center relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-charcoal-900 border border-emerald-500/30 text-xs font-bold text-emerald-400 mb-2">
            <Sparkles className="w-4 h-4 text-lime-400" />
            <span>Join The CodeCrew Community</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
            Ready to code with your crew?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Create instant rooms, invite your teammates, and practice algorithm challenges together in one modern workspace.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={isAuthenticated ? '/dashboard' : '/register'}
              className="uiverse-btn-glow w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-400 hover:from-emerald-300 hover:to-lime-200 text-charcoal-950 font-black rounded-xl text-base shadow-xl shadow-emerald-500/20 transition cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-charcoal-900 hover:bg-charcoal-800 border border-charcoal-700 text-slate-200 font-bold rounded-xl text-base transition cursor-pointer"
            >
              <span>Login to Account</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="py-12 bg-charcoal-950 border-t border-charcoal-850 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <CodeCrewLogo size="sm" subtext="Code Together. Build Together." />
          </div>

          <div className="flex items-center space-x-6 text-slate-400 text-xs">
            <a href="#how-it-works" className="hover:text-emerald-400 transition">How It Works</a>
            <a href="#features" className="hover:text-emerald-400 transition">Features</a>
            <a href="#languages" className="hover:text-emerald-400 transition">Languages</a>
            <Link to="/login" className="hover:text-emerald-400 transition">Sign In</Link>
            <Link to="/register" className="hover:text-emerald-400 transition">Register</Link>
          </div>

          <div className="flex items-center space-x-2 text-emerald-400 font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>MongoDB Atlas Connected</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
