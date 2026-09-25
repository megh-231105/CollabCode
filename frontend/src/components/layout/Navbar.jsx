import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import CodeCrewLogo from '../CodeCrewLogo';
import {
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  LayoutDashboard,
  LogOut,
  Sparkles,
} from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-charcoal-950/90 backdrop-blur-xl border-b border-charcoal-750 shadow-2xl py-3'
          : 'bg-charcoal-950/50 backdrop-blur-md border-b border-charcoal-800/40 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <CodeCrewLogo size="md" subtext="Collaborative Workspace" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-charcoal-900/80 border border-charcoal-750 px-4 py-1.5 rounded-full backdrop-blur-md shadow-inner">
            <a
              href="#how-it-works"
              className="text-xs font-semibold text-slate-300 hover:text-emerald-400 px-3.5 py-1.5 rounded-full hover:bg-charcoal-800 transition"
            >
              How It Works
            </a>
            <a
              href="#features"
              className="text-xs font-semibold text-slate-300 hover:text-emerald-400 px-3.5 py-1.5 rounded-full hover:bg-charcoal-800 transition"
            >
              Features
            </a>
            <a
              href="#languages"
              className="text-xs font-semibold text-slate-300 hover:text-emerald-400 px-3.5 py-1.5 rounded-full hover:bg-charcoal-800 transition"
            >
              Languages
            </a>
            <a
              href="#showcase"
              className="text-xs font-semibold text-slate-300 hover:text-emerald-400 px-3.5 py-1.5 rounded-full hover:bg-charcoal-800 transition"
            >
              Execution
            </a>
            <Link
              to="/admin"
              className="text-xs font-semibold text-lime-400 hover:text-lime-300 flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-lime-500/10 transition"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-4 py-2 rounded-xl transition shadow-sm"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Workspace ({user?.name ? user.name.split(' ')[0] : 'Crew'})</span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-rose-400 bg-charcoal-900 border border-charcoal-800 hover:border-rose-500/30 rounded-xl transition cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-xs font-bold text-slate-300 hover:text-white px-3.5 py-2 rounded-xl hover:bg-charcoal-850 border border-transparent hover:border-charcoal-700 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="uiverse-btn-glow inline-flex items-center space-x-2 text-xs font-black text-charcoal-950 bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-400 hover:from-emerald-300 hover:to-lime-200 px-4.5 py-2 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Start Coding</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-xl bg-charcoal-900 border border-charcoal-800 transition cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-charcoal-950/98 border-b border-charcoal-800 px-5 pt-4 pb-6 space-y-3 backdrop-blur-2xl animate-fadeIn">
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-300 hover:text-emerald-400 py-2"
          >
            How CodeCrew Works
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
            Supported Languages
          </a>
          <a
            href="#showcase"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-300 hover:text-emerald-400 py-2"
          >
            Code Execution Showcase
          </a>
          <Link
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-1.5 text-sm font-semibold text-lime-400 py-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Admin Console</span>
          </Link>

          <div className="pt-4 border-t border-charcoal-800 flex flex-col space-y-2.5">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 font-bold text-charcoal-950 bg-emerald-400 rounded-xl shadow"
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
                  className="w-full text-center py-2.5 font-bold text-slate-300 bg-charcoal-900 border border-charcoal-800 rounded-xl"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 font-black text-charcoal-950 bg-gradient-to-r from-emerald-400 to-lime-300 rounded-xl shadow-lg shadow-emerald-500/20"
                >
                  Start a Crew
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

