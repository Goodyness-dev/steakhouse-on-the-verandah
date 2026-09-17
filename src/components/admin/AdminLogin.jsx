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
    <div className="min-h-screen bg-[#111A15] text-[#FAF8F5] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans selection:bg-[#D4AF37]/30">
      {/* Background Subtle Accent Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#8A151B]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#1D3325]/40 rounded-full blur-3xl pointer-events-none" />

      {/* Back to Site Button */}
      <div className="w-full max-w-md mb-6 z-10">
        <button
          onClick={onBackToSite}
          type="button"
          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold text-[#D8D2C5] hover:text-[#FAF8F5] transition px-3.5 py-2 rounded-xl hover:bg-white/5 border border-white/10 hover:border-[#D4AF37]/40 cursor-pointer"
        >
          <svg className="w-4 h-4 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Back to Restaurant Website</span>
        </button>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#18261E] border-2 border-[#D4AF37]/30 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 backdrop-blur-sm">
        {/* Brand Header */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#D4AF37] text-[#111A15] mb-4 shadow-lg shadow-[#D4AF37]/20">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight text-[#FAF8F5]">
            {BUSINESS_INFO.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#BDB5A4] mt-1.5 font-medium">
            Executive Portal & Table Inquiries
          </p>
          <div className="inline-flex items-center space-x-1.5 bg-[#111A15]/80 border border-[#D4AF37]/30 px-3.5 py-1 rounded-full mt-3 text-[11px] text-[#D4AF37]">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <polyline points="9 12 11 14 15 10"></polyline>
            </svg>
            <span className="font-semibold tracking-wide uppercase">Protected Management Suite</span>
          </div>
        </div>

        {/* PROMINENT CLIENT CREDENTIAL DISPLAY BANNER */}
        <div className="mb-6 p-4 rounded-2xl bg-[#111A15] border border-[#D4AF37]/40 shadow-inner">
          <div className="flex items-center justify-between text-xs text-[#D8D2C5] mb-2 font-medium">
            <span className="flex items-center gap-1.5 text-[#D4AF37] font-semibold uppercase tracking-wider text-[11px]">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              Admin Access Key
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[#A8A08E] bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
              Client Preview
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 bg-[#18261E] px-3.5 py-2.5 rounded-xl border border-white/10">
            <code className="font-mono text-sm sm:text-base font-bold text-[#FAF8F5] tracking-wider selection:bg-[#D4AF37]/40">
              {DEFAULT_KEY}
            </code>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleCopy}
                title="Copy Password"
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/15 text-[#D8D2C5] hover:text-white transition flex items-center gap-1 cursor-pointer"
              >
                {copied ? (
                  <>
                    <svg className="w-3.5 h-3.5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className="text-green-400 text-[11px]">Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    <span>Copy</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleAutofill}
                className="px-2.5 py-1 text-xs font-bold rounded-lg bg-[#D4AF37] hover:bg-[#B38F25] text-[#111A15] transition flex items-center gap-1 cursor-pointer shadow-sm"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                </svg>
                <span>Autofill</span>
              </button>
            </div>
          </div>
          <p className="text-[11px] text-[#A8A08E] mt-2 leading-relaxed">
            Provided for client demonstration and evaluation. Click <strong>Autofill</strong> to test the dashboard immediately.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-900/30 border border-red-500/50 text-red-200 text-sm flex items-start space-x-3">
            <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span className="leading-snug">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-[#D8D2C5] uppercase tracking-wider mb-2">
              Admin Access Key / Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C8472]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter or autofill password..."
                className="w-full bg-[#111A15] border border-white/15 focus:border-[#D4AF37] focus:bg-[#111A15] rounded-xl pl-11 pr-11 py-3.5 text-sm text-[#FAF8F5] placeholder-[#6E6758] transition outline-none"
                autoFocus
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8C8472] hover:text-[#FAF8F5] transition cursor-pointer"
              >
                {showPassword ? (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-[#D4AF37] hover:bg-[#B38F25] disabled:opacity-50 text-[#111A15] font-bold text-sm tracking-wide rounded-xl transition shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center space-x-2 active:scale-[0.99] cursor-pointer"
          >
            {isLoading ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                <span>Verifying Access...</span>
              </>
            ) : (
              <>
                <span>Unlock Executive Dashboard</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Helpful Tip */}
        <div className="mt-7 pt-5 border-t border-white/10 text-center">
          <p className="text-xs text-[#8C8472] leading-relaxed">
            Reserved for Restaurant Management & Devon House Staff.
            <br />
            Production inquiries and table requests sync in real-time.
          </p>
        </div>
      </div>
    </div>
  );
}
