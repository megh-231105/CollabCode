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
  ExternalLink
} from 'lucide-react';

const Dashboard = () => {
  const {
    currentUser,
    rooms,
    savedCode,
    setIsCreateModalOpen,
    setIsJoinModalOpen
  } = useApp();

  const stats = [
    {
      title: 'My Rooms',
      value: rooms.length || 4,
      icon: DoorOpen,
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30',
      link: '/rooms',
    },
    {
      title: 'Saved Code',
      value: savedCode.length >= 4 ? 12 : savedCode.length,
      icon: Bookmark,
      color: 'from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/30',
      link: '/saved-code',
    },
    {
      title: 'Languages',
      value: '5',
      sub: 'C, C++, Java, Py, JS',
      icon: Layers,
      color: 'from-purple-500/20 to-indigo-500/10 text-purple-400 border-purple-500/30',
      link: '/rooms',
    },
  ];

  return (
    <AppLayout>
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-800/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-[90px] rounded-full pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-700 text-xs text-emerald-400 font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Student Developer Workspace</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Welcome back, {currentUser.name} 👋
              </h1>
              <p className="mt-1.5 text-slate-300 text-sm sm:text-base font-medium">
                Ready to start coding? Collaborate with peers or continue your algorithm practice.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center space-x-2 px-5 py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl text-sm transition shadow-lg shadow-emerald-500/20 hover:scale-[1.02]"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Create Room</span>
              </button>
              <button
                onClick={() => setIsJoinModalOpen(true)}
                className="flex items-center space-x-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 font-bold rounded-xl text-sm transition hover:scale-[1.02]"
              >
                <LogIn className="w-4 h-4 stroke-[2.5]" />
                <span>Join Room</span>
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Link
                key={idx}
                to={stat.link}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition hover:-translate-y-1 shadow-lg block group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {stat.title}
                  </span>
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} border flex items-center justify-center group-hover:scale-105 transition`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl sm:text-4xl font-black text-white">
                    {stat.value}
                  </span>
                  {stat.sub && (
                    <span className="text-xs text-slate-400 font-medium">{stat.sub}</span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Recent Rooms Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Recent Rooms</h2>
              <p className="text-xs text-slate-400">Jump back into your active coding sessions</p>
            </div>
            <Link
              to="/rooms"
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition"
            >
              <span>View All Rooms</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rooms.slice(0, 3).map((room) => (
              <div
                key={room.id}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition hover:shadow-xl group"
              >
                <div>
                  {/* Top Tags */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                      {room.language}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      ID: {room.id}
                    </span>
                  </div>

                  {/* Room Name & Description */}
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition mb-1.5 tracking-tight">
                    {room.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {room.description}
                  </p>
                </div>

                {/* Metadata & Open Action */}
                <div className="pt-4 border-t border-slate-800/80 space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center space-x-1.5">
                      <Users className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{room.members.length} Members</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Updated {room.lastUpdated}</span>
                    </div>
                  </div>

                  <Link
                    to={`/rooms/${room.id}`}
                    className="w-full flex items-center justify-center space-x-2 py-2.5 bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 border border-slate-700 hover:border-emerald-500 font-bold rounded-xl text-xs transition duration-150"
                  >
                    <span>Open Room</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
