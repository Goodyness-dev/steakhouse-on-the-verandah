import React, { useState } from 'react';
import { authApi } from '../../services/api';
import { BUSINESS_INFO } from '../../data/businessData';

export default function AdminLogin({ onLoginSuccess, onBackToSite }) {
  const DEFAULT_KEY = 'verandah2024';
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleAutofill = () => {
    setPassword(DEFAULT_KEY);
    setError('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(DEFAULT_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const keyToSubmit = password.trim() || DEFAULT_KEY;
    if (!keyToSubmit) {
      setError('Please enter your admin access key.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await authApi.login(keyToSubmit);
      if (result.success) {
        onLoginSuccess(result.user);
      } else {
        setError(result.error || 'Invalid credentials.');
      }
    } catch (err) {
      setError(err.data?.error || err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EFECE6] text-[#1A1816] flex flex-col justify-center items-center px-4 py-8 sm:py-12 relative overflow-hidden font-sans">
      {/* Subtle Warm Backdrop Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D4B36A]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#B38E5D]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Return to Site Link */}
      <div className="w-full max-w-md mb-5 z-10 text-left">
        <button
          onClick={onBackToSite}
          type="button"
          className="inline-flex items-center text-xs sm:text-sm font-semibold text-[#5C5549] hover:text-[#1A1816] transition px-3 py-1.5 rounded-xl hover:bg-white/80 border border-transparent hover:border-[#D8D2C5] cursor-pointer"
        >
          ← Return to Guest Website
        </button>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#FCFAF7] border-2 border-[#D8D2C5] rounded-3xl p-6 sm:p-9 shadow-2xl relative z-10 text-center">
        {/* Authentic Devon House Estate Photo - NO AI ICONS */}
        <div className="flex justify-center mb-5">
          <img
            src="/images/devon-mansion-real.jpg"
            alt="Devon House Estate"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-[#B38E5D] shadow-md"
          />
        </div>

        {/* Brand Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight text-[#1A1816]">
            {BUSINESS_INFO.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#5C5549] mt-1.5 font-medium">
            Executive Portal & Table Inquiries
          </p>
          <div className="inline-block mt-3 px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-[#856430] bg-[#B38E5D]/15 border border-[#B38E5D]/30">
            Maitre d' Concierge Suite
          </div>
        </div>

        {/* CREDENTIAL DISPLAY BANNER - CLEAN TYPOGRAPHY, NO ICONS */}
        <div className="mb-6 p-4 rounded-2xl bg-white border border-[#D8D2C5] shadow-xs text-left">
          <div className="flex items-center justify-between text-xs text-[#5C5549] mb-2 font-medium">
            <span className="text-[#856430] font-bold uppercase tracking-wider text-[11px]">
              Admin Access Key
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[#70685B] bg-[#EFECE6] px-2.5 py-0.5 rounded-full font-semibold border border-[#D8D2C5]">
              Client Preview
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-[#F7F3EB] p-3 rounded-xl border border-[#E4DDD2]">
            <code className="font-mono text-base font-bold text-[#1A1816] tracking-wider selection:bg-[#B38E5D]/30">
              {DEFAULT_KEY}
            </code>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white hover:bg-[#EFECE6] text-[#1A1816] border border-[#D8D2C5] transition cursor-pointer shadow-xs active:scale-95"
              >
                {copied ? 'Copied!' : 'Copy Key'}
              </button>

              <button
                type="button"
                onClick={handleAutofill}
                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-[#B38E5D] hover:bg-[#9E7B45] text-white transition cursor-pointer shadow-sm active:scale-95"
              >
                Autofill
              </button>
            </div>
          </div>
          <p className="text-[11px] text-[#70685B] mt-2 leading-relaxed">
            Provided for client evaluation. Click <strong>Autofill</strong> to test the dashboard immediately.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm text-left font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          <div>
            <label className="block text-xs font-bold text-[#1A1816] uppercase tracking-wider mb-2">
              Admin Access Key / Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter or autofill password..."
                className="w-full bg-white border-2 border-[#D8D2C5] focus:border-[#B38E5D] focus:ring-1 focus:ring-[#B38E5D] rounded-xl px-4 py-3 text-sm text-[#1A1816] placeholder-[#8F8778] transition outline-none"
                autoFocus
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-semibold text-[#856430] hover:text-[#1A1816] transition cursor-pointer uppercase tracking-wider"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-[#1A1816] hover:bg-black disabled:opacity-50 text-[#FCFAF7] font-bold text-xs sm:text-sm tracking-wider uppercase rounded-xl transition shadow-md hover:shadow-lg flex items-center justify-center space-x-2 active:scale-[0.99] cursor-pointer border border-[#B38E5D]/30"
          >
            <span>{isLoading ? 'Authenticating...' : 'Unlock Executive Dashboard'}</span>
          </button>
        </form>

        {/* Footnote */}
        <div className="mt-6 pt-4 border-t border-[#E4DDD2] text-center">
          <p className="text-xs text-[#70685B] leading-relaxed">
            Reserved for Restaurant Management & Devon House Staff.
            <br />
            Reservations and guest inquiries sync in real-time.
          </p>
        </div>
      </div>
    </div>
  );
}
