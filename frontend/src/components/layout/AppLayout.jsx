import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import CreateRoomModal from '../modals/CreateRoomModal';
import JoinRoomModal from '../modals/JoinRoomModal';
import CodeCrewLogo from '../CodeCrewLogo';
import {
  LayoutDashboard,
  DoorOpen,
  Bookmark,
  User,
  LogOut,
  Plus,
  LogIn,
  Menu,
  X,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

const AppLayout = ({ children }) => {
  const {
    currentUser,
    setIsCreateModalOpen,
    setIsJoinModalOpen,
    notification,
    showToast
  } = useApp();
  const { logout } = useAuth();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showToast('Logged out of session.');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Rooms', path: '/rooms', icon: DoorOpen },
    { name: 'Saved Code', path: '/saved-code', icon: Bookmark },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-charcoal-950 text-slate-100 flex flex-col md:flex-row font-sans selection:bg-emerald-500 selection:text-charcoal-950">
      {/* Toast Notification Container */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 flex items-center space-x-3 bg-charcoal-900/95 border border-emerald-500/40 text-slate-100 px-4 py-3.5 rounded-2xl shadow-2xl backdrop-blur-xl animate-bounce-short">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">CodeCrew Notification</p>
            <p className="text-xs text-slate-300">{notification.message}</p>
          </div>
        </div>
      )}

      {/* Modals */}
      <CreateRoomModal />
      <JoinRoomModal />

      {/* Desktop Sidebar (Google Stitch & Shards Architecture) */}
      <aside className="hidden md:flex flex-col w-64 bg-charcoal-900/80 border-r border-charcoal-750 p-5 shrink-0 select-none backdrop-blur-xl justify-between">
        <div>
          {/* Brand */}
          <Link to="/dashboard" className="flex items-center space-x-2 mb-8 px-1 group">
            <CodeCrewLogo size="sm" subtext="Workspace" />
          </Link>

          {/* Action Buttons in Sidebar */}
          <div className="space-y-2 mb-6">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="uiverse-btn-glow w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-gradient-to-r from-emerald-400 to-lime-300 hover:from-emerald-300 hover:to-lime-200 text-charcoal-950 font-black rounded-xl text-xs transition shadow-md shadow-emerald-500/15 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Create Room</span>
            </button>
            <button
              onClick={() => setIsJoinModalOpen(true)}
              className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-charcoal-800 hover:bg-charcoal-750 text-emerald-300 border border-charcoal-700 hover:border-emerald-500/40 font-bold rounded-xl text-xs transition cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Join Room</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <p className="px-3 text-[10px] font-bold uppercase font-mono tracking-wider text-slate-400 mb-2">
              Crew Navigation
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                      isActive
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-charcoal-800'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}

            <div className="my-5 border-t border-charcoal-800"></div>

            <p className="px-3 text-[10px] font-bold uppercase font-mono tracking-wider text-slate-400 mb-2">
              System Admin
            </p>
            <Link
              to="/admin"
              className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-lime-400 hover:text-lime-300 hover:bg-lime-500/10 border border-transparent hover:border-lime-500/20 transition"
            >
              <ShieldCheck className="w-4 h-4 text-lime-400" />
              <span>Admin Portal</span>
            </Link>
          </nav>
        </div>

        {/* User Card & Logout (Dynamic Real Data) */}
        <div className="pt-4 border-t border-charcoal-800">
          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-charcoal-950/80 border border-charcoal-800">
            <div className="flex items-center space-x-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-lime-400 text-charcoal-950 flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
                {currentUser?.avatar || (currentUser?.name ? currentUser.name[0].toUpperCase() : 'U')}
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">{currentUser?.name || 'Crew Member'}</p>
                <p className="text-[10px] text-slate-400 truncate font-mono">{currentUser?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-charcoal-800 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Top Navbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-charcoal-900/95 border-b border-charcoal-800 sticky top-0 z-30 backdrop-blur-xl">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <CodeCrewLogo size="xs" showText={true} />
        </Link>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="p-2 bg-emerald-400 text-charcoal-950 rounded-xl"
            title="Create Room"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 text-slate-400 hover:text-white rounded-xl bg-charcoal-800 border border-charcoal-700"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-charcoal-950/90 backdrop-blur-md flex">
          <div className="w-64 bg-charcoal-900 border-r border-charcoal-800 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-charcoal-800 mb-4">
                <span className="font-bold text-white text-sm">Navigation</span>
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
                        `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold ${
                          isActive
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
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
                  className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-lime-400"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin Portal</span>
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
          <div className="flex-1" onClick={() => setMobileSidebarOpen(false)}></div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto min-h-screen bg-charcoal-950 flex flex-col">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;

