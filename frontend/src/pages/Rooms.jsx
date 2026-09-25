import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import { useApp } from '../context/AppContext';
import {
  DoorOpen,
  Plus,
  LogIn,
  Search,
  Filter,
  Users,
  Clock,
  ExternalLink,
  Trash2,
  Copy,
  Check,
  Share2,
  Sparkles
} from 'lucide-react';

const Rooms = () => {
  const {
    rooms,
    deleteRoom,
    setIsCreateModalOpen,
    setIsJoinModalOpen,
    showToast,
  } = useApp();
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyId = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    showToast(`Room ID ${id} copied! Share with your crew to join.`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('ALL');

  const languages = ['ALL', 'Python', 'C++', 'Java', 'C', 'JavaScript'];

  const filteredRooms = rooms.filter((room) => {
    const nameMatch = (room.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const idMatch = (room.id || '').toLowerCase().includes(searchTerm.toLowerCase());
    const descMatch = (room.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = nameMatch || idMatch || descMatch;

    const matchesLanguage =
      selectedLanguage === 'ALL' || room.language === selectedLanguage;

    return matchesSearch && matchesLanguage;
  });

  return (
    <AppLayout>
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8 font-sans">
        {/* Header with Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal-800">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <DoorOpen className="w-7 h-7 text-emerald-400" />
              <span>My Coding Rooms</span>
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Manage your collaborative coding rooms and team workspaces synchronized in MongoDB Atlas.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="uiverse-btn-glow flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-400 hover:from-emerald-300 hover:to-lime-200 text-charcoal-950 font-black rounded-xl text-xs transition shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Create Room</span>
            </button>
            <button
              onClick={() => setIsJoinModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2.5 bg-charcoal-800 hover:bg-charcoal-750 border border-charcoal-700 hover:border-emerald-500/40 text-emerald-300 font-bold rounded-xl text-xs transition cursor-pointer"
            >
              <LogIn className="w-4 h-4 stroke-[2.5]" />
              <span>Join Room</span>
            </button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by room name or Room ID..."
              className="uiverse-input w-full pl-10 pr-4 py-2.5 bg-charcoal-900 border border-charcoal-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition text-sm font-medium"
            />
          </div>

          {/* Language Filter Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-xs text-slate-400 font-bold font-mono mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition whitespace-nowrap cursor-pointer ${
                  selectedLanguage === lang
                    ? 'bg-gradient-to-r from-emerald-400 to-lime-300 text-charcoal-950 font-black shadow-md shadow-emerald-500/20'
                    : 'bg-charcoal-900 hover:bg-charcoal-800 text-slate-400 hover:text-white border border-charcoal-800'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Rooms Grid (Shards Style) */}
        {filteredRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <div
                key={room.id || room._id}
                className="bg-charcoal-900/80 border border-charcoal-800 rounded-2xl p-6 flex flex-col justify-between hover:border-charcoal-700 transition hover:shadow-2xl group backdrop-blur-xl"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                      {room.language || 'Python'}
                    </span>
                    <button
                      onClick={() => handleCopyId(room.id)}
                      title="Copy Room ID to invite peers"
                      className="text-xs font-mono font-bold bg-charcoal-950 hover:bg-charcoal-800 px-2.5 py-1 rounded-lg border border-charcoal-800 hover:border-lime-500/40 text-lime-300 flex items-center space-x-1.5 transition cursor-pointer"
                    >
                      <span>ID: {room.id}</span>
                      {copiedId === room.id ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3 text-slate-500 hover:text-white" />
                      )}
                    </button>
                  </div>

                  {/* Room Name & Description */}
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition mb-1.5 tracking-tight truncate">
                    {room.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {room.description || 'Collaborative coding workspace session on CodeCrew.'}
                  </p>
                </div>

                {/* Metadata & Actions */}
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

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/rooms/${room.id}`}
                      className="flex-1 flex items-center justify-center space-x-2 py-2.5 bg-charcoal-800 hover:bg-emerald-400 hover:text-charcoal-950 text-slate-200 border border-charcoal-700 hover:border-emerald-400 font-bold rounded-xl text-xs transition duration-150"
                    >
                      <span>Open Workspace</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => deleteRoom(room.id)}
                      title="Delete Room"
                      className="p-2.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-charcoal-800 hover:border-rose-500/30 rounded-xl transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="p-12 text-center bg-charcoal-900/40 border border-charcoal-800 rounded-3xl space-y-4">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-charcoal-800 flex items-center justify-center text-slate-400">
              <DoorOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">No coding rooms found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No rooms matched your search criteria. Launch a new room to start collaborating with your crew!
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-emerald-400 to-lime-300 text-charcoal-950 font-black rounded-xl text-xs transition cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Create New Room</span>
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Rooms;

