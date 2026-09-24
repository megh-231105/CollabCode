import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
              <Code2 className="w-6 h-6 text-slate-950 font-black stroke-[2.5]" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
                Collab<span className="text-emerald-400">Code</span>
              </span>
              <span className="block text-[11px] font-medium tracking-wide text-slate-400">
                Collaborative Code Editor
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition">
              Features
            </a>
            <a href="#about" className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition">
              About
            </a>
            <Link to="/admin" className="text-sm font-medium text-purple-400 hover:text-purple-300 flex items-center gap-1 transition">
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Demo</span>
            </Link>
          </div>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="text-sm font-semibold text-slate-300 hover:text-white px-4 py-2.5 rounded-xl hover:bg-slate-800/80 transition"
            >
              Login
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center space-x-2 text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition transform hover:-translate-y-0.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3 animate-fadeIn">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800"
          >
            Features
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800"
          >
            About
          </a>
          <Link
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-purple-400 hover:text-purple-300 px-3 py-2 rounded-lg hover:bg-slate-800"
          >
            Admin Demo
          </Link>
          <div className="pt-4 border-t border-slate-800 flex flex-col space-y-2">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-xl"
            >
              Login
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 font-bold text-slate-950 bg-emerald-400 rounded-xl shadow"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
