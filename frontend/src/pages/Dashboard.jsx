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
  Sparkles,
  ExternalLink,
  Server,
  Activity,
  Zap,
  CheckCircle2
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

  // Compute rooms belonging to the current user (as owner or member)
  const myRooms = rooms.filter((r) => {
    if (!currentUser) return false;
    const currentId = currentUser.id || currentUser._id;
    const currentName = currentUser.name;
    const isOwner =
      (r.ownerId && currentId && r.ownerId.toString() === currentId.toString()) ||
      (r.owner && r.owner === currentName);
    const isMember =
      Array.isArray(r.members) &&
      r.members.some((m) => {
        const memberUserId = m.user ? (m.user._id || m.user.id || m.user).toString() : null;
        return (
          (memberUserId && currentId && memberUserId === currentId.toString()) ||
          (m.name && m.name === currentName)
        );
      });
    return isOwner || isMember;
  });

  const stats = [
    {
      title: 'My Rooms',
      value: myRooms.length,
      change: 'Active collaborative sessions',
      icon: DoorOpen,
      color: 'from-emerald-500/20 to-lime-500/10 text-emerald-400 border-emerald-500/30',
      link: '/rooms',
    },
    {
      title: 'Saved Snippets',
      value: savedCode.length,
      change: 'Cataloged in MongoDB Atlas',
      icon: Bookmark,
      color: 'from-lime-500/20 to-emerald-500/10 text-lime-400 border-lime-500/30',
      link: '/saved-code',
    },
    {
      title: 'Supported Languages',
      value: '5',
      sub: 'Python, C++, Java, C, JS',
      change: 'Multi-compiler sandbox',
      icon: Layers,
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-300 border-emerald-500/30',
      link: '/rooms',
    },
    {
      title: 'Cloud Persistence',
      value: 'Live',
      change: 'MongoDB Atlas Cloud Engine',
      icon: Server,
      color: 'from-lime-400/20 to-emerald-400/10 text-lime-300 border-lime-400/30',
      link: '/profile',
    },
  ];

  return (
    <AppLayout>
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8 font-sans">
        {/* Welcome Header (Shards & Stitch Style) */}
        <div className="bg-gradient-to-r from-charcoal-900 via-charcoal-900/95 to-charcoal-850 border border-charcoal-750 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/3 w-60 h-60 bg-lime-500/8 blur-[90px] rounded-full pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-charcoal-950/80 border border-charcoal-700 text-xs text-emerald-400 font-semibold mb-3 shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-lime-400" />
                <span>CodeCrew Collaborative Workspace</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {getGreeting()}, <span className="text-emerald-400">{realUserName}</span> 👋
              </h1>
              <p className="mt-1.5 text-slate-300 text-sm sm:text-base font-medium max-w-xl">
                Ready to code with your crew? Launch a shared multi-language room, collaborate with peers, or explore your saved algorithms.
              </p>
            </div>

            {/* Quick Action Buttons (UIverse styled) */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="uiverse-btn-glow flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-400 hover:from-emerald-300 hover:to-lime-200 text-charcoal-950 font-black rounded-xl text-xs transition shadow-lg shadow-emerald-500/20 hover:scale-[1.02] cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>+ Create Room</span>
              </button>
              <button
                onClick={() => setIsJoinModalOpen(true)}
                className="flex items-center space-x-2 px-5 py-3 bg-charcoal-800 hover:bg-charcoal-750 border border-charcoal-700 hover:border-emerald-500/40 text-emerald-300 font-bold rounded-xl text-xs transition hover:scale-[1.02] cursor-pointer"
              >
                <LogIn className="w-4 h-4 stroke-[2.5]" />
                <span>Join Room</span>
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Metric Cards (Shards Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Link
                key={idx}
                to={stat.link}
                className="p-6 rounded-2xl bg-charcoal-900/80 border border-charcoal-800 hover:border-charcoal-700 transition hover:-translate-y-1 shadow-xl block group backdrop-blur-xl"
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
                <span>My Active Crew Rooms</span>
              </h2>
              <p className="text-xs text-slate-400">
                Jump back into your collaborative coding rooms stored on MongoDB Atlas
              </p>
            </div>
            <Link
              to="/rooms"
              className="text-xs font-bold text-emerald-400 hover:text-lime-300 flex items-center gap-1 transition"
            >
              <span>Explore All Rooms ({rooms.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {myRooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {myRooms.slice(0, 3).map((room) => (
                <div
                  key={room.id || room._id}
                  className="bg-charcoal-900/80 border border-charcoal-800 rounded-2xl p-6 flex flex-col justify-between hover:border-charcoal-700 transition hover:shadow-2xl group backdrop-blur-xl"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                        {room.language || 'Python'}
                      </span>
                      <span className="text-xs font-mono font-bold text-lime-400 bg-charcoal-950 px-2 py-0.5 rounded border border-charcoal-800">
                        ID: {room.id}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition mb-1.5 tracking-tight truncate">
                      {room.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                      {room.description || 'Collaborative coding workspace session on CodeCrew.'}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-charcoal-800 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                      <div className="flex items-center space-x-1.5">
                        <Users className="w-3.5 h-3.5 text-lime-400" />
                        <span>{room.members ? room.members.length : 1} Crew Members</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{room.lastUpdated || 'Recently'}</span>
                      </div>
                    </div>

                    <Link
                      to={`/rooms/${room.id}`}
                      className="w-full flex items-center justify-center space-x-2 py-2.5 bg-charcoal-800 hover:bg-emerald-400 hover:text-charcoal-950 text-slate-200 border border-charcoal-700 hover:border-emerald-400 font-bold rounded-xl text-xs transition duration-200"
                    >
                      <span>Open Workspace</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center bg-charcoal-900/40 border border-charcoal-800 rounded-3xl space-y-3">
              <DoorOpen className="w-8 h-8 text-slate-500 mx-auto" />
              <h3 className="text-base font-bold text-white">No active rooms in your crew yet</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Launch your first collaborative room or explore public rooms to code together with your peers!
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-400 to-lime-300 text-charcoal-950 font-black rounded-xl text-xs transition cursor-pointer shadow-lg shadow-emerald-500/15"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Create Your First Room</span>
                </button>
                <Link
                  to="/rooms"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-charcoal-800 hover:bg-charcoal-750 border border-charcoal-700 text-slate-200 font-bold rounded-xl text-xs transition"
                >
                  <LogIn className="w-4 h-4 text-emerald-400" />
                  <span>Explore Rooms ({rooms.length})</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
