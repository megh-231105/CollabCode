import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { authService } from '../services/api';
import AmbientMeshBackground from '../components/effects/AmbientMeshBackground';
import {
  Code2,
  Mail,
  Lock,
  ArrowRight,
  Terminal,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Eye,
  EyeOff,
  UserCheck
} from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
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

        const fromPath = location.state?.from?.pathname
          ? `${location.state.from.pathname}${location.state.from.search || ''}`
          : res.user.role === 'ADMIN'
          ? '/admin'
          : '/dashboard';

        navigate(fromPath, { replace: true });
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
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex relative overflow-hidden font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Ambient Cyber Background */}
      <AmbientMeshBackground />

      {/* Left Column - Coding Visual Section (Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900/60 border-r border-slate-800/80 flex-col justify-between p-12 relative overflow-hidden backdrop-blur-xl">
        {/* Brand */}
        <Link to="/" className="flex items-center space-x-3 group z-10">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Code2 className="w-6 h-6 text-slate-950 font-black stroke-[2.5]" />
          </div>
          <div>
            <span className="text-2xl font-black tracking-tight text-white flex items-center">
              Collab<span className="text-emerald-400">Code</span>
            </span>
            <span className="block text-[10px] uppercase font-mono tracking-widest text-slate-400">
              Developer Platform
            </span>
          </div>
        </Link>

        {/* Graphic Card */}
        <div className="z-10 my-auto max-w-md">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs text-emerald-400 font-semibold mb-6 shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MongoDB Atlas Full-Stack Architecture</span>
          </div>

          <h2 className="text-3xl font-black text-white tracking-tight mb-4">
            Where Developers Think & Code Together
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-8">
            Create multi-language coding rooms in seconds. Share your ideas, practice algorithms, and keep your solutions organized in your cloud catalog.
          </p>

          {/* Snippet Preview Card */}
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 font-mono text-xs text-slate-300 shadow-2xl space-y-1">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-800 mb-2">
              <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                <Terminal className="w-3.5 h-3.5" /> session.cpp
              </span>
              <span className="text-[10px] bg-emerald-500/15 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/25">
                JWT Authenticated
              </span>
            </div>
            <p className="text-purple-400">#include &lt;iostream&gt;</p>
            <p className="text-blue-400">int main() &#123;</p>
            <p className="pl-4 text-emerald-300">std::cout &lt;&lt; "Welcome back!" &lt;&lt; std::endl;</p>
            <p className="pl-4 text-slate-500">// Connected to MongoDB Atlas Cloud</p>
            <p className="text-blue-400">&#125;</p>
          </div>
        </div>

        {/* Footer info */}
        <div className="z-10 text-xs text-slate-400 flex items-center justify-between">
          <span>CollabCode Platform</span>
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            REST API Active
          </span>
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 z-10">
        <div className="max-w-md w-full space-y-8 bg-slate-900/60 p-8 sm:p-10 rounded-3xl border border-slate-800/80 backdrop-blur-2xl shadow-2xl">
          {/* Mobile Brand */}
          <div className="lg:hidden flex items-center justify-center space-x-2 mb-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
              <Code2 className="w-5 h-5" />
            </div>
            <span className="text-xl font-black text-white">
              Collab<span className="text-emerald-400">Code</span>
            </span>
          </div>

          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Sign In 👋
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
            {/* Email Field (UIverse style) */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="uiverse-input w-full pl-10 pr-4 py-3 bg-slate-950/90 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition text-sm font-medium"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={fillAdmin}
                  className="text-xs text-purple-400 hover:text-purple-300 font-semibold cursor-pointer"
                >
                  Admin Demo Credentials
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="uiverse-input w-full pl-10 pr-10 py-3 bg-slate-950/90 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition text-sm font-medium font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Login Button (UIverse glow style) */}
            <button
              type="submit"
              disabled={loading}
              className="uiverse-btn-glow w-full flex items-center justify-center space-x-2 py-3.5 px-4 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black rounded-xl transition shadow-lg shadow-emerald-500/20 disabled:opacity-50 cursor-pointer text-sm"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In to CollabCode</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>
          </form>

          {/* Bottom Link */}
          <div className="text-center text-sm text-slate-400 pt-2">
            Don't have an account?{' '}
            <Link
              to="/register"
              state={{ from: location.state?.from }}
              className="font-bold text-emerald-400 hover:text-emerald-300 transition"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
