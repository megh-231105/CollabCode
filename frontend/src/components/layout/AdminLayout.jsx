import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import CreateRoomModal from '../modals/CreateRoomModal';
import JoinRoomModal from '../modals/JoinRoomModal';
import {
  Code2,
  Shield,
  LayoutDashboard,
  Users,
  DoorOpen,
  LogOut,
  ArrowLeft,
  Menu,
  X,
  Server,
  Activity,
  CheckCircle2
} from 'lucide-react';

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const { notification, showToast } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showToast('Logged out of Admin Session.');
    navigate('/login');
  };

  const navItems = [
    { name: 'Admin Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'User Directory', path: '/admin/users', icon: Users },
    { name: 'Active Rooms', path: '/admin/rooms', icon: DoorOpen },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans selection:bg-purple-500 selection:text-white">
      {/* Toast Notification Container */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 flex items-center space-x-3 bg-slate-900/95 border border-purple-500/40 text-slate-100 px-4 py-3.5 rounded-2xl shadow-2xl backdrop-blur-xl animate-bounce-short">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">Admin Console</p>
            <p className="text-xs text-slate-300">{notification.message}</p>
          </div>
        </div>
      )}

      {/* Modals */}
      <CreateRoomModal />
      <JoinRoomModal />

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900/70 border-r border-slate-800/80 p-5 shrink-0 select-none backdrop-blur-xl justify-between">
        <div>
          {/* Brand */}
          <Link to="/admin" className="flex items-center space-x-3 mb-8 px-2 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white flex items-center">
                Admin<span className="text-purple-400">Portal</span>
              </span>
              <span className="block text-[10px] uppercase font-mono tracking-widest text-slate-400 font-semibold">
                MongoDB Atlas
              </span>
            </div>
          </Link>

          {/* Nav Items */}
          <nav className="space-y-1.5">
            <p className="px-3 text-[10px] font-bold uppercase font-mono tracking-wider text-slate-400 mb-2">
              Management
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/admin'}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                      isActive
                        ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30 shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}

            <div className="my-5 border-t border-slate-800/80"></div>

            <p className="px-3 text-[10px] font-bold uppercase font-mono tracking-wider text-slate-400 mb-2">
              Workspace Switch
            </p>
            <Link
              to="/dashboard"
              className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/20 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to IDE</span>
            </Link>
          </nav>
        </div>

        {/* User Card */}
        <div className="pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-950/80 border border-slate-800/90">
            <div className="flex items-center space-x-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-xs border border-purple-500/30 shrink-0">
                {user?.name ? user.name[0].toUpperCase() : 'A'}
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">{user?.name || 'Administrator'}</p>
                <p className="text-[10px] text-purple-400 font-mono">ADMIN ROLE</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Top Navbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-30">
        <Link to="/admin" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold">
            <Shield className="w-4 h-4" />
          </div>
          <span className="text-lg font-black tracking-tight text-white">
            Admin<span className="text-purple-400">Portal</span>
          </span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-slate-950/90 backdrop-blur-sm flex">
          <div className="w-64 bg-slate-900 border-r border-slate-800 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <span className="font-bold text-white text-sm">Admin Navigation</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
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
                      end={item.path === '/admin'}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold ${
                          isActive
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
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
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-emerald-400"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Switch to IDE</span>
                </Link>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 py-2.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold rounded-xl text-xs"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)}></div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto min-h-screen bg-slate-950 p-6 md:p-10 flex flex-col">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
