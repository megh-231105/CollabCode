import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { authService } from '../services/api';
import AmbientMeshBackground from '../components/effects/AmbientMeshBackground';
import {
  Code2,
  User,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useApp();

  const validateEmail = (email) => {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Field Validations
    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    setLoading(true);

    try {
      const res = await authService.register(
        formData.name.trim(),
        formData.email.trim(),
        formData.password
      );

      setLoading(false);
      showToast(res.message || 'Registration successful! Please sign in.');
      navigate('/login', { state: { from: location.state?.from } });
    } catch (err) {
      setLoading(false);
      setError(
        err.message ||
        'Registration failed. Please check your internet connection or try again.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex relative overflow-hidden font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Ambient Cyber Background */}
      <AmbientMeshBackground />

      {/* Left Column - Graphic Section */}
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

        {/* Info */}
        <div className="z-10 my-auto max-w-md">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs text-emerald-400 font-semibold mb-6 shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join 100+ Student Developers</span>
          </div>

          <h2 className="text-3xl font-black text-white tracking-tight mb-4">
            Start Your Collaborative Coding Journey
          </h2>

          <div className="space-y-4 mt-8">
            <div className="flex items-start space-x-3 text-slate-300 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>MongoDB Atlas live user, room, and code snippet storage</span>
            </div>
            <div className="flex items-start space-x-3 text-slate-300 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Multi-language workspace for C, C++, Java, Python, JavaScript</span>
            </div>
            <div className="flex items-start space-x-3 text-slate-300 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>JWT Authentication & bcrypt encrypted password hashing</span>
            </div>
          </div>
        </div>

        <div className="z-10 text-xs text-slate-400">
          CollabCode — Full-Stack College Project
        </div>
      </div>

      {/* Right Column - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 z-10">
        <div className="max-w-md w-full space-y-7 bg-slate-900/60 p-8 sm:p-10 rounded-3xl border border-slate-800/80 backdrop-blur-2xl shadow-2xl">
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
              Create Account 🚀
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Set up your developer profile to start collaborating on MongoDB Atlas.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Johnson"
                  className="uiverse-input w-full pl-10 pr-4 py-2.5 bg-slate-950/90 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition text-sm font-medium"
                />
              </div>
            </div>

            {/* Email */}
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
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@example.com"
                  className="uiverse-input w-full pl-10 pr-4 py-2.5 bg-slate-950/90 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition text-sm font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="uiverse-input w-full pl-10 pr-10 py-2.5 bg-slate-950/90 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition text-sm font-medium font-mono"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className="uiverse-input w-full pl-10 pr-4 py-2.5 bg-slate-950/90 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition text-sm font-medium font-mono"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="uiverse-btn-glow w-full flex items-center justify-center space-x-2 py-3 px-4 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black rounded-xl transition shadow-lg shadow-emerald-500/20 disabled:opacity-50 cursor-pointer text-sm mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center text-sm text-slate-400 pt-1">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-bold text-emerald-400 hover:text-emerald-300 transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
