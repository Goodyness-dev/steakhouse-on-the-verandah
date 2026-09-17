import React, { useState, useEffect } from 'react';
import { settingsApi, authApi } from '../../services/api';
import { BUSINESS_INFO } from '../../data/businessData';

export default function AdminSettings() {
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Password Change State
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [passSuccess, setPassSuccess] = useState('');
  const [passError, setPassError] = useState('');

  // Test Connection States
  const [isTestingTelegram, setIsTestingTelegram] = useState(false);
  const [telegramTestResult, setTelegramTestResult] = useState(null);
  const [showBotToken, setShowBotToken] = useState(false);

  const [testEmailAddress, setTestEmailAddress] = useState('');
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [emailTestResult, setEmailTestResult] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      const data = await settingsApi.getSettings();
      setSettings(data);
      if (data.shop_email) {
        setTestEmailAddress(data.shop_email);
      }
    } catch (err) {
      setSaveError('Failed to load settings: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = async (e) => {
    e?.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError('');

    try {
      const result = await settingsApi.saveSettings(settings);
      setSettings(result.settings);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      setSaveError(err.data?.error || err.message || 'Error saving settings.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestTelegram = async () => {
    if (!settings.telegram_bot_token || !settings.telegram_chat_id) {
      setTelegramTestResult({ success: false, error: 'Please enter both Telegram Bot Token and Chat ID first.' });
      return;
    }

    setIsTestingTelegram(true);
    setTelegramTestResult(null);

    try {
      const result = await settingsApi.testTelegram(settings.telegram_bot_token, settings.telegram_chat_id);
      setTelegramTestResult(result);
    } catch (err) {
      setTelegramTestResult({ success: false, error: err.data?.error || err.message });
    } finally {
      setIsTestingTelegram(false);
    }
  };

  const handleTestEmail = async () => {
    if (!testEmailAddress) {
      setEmailTestResult({ success: false, error: 'Please enter an email address to send the test confirmation to.' });
      return;
    }

    setIsTestingEmail(true);
    setEmailTestResult(null);

    try {
      const result = await settingsApi.testEmail({
        toEmail: testEmailAddress,
        serviceId: settings.emailjs_service_id,
        templateId: settings.emailjs_template_id_quote,
        publicKey: settings.emailjs_public_key
      });
      setEmailTestResult(result);
    } catch (err) {
      setEmailTestResult({ success: false, error: err.data?.error || err.message });
    } finally {
      setIsTestingEmail(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPassError('New passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setPassError('New password must be at least 6 characters long.');
      return;
    }

    setIsChangingPass(true);
    setPassError('');
    setPassSuccess('');

    try {
      const result = await authApi.changePassword(oldPassword, newPassword);
      setPassSuccess(result.message || 'Password changed successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPassSuccess(''), 5000);
    } catch (err) {
      setPassError(err.data?.error || err.message || 'Failed to change password.');
    } finally {
      setIsChangingPass(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[#7A7265] space-y-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#B38E5D] border-t-transparent animate-spin"></div>
        <span className="text-sm font-serif">Loading Devon House settings...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Top Banner Alert on Save */}
      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-[#EDF5EC] border border-[#B2D8B9] text-[#2C6E33] text-sm shadow-xs animate-fade-in">
          <strong className="block font-bold">Restaurant Configurations Updated</strong>
          <span>Settings and concierge notification credentials have been saved successfully.</span>
        </div>
      )}

      {saveError && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm shadow-xs">
          <span>{saveError}</span>
        </div>
      )}

      {/* SECTION 1: Telegram Reservation Alerts */}
      <div className="bg-[#FCFAF7] border-2 border-[#D8D2C5] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#D8D2C5]/60 pb-5">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#B38E5D] uppercase block mb-1">Live Notifications</span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1A1816]">
              Telegram Instant Reservation Alerts
            </h2>
            <p className="text-xs sm:text-sm text-[#7A7265] mt-1">
              Receive live notifications on the maître d' phone the instant a guest books a table or requests an event quote.
            </p>
          </div>

          <label className="flex items-center space-x-3 cursor-pointer bg-[#F4EFE6] border border-[#D8D2C5] px-4 py-2.5 rounded-2xl hover:border-[#B38E5D] transition">
            <input
              type="checkbox"
              checked={Boolean(settings.telegram_enabled)}
              onChange={(e) => setSettings({ ...settings, telegram_enabled: e.target.checked })}
              className="w-4 h-4 rounded text-[#1A1816] accent-[#1A1816] border-[#D8D2C5]"
            />
            <span className="text-xs font-bold text-[#1A1816]">Enable Telegram Alerts</span>
          </label>
        </div>

        {/* Setup Walkthrough */}
        <div className="p-4 rounded-2xl bg-[#F4EFE6] border border-[#D8D2C5] text-xs text-[#4A443D] space-y-2">
          <div className="font-bold text-[#1A1816] text-sm">
            Quick 60-Second Setup for {BUSINESS_INFO.name}:
          </div>
          <ol className="list-decimal list-inside space-y-1 text-[#4A443D] leading-relaxed pl-1">
            <li>Open Telegram, search for <strong className="text-[#1A1816]">@BotFather</strong>, send <code className="bg-[#EFECE6] px-1.5 py-0.5 rounded font-mono font-bold text-[#1A1816]">/newbot</code>, and copy your HTTP API Token.</li>
            <li>Search for <strong className="text-[#1A1816]">@userinfobot</strong> on Telegram and tap Start to see your numeric <strong className="text-[#1A1816]">Id</strong> (Chat ID).</li>
            <li>Paste your Token and Chat ID below, click <strong className="text-[#1A1816]">Test Telegram Connection</strong>, and receive the instant test ping!</li>
          </ol>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#1A1816] uppercase tracking-wider mb-2">
              Telegram Bot Token
            </label>
            <div className="relative">
              <input
                type={showBotToken ? 'text' : 'password'}
                value={settings.telegram_bot_token || ''}
                onChange={(e) => setSettings({ ...settings, telegram_bot_token: e.target.value })}
                placeholder="e.g. 7123456789:AAH..."
                className="w-full bg-white border-2 border-[#D8D2C5] focus:border-[#B38E5D] rounded-xl px-4 py-3 text-sm text-[#1A1816] placeholder-[#7A7265]/50 outline-none font-mono transition"
              />
              <button
                type="button"
                onClick={() => setShowBotToken(!showBotToken)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-bold text-[#7A7265] hover:text-[#1A1816]"
              >
                {showBotToken ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1A1816] uppercase tracking-wider mb-2">
              Telegram Chat ID (Maître d' ID)
            </label>
            <input
              type="text"
              value={settings.telegram_chat_id || ''}
              onChange={(e) => setSettings({ ...settings, telegram_chat_id: e.target.value })}
              placeholder="e.g. 123456789"
              className="w-full bg-white border-2 border-[#D8D2C5] focus:border-[#B38E5D] rounded-xl px-4 py-3 text-sm text-[#1A1816] placeholder-[#7A7265]/50 outline-none font-mono transition"
            />
          </div>
        </div>

        {/* Telegram Test Button & Feedback */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={handleTestTelegram}
            disabled={isTestingTelegram}
            className="py-2.5 px-5 rounded-xl bg-[#F4EFE6] hover:bg-[#EFECE6] border border-[#D8D2C5] text-[#1A1816] font-bold text-xs transition active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isTestingTelegram ? 'Sending Test Ping...' : 'Test Telegram Connection'}
          </button>

          {telegramTestResult && (
            <div className={`text-xs px-3.5 py-2 rounded-xl ${
              telegramTestResult.success ? 'bg-[#EDF5EC] text-[#2C6E33] border border-[#B2D8B9]' : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              <span>{telegramTestResult.message || telegramTestResult.error}</span>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: Email Automation Settings */}
      <div className="bg-[#FCFAF7] border-2 border-[#D8D2C5] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-[#D8D2C5]/60 pb-5">
          <span className="text-[10px] font-mono tracking-widest text-[#B38E5D] uppercase block mb-1">Email Concierge</span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1A1816]">
            Email Automation (Guest Confirmations & Alerts)
          </h2>
          <p className="text-xs sm:text-sm text-[#7A7265] mt-1">
            Automates dispatching Devon House branded confirmations to dining guests and alerting the host desk.
          </p>
        </div>

        {/* EmailJS Credentials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#1A1816] uppercase tracking-wider mb-2">
              EmailJS Service ID
            </label>
            <input
              type="text"
              value={settings.emailjs_service_id || ''}
              onChange={(e) => setSettings({ ...settings, emailjs_service_id: e.target.value })}
              placeholder="e.g. service_xxxxxx"
              className="w-full bg-white border-2 border-[#D8D2C5] focus:border-[#B38E5D] rounded-xl px-4 py-3 text-sm text-[#1A1816] placeholder-[#7A7265]/50 outline-none font-mono transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1A1816] uppercase tracking-wider mb-2">
              EmailJS Public Key
            </label>
            <input
              type="text"
              value={settings.emailjs_public_key || ''}
              onChange={(e) => setSettings({ ...settings, emailjs_public_key: e.target.value })}
              placeholder="e.g. user_xxxxxxxxx"
              className="w-full bg-white border-2 border-[#D8D2C5] focus:border-[#B38E5D] rounded-xl px-4 py-3 text-sm text-[#1A1816] placeholder-[#7A7265]/50 outline-none font-mono transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1A1816] uppercase tracking-wider mb-2">
              Guest Confirmation Template ID
            </label>
            <input
              type="text"
              value={settings.emailjs_template_id_quote || ''}
              onChange={(e) => setSettings({ ...settings, emailjs_template_id_quote: e.target.value })}
              placeholder="e.g. template_guest_confirmation"
              className="w-full bg-white border-2 border-[#D8D2C5] focus:border-[#B38E5D] rounded-xl px-4 py-3 text-sm text-[#1A1816] placeholder-[#7A7265]/50 outline-none font-mono transition"
            />
            <span className="text-[11px] text-[#7A7265] mt-1 block">Used when clicking "Send Official Reservation Confirmation".</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1A1816] uppercase tracking-wider mb-2">
              New Booking Alert Template ID
            </label>
            <input
              type="text"
              value={settings.emailjs_template_id_notify || ''}
              onChange={(e) => setSettings({ ...settings, emailjs_template_id_notify: e.target.value })}
              placeholder="e.g. template_verandah_host"
              className="w-full bg-white border-2 border-[#D8D2C5] focus:border-[#B38E5D] rounded-xl px-4 py-3 text-sm text-[#1A1816] placeholder-[#7A7265]/50 outline-none font-mono transition"
            />
            <span className="text-[11px] text-[#7A7265] mt-1 block">Alerts restaurant team whenever a guest books online.</span>
          </div>
        </div>

        {/* Test Email Delivery */}
        <div className="pt-2 border-t border-[#D8D2C5]/60 space-y-3">
          <label className="block text-xs font-bold text-[#1A1816] uppercase tracking-wider">
            Test Confirmation Email Delivery
          </label>
          <div className="flex flex-wrap sm:flex-nowrap gap-3">
            <input
              type="email"
              value={testEmailAddress}
              onChange={(e) => setTestEmailAddress(e.target.value)}
              placeholder="concierge@devonhouse.com"
              className="flex-1 bg-white border-2 border-[#D8D2C5] focus:border-[#B38E5D] rounded-xl px-4 py-2.5 text-sm text-[#1A1816] placeholder-[#7A7265]/50 outline-none transition"
            />
            <button
              type="button"
              onClick={handleTestEmail}
              disabled={isTestingEmail}
              className="py-2.5 px-5 rounded-xl bg-[#F4EFE6] hover:bg-[#EFECE6] border border-[#D8D2C5] text-[#1A1816] font-bold text-xs transition shrink-0 cursor-pointer"
            >
              {isTestingEmail ? 'Dispatching Test Email...' : 'Send Test Confirmation'}
            </button>
          </div>

          {emailTestResult && (
            <div className={`text-xs p-3 rounded-xl ${
              emailTestResult.success ? 'bg-[#EDF5EC] text-[#2C6E33] border border-[#B2D8B9]' : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              <span>{emailTestResult.message || emailTestResult.error}</span>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 3: Estate Profile & Defaults */}
      <div className="bg-[#FCFAF7] border-2 border-[#D8D2C5] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-[#D8D2C5]/60 pb-5">
          <span className="text-[10px] font-mono tracking-widest text-[#B38E5D] uppercase block mb-1">Estate Information</span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1A1816]">
            Restaurant Profile & Seating Defaults
          </h2>
          <p className="text-xs sm:text-sm text-[#7A7265] mt-1">
            Information shown on official guest confirmations, booking receipts, and dining communications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#1A1816] uppercase tracking-wider mb-2">Host Desk Phone</label>
            <input
              type="text"
              value={settings.shop_phone || ''}
              onChange={(e) => setSettings({ ...settings, shop_phone: e.target.value })}
              className="w-full bg-white border-2 border-[#D8D2C5] focus:border-[#B38E5D] rounded-xl px-4 py-3 text-sm text-[#1A1816] outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1A1816] uppercase tracking-wider mb-2">Concierge Alert Email</label>
            <input
              type="email"
              value={settings.shop_email || ''}
              onChange={(e) => setSettings({ ...settings, shop_email: e.target.value })}
              className="w-full bg-white border-2 border-[#D8D2C5] focus:border-[#B38E5D] rounded-xl px-4 py-3 text-sm text-[#1A1816] outline-none transition"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-[#1A1816] uppercase tracking-wider mb-2">Devon House Estate Address</label>
            <input
              type="text"
              value={settings.shop_address || ''}
              onChange={(e) => setSettings({ ...settings, shop_address: e.target.value })}
              className="w-full bg-white border-2 border-[#D8D2C5] focus:border-[#B38E5D] rounded-xl px-4 py-3 text-sm text-[#1A1816] outline-none transition"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-[#1A1816] uppercase tracking-wider mb-2">Hospitality & Guarantee Note</label>
            <input
              type="text"
              value={settings.default_warranty || ''}
              onChange={(e) => setSettings({ ...settings, default_warranty: e.target.value })}
              className="w-full bg-white border-2 border-[#D8D2C5] focus:border-[#B38E5D] rounded-xl px-4 py-3 text-sm text-[#1A1816] outline-none transition"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-[#1A1816] uppercase tracking-wider mb-2">Default Maître d' Greeting Note</label>
            <textarea
              rows={3}
              value={settings.default_quote_notes || ''}
              onChange={(e) => setSettings({ ...settings, default_quote_notes: e.target.value })}
              className="w-full bg-white border-2 border-[#D8D2C5] focus:border-[#B38E5D] rounded-xl p-4 text-sm text-[#1A1816] outline-none transition"
            />
          </div>
        </div>

        {/* Global Save Button */}
        <div className="pt-4 flex justify-end">
          <button
            type="button"
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="py-3.5 px-8 bg-[#1A1816] hover:bg-[#2A2624] disabled:opacity-50 text-[#EFECE6] border border-[#B38E5D] font-bold text-sm rounded-xl transition shadow-md flex items-center space-x-2 active:scale-95 cursor-pointer"
          >
            <span>{isSaving ? 'Saving Changes...' : 'Save All Settings'}</span>
          </button>
        </div>
      </div>

      {/* SECTION 4: Change Admin Password */}
      <div className="bg-[#FCFAF7] border-2 border-[#D8D2C5] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-[#D8D2C5]/60 pb-5">
          <span className="text-[10px] font-mono tracking-widest text-[#B38E5D] uppercase block mb-1">Security</span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1A1816]">
            Update Maître d' Access Key
          </h2>
          <p className="text-xs sm:text-sm text-[#7A7265] mt-1">
            Update your administrative access key anytime to ensure secure portal management.
          </p>
        </div>

        {passSuccess && (
          <div className="p-4 rounded-xl bg-[#EDF5EC] border border-[#B2D8B9] text-[#2C6E33] text-xs sm:text-sm">
            <span>{passSuccess}</span>
          </div>
        )}

        {passError && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm">
            <span>{passError}</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-bold text-[#1A1816] uppercase tracking-wider mb-2">Current Access Key</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Current key (e.g. verandah2024)"
              className="w-full bg-white border-2 border-[#D8D2C5] focus:border-[#B38E5D] rounded-xl px-4 py-3 text-sm text-[#1A1816] outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1A1816] uppercase tracking-wider mb-2">New Access Key</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full bg-white border-2 border-[#D8D2C5] focus:border-[#B38E5D] rounded-xl px-4 py-3 text-sm text-[#1A1816] outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1A1816] uppercase tracking-wider mb-2">Confirm New Access Key</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-type new access key"
              className="w-full bg-white border-2 border-[#D8D2C5] focus:border-[#B38E5D] rounded-xl px-4 py-3 text-sm text-[#1A1816] outline-none transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isChangingPass}
            className="py-3 px-6 bg-[#F4EFE6] hover:bg-[#EFECE6] border border-[#D8D2C5] text-[#1A1816] font-bold text-xs rounded-xl transition flex items-center space-x-2 active:scale-95 cursor-pointer"
          >
            <span>{isChangingPass ? 'Updating Key...' : 'Update Access Key'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
