import React from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import { useApp } from '../context/AppContext';
import {
  DoorOpen,
  Bookmark,
  Layers,
  Plus,
  LogIn,
  ArrowRight,
  Users,
  Clock,
  Code2,
  Sparkles,
  ExternalLink,
  Terminal,
  Server,
  Zap,
  Activity
} from 'lucide-react';

const Dashboard = () => {
  const {
    currentUser,
    rooms,
    savedCode,
    setIsCreateModalOpen,
    setIsJoinModalOpen
  } = useApp();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const realUserName = currentUser?.name && currentUser.name !== 'Guest User'
    ? currentUser.name
    : 'Developer';

  const stats = [
    {
      title: 'My Rooms',
      value: rooms.length,
      change: 'Active collaborative sessions',
      icon: DoorOpen,
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30',
      link: '/rooms',
    },
    {
      title: 'Saved Snippets',
      value: savedCode.length,
      change: 'Cataloged in MongoDB Atlas',
      icon: Bookmark,
      color: 'from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/30',
      link: '/saved-code',
    },
    {
      title: 'Supported Languages',
      value: '5',
      sub: 'C++, Python, Java, C, JS',
      change: 'Multi-compiler sandbox',
      icon: Layers,
      color: 'from-purple-500/20 to-indigo-500/10 text-purple-400 border-purple-500/30',
      link: '/rooms',
    },
    {
      title: 'Cloud Persistence',
      value: 'Live',
      change: 'MongoDB Atlas Cloud Engine',
      icon: Server,
      color: 'from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30',
      link: '/profile',
    },
  ];

  return (
    <AppLayout>
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8 font-sans">
        {/* Welcome Header (Shards & Stitch Style) */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-800/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-700 text-xs text-emerald-400 font-semibold mb-3 shadow-inner">
                <Sparkles className="w-3.5 h-3.5" />
                <span>MongoDB Atlas Real-Time Workspace</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {getGreeting()}, <span className="text-emerald-400">{realUserName}</span> 👋
              </h1>
              <p className="mt-1.5 text-slate-300 text-sm sm:text-base font-medium max-w-xl">
                Ready to code? Launch a real-time multi-language room, collaborate with peers, or explore your saved algorithms.
              </p>
            </div>

            {/* Quick Action Buttons (UIverse styled) */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="uiverse-btn-glow flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 hover:from-emerald-300 hover:to-teal-200 text-slate-950 font-black rounded-xl text-xs transition shadow-lg shadow-emerald-500/20 hover:scale-[1.02] cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>+ Create Room</span>
              </button>
              <button
                onClick={() => setIsJoinModalOpen(true)}
                className="flex items-center space-x-2 px-5 py-3 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/40 text-cyan-300 font-bold rounded-xl text-xs transition hover:scale-[1.02] cursor-pointer"
              >
                <LogIn className="w-4 h-4 stroke-[2.5]" />
                <span>Join Room</span>
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Metric Cards (Shards React Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Link
                key={idx}
                to={stat.link}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-slate-700 transition hover:-translate-y-1 shadow-xl block group backdrop-blur-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase font-mono tracking-wider text-slate-400">
                    {stat.title}
                  </span>
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} border flex items-center justify-center group-hover:scale-105 transition`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-baseline space-x-2 mb-1.5">
                  <span className="text-3xl sm:text-4xl font-black text-white">
                    {stat.value}
                  </span>
                  {stat.sub && (
                    <span className="text-[11px] text-slate-400 font-medium">{stat.sub}</span>
                  )}
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-1">
                  <Activity className="w-3 h-3 text-emerald-400" />
                  <span>{stat.change}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Recent Coding Rooms Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <DoorOpen className="w-5 h-5 text-emerald-400" />
                <span>Recent Coding Rooms</span>
              </h2>
              <p className="text-xs text-slate-400">
                Jump back into your active coding rooms stored on MongoDB Atlas
              </p>
            </div>
            <Link
              to="/rooms"
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition"
            >
              <span>View All Rooms</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {rooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {rooms.slice(0, 3).map((room) => (
                <div
                  key={room.id || room._id}
                  className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition hover:shadow-2xl group backdrop-blur-xl"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                        {room.language || 'C++'}
                      </span>
                      <span className="text-xs font-mono font-bold text-cyan-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        ID: {room.id}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition mb-1.5 tracking-tight truncate">
                      {room.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                      {room.description || 'Collaborative coding workspace session.'}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                      <div className="flex items-center space-x-1.5">
                        <Users className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{room.members ? room.members.length : 1} Members</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{room.lastUpdated || 'Recently'}</span>
                      </div>
                    </div>

                    <Link
                      to={`/rooms/${room.id}`}
                      className="w-full flex items-center justify-center space-x-2 py-2.5 bg-slate-800 hover:bg-emerald-400 hover:text-slate-950 text-slate-200 border border-slate-700 hover:border-emerald-400 font-bold rounded-xl text-xs transition duration-200"
                    >
                      <span>Open Workspace</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center bg-slate-900/40 border border-slate-800/80 rounded-3xl space-y-3">
              <DoorOpen className="w-8 h-8 text-slate-500 mx-auto" />
              <h3 className="text-base font-bold text-white">No coding rooms found</h3>
              <p className="text-xs text-slate-400">Launch a new room to collaborate with your team!</p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl text-xs transition cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Create Your First Room</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
