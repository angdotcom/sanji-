/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crosshair, Zap, ShieldAlert, Sparkles, CheckCircle2, Play, Volume2 } from 'lucide-react';
import { sound } from '../utils/sound';

interface HeroSectionProps {
  onOpenRegister: (email?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenRegister }) => {
  const [emailInput, setEmailInput] = useState('');
  const [scopeActive, setScopeActive] = useState(false);
  const [stealthMode, setStealthMode] = useState(false);
  const [submittedInline, setSubmittedInline] = useState(false);

  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;
    sound.playFanfare();
    setSubmittedInline(true);
    setTimeout(() => {
      onOpenRegister(emailInput);
    }, 600);
  };

  const toggleScope = () => {
    sound.playScopeZoom();
    setScopeActive(!scopeActive);
  };

  const toggleStealth = () => {
    sound.playTacticalClick();
    setStealthMode(!stealthMode);
  };

  return (
    <section id="arena" className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-[#111844] flex items-center">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(75,86,148,0.25),transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#4B5694]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Value Proposition & Inline Registration */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col gap-6 text-left"
          >
            {/* Tag metadata */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#161F55] border border-[#4B5694]/60 w-fit text-xs text-[#EAE0CF]">
              <Sparkles className="w-3.5 h-3.5 text-[#EAE0CF]" />
              <span>GLOBAL PRE-REGISTRATION LIVE // 5M WARRIORS TARGET</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#EAE0CF] font-display leading-[1.1]">
              ENTER THE MYTHIC ARENA. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EAE0CF] via-[#7288AE] to-[#4B5694]">
                ZERO LAG. PURE SKILL.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-[#7288AE] max-w-2xl leading-relaxed">
              Experience next-generation 120 FPS netcode, sub-20ms regional servers, and Anti-Cheat 4.0 fair matchmaking. Enlist today to claim <strong className="text-[#EAE0CF]">Lesley — Deadly Sniper</strong> and exclusive mythic starter chests instantly upon launch.
            </p>

            {/* Quick Email Registration Form */}
            <div className="mt-4 p-6 rounded-2xl bg-[#161F55] border border-[#4B5694]/70 shadow-2xl backdrop-blur-xl">
              <form onSubmit={handleInlineSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email or MLBB player ID..."
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-[#111844] border border-[#7288AE]/50 text-[#EAE0CF] placeholder-[#7288AE]/60 text-sm focus:outline-none focus:border-[#EAE0CF] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  onClick={() => sound.playTacticalClick()}
                  className="px-6 py-3.5 rounded-xl bg-[#EAE0CF] text-[#111844] font-bold text-sm tracking-wide shadow-lg hover:bg-white transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Zap className="w-4 h-4 fill-current text-[#111844]" />
                  <span>CLAIM FREE EPIC HERO</span>
                </button>
              </form>

              {submittedInline && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex items-center gap-2 text-xs text-[#10B981]"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Secure connection established! Opening enlistment vault...</span>
                </motion.div>
              )}

              {/* Fast Social Auth Triggers */}
              <div className="mt-5 pt-4 border-t border-[#4B5694]/40 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-[#7288AE]">Or fast-enlist with 1-click:</span>
                <div className="flex items-center gap-2">
                  {['Google', 'Apple', 'Discord'].map((provider) => (
                    <button
                      key={provider}
                      type="button"
                      onClick={() => {
                        sound.playTacticalClick();
                        onOpenRegister();
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-[#111844] border border-[#4B5694]/60 text-xs text-[#EAE0CF] hover:border-[#EAE0CF] transition-colors"
                    >
                      {provider}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Trust telemetry bar */}
            <div className="flex items-center gap-6 pt-2 text-xs text-[#7288AE]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span>15ms Global Backbone</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span>120 FPS Pacing Guaranteed</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Lesley Sniper Showcase Stage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className={`relative rounded-3xl overflow-hidden border border-[#4B5694] bg-gradient-to-br from-[#161F55] to-[#111844] shadow-2xl p-6 transition-all duration-500 ${stealthMode ? 'ring-2 ring-[#10B981]' : ''}`}>
              
              {/* Tactical Header Overlay */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#7288AE]">HERO_ID // 32.1</span>
                  <span className="text-xs font-mono text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded">
                    {stealthMode ? 'CAMOUFLAGE ACTIVE' : 'COMBAT READY'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleStealth}
                    className="px-2.5 py-1 rounded bg-[#111844] border border-[#4B5694] text-[11px] text-[#EAE0CF] hover:border-[#EAE0CF] transition-colors"
                  >
                    {stealthMode ? 'Disable Stealth' : 'Enable Stealth'}
                  </button>
                </div>
              </div>

              {/* Character Art / CSS Fallback Container with Crosshair HUD */}
              <div className={`relative h-[380px] rounded-2xl overflow-hidden bg-gradient-to-t from-[#111844] via-[#161F55] to-[#4B5694]/40 flex flex-col justify-end p-6 border border-[#4B5694]/50 transition-all ${scopeActive ? 'scale-105' : ''}`}>
                
                {/* Simulated Scope Reticle */}
                {scopeActive && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-56 h-56 rounded-full border-2 border-dashed border-[#10B981]/80 animate-spin-slow flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full border border-[#10B981] flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full" />
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 font-mono text-[10px] text-[#10B981]">
                      ZOOM: 8X // LOCK: TARGET ACQUIRED
                    </div>
                  </div>
                )}

                {/* Ambient Visual Artwork representation */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                  <div className="w-72 h-72 rounded-full bg-gradient-to-tr from-[#4B5694] to-[#EAE0CF] blur-3xl animate-pulse" />
                </div>

                {/* Character Silhouette & Info */}
                <div className="relative z-10 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-[#4B5694]/40 text-[#EAE0CF] font-mono">
                      Marksman / Assassin
                    </span>
                    <span className="text-xs text-[#7288AE]">Difficulty: 3/5</span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#EAE0CF] font-display">
                    LESLEY // DEADLY SNIPER
                  </h3>

                  <p className="text-xs text-[#7288AE] italic">
                    "One shot, one kill. Lethal Precision from the shadows."
                  </p>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#4B5694]/40">
                    <div className="text-xs text-[#EAE0CF] font-mono">
                      Passive: Lethal Shoot
                    </div>
                    <button
                      onClick={toggleScope}
                      className="px-3 py-1.5 rounded-lg bg-[#4B5694]/40 hover:bg-[#4B5694] text-xs text-[#EAE0CF] flex items-center gap-1.5 transition-colors"
                    >
                      <Crosshair className="w-3.5 h-3.5" />
                      <span>{scopeActive ? 'Disable Scope' : 'Toggle 8x Scope'}</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Card Footer actions */}
              <div className="mt-4 flex items-center justify-between text-xs text-[#7288AE]">
                <span>Signature Ultimate: Snipper Ghost Walk</span>
                <button
                  onClick={() => onOpenRegister()}
                  className="text-[#EAE0CF] hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Enlist to Unlock</span>
                  <span>→</span>
                </button>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
