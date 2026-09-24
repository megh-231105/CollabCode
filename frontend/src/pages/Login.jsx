import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { authService } from '../services/api';
import {
  Code2,
  Mail,
  Lock,
  ArrowRight,
  Terminal,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast, refreshData } = useApp();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setLoading(true);

    try {
      const res = await authService.login(email.trim(), password);

      setLoading(false);

      if (res.token && res.user) {
        login(res.token, res.user);
        await refreshData();
        showToast(`Welcome back, ${res.user.name}!`);

        if (res.user.role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      setLoading(false);
      setError(
        err.message || 'Invalid email or password. Please verify your credentials.'
      );
    }
  };

  const fillAdmin = () => {
    setEmail('admin@collabcode.dev');
    setPassword('admin123');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Left Column - Coding Visual Section (Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 border-r border-slate-800 flex-col justify-between p-12 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>

        {/* Brand */}
        <Link to="/" className="flex items-center space-x-3 group z-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Code2 className="w-6 h-6 text-slate-950 font-black stroke-[2.5]" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-white">
              Collab<span className="text-emerald-400">Code</span>
            </span>
            <span className="block text-[10px] text-slate-400 font-medium">
              Collaborative Code Editor
            </span>
          </div>
        </Link>

        {/* Graphic Card */}
        <div className="z-10 my-auto max-w-md">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-emerald-400 font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MongoDB Atlas Full-Stack Architecture</span>
          </div>

          <h2 className="text-3xl font-black text-white tracking-tight mb-4">
            Where Developers Think & Code Together
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            Create multi-language coding rooms in seconds. Share your ideas, practice complex data structures, and keep your solutions organized with cloud persistence.
          </p>

          {/* Snippet Preview Card */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-slate-300 shadow-xl space-y-1">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
              <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                <Terminal className="w-3.5 h-3.5" /> main.cpp
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">
                Live Session
              </span>
            </div>
            <p className="text-purple-400">#include &lt;iostream&gt;</p>
            <p className="text-blue-400">int main() &#123;</p>
            <p className="pl-4 text-emerald-300">std::cout &lt;&lt; "Welcome back!" &lt;&lt; std::endl;</p>
            <p className="pl-4 text-slate-500">// Connected to MongoDB Atlas</p>
            <p className="text-blue-400">&#125;</p>
          </div>
        </div>

        {/* Footer info */}
        <div className="z-10 text-xs text-slate-400 flex items-center justify-between">
          <span>Final Year FSD Project</span>
          <span>Live Express + MongoDB</span>
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="max-w-md w-full space-y-8">
          {/* Mobile Brand */}
          <div className="lg:hidden flex items-center justify-center space-x-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
              <Code2 className="w-5 h-5" />
            </div>
            <span className="text-xl font-black text-white">
              Collab<span className="text-emerald-400">Code</span>
            </span>
          </div>

          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Welcome Back 👋
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Enter your credentials to access your collaborative workspaces.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition text-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Password
                </label>
                <span className="text-xs text-slate-500">
                  Min 6 characters
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition text-sm"
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition shadow-lg shadow-emerald-500/20 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Login</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Bottom Link */}
          <div className="text-center text-sm text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-emerald-400 hover:text-emerald-300 transition">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
