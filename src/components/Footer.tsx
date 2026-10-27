/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield } from 'lucide-react';
import { sound } from '../utils/sound';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b1030] border-t border-[#4B5694]/40 py-16 text-[#7288AE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#161F55] border border-[#4B5694] flex items-center justify-center text-[#EAE0CF]">
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-[#EAE0CF] font-display">
                MYTHIC ARENA
              </span>
            </div>
            <p className="text-xs leading-relaxed">
              Mobile Legends: Bang Bang official 2026 pre-registration portal. Engineered for zero lag and uncompromising competitive integrity.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono text-[#EAE0CF] uppercase tracking-wider mb-4">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#arena" onClick={() => sound.playTacticalClick()} className="hover:text-[#EAE0CF] transition-colors">Hero Spotlight</a></li>
              <li><a href="#milestones" onClick={() => sound.playTacticalClick()} className="hover:text-[#EAE0CF] transition-colors">Milestone Vault</a></li>
              <li><a href="#anti-lag" onClick={() => sound.playTacticalClick()} className="hover:text-[#EAE0CF] transition-colors">Anti-Lag & Netcode</a></li>
              <li><a href="#heroes" onClick={() => sound.playTacticalClick()} className="hover:text-[#EAE0CF] transition-colors">Hero Roster</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono text-[#EAE0CF] uppercase tracking-wider mb-4">Competitive Integrity</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#anti-lag" onClick={() => sound.playTacticalClick()} className="hover:text-[#EAE0CF] transition-colors">15ms Node Backbone</a></li>
              <li><a href="#anti-lag" onClick={() => sound.playTacticalClick()} className="hover:text-[#EAE0CF] transition-colors">120 FPS Thermal Pacing</a></li>
              <li><a href="#anti-lag" onClick={() => sound.playTacticalClick()} className="hover:text-[#EAE0CF] transition-colors">Anti-Cheat 4.0 Kernel</a></li>
              <li><a href="#anti-lag" onClick={() => sound.playTacticalClick()} className="hover:text-[#EAE0CF] transition-colors">Zero P2W Guarantee</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono text-[#EAE0CF] uppercase tracking-wider mb-4">Legal & Compliance</h4>
            <p className="text-[11px] text-[#7288AE]/70 leading-relaxed">
              © 2026 Moonton Technology Co., Ltd. All rights reserved. Mobile Legends: Bang Bang and associated logos are registered trademarks.
            </p>
          </div>

        </div>

        <div className="pt-8 border-t border-[#4B5694]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <span>Global Server Status: <strong className="text-[#10B981]">All Regional Nodes Online (15ms)</strong></span>
          <div className="flex items-center gap-6">
            <a href="#arena" className="hover:text-[#EAE0CF]">Privacy Policy</a>
            <a href="#arena" className="hover:text-[#EAE0CF]">Terms of Service</a>
            <a href="#arena" className="hover:text-[#EAE0CF]">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
