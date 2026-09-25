import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import { useApp } from '../../context/AppContext';
import { adminService } from '../../services/api';
import {
  DoorOpen,
  Search,
  Filter,
  Eye,
  Trash2,
  Users,
  ExternalLink,
  Layers,
  Plus,
  Loader2,
  Calendar
} from 'lucide-react';

const AdminRooms = () => {
  const { deleteRoom, setIsCreateModalOpen, showToast } = useApp();
  const [roomsList, setRoomsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRooms = async () => {
    try {
      const res = await adminService.getRooms();
      if (res && res.rooms) {
        setRoomsList(res.rooms);
      }
    } catch (err) {
      console.warn('Failed to load admin rooms:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const filtered = roomsList.filter((r) => {
    const nameMatch = (r.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const ownerMatch = (r.owner || '').toLowerCase().includes(searchTerm.toLowerCase());
    const langMatch = (r.language || '').toLowerCase().includes(searchTerm.toLowerCase());
    const idMatch = (r.id || '').toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || ownerMatch || langMatch || idMatch;
  });

  const handleDeleteRoom = async (roomId, roomName) => {
    if (!window.confirm(`Are you sure you want to remove room "${roomName}" from MongoDB Atlas?`)) {
      return;
    }

    try {
      await adminService.deleteRoom(roomId);
      setRoomsList((prev) => prev.filter((r) => r.id !== roomId && r._id !== roomId));
      showToast(`Room "${roomName}" removed from database.`);
    } catch (err) {
      showToast(err.message || 'Error deleting room', 'error');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-6 font-sans">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <DoorOpen className="w-7 h-7 text-emerald-400" />
              <span>Coding Rooms Directory</span>
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Inspect active coding rooms, review language workloads, and manage sessions in MongoDB Atlas.
            </p>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="uiverse-btn-glow flex items-center space-x-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs transition shadow-lg shadow-emerald-500/20 cursor-pointer"
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
            placeholder="Search room name, owner, language, or Room ID..."
            className="uiverse-input w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition text-sm font-medium"
          />
        </div>

        {/* Rooms Table (Shards React Style) */}
        <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center space-y-3">
                <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
                <span className="text-xs font-medium">Loading coding rooms from MongoDB Atlas...</span>
              </div>
            ) : filtered.length > 0 ? (
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-950 text-xs font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-4 px-6 font-bold">Room Name</th>
                    <th className="py-4 px-6 font-bold">Owner</th>
                    <th className="py-4 px-6 font-bold">Language</th>
                    <th className="py-4 px-6 font-bold">Members</th>
                    <th className="py-4 px-6 font-bold">Status</th>
                    <th className="py-4 px-6 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {filtered.map((room) => (
                    <tr
                      key={room.id || room._id}
                      className="hover:bg-slate-800/40 transition duration-150"
                    >
                      <td className="py-4 px-6 font-bold text-white">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-8 h-8 rounded-xl bg-slate-800 text-emerald-300 border border-emerald-500/20 flex items-center justify-center font-bold text-xs shrink-0">
                            <DoorOpen className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="block truncate max-w-[200px]">{room.name}</span>
                            <span className="block text-[10px] font-mono text-emerald-400">
                              ID: {room.id}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-semibold text-slate-200">{room.owner}</td>
                      <td className="py-4 px-6">
                        <span className="inline-flex px-2.5 py-0.5 rounded-md text-[11px] font-bold font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                          {room.language}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-semibold text-slate-300">
                        <span className="flex items-center gap-1.5 font-mono text-xs">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          {room.members || 1}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center space-x-1.5 text-xs text-emerald-400 font-medium">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          <span>{room.status || 'Active'}</span>
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex items-center space-x-2">
                          <Link
                            to={`/rooms/${room.id}`}
                            className="flex items-center space-x-1 px-3 py-1.5 bg-slate-800 hover:bg-emerald-400 hover:text-slate-950 text-slate-200 rounded-lg text-xs font-bold transition"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Inspect</span>
                          </Link>
                          <button
                            onClick={() => handleDeleteRoom(room.id || room._id, room.name)}
                            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition cursor-pointer"
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
            ) : (
              <div className="p-10 text-center text-slate-400 text-xs">
                No rooms found matching query
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminRooms;
