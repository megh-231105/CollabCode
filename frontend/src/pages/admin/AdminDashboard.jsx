import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import {
  Users,
  DoorOpen,
  Activity,
  Bookmark,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Server,
  Cpu,
  Clock
} from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '128',
      change: '+12% this week',
      icon: Users,
      color: 'from-purple-500/20 to-indigo-500/10 text-purple-400 border-purple-500/30',
      link: '/admin/users',
    },
    {
      title: 'Total Rooms',
      value: '42',
      change: '+6 created today',
      icon: DoorOpen,
      color: 'from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/30',
      link: '/admin/rooms',
    },
    {
      title: 'Active Rooms',
      value: '18',
      change: 'Real-time sessions',
      icon: Activity,
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30',
      link: '/admin/rooms',
    },
    {
      title: 'Saved Programs',
      value: '356',
      change: 'In student catalogs',
      icon: Bookmark,
      color: 'from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30',
      link: '/admin',
    },
  ];

  const recentLogs = [
    { user: 'Meghana', action: 'Created room "DSA Practice" (C++)', time: '5 mins ago' },
    { user: 'Rahul', action: 'Joined room "Java Practice" (Java)', time: '18 mins ago' },
    { user: 'Anu Sharma', action: 'Saved Python script "Prime Number Checker"', time: '1 hour ago' },
    { user: 'Vikram', action: 'Logged into workspace', time: '3 hours ago' },
  ];

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CollabCode Management</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Admin Overview Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              System analytics, user activity, and collaborative room metrics.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/admin/users"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-purple-600/20"
            >
              Manage Users
            </Link>
            <Link
              to="/admin/rooms"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold rounded-xl text-xs transition"
            >
              View Rooms
            </Link>
          </div>
        </div>

        {/* Statistics Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Link
                key={idx}
                to={stat.link}
                className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition hover:-translate-y-1 block shadow-lg group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {stat.title}
                  </span>
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} border flex items-center justify-center group-hover:scale-105 transition`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="text-3xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{stat.change}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Lower Grid: Recent Logs & System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Platform Activity */}
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-400" />
                <span>Live Activity Stream</span>
              </h2>
              <span className="text-xs text-slate-400">Auto-refreshing</span>
            </div>

            <div className="space-y-3">
              {recentLogs.map((log, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800/80"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-300 flex items-center justify-center font-bold text-xs">
                      {log.user[0]}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">
                        <span className="text-purple-400 font-semibold">{log.user}</span>{' '}
                        {log.action}
                      </p>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {log.time}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    200 OK
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Infrastructure Health Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2 mb-4">
                <Server className="w-4 h-4 text-emerald-400" />
                <span>Environment Specs</span>
              </h2>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Database Engine:</span>
                  <span className="font-bold text-emerald-400">MongoDB Atlas v8.0</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Backend Server:</span>
                  <span className="font-bold text-slate-200">Node.js Express (5000)</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Frontend Engine:</span>
                  <span className="font-bold text-cyan-400">React + Vite + Tailwind</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Token Auth:</span>
                  <span className="font-bold text-purple-400">JWT (7-Day Expiry)</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-center">
              <Link
                to="/dashboard"
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center justify-center gap-1"
              >
                <span>Switch to Student Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
