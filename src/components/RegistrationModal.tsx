/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2, Copy, Shield, Zap, Download, Cloud, Loader2 } from 'lucide-react';
import { sound } from '../utils/sound';
import { getAccessToken, googleSignIn, syncToGoogleSheet, saveToGoogleDrive, sendConfirmationEmail } from '../utils/workspaceAuth';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmail?: string;
  selectedHero?: string;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  initialEmail = '',
  selectedHero = 'Lesley'
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [playerTag, setPlayerTag] = useState('');
  const [region, setRegion] = useState('Southeast Asia (SG/MY)');
  const [platform, setPlatform] = useState('iOS / Android');
  const [agreed, setAgreed] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string>('');

  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !playerTag) return;
    sound.playFanfare();
    setSubmitted(true);

    // Attempt Google Workspace integration sync if token available
    const token = await getAccessToken();
    if (token) {
      try {
        setIsSyncing(true);
        setSyncStatus('Syncing pre-registration to Google Sheets...');
        await syncToGoogleSheet(token, { playerTag, email, region, hero: selectedHero });

        setSyncStatus('Saving Mythic Pass to Google Drive...');
        await saveToGoogleDrive(token, { playerTag, email, voucher: 'MLBB-MYTHIC-2026-STARTER' });

        setSyncStatus('Sending confirmation email via Gmail...');
        await sendConfirmationEmail(token, email, 'MLBB-MYTHIC-2026-STARTER');

        setSyncStatus('Successfully synced with Google Sheets, Drive, and Gmail!');
      } catch (err) {
        console.error('Workspace sync error:', err);
        setSyncStatus('Enlisted locally! (Google Workspace sync optional/skipped)');
      } finally {
        setIsSyncing(false);
      }
    } else {
      setSyncStatus('Enlisted successfully! (Connect Google Workspace to auto-sync with Sheets, Drive & Gmail)');
    }
  };

  const handleConnectAndSync = async () => {
    sound.playTacticalClick();
    try {
      setIsSyncing(true);
      setSyncStatus('Authenticating with Google Workspace...');
      const res = await googleSignIn();
      if (res && res.accessToken) {
        setSyncStatus('Syncing to Google Sheets & Drive...');
        await syncToGoogleSheet(res.accessToken, { playerTag, email, region, hero: selectedHero });
        await saveToGoogleDrive(res.accessToken, { playerTag, email, voucher: 'MLBB-MYTHIC-2026-STARTER' });
        await sendConfirmationEmail(res.accessToken, email, 'MLBB-MYTHIC-2026-STARTER');
        setSyncStatus('Connected & fully synced to Sheets, Drive & Gmail!');
      }
    } catch (err) {
      console.error(err);
      setSyncStatus('Google connection failed. Registration still saved.');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleCopyCode = () => {
    sound.playTacticalClick();
    navigator.clipboard.writeText('MLBB-MYTHIC-2026-STARTER');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111844]/90 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg rounded-3xl bg-[#161F55] border border-[#4B5694] shadow-2xl p-6 sm:p-8 overflow-hidden"
      >
        {/* Background ambient glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#4B5694]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            sound.playTacticalClick();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-xl bg-[#111844] border border-[#4B5694] text-[#EAE0CF] hover:border-[#EAE0CF] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#111844] border border-[#4B5694]/60 text-xs text-[#EAE0CF] w-fit mb-4">
              <Shield className="w-3.5 h-3.5 text-[#EAE0CF]" />
              <span>GOOGLE WORKSPACE INTEGRATED PRE-REGISTRATION</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#EAE0CF] font-display mb-2">
              CLAIM YOUR MYTHIC REWARDS
            </h2>
            <p className="text-xs sm:text-sm text-[#7288AE] mb-6">
              Enlist to secure your <strong className="text-[#EAE0CF]">{selectedHero} Starter Chest</strong>. Auto-syncs with your Google Sheets, Drive, and Gmail.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#7288AE] uppercase mb-1.5">
                  MLBB Player ID & Server Tag
                </label>
                <input
                  type="text"
                  value={playerTag}
                  onChange={(e) => setPlayerTag(e.target.value)}
                  placeholder="e.g. ShadowBlade #8821 (1042)"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#111844] border border-[#4B5694]/70 text-[#EAE0CF] placeholder-[#7288AE]/50 text-sm focus:outline-none focus:border-[#EAE0CF] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#7288AE] uppercase mb-1.5">
                  Registered Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="warrior@mlbb-mythic.com"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#111844] border border-[#4B5694]/70 text-[#EAE0CF] placeholder-[#7288AE]/50 text-sm focus:outline-none focus:border-[#EAE0CF] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#7288AE] uppercase mb-1.5">
                    Regional Node
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#111844] border border-[#4B5694]/70 text-[#EAE0CF] text-sm focus:outline-none focus:border-[#EAE0CF] transition-colors"
                  >
                    <option>Southeast Asia (SG/MY)</option>
                    <option>East Asia (Tokyo)</option>
                    <option>Europe (Frankfurt)</option>
                    <option>Americas (San Jose)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#7288AE] uppercase mb-1.5">
                    Platform
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#111844] border border-[#4B5694]/70 text-[#EAE0CF] text-sm focus:outline-none focus:border-[#EAE0CF] transition-colors"
                  >
                    <option>iOS / Android</option>
                    <option>Emulator / PC Client</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  required
                  className="rounded bg-[#111844] border-[#4B5694] text-[#EAE0CF]"
                />
                <label htmlFor="terms" className="text-xs text-[#7288AE]">
                  I agree to receive launch updates and reward redemption codes.
                </label>
              </div>

              <button
                type="submit"
                onClick={() => sound.playTacticalClick()}
                className="w-full py-3.5 rounded-xl bg-[#EAE0CF] text-[#111844] font-bold text-sm tracking-wide shadow-lg hover:bg-white transition-all flex items-center justify-center gap-2 mt-4"
              >
                <Zap className="w-4 h-4 fill-current text-[#111844]" />
                <span>FINISH ENLISTMENT & CLAIM REWARDS</span>
              </button>
            </form>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-6"
          >
            <div className="w-16 h-16 rounded-full bg-[#10B981]/20 border border-[#10B981] flex items-center justify-center mx-auto mb-4 text-[#10B981]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-[#EAE0CF] font-display mb-2">
              ENLISTMENT SUCCESSFUL!
            </h3>

            {/* Workspace Sync Status */}
            <div className="my-4 p-4 rounded-2xl bg-[#111844] border border-[#4B5694] text-xs">
              {isSyncing ? (
                <div className="flex items-center justify-center gap-2 text-[#EAE0CF]">
                  <Loader2 className="w-4 h-4 animate-spin text-[#10B981]" />
                  <span>{syncStatus}</span>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <span className="text-[#10B981] font-semibold">{syncStatus}</span>
                  {!syncStatus.includes('Fully synced') && (
                    <button
                      onClick={handleConnectAndSync}
                      className="mt-2 py-2 px-3 rounded-xl bg-[#161F55] border border-[#4B5694] text-[#EAE0CF] hover:border-[#EAE0CF] flex items-center justify-center gap-2 transition-colors mx-auto"
                    >
                      <Cloud className="w-4 h-4" />
                      <span>Connect Google Workspace to Sync to Sheets, Drive & Gmail</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            <p className="text-xs text-[#7288AE] mb-4">
              Save your starter voucher code below:
            </p>

            <div className="p-4 rounded-2xl bg-[#111844] border border-[#4B5694] flex items-center justify-between gap-4 mb-6">
              <span className="font-mono text-lg font-bold text-[#EAE0CF] tracking-wider">
                MLBB-MYTHIC-2026-STARTER
              </span>
              <button
                onClick={handleCopyCode}
                className="px-4 py-2 rounded-xl bg-[#161F55] border border-[#4B5694] text-xs text-[#EAE0CF] hover:border-[#EAE0CF] transition-colors flex items-center gap-1.5 shrink-0"
              >
                <Copy className="w-4 h-4" />
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  sound.playTacticalClick();
                  alert('Redirecting to Apple App Store...');
                }}
                className="flex-1 py-3 rounded-xl bg-[#161F55] border border-[#4B5694] text-xs font-bold text-[#EAE0CF] hover:border-[#EAE0CF] transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>App Store</span>
              </button>
              <button
                onClick={() => {
                  sound.playTacticalClick();
                  alert('Redirecting to Google Play Store...');
                }}
                className="flex-1 py-3 rounded-xl bg-[#161F55] border border-[#4B5694] text-xs font-bold text-[#EAE0CF] hover:border-[#EAE0CF] transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Google Play</span>
              </button>
            </div>

            <button
              onClick={() => {
                sound.playTacticalClick();
                setSubmitted(false);
                onClose();
              }}
              className="mt-6 text-xs text-[#7288AE] hover:text-[#EAE0CF] transition-colors underline"
            >
              Return to Arena Portal
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
