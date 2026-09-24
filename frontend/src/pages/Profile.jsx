import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import { useApp } from '../context/AppContext';
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
  X
} from 'lucide-react';

const Profile = () => {
  const { currentUser, updateProfile, showToast, rooms, savedCode } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const navigate = useNavigate();

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({ name, email });
    setIsEditing(false);
  };

  const handleLogout = () => {
    showToast('Logged out of demo session.');
    navigate('/login');
  };

  return (
    <AppLayout>
      <div className="p-6 md:p-10 max-w-4xl mx-auto w-full space-y-8">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-800/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shadow-emerald-500/20">
                {currentUser.avatar || 'M'}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {currentUser.name}
                  </h1>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {currentUser.role}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{currentUser.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold rounded-xl text-xs transition"
              >
                <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Edit Profile</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1.5 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 font-semibold rounded-xl text-xs transition"
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
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <User className="w-4 h-4 text-emerald-400" />
              <span>Personal Details</span>
            </h2>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
                  Full Name
                </span>
                <span className="text-sm font-semibold text-white">{currentUser.name}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
                  Email Address
                </span>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-semibold text-slate-200">{currentUser.email}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
                  Role Permission
                </span>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-bold text-emerald-400">{currentUser.role}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
                  Member Since
                </span>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-semibold text-slate-300">
                    {currentUser.memberSince}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Statistics & Achievements */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5 flex flex-col justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center space-x-2 mb-4">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Coding Statistics</span>
              </h2>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <span className="text-2xl font-black text-white">{rooms.length}</span>
                  <span className="text-[11px] text-slate-400 block font-semibold mt-1">
                    Rooms Joined
                  </span>
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <span className="text-2xl font-black text-cyan-400">{savedCode.length}</span>
                  <span className="text-[11px] text-slate-400 block font-semibold mt-1">
                    Saved Programs
                  </span>
                </div>
              </div>

              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-2">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> FSD College Project Milestone
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Phase 1 complete with clean modular React architecture, full responsive navigation, and developer coding tools.
                </p>
              </div>
            </div>

            <div className="text-xs text-slate-400 text-center">
              CollabCode User ID: <code className="font-mono text-emerald-300">USR-2026-M404</code>
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
                <h3 className="text-base font-bold text-white">Edit Profile</h3>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg"
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
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
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
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl transition"
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
