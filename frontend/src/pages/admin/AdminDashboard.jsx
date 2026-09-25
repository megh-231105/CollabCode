import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import { adminService } from '../../services/api';
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
  Clock,
  Database
} from 'lucide-react';

const AdminDashboard = () => {
  const [statsData, setStatsData] = useState({
    totalUsers: 0,
    totalRooms: 0,
    activeRooms: 0,
    totalSavedCodes: 0,
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentRooms, setRecentRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await adminService.getStats();
        if (res && res.stats) {
          setStatsData(res.stats);
          setRecentUsers(res.recentUsers || []);
          setRecentRooms(res.recentRooms || []);
        }
      } catch (err) {
        console.warn('Failed to load admin stats:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    {
      title: 'Total Users',
      value: statsData.totalUsers,
      change: 'Registered in MongoDB Atlas',
      icon: Users,
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30',
      link: '/admin/users',
    },
    {
      title: 'Total Rooms',
      value: statsData.totalRooms,
      change: 'Cloud sessions created',
      icon: DoorOpen,
      color: 'from-lime-500/20 to-emerald-500/10 text-lime-400 border-lime-500/30',
      link: '/admin/rooms',
    },
    {
      title: 'Active Rooms',
      value: statsData.activeRooms,
      change: 'Live coding environments',
      icon: Activity,
      color: 'from-emerald-500/20 to-lime-500/10 text-emerald-400 border-emerald-500/30',
      link: '/admin/rooms',
    },
    {
      title: 'Saved Programs',
      value: statsData.totalSavedCodes,
      change: 'In developer catalogs',
      icon: Bookmark,
      color: 'from-amber-500/20 to-emerald-500/10 text-amber-400 border-amber-500/30',
      link: '/admin',
    },
  ];

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-8 font-sans">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
              <span>MongoDB Atlas Admin Console</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Admin Overview Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Live system analytics, registered users directory, and collaborative room metrics.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/admin/users"
              className="uiverse-btn-glow px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs transition shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              Manage Users
            </Link>
            <Link
              to="/admin/rooms"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold rounded-xl text-xs transition cursor-pointer"
            >
              View Rooms
            </Link>
          </div>
        </div>

        {/* Statistics Metric Cards (Shards Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Link
                key={idx}
                to={stat.link}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-emerald-500/40 transition hover:-translate-y-1 block shadow-xl group backdrop-blur-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase font-mono tracking-wider text-slate-400">
                    {stat.title}
                  </span>
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} border flex items-center justify-center group-hover:scale-105 transition`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="text-3xl font-black text-white mb-2">
                  {loading ? '...' : stat.value}
                </div>
                <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{stat.change}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Lower Grid: Recent Users & System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Platform Activity */}
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Recent Database Registrations</span>
              </h2>
              <span className="text-xs text-slate-400 font-mono">MongoDB Live</span>
            </div>

            <div className="space-y-3">
              {recentUsers.length > 0 ? (
                recentUsers.map((u, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800/80"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-300 flex items-center justify-center font-bold text-xs border border-emerald-500/20">
                        {u.name ? u.name[0].toUpperCase() : 'U'}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">
                          <span className="text-emerald-400 font-semibold">{u.name}</span>{' '}
                          registered account ({u.role})
                        </p>
                        <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5 font-mono">
                          <Clock className="w-3 h-3" />
                          {u.email}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Active
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center p-6 text-slate-400 text-xs">
                  No recent registrations to display
                </div>
              )}
            </div>
          </div>

          {/* Infrastructure Health Card */}
          <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-xl">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2 mb-4">
                <Server className="w-4 h-4 text-emerald-400" />
                <span>Environment Specs</span>
              </h2>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Database Engine:</span>
                  <span className="font-bold text-emerald-400">MongoDB Atlas Cloud</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Backend Server:</span>
                  <span className="font-bold text-slate-200">Express REST (5000)</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Frontend Engine:</span>
                  <span className="font-bold text-lime-400">React + Vite + Tailwind</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Token Auth:</span>
                  <span className="font-bold text-emerald-400">JWT (7-Day Expiry)</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-center">
              <Link
                to="/dashboard"
                className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Switch to Developer Workspace</span>
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
