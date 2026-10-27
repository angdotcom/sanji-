/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, CheckCircle, Lock, Gift, Sparkles, AlertCircle } from 'lucide-react';
import { sound } from '../utils/sound';

interface MilestoneVaultProps {
  onOpenRegister: () => void;
}

export const MilestoneVault: React.FC<MilestoneVaultProps> = ({ onOpenRegister }) => {
  const [selectedTier, setSelectedTier] = useState<number | null>(null);

  const milestones = [
    {
      tier: 1,
      target: '1,000,000',
      title: 'Tier 1: Recruit Cache',
      reward: '500 Battle Points + 10x Magic Dust',
      status: 'unlocked',
      description: 'Instant starter pack for all enlisted players upon launch.'
    },
    {
      tier: 2,
      target: '3,000,000',
      title: 'Tier 2: Veteran Vault',
      reward: '7-Day Double EXP Pass + Fragment Cache',
      status: 'unlocked',
      description: 'Accelerate your rank ascension to Epic and Legend tier.'
    },
    {
      tier: 3,
      target: '5,000,000',
      title: 'Tier 3: Mythic Vanguard',
      reward: 'Mythic Hero Choice Chest + Exclusive Border',
      status: 'inprogress',
      description: 'Unlock any Epic hero of your choice plus custom animated border.'
    }
  ];

  const currentCount = 4850210;
  const targetCount = 5000000;
  const progressPercent = Math.min(100, (currentCount / targetCount) * 100).toFixed(1);

  return (
    <section id="milestones" className="py-24 bg-[#111844] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(75,86,148,0.15),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#161F55] border border-[#4B5694]/60 text-xs text-[#EAE0CF] mb-4">
            <Trophy className="w-3.5 h-3.5 text-[#EAE0CF]" />
            <span>COMMUNITY MILESTONE VAULT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#EAE0CF] font-display tracking-tight">
            UNLOCKED TOGETHER. CLAIMED BY ALL.
          </h2>
          <p className="mt-4 text-base text-[#7288AE]">
            As global pre-registrations climb toward the 5,000,000 milestone, legendary rewards unlock automatically for every enlisted warrior.
          </p>
        </div>

        {/* Progress Bar Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 rounded-3xl bg-[#161F55] border border-[#4B5694]/70 shadow-2xl mb-16 backdrop-blur-xl"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-mono text-[#7288AE] uppercase tracking-wider block">Global Enlistment Progress</span>
              <span className="text-3xl font-extrabold text-[#EAE0CF] font-display">
                {currentCount.toLocaleString()} / {targetCount.toLocaleString()} Warriors
              </span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-[#111844] border border-[#4B5694] text-right">
              <span className="text-xs text-[#7288AE] block">Milestone Status</span>
              <span className="text-sm font-bold text-[#10B981]">{progressPercent}% COMPLETE</span>
            </div>
          </div>

          {/* Progress Track */}
          <div className="relative h-4 w-full bg-[#111844] rounded-full overflow-hidden p-0.5 border border-[#4B5694]/50">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${progressPercent}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-[#4B5694] via-[#7288AE] to-[#EAE0CF] rounded-full relative"
            >
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_#EAE0CF]" />
            </motion.div>
          </div>

          <div className="mt-3 flex justify-between text-xs text-[#7288AE] font-mono">
            <span>0M</span>
            <span>1M (Unlocked)</span>
            <span>3M (Unlocked)</span>
            <span className="text-[#EAE0CF] font-bold">5M (Target)</span>
          </div>
        </motion.div>

        {/* Milestone Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {milestones.map((m, idx) => (
            <motion.div
              key={m.tier}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              onClick={() => {
                sound.playTacticalClick();
                setSelectedTier(selectedTier === m.tier ? null : m.tier);
              }}
              className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                m.status === 'unlocked'
                  ? 'bg-[#161F55] border-[#4B5694] hover:border-[#EAE0CF]'
                  : 'bg-[#161F55]/80 border-[#4B5694]/60 ring-1 ring-[#4B5694]/30'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#111844] border border-[#4B5694] text-[#EAE0CF]">
                    Target: {m.target}
                  </span>
                  {m.status === 'unlocked' ? (
                    <span className="flex items-center gap-1.5 text-xs text-[#10B981] font-semibold">
                      <CheckCircle className="w-4 h-4" />
                      <span>UNLOCKED</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs text-[#7288AE]">
                      <Sparkles className="w-4 h-4 text-[#EAE0CF]" />
                      <span>97% READY</span>
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-[#EAE0CF] font-display mb-2">
                  {m.title}
                </h3>
                <p className="text-sm font-semibold text-[#7288AE] mb-3">
                  {m.reward}
                </p>
                <p className="text-xs text-[#7288AE]/80 leading-relaxed">
                  {m.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#4B5694]/40 flex items-center justify-between">
                <span className="text-xs text-[#EAE0CF] font-mono">Tier {m.tier} Bundle</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.playTacticalClick();
                    onOpenRegister();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#111844] border border-[#4B5694] text-xs text-[#EAE0CF] hover:border-[#EAE0CF] transition-colors"
                >
                  Claim Bundle →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
