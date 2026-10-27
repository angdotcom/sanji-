/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Shield, Zap, Menu, X } from 'lucide-react';
import { sound } from '../utils/sound';

interface NavbarProps {
  onOpenRegister: (defaultEmail?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister }) => {
  const [muted, setMuted] = useState(sound.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const nextMuted = sound.toggleMute();
    setMuted(nextMuted);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#111844]/95 backdrop-blur-md border-b border-[#4B5694]/40 py-3 shadow-2xl'
          : 'bg-gradient-to-b from-[#111844]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <a
          href="#arena"
          onClick={() => sound.playTacticalClick()}
          className="flex items-center gap-3 shrink-0 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4B5694] to-[#161F55] border border-[#7288AE]/50 flex items-center justify-center shadow-lg group-hover:border-[#EAE0CF] transition-colors">
            <Shield className="w-5 h-5 text-[#EAE0CF]" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-wider text-[#EAE0CF] font-display block leading-tight">
              MYTHIC ARENA
            </span>
            <span className="text-[10px] text-[#7288AE] tracking-widest uppercase block">
              MLBB OFFICIAL 2026
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#7288AE]">
          <a
            href="#arena"
            onClick={() => sound.playTacticalClick()}
            className="hover:text-[#EAE0CF] transition-colors whitespace-nowrap shrink-0"
          >
            Arena Spotlight
          </a>
          <a
            href="#milestones"
            onClick={() => sound.playTacticalClick()}
            className="hover:text-[#EAE0CF] transition-colors whitespace-nowrap shrink-0"
          >
            Milestone Vault
          </a>
          <a
            href="#anti-lag"
            onClick={() => sound.playTacticalClick()}
            className="hover:text-[#EAE0CF] transition-colors whitespace-nowrap shrink-0"
          >
            Anti-Lag & Netcode
          </a>
          <a
            href="#heroes"
            onClick={() => sound.playTacticalClick()}
            className="hover:text-[#EAE0CF] transition-colors whitespace-nowrap shrink-0"
          >
            Hero Roster
          </a>
        </nav>

        {/* Zone 3: Actions (Ping badge, Sound toggle, Register CTA) */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Live Ping telemetry badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#161F55] border border-[#4B5694]/60 text-xs text-[#7288AE]">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[#EAE0CF] font-mono tabular-nums font-semibold">15ms</span>
            <span className="text-[#7288AE]/80">SG Node</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            aria-label="Toggle Sound Effects"
            className="p-2.5 rounded-xl bg-[#161F55] border border-[#4B5694]/60 text-[#EAE0CF] hover:bg-[#4B5694]/30 transition-colors"
          >
            {muted ? <VolumeX className="w-4 h-4 text-[#7288AE]" /> : <Volume2 className="w-4 h-4 text-[#10B981]" />}
          </button>

          {/* Primary Action */}
          <button
            onClick={() => {
              sound.playTacticalClick();
              onOpenRegister();
            }}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#EAE0CF] text-[#111844] font-bold text-sm tracking-wide shadow-lg hover:bg-white transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Zap className="w-4 h-4 fill-current text-[#111844]" />
            <span>Enlist Now</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-[#161F55] border border-[#4B5694] text-[#EAE0CF]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#111844]/98 border-b border-[#4B5694] p-6 shadow-2xl backdrop-blur-xl flex flex-col gap-4">
          <a
            href="#arena"
            onClick={() => {
              sound.playTacticalClick();
              setMobileMenuOpen(false);
            }}
            className="text-base font-medium text-[#EAE0CF] py-2 border-b border-[#4B5694]/30"
          >
            Arena Spotlight
          </a>
          <a
            href="#milestones"
            onClick={() => {
              sound.playTacticalClick();
              setMobileMenuOpen(false);
            }}
            className="text-base font-medium text-[#EAE0CF] py-2 border-b border-[#4B5694]/30"
          >
            Milestone Vault
          </a>
          <a
            href="#anti-lag"
            onClick={() => {
              sound.playTacticalClick();
              setMobileMenuOpen(false);
            }}
            className="text-base font-medium text-[#EAE0CF] py-2 border-b border-[#4B5694]/30"
          >
            Anti-Lag & Netcode
          </a>
          <a
            href="#heroes"
            onClick={() => {
              sound.playTacticalClick();
              setMobileMenuOpen(false);
            }}
            className="text-base font-medium text-[#EAE0CF] py-2"
          >
            Hero Roster
          </a>
          <button
            onClick={() => {
              sound.playTacticalClick();
              setMobileMenuOpen(false);
              onOpenRegister();
            }}
            className="w-full py-3 rounded-xl bg-[#EAE0CF] text-[#111844] font-bold text-center mt-2 shadow-lg"
          >
            Enlist & Claim Hero
          </button>
        </div>
      )}
    </header>
  );
};
