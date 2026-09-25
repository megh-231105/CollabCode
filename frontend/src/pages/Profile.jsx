import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import {
  User,
  Mail,
  Shield,
  Calendar,
  LogOut,
  Edit3,
  CheckCircle2,
  Code2,
  Award,
  Sparkles,
  X,
  Database,
  Terminal,
  Activity
} from 'lucide-react';

const Profile = () => {
  const { currentUser, updateProfile, showToast, rooms, savedCode } = useApp();
  const { logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const navigate = useNavigate();

  // Compute rooms belonging to current user
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

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    await updateProfile({ name, email });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    showToast('Logged out of session.');
    navigate('/login');
  };

  return (
    <AppLayout>
      <div className="p-6 md:p-10 max-w-4xl mx-auto w-full space-y-8 font-sans">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-800/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-emerald-400 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shadow-emerald-500/20">
                {currentUser?.avatar || (currentUser?.name ? currentUser.name[0].toUpperCase() : 'U')}
              </div>
              <div>
                <div className="flex items-center space-x-2.5">
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {currentUser?.name || 'Developer'}
                  </h1>
                  <span className="text-[11px] font-bold font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                    {currentUser?.role || 'USER'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 font-mono">{currentUser?.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  setName(currentUser.name);
                  setEmail(currentUser.email);
                  setIsEditing(true);
                }}
                className="flex items-center space-x-1.5 px-4 py-2 bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold rounded-xl text-xs transition cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Edit Profile</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1.5 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 font-bold rounded-xl text-xs transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Profile Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Information */}
          <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 space-y-4 backdrop-blur-xl">
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <User className="w-4 h-4 text-emerald-400" />
              <span>Personal Details (MongoDB Atlas)</span>
            </h2>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800/80">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block mb-1">
                  Full Name
                </span>
                <span className="text-sm font-semibold text-white">{currentUser?.name}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800/80">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block mb-1">
                  Email Address
                </span>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-semibold text-slate-200">{currentUser?.email}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800/80">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block mb-1">
                  Role Permission
                </span>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-bold text-emerald-400 font-mono">{currentUser?.role}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800/80">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block mb-1">
                  Member Since
                </span>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-lime-400" />
                  <span className="text-sm font-semibold text-slate-300">
                    {currentUser?.memberSince || 'Recent'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Statistics & Achievements */}
          <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 space-y-5 flex flex-col justify-between backdrop-blur-xl">
            <div>
              <h2 className="text-base font-bold text-white flex items-center space-x-2 mb-4">
                <Award className="w-4 h-4 text-lime-400" />
                <span>Developer Metrics</span>
              </h2>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-4 bg-slate-950/90 rounded-xl border border-slate-800 text-center">
                  <span className="text-3xl font-black text-white">{myRooms.length}</span>
                  <span className="text-[11px] text-slate-400 block font-semibold mt-1">
                    Crew Rooms
                  </span>
                </div>
                <div className="p-4 bg-slate-950/90 rounded-xl border border-slate-800 text-center">
                  <span className="text-3xl font-black text-emerald-400">{savedCode.length}</span>
                  <span className="text-[11px] text-slate-400 block font-semibold mt-1">
                    Saved Programs
                  </span>
                </div>
              </div>

              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-2">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-lime-400" /> CodeCrew Active Cloud Workspace
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Real database persistence active via MongoDB Atlas & Express REST API with JWT authorization.
                </p>
              </div>
            </div>

            <div className="text-xs text-slate-400 text-center font-mono">
              User ID:{' '}
              <code className="text-emerald-300">
                {currentUser?.id || currentUser?._id || 'USR-LIVE'}
              </code>
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
                <h3 className="text-base font-bold text-white">Edit Profile</h3>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="uiverse-input w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="uiverse-input w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="uiverse-btn-glow px-5 py-2 text-xs font-black bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-xl transition shadow-lg shadow-emerald-500/20"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Profile;
