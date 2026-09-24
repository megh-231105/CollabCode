import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, ArrowLeft, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
        <Code2 className="w-8 h-8" />
      </div>

      <span className="text-6xl sm:text-7xl font-black text-transparent bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text font-mono">
        404
      </span>

      <h1 className="text-2xl sm:text-3xl font-bold text-white mt-4 tracking-tight">
        Page Not Found
      </h1>

      <p className="text-slate-400 text-sm max-w-sm mt-2 mb-8">
        The page you're looking for doesn't exist or has been moved to another collaborative workspace.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/dashboard"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition shadow-lg shadow-emerald-500/20"
        >
          <Home className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold rounded-xl text-sm transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Landing Page</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
