import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { authService } from '../services/api';
import AmbientMeshBackground from '../components/effects/AmbientMeshBackground';
import CodeCrewLogo from '../components/CodeCrewLogo';
import {
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
  Users
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
        showToast(`Welcome back to CodeCrew, ${res.user.name}!`);

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
    <div className="min-h-screen bg-charcoal-950 text-slate-100 flex relative overflow-hidden font-sans selection:bg-emerald-500 selection:text-charcoal-950">
      {/* Ambient Backdrop without grid */}
      <AmbientMeshBackground />

      {/* Left Column - Coding Visual Section (Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-charcoal-900/70 border-r border-charcoal-750 flex-col justify-between p-12 relative overflow-hidden backdrop-blur-xl">
        {/* Brand */}
        <Link to="/" className="flex items-center space-x-2 z-10">
          <CodeCrewLogo size="lg" subtext="Collaborative Workspace" />
        </Link>

        {/* Graphic Card */}
        <div className="z-10 my-auto max-w-md">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-charcoal-950 border border-charcoal-750 text-xs text-emerald-400 font-semibold mb-6 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-lime-400" />
            <span>MongoDB Atlas Full-Stack Architecture</span>
          </div>

          <h2 className="text-3xl font-black text-white tracking-tight mb-4">
            Where Developers Think &amp; Code Together
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-8">
            Create multi-language coding rooms in seconds. Share your ideas, practice algorithms with your crew, and keep your solutions organized in the cloud.
          </p>

          {/* Snippet Preview Card */}
          <div className="p-4 rounded-2xl bg-charcoal-950 border border-charcoal-800 font-mono text-xs text-slate-300 shadow-2xl space-y-1">
            <div className="flex items-center justify-between pb-2.5 border-b border-charcoal-800 mb-2">
              <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                <Terminal className="w-3.5 h-3.5 text-lime-400" /> crew_session.py
              </span>
              <span className="text-[10px] bg-emerald-500/15 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/25">
                JWT Authenticated
              </span>
            </div>
            <p className="text-emerald-400">
              <span className="text-lime-300">def</span> welcome_crew(user):
            </p>
            <p className="pl-4 text-slate-300">
              return f&quot;Welcome to CodeCrew, &#123;user&#125;!&quot;
            </p>
            <p className="pl-4 text-slate-500"># Connected to MongoDB Atlas Cloud</p>
            <p className="text-lime-300">print(welcome_crew(&quot;Developer&quot;))</p>
          </div>
        </div>

        {/* Footer info */}
        <div className="z-10 text-xs text-slate-400 flex items-center justify-between">
          <span>CodeCrew Platform</span>
          <span className="flex items-center gap-1 text-emerald-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            REST API Active
          </span>
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 z-10">
        <div className="max-w-md w-full space-y-8 bg-charcoal-900/80 p-8 sm:p-10 rounded-3xl border border-charcoal-750 backdrop-blur-2xl shadow-2xl">
          {/* Mobile Brand */}
          <div className="lg:hidden flex items-center justify-center mb-2">
            <CodeCrewLogo size="md" subtext="Sign In" />
          </div>

          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Sign In 👋
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Enter your credentials to access your collaborative coding rooms.
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
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
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
                  className="uiverse-input w-full pl-10 pr-4 py-3 bg-charcoal-950 border border-charcoal-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition text-sm font-medium"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono">
                  Password
                </label>
                <button
                  type="button"
                  onClick={fillAdmin}
                  className="text-xs text-lime-400 hover:text-lime-300 font-semibold cursor-pointer"
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
                  className="uiverse-input w-full pl-10 pr-10 py-3 bg-charcoal-950 border border-charcoal-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition text-sm font-medium font-mono"
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
              className="uiverse-btn-glow w-full flex items-center justify-center space-x-2 py-3.5 px-4 bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-400 hover:from-emerald-300 hover:to-lime-200 text-charcoal-950 font-black rounded-xl transition shadow-lg shadow-emerald-500/20 disabled:opacity-50 cursor-pointer text-sm"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-charcoal-950 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In to CodeCrew</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>
          </form>

          {/* Bottom Link */}
          <div className="text-center text-sm text-slate-400 pt-2">
            Don&apos;t have an account?{' '}
            <Link
              to="/register"
              state={{ from: location.state?.from }}
              className="font-bold text-emerald-400 hover:text-lime-300 transition"
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

