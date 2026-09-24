import React, { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Search,
  Filter,
  Shield,
  Eye,
  Trash2,
  CheckCircle2,
  X,
  UserCheck,
  Mail
} from 'lucide-react';

const AdminUsers = () => {
  const { adminUsers, setAdminUsers, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = adminUsers.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleDeleteUser = (userId, userName) => {
    setAdminUsers(adminUsers.filter((u) => u.id !== userId));
    showToast(`User "${userName}" removed from system.`);
    if (selectedUser?.id === userId) setSelectedUser(null);
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Users Management
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Inspect user roles, monitor account status, and manage registration directory.
            </p>
          </div>
          <div className="text-xs text-slate-400 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
            Total Registered Users: <span className="text-purple-400 font-bold">{adminUsers.length}</span>
          </div>
        </div>

        {/* Search and Role Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users by name or email..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition text-sm"
            />
          </div>

          {/* Role Filter */}
          <div className="flex items-center space-x-1.5">
            <span className="text-xs text-slate-400 font-semibold mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Role:
            </span>
            {['ALL', 'USER', 'ADMIN'].map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  roleFilter === role
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-4 px-6 font-bold">Name</th>
                  <th className="py-4 px-6 font-bold">Email</th>
                  <th className="py-4 px-6 font-bold">Role</th>
                  <th className="py-4 px-6 font-bold">Status</th>
                  <th className="py-4 px-6 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-800/40 transition duration-150"
                  >
                    <td className="py-4 px-6 font-semibold text-white flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 text-purple-300 border border-purple-500/20 flex items-center justify-center font-bold text-xs">
                        {user.name[0]}
                      </div>
                      <span>{user.name}</span>
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-slate-300">{user.email}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded text-[11px] font-bold ${
                          user.role === 'ADMIN'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center space-x-1.5 text-xs text-emerald-400 font-medium">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <span>{user.status}</span>
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-purple-600 hover:text-white text-slate-300 rounded-lg text-xs font-semibold transition"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id, user.name)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition"
                          title="Delete User"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Details Modal */}
        {selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-purple-400" />
                  <span>User Details</span>
                </h3>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1">Full Name</span>
                  <span className="text-sm font-bold text-white">{selectedUser.name}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1">Email Address</span>
                  <span className="text-sm font-medium text-slate-200">{selectedUser.email}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                  <div>
                    <span className="text-slate-400 block mb-1">Assigned Role</span>
                    <span className="font-bold text-purple-300">{selectedUser.role}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-1">Rooms Joined</span>
                    <span className="font-bold text-white">{selectedUser.roomsCount || 2}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
