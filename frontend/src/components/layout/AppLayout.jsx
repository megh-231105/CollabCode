import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import CreateRoomModal from '../modals/CreateRoomModal';
import JoinRoomModal from '../modals/JoinRoomModal';
import {
  Code2,
  LayoutDashboard,
  DoorOpen,
  Bookmark,
  User,
  Settings,
  LogOut,
  Plus,
  LogIn,
  Menu,
  X,
  Shield,
  Bell,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

const AppLayout = ({ children }) => {
  const {
    currentUser,
    setIsCreateModalOpen,
    setIsJoinModalOpen,
    notification,
    showToast
  } = useApp();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    showToast('Logged out of demo session.');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Rooms', path: '/rooms', icon: DoorOpen },
    { name: 'Saved Code', path: '/saved-code', icon: Bookmark },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 flex items-center space-x-3 bg-slate-900 border border-emerald-500/40 text-slate-100 px-4 py-3 rounded-2xl shadow-2xl backdrop-blur animate-bounce-short">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="text-sm font-medium">{notification.message}</span>
        </div>
      )}

      {/* Modals */}
      <CreateRoomModal />
      <JoinRoomModal />

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900/90 border-r border-slate-800/80 p-5 shrink-0 select-none">
        {/* Brand */}
        <Link to="/dashboard" className="flex items-center space-x-3 mb-8 px-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Code2 className="w-6 h-6 text-slate-950 font-black stroke-[2.5]" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-white flex items-center">
              Collab<span className="text-emerald-400">Code</span>
            </span>
            <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Workspace
            </span>
          </div>
        </Link>

        {/* Action Buttons in Sidebar */}
        <div className="space-y-2 mb-6">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition shadow-lg shadow-emerald-500/15"
          >
            <Plus className="w-4 h-4" />
            <span>Create Room</span>
          </button>
          <button
            onClick={() => setIsJoinModalOpen(true)}
            className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-semibold rounded-xl text-sm transition"
          >
            <LogIn className="w-4 h-4" />
            <span>Join Room</span>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5 flex-1">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Main Navigation
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}

          <div className="my-5 border-t border-slate-800"></div>

          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            System & Role
          </p>
          <Link
            to="/admin"
            className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 border border-transparent hover:border-purple-500/20 transition"
          >
            <Shield className="w-4 h-4 text-purple-400" />
            <span>Admin Portal</span>
          </Link>
        </nav>

        {/* User Card & Logout */}
        <div className="pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center space-x-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-500/30">
                {currentUser.avatar}
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{currentUser.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Top Navbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-30">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
            <Code2 className="w-5 h-5" />
          </div>
          <span className="text-lg font-black tracking-tight text-white">
            Collab<span className="text-emerald-400">Code</span>
          </span>
        </Link>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="p-2 bg-emerald-500 text-slate-950 rounded-lg"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-slate-950/90 backdrop-blur-sm flex">
          <div className="w-64 bg-slate-900 border-r border-slate-800 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <span className="font-bold text-white">Menu Navigation</span>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold ${
                          isActive
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'text-slate-400 hover:text-white'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}
                <Link
                  to="/admin"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-purple-400"
                >
                  <Shield className="w-4 h-4" />
                  <span>Admin Portal</span>
                </Link>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 py-2.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 font-semibold rounded-xl text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
          <div className="flex-1" onClick={() => setMobileSidebarOpen(false)}></div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto min-h-screen bg-slate-950 flex flex-col">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
