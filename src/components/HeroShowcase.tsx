/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, Swords, Zap } from 'lucide-react';
import { sound } from '../utils/sound';

interface HeroShowcaseProps {
  onOpenRegister: (heroName?: string) => void;
}

export const HeroShowcase: React.FC<HeroShowcaseProps> = ({ onOpenRegister }) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Marksman' | 'Assassin' | 'Mage' | 'Fighter' | 'Tank'>('All');

  const heroes = [
    {
      id: 'lesley',
      name: 'Lesley',
      title: 'Deadly Sniper',
      role: 'Marksman',
      difficulty: '★★★☆☆',
      quote: 'One shot, one kill.',
      passive: 'Lethal Shoot: Gains energy recovery and critical rate bonuses.',
      bgGradient: 'from-blue-900/60 to-indigo-950/80'
    },
    {
      id: 'gusion',
      name: 'Gusion',
      title: 'Holy Blade',
      role: 'Assassin',
      difficulty: '★★★★★',
      quote: 'The perfect weapon requires no hesitation.',
      passive: 'Sword Spike: Stacks dagger marks for burst damage reset.',
      bgGradient: 'from-purple-900/60 to-indigo-950/80'
    },
    {
      id: 'fanny',
      name: 'Fanny',
      title: 'Blade Dancer',
      role: 'Assassin',
      difficulty: '★★★★★',
      quote: 'Fly through the cables of destiny!',
      passive: 'Air Superiority: Damage increases based on flight velocity.',
      bgGradient: 'from-slate-900/80 to-indigo-950/80'
    },
    {
      id: 'beatrix',
      name: 'Beatrix',
      title: 'Dawn Breakthrough',
      role: 'Marksman',
      difficulty: '★★★★☆',
      quote: 'Pick your poison. I have four.',
      passive: 'Mecha Master: Swaps between 4 unique tactical firearms.',
      bgGradient: 'from-amber-950/60 to-indigo-950/80'
    },
    {
      id: 'chou',
      name: 'Chou',
      title: 'Kung Fu Boy',
      role: 'Fighter',
      difficulty: '★★★★☆',
      quote: 'Show me your moves!',
      passive: 'Only Fast: Every 8 steps increases damage and slows enemies.',
      bgGradient: 'from-emerald-950/60 to-indigo-950/80'
    },
    {
      id: 'tigreal',
      name: 'Tigreal',
      title: 'Warrior of Dawn',
      role: 'Tank',
      difficulty: '★★☆☆☆',
      quote: 'For the Light!',
      passive: 'Fearless: Absorbs physical damage stacks for supreme defense.',
      bgGradient: 'from-blue-950/60 to-indigo-950/80'
    }
  ];

  const filteredHeroes = activeTab === 'All' ? heroes : heroes.filter(h => h.role === activeTab);

  const tabs: ('All' | 'Marksman' | 'Assassin' | 'Mage' | 'Fighter' | 'Tank')[] = [
    'All', 'Marksman', 'Assassin', 'Fighter', 'Tank'
  ];

  return (
    <section id="heroes" className="py-24 bg-[#111844] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(75,86,148,0.15),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#161F55] border border-[#4B5694]/60 text-xs text-[#EAE0CF] mb-4">
            <Swords className="w-3.5 h-3.5 text-[#EAE0CF]" />
            <span>MYTHIC HERO ROSTER</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#EAE0CF] font-display tracking-tight">
            CHOOSE YOUR CHAMPION
          </h2>
          <p className="mt-4 text-base text-[#7288AE]">
            Every enlisted player receives a guaranteed Mythic Hero Choice Chest at launch. Explore signature abilities and mastery levels below.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                sound.playTacticalClick();
                setActiveTab(tab);
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-[#EAE0CF] text-[#111844] shadow-lg scale-105'
                  : 'bg-[#161F55] text-[#7288AE] border border-[#4B5694]/60 hover:text-[#EAE0CF] hover:border-[#EAE0CF]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Hero Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredHeroes.map((hero) => (
              <motion.div
                key={hero.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className={`p-6 rounded-3xl bg-gradient-to-br ${hero.bgGradient} border border-[#4B5694]/70 shadow-2xl flex flex-col justify-between group hover:border-[#EAE0CF] transition-all`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#111844]/80 border border-[#4B5694] text-[#EAE0CF]">
                      {hero.role}
                    </span>
                    <span className="text-xs text-[#7288AE] font-mono">
                      Mastery {hero.difficulty}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#EAE0CF] font-display mb-1">
                    {hero.name}
                  </h3>
                  <span className="text-xs text-[#7288AE] uppercase tracking-wider block mb-4">
                    {hero.title}
                  </span>

                  <p className="text-xs text-[#EAE0CF]/90 italic mb-4">
                    "{hero.quote}"
                  </p>

                  <p className="text-xs text-[#7288AE] leading-relaxed mb-6">
                    {hero.passive}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#4B5694]/40 flex items-center justify-between">
                  <span className="text-[11px] text-[#10B981] font-mono">Free Starter Unlock</span>
                  <button
                    onClick={() => {
                      sound.playTacticalClick();
                      onOpenRegister(hero.name);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#111844] border border-[#4B5694] text-xs text-[#EAE0CF] hover:bg-[#EAE0CF] hover:text-[#111844] transition-all font-bold"
                  >
                    Enlist Now
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
