import React, { useState } from 'react';
import { api } from '../services/api';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (email: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage('Please enter your administrator email address.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your administrator password.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await api.login(email.trim(), password);
      setIsLoading(false);

      if (rememberMe) {
        localStorage.setItem('novarch_admin_token', res.token);
        localStorage.setItem('novarch_admin_user', res.user.email);
      } else {
        sessionStorage.setItem('novarch_admin_token', res.token);
        sessionStorage.setItem('novarch_admin_user', res.user.email);
      }

      onLoginSuccess(res.user.email);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Invalid administrator email or password.');
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050A12] text-white flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none">
      {/* Background Ambient Glows & Grid */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #38B2D8 1px, transparent 1px),
            linear-gradient(to bottom, #38B2D8 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px',
        }}
      />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#1E5FBF]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#38B2D8]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0A1A2F]/40 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo & Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative mb-3.5 flex items-center justify-center">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#1E5FBF] to-[#38B2D8] rounded-full blur-lg opacity-40 animate-pulse" />
            <div className="relative flex items-center gap-2">
              <img
                src="/images/logo/logo4F.png"
                alt="NOVARCH Mark"
                className="h-14 w-auto object-contain drop-shadow-[0_0_20px_rgba(56,178,216,0.6)]"
              />
              <img
                src="/images/logo/ovarch-text.png"
                alt="OVARCH"
                className="h-7 w-auto object-contain -ml-1"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E5FBF]/15 border border-[#38B2D8]/30 text-[10px] font-mono font-bold tracking-widest text-[#38B2D8] uppercase mb-2">
            <ShieldCheck className="h-3 w-3" />
            ENTERPRISE COMMAND PORTAL
          </div>

          <h1 className="text-xl font-bold text-white tracking-tight">
            Administrator Sign In
          </h1>
          <p className="text-xs text-[#7A8FA6] mt-1 font-medium">
            Secure access to client inquiries, package leads & pipeline metrics
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl bg-[#0B1524]/90 border border-[#17304E] p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
          {/* Subtle top edge gradient highlight */}
          <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-[#38B2D8]/60 to-transparent pointer-events-none" />

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-5 flex items-start gap-2.5 rounded-xl bg-red-500/10 border border-red-500/30 p-3.5 text-xs text-red-300 animate-in fade-in">
              <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Authentication Failed</p>
                <p className="text-red-300/90 mt-0.5 leading-relaxed">{errorMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-mono font-medium text-[#94A3B8] mb-1.5 uppercase tracking-wider">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@novarch.com"
                  className="w-full rounded-xl bg-[#060D17] border border-[#17304E] pl-10 pr-4 py-2.5 text-xs font-mono text-white placeholder-[#475569] focus:border-[#38B2D8] focus:ring-1 focus:ring-[#38B2D8]/50 focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-mono font-medium text-[#94A3B8] mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl bg-[#060D17] border border-[#17304E] pl-10 pr-10 py-2.5 text-xs font-mono text-white placeholder-[#475569] focus:border-[#38B2D8] focus:ring-1 focus:ring-[#38B2D8]/50 focus:outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-[#17304E] bg-[#060D17] text-[#1E5FBF] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#1E5FBF]"
                />
                <span className="text-xs text-[#94A3B8]">Remember this session</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-3 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1E5FBF] to-[#2563EB] hover:from-[#2563EB] hover:to-[#38B2D8] py-2.5 px-4 text-xs font-bold font-mono tracking-wider uppercase text-white shadow-lg shadow-[#1E5FBF]/25 hover:shadow-[#38B2D8]/30 transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <span>Verifying Session...</span>
                </div>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
