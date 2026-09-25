import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { roomService } from '../../services/api';
import { X, LogIn, KeyRound, AlertCircle, ArrowRight } from 'lucide-react';

const JoinRoomModal = () => {
  const { isJoinModalOpen, setIsJoinModalOpen, rooms, showToast, refreshData } = useApp();
  const [roomId, setRoomId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!isJoinModalOpen) return null;

  const handleJoin = async (e) => {
    e.preventDefault();
    setError('');

    const trimmedId = roomId.trim().toUpperCase();
    if (!trimmedId) {
      setError('Please enter a valid Room ID.');
      return;
    }

    setLoading(true);
    try {
      // Call backend join endpoint
      await roomService.joinRoom(trimmedId).catch(() => null);
      await refreshData();
      setIsJoinModalOpen(false);
      setRoomId('');
      showToast(`Entering workspace for Room ID: ${trimmedId}`);
      navigate(`/rooms/${trimmedId}`);
    } catch (err) {
      setError(err.message || 'Error joining room');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn font-sans">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <LogIn className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">Join Coding Room</h3>
              <p className="text-xs text-slate-400">Collaborate with peers in real time on MongoDB Atlas</p>
            </div>
          </div>
          <button
            onClick={() => setIsJoinModalOpen(false)}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleJoin} className="p-6 space-y-5">
          {error && (
            <div className="flex items-center space-x-2 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs p-3 rounded-xl">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Enter Room ID
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={roomId}
                onChange={(e) => {
                  setRoomId(e.target.value.toUpperCase());
                  setError('');
                }}
                placeholder="e.g. ABC123"
                className="uiverse-input w-full pl-10 pr-4 py-2.5 bg-slate-950/90 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 font-mono tracking-widest focus:outline-none focus:border-cyan-500 transition text-sm font-bold"
              />
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Enter the unique 6-character room code shared by your teammate.
            </p>
          </div>

          {rooms.length > 0 && (
            <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 text-xs text-slate-400">
              <span className="text-slate-300 font-semibold block mb-1.5">Available active room IDs:</span>
              <div className="flex flex-wrap gap-1.5">
                {rooms.slice(0, 6).map((r) => (
                  <button
                    type="button"
                    key={r.id || r._id}
                    onClick={() => setRoomId(r.id)}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg font-mono text-xs font-bold transition cursor-pointer border border-slate-700"
                  >
                    {r.id}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsJoinModalOpen(false)}
              className="px-4 py-2.5 text-xs font-bold text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 text-xs font-black bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl transition shadow-lg shadow-cyan-500/20 cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Joining...' : 'Join Workspace'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinRoomModal;
