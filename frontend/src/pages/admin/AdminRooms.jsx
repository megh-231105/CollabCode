import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import { useApp } from '../../context/AppContext';
import {
  DoorOpen,
  Search,
  Filter,
  Eye,
  Trash2,
  Users,
  ExternalLink,
  Layers,
  Plus
} from 'lucide-react';

const AdminRooms = () => {
  const { rooms, deleteRoom, setIsCreateModalOpen, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const adminRoomsData = [
    {
      id: 'ABC123',
      name: 'DSA Practice',
      owner: 'Meghana',
      language: 'C++',
      members: 2,
      status: 'Active',
    },
    {
      id: 'JAVA404',
      name: 'Java Practice',
      owner: 'Rahul',
      language: 'Java',
      members: 3,
      status: 'Active',
    },
    {
      id: 'PY7890',
      name: 'Python Room',
      owner: 'Anu',
      language: 'Python',
      members: 4,
      status: 'Active',
    },
    {
      id: 'JS2026',
      name: 'Full Stack JS Live',
      owner: 'Meghana',
      language: 'JavaScript',
      members: 2,
      status: 'Active',
    },
  ];

  const filtered = adminRoomsData.filter((r) =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Coding Rooms Moderation
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Inspect active coding rooms, review language workloads, and manage sessions.
            </p>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-purple-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Room</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search room name, owner, or language..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition text-sm"
          />
        </div>

        {/* Rooms Table */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-4 px-6 font-bold">Room Name</th>
                  <th className="py-4 px-6 font-bold">Owner</th>
                  <th className="py-4 px-6 font-bold">Language</th>
                  <th className="py-4 px-6 font-bold">Members</th>
                  <th className="py-4 px-6 font-bold">Status</th>
                  <th className="py-4 px-6 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((room) => (
                  <tr
                    key={room.id}
                    className="hover:bg-slate-800/40 transition duration-150"
                  >
                    <td className="py-4 px-6 font-bold text-white">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 text-purple-300 flex items-center justify-center font-bold text-xs">
                          <DoorOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <span>{room.name}</span>
                          <span className="block text-[10px] font-mono text-slate-400">
                            ID: {room.id}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-200">{room.owner}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex px-2.5 py-0.5 rounded text-[11px] font-bold font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {room.language}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        {room.members}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center space-x-1.5 text-xs text-emerald-400 font-medium">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <span>{room.status}</span>
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center space-x-2">
                        <Link
                          to={`/rooms/${room.id}`}
                          className="flex items-center space-x-1 px-3 py-1.5 bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 rounded-lg text-xs font-semibold transition"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </Link>
                        <button
                          onClick={() => {
                            deleteRoom(room.id);
                            showToast(`Room ${room.name} removed by admin.`);
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition"
                          title="Delete Room"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminRooms;
