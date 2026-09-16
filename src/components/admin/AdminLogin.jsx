import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Wrench, AlertCircle, ArrowLeft, Loader2, ShieldCheck } from 'lucide-react';
import { authApi } from '../../services/api';
import { BUSINESS_INFO } from '../../data/businessData';

export default function AdminLogin({ onLoginSuccess, onBackToSite }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter your admin password.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await authApi.login(password);
      if (result.success) {
        onLoginSuccess(result.user);
      } else {
        setError(result.error || 'Invalid credentials.');
      }
    } catch (err) {
      setError(err.data?.error || err.message || 'Login failed. Please check your password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-900 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
      {/* Background Subtle Accent Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-shop-red/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-shop-red/5 rounded-full blur-2xl pointer-events-none" />

      {/* Back to Site Button */}
      <div className="w-full max-w-md mb-6 z-10">
        <button
          onClick={onBackToSite}
          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 transition px-3 py-1.5 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Customer Website</span>
        </button>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-xl relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-shop-red text-white mb-4 shadow-lg shadow-shop-red/30">
            <Wrench className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-slate-900">
            {BUSINESS_INFO.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-medium">
            Executive Dashboard & Order Dispatch
          </p>
          <div className="inline-flex items-center space-x-1.5 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full mt-3 text-[11px] text-slate-600">
            <ShieldCheck className="w-3.5 h-3.5 text-shop-red" />
            <span className="font-semibold">Protected Management Suite</span>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <span className="leading-snug">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Admin Access Key / Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full bg-slate-50 border border-slate-200 focus:border-shop-red focus:bg-white rounded-xl pl-11 pr-11 py-3 text-sm text-slate-900 placeholder-slate-400 transition outline-none"
                autoFocus
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-shop-red hover:bg-shop-redHover disabled:opacity-50 text-white font-bold text-sm rounded-xl transition shadow-md shadow-shop-red/25 flex items-center justify-center space-x-2 active:scale-[0.99] cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Unlock Admin Dashboard</span>
            )}
          </button>
        </form>

        {/* Helpful Tip */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400 leading-relaxed">
            Protected management area for authorized staff only.
            <br />
            Initial password is configured in your project <code className="font-mono font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">.env</code> file.
          </p>
        </div>
      </div>
    </div>
  );
}
