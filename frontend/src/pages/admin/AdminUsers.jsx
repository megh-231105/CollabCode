import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { useApp } from '../../context/AppContext';
import { adminService } from '../../services/api';
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
  Mail,
  Loader2,
  Calendar,
  Layers
} from 'lucide-react';

const AdminUsers = () => {
  const { showToast } = useApp();
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await adminService.getUsers();
      if (res && res.users) {
        setUsersList(res.users);
      }
    } catch (err) {
      console.warn('Failed to load users from backend:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = usersList.filter((u) => {
    const nameMatch = (u.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const emailMatch = (u.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = nameMatch || emailMatch;
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to remove user "${userName}" from MongoDB Atlas?`)) {
      return;
    }

    try {
      await adminService.deleteUser(userId);
      setUsersList((prev) => prev.filter((u) => u.id !== userId && u._id !== userId));
      showToast(`User "${userName}" removed from database.`);
      if (selectedUser?.id === userId || selectedUser?._id === userId) setSelectedUser(null);
    } catch (err) {
      showToast(err.message || 'Error deleting user', 'error');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-6 font-sans">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <Users className="w-7 h-7 text-purple-400" />
              <span>User Directory</span>
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Inspect user roles, monitor account status, and manage registration directory in MongoDB Atlas.
            </p>
          </div>
          <div className="text-xs font-mono font-bold text-slate-300 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
            Total Registered: <span className="text-purple-400">{usersList.length}</span>
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
              className="uiverse-input w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition text-sm font-medium"
            />
          </div>

          {/* Role Filter */}
          <div className="flex items-center space-x-1.5">
            <span className="text-xs text-slate-400 font-bold font-mono mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Role:
            </span>
            {['ALL', 'USER', 'ADMIN'].map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition cursor-pointer ${
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

        {/* Users Table (Shards React Style) */}
        <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center space-y-3">
                <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
                <span className="text-xs font-medium">Loading registered users from MongoDB Atlas...</span>
              </div>
            ) : filteredUsers.length > 0 ? (
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-950 text-xs font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-4 px-6 font-bold">User</th>
                    <th className="py-4 px-6 font-bold">Email</th>
                    <th className="py-4 px-6 font-bold">Role</th>
                    <th className="py-4 px-6 font-bold">Status</th>
                    <th className="py-4 px-6 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id || user._id}
                      className="hover:bg-slate-800/40 transition duration-150"
                    >
                      <td className="py-4 px-6 font-bold text-white flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-xl bg-slate-800 text-purple-300 border border-purple-500/20 flex items-center justify-center font-bold text-xs shrink-0">
                          {user.name ? user.name[0].toUpperCase() : 'U'}
                        </div>
                        <span className="truncate">{user.name}</span>
                      </td>
                      <td className="py-4 px-6 font-mono text-xs text-slate-300">{user.email}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-md text-[11px] font-bold font-mono ${
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
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          <span>{user.status || 'Active'}</span>
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedUser(user)}
                            className="px-3 py-1.5 bg-slate-800 hover:bg-purple-600 hover:text-white text-slate-300 rounded-lg text-xs font-semibold transition cursor-pointer"
                          >
                            Inspect
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id || user._id, user.name)}
                            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition cursor-pointer"
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
            ) : (
              <div className="p-10 text-center text-slate-400 text-xs">
                No users found matching query
              </div>
            )}
          </div>
        </div>

        {/* User Details Modal */}
        {selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-purple-400" />
                  <span>User Details</span>
                </h3>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 bg-slate-950/90 rounded-2xl border border-slate-800">
                  <span className="text-slate-400 block mb-1 font-mono uppercase text-[10px]">Full Name</span>
                  <span className="text-sm font-bold text-white">{selectedUser.name}</span>
                </div>
                <div className="p-3.5 bg-slate-950/90 rounded-2xl border border-slate-800">
                  <span className="text-slate-400 block mb-1 font-mono uppercase text-[10px]">Email Address</span>
                  <span className="text-sm font-medium text-slate-200 font-mono">{selectedUser.email}</span>
                </div>
                <div className="p-3.5 bg-slate-950/90 rounded-2xl border border-slate-800 flex justify-between">
                  <div>
                    <span className="text-slate-400 block mb-1 font-mono uppercase text-[10px]">Assigned Role</span>
                    <span className="font-bold text-purple-300 font-mono">{selectedUser.role}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-1 font-mono uppercase text-[10px]">Joined Date</span>
                    <span className="font-bold text-white">{selectedUser.joinedDate || 'Recent'}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition cursor-pointer"
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
