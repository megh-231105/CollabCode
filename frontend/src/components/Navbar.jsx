import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CodeCrewLogo from './CodeCrewLogo';
import { LogOut, User as UserIcon, Shield } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-charcoal-900/90 backdrop-blur border-b border-charcoal-750 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Branding */}
          <Link to="/" className="flex items-center space-x-3 group">
            <CodeCrewLogo size="md" subtext="Workspace" />
          </Link>

          {/* Nav Actions */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-2 bg-charcoal-800 border border-charcoal-700 px-3 py-1.5 rounded-lg">
                  <UserIcon className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-slate-200 font-medium">{user?.name}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded font-semibold ${
                      user?.role === 'ADMIN'
                        ? 'bg-lime-500/20 text-lime-300 border border-lime-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {user?.role}
                  </span>
                </div>

                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-charcoal-800 transition"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1.5 text-sm font-medium text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 px-3 py-1.5 rounded-lg transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-charcoal-800 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-black text-charcoal-950 bg-gradient-to-r from-emerald-400 to-lime-300 hover:from-emerald-300 hover:to-lime-200 px-4 py-2 rounded-lg transition shadow-md shadow-emerald-500/15"
                >
                  Start a Crew
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

