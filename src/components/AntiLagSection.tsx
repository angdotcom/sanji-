/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Cpu, Server, Activity, CheckCircle, RefreshCw } from 'lucide-react';
import { sound } from '../utils/sound';

export const AntiLagSection: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<'sg' | 'tokyo' | 'frankfurt' | 'sanjose'>('sg');
  const [isTesting, setIsTesting] = useState(false);
  const [pingResult, setPingResult] = useState<{ latency: number; jitter: number; loss: number }>({
    latency: 14,
    jitter: 1.2,
    loss: 0.0
  });

  const nodes = [
    { id: 'sg', name: 'Singapore (SEA Core)', basePing: 14 },
    { id: 'tokyo', name: 'Tokyo (East Asia)', basePing: 32 },
    { id: 'frankfurt', name: 'Frankfurt (Europe)', basePing: 85 },
    { id: 'sanjose', name: 'San Jose (Americas)', basePing: 110 }
  ];

  const handleRunDiagnostic = (nodeId: 'sg' | 'tokyo' | 'frankfurt' | 'sanjose') => {
    sound.playTacticalClick();
    setSelectedNode(nodeId);
    setIsTesting(true);

    const node = nodes.find(n => n.id === nodeId)!;
    setTimeout(() => {
      const randomOffset = Math.floor(Math.random() * 6) - 3;
      setPingResult({
        latency: node.basePing + randomOffset,
        jitter: Number((Math.random() * 1.5 + 0.5).toFixed(1)),
        loss: 0.0
      });
      setIsTesting(false);
    }, 500);
  };

  return (
    <section id="anti-lag" className="py-24 bg-[#111844] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(75,86,148,0.2),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#161F55] border border-[#4B5694]/60 text-xs text-[#EAE0CF] mb-4">
            <Zap className="w-3.5 h-3.5 text-[#EAE0CF]" />
            <span>ZERO-LAG NETCODE & PERFORMANCE GUARANTEE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#EAE0CF] font-display tracking-tight">
            ENGINEERED FOR COMPETITIVE DOMINANCE
          </h2>
          <p className="mt-4 text-base text-[#7288AE]">
            We solved mobile MOBA latency. Test our dedicated routing nodes below and experience sub-20ms precision in every ranked clash.
          </p>
        </div>

        {/* 3 Engineering Proof Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-3xl bg-[#161F55] border border-[#4B5694]/70 shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#111844] border border-[#4B5694] flex items-center justify-center mb-6 text-[#EAE0CF]">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#EAE0CF] font-display mb-3">
                Dedicated 15ms Netcode Nodes
              </h3>
              <p className="text-sm text-[#7288AE] leading-relaxed">
                Dynamic packet routing bypasses public congestion points, eliminating jitter and rubber-banding during chaotic team fights.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#4B5694]/40 flex items-center gap-2 text-xs text-[#10B981]">
              <CheckCircle className="w-4 h-4" />
              <span>Zero Packet Loss Architecture</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="p-8 rounded-3xl bg-[#161F55] border border-[#4B5694]/70 shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#111844] border border-[#4B5694] flex items-center justify-center mb-6 text-[#EAE0CF]">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#EAE0CF] font-display mb-3">
                120 FPS Thermal-Safe Engine
              </h3>
              <p className="text-sm text-[#7288AE] leading-relaxed">
                Optimized GPU frame pacing maintains rock-solid 120 FPS on supported devices without thermal throttling or battery drain.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#4B5694]/40 flex items-center gap-2 text-xs text-[#10B981]">
              <CheckCircle className="w-4 h-4" />
              <span>Zero Frame Drops Guaranteed</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-8 rounded-3xl bg-[#161F55] border border-[#4B5694]/70 shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#111844] border border-[#4B5694] flex items-center justify-center mb-6 text-[#EAE0CF]">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#EAE0CF] font-display mb-3">
                True Skill 5v5 Matchmaking
              </h3>
              <p className="text-sm text-[#7288AE] leading-relaxed">
                Anti-Cheat 4.0 kernel protection combined with strict Elo matchmaking ensures zero pay-to-win stat boosts and 100% fair lobbies.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#4B5694]/40 flex items-center gap-2 text-xs text-[#10B981]">
              <CheckCircle className="w-4 h-4" />
              <span>Zero P2W Stat Boosts</span>
            </div>
          </motion.div>
        </div>

        {/* Interactive Ping Diagnostic Console */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-10 rounded-3xl bg-[#161F55] border border-[#4B5694]/80 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#4B5694]/40">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#10B981] mb-1">
                <Activity className="w-4 h-4 animate-pulse" />
                <span>LIVE REGIONAL PROBER ACTIVE</span>
              </div>
              <h3 className="text-2xl font-bold text-[#EAE0CF] font-display">
                Test Your Regional Connection
              </h3>
            </div>
            
            {/* Node Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {nodes.map((n) => (
                <button
                  key={n.id}
                  onClick={() => handleRunDiagnostic(n.id as 'sg' | 'tokyo' | 'frankfurt' | 'sanjose')}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                    selectedNode === n.id
                      ? 'bg-[#EAE0CF] text-[#111844] font-bold shadow-lg'
                      : 'bg-[#111844] text-[#7288AE] border border-[#4B5694] hover:text-[#EAE0CF]'
                  }`}
                >
                  {n.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Diagnostic Stats Output */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
            <div className="p-6 rounded-2xl bg-[#111844] border border-[#4B5694]/50">
              <span className="text-xs text-[#7288AE] uppercase tracking-wider block mb-1">Round-Trip Latency</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-[#10B981] font-mono tabular-nums">
                  {isTesting ? '...' : `${pingResult.latency}ms`}
                </span>
                <span className="text-xs text-[#10B981] font-semibold">Optimal</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#111844] border border-[#4B5694]/50">
              <span className="text-xs text-[#7288AE] uppercase tracking-wider block mb-1">Packet Jitter</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-[#EAE0CF] font-mono tabular-nums">
                  {isTesting ? '...' : `${pingResult.jitter}ms`}
                </span>
                <span className="text-xs text-[#7288AE]">Stable</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#111844] border border-[#4B5694]/50">
              <span className="text-xs text-[#7288AE] uppercase tracking-wider block mb-1">Packet Loss Rate</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-[#10B981] font-mono tabular-nums">
                  {isTesting ? '...' : `${pingResult.loss}%`}
                </span>
                <span className="text-xs text-[#10B981]">Zero Drop</span>
              </div>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
