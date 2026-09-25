import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Code2,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  LayoutDashboard,
  LogOut,
  Terminal,
} from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl py-3.5'
          : 'bg-slate-950/40 backdrop-blur-md border-b border-slate-800/40 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:scale-105 group-hover:rotate-1 transition-all duration-300">
                <Code2 className="w-6 h-6 text-slate-950 stroke-[2.5]" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-pulse"></span>
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white flex items-center gap-0.5 font-sans">
                Collab<span className="text-emerald-400">Code</span>
              </span>
              <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold -mt-0.5">
                Real-Time IDE Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-900/60 border border-slate-800/80 px-4 py-1.5 rounded-full backdrop-blur-md">
            <a
              href="#how-it-works"
              className="text-xs font-semibold text-slate-300 hover:text-emerald-400 px-3.5 py-1.5 rounded-full hover:bg-slate-800/80 transition"
            >
              Workflow
            </a>
            <a
              href="#features"
              className="text-xs font-semibold text-slate-300 hover:text-emerald-400 px-3.5 py-1.5 rounded-full hover:bg-slate-800/80 transition"
            >
              Features
            </a>
            <a
              href="#languages"
              className="text-xs font-semibold text-slate-300 hover:text-emerald-400 px-3.5 py-1.5 rounded-full hover:bg-slate-800/80 transition"
            >
              Languages
            </a>
            <Link
              to="/admin"
              className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full hover:bg-purple-500/10 transition"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Demo</span>
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-4 py-2.5 rounded-xl transition"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Workspace ({user?.name ? user.name.split(' ')[0] : 'User'})</span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2.5 text-slate-400 hover:text-rose-400 bg-slate-900 border border-slate-800 hover:border-rose-500/30 rounded-xl transition cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-xs font-bold text-slate-300 hover:text-white px-4 py-2.5 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="uiverse-btn-glow inline-flex items-center space-x-2 text-xs font-black text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 hover:from-emerald-300 hover:to-teal-200 px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900 border border-slate-800 transition cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800 px-5 pt-4 pb-6 space-y-3 backdrop-blur-2xl animate-fadeIn">
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-300 hover:text-emerald-400 py-2"
          >
            How It Works
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-300 hover:text-emerald-400 py-2"
          >
            Features
          </a>
          <a
            href="#languages"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-300 hover:text-emerald-400 py-2"
          >
            Multi-Language
          </a>
          <Link
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-1.5 text-sm font-semibold text-purple-400 py-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Admin Console</span>
          </Link>

          <div className="pt-4 border-t border-slate-800/80 flex flex-col space-y-2.5">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 font-bold text-slate-950 bg-emerald-400 rounded-xl shadow"
                >
                  Go to Workspace
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2 font-semibold text-rose-400 bg-rose-500/10 rounded-xl"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 font-bold text-slate-300 bg-slate-900 border border-slate-800 rounded-xl"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 font-black text-slate-950 bg-emerald-400 rounded-xl shadow-lg shadow-emerald-500/20"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
