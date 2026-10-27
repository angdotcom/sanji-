/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MilestoneVault } from './components/MilestoneVault';
import { AntiLagSection } from './components/AntiLagSection';
import { HeroShowcase } from './components/HeroShowcase';
import { RegistrationModal } from './components/RegistrationModal';
import { Footer } from './components/Footer';

export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [initialEmail, setInitialEmail] = useState('');

  const handleOpenRegister = (email?: string) => {
    if (email) {
      setInitialEmail(email);
    }
    setIsRegisterOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#111844] text-[#EAE0CF] font-sans selection:bg-[#4B5694] selection:text-[#EAE0CF]">
      {/* Sticky Top Bar */}
      <Navbar onOpenRegister={handleOpenRegister} />

      {/* Main Content Sections */}
      <main>
        <HeroSection onOpenRegister={handleOpenRegister} />
        <MilestoneVault onOpenRegister={handleOpenRegister} />
        <AntiLagSection />
        <HeroShowcase onOpenRegister={handleOpenRegister} />
      </main>

      {/* Professional Footer */}
      <Footer />

      {/* Registration & Starter Voucher Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        initialEmail={initialEmail}
      />
    </div>
  );
}
