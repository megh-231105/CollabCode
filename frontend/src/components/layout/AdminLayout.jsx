import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  LayoutDashboard,
  Users,
  DoorOpen,
  LogOut,
  ArrowLeft,
  Settings,
  ShieldCheck,
  Menu,
  X,
  Server,
  Activity
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const AdminLayout = ({ children }) => {
  const { showToast } = useApp();
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();

  const adminNav = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Rooms', path: '/admin/rooms', icon: DoorOpen },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 p-5 shrink-0 select-none">
        {/* Brand */}
        <div className="mb-8 px-2">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <ShieldCheck className="w-6 h-6 text-white stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white flex items-center">
                Collab<span className="text-purple-400">Code</span>
              </span>
              <span className="inline-block text-[10px] uppercase font-bold tracking-wider text-purple-300 bg-purple-500/20 border border-purple-500/30 px-1.5 py-0.2 rounded">
                Admin Console
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1.5 flex-1">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Administration
          </p>
          {adminNav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? 'bg-purple-500/10 text-purple-300 border border-purple-500/30 shadow-sm'
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
            Workspace Switch
          </p>
          <Link
            to="/dashboard"
            className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/20 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to User App</span>
          </Link>
        </nav>

        {/* Bottom Section */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <div className="p-3 bg-purple-950/30 border border-purple-900/40 rounded-xl">
            <div className="flex items-center justify-between text-xs text-purple-300 font-semibold mb-1">
              <span className="flex items-center gap-1">
                <Server className="w-3.5 h-3.5 text-purple-400" />
                System Health
              </span>
              <span className="text-emerald-400">Optimal</span>
            </div>
            <p className="text-[11px] text-slate-400">Node.js Express + Atlas Cluster</p>
          </div>

          <button
            onClick={() => {
              showToast('Logged out of Admin Portal');
              navigate('/login');
            }}
            className="w-full flex items-center justify-center space-x-2 py-2.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl text-xs font-semibold transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-30">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-lg font-black text-white">
            CollabCode <span className="text-purple-400">Admin</span>
          </span>
        </div>
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
        >
          {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenu && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-2">
          {adminNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenu(false)}
              className="block px-3 py-2 text-sm font-semibold text-slate-300 hover:text-white"
            >
              {item.name}
            </NavLink>
          ))}
          <Link
            to="/dashboard"
            onClick={() => setMobileMenu(false)}
            className="block px-3 py-2 text-sm font-semibold text-emerald-400"
          >
            Back to User App
          </Link>
        </div>
      )}

      {/* Admin Content Area */}
      <main className="flex-1 overflow-y-auto min-h-screen bg-slate-950 p-6 md:p-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
