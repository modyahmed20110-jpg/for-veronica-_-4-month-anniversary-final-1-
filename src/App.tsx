/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FloralBackground } from './components/FloralBackground';
import { HeroHeader } from './components/HeroHeader';
import { PhotoQuoteCarousel } from './components/PhotoQuoteCarousel';
import { AnniversaryLetter } from './components/AnniversaryLetter';
import { MilestonesSection } from './components/MilestonesSection';
import { AnniversaryFooter } from './components/AnniversaryFooter';
import { PaperLilyCanopyDrop } from './components/PaperLilyCanopyDrop';

export default function App() {
  const [showCurtain, setShowCurtain] = useState<boolean>(true);
  const [audioTrigger, setAudioTrigger] = useState<boolean>(false);
  const [replayKey, setReplayKey] = useState<number>(0);

  const scrollToMemories = () => {
    const el = document.getElementById('memories-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToLetter = () => {
    const el = document.getElementById('letter-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartFall = () => {
    // Triggers Malcolm Todd "Earrings" playback immediately without unmounting animation
    setAudioTrigger(true);
  };

  const handleAnimationComplete = () => {
    // Only dismiss after the full 3.6s cascading falling animation finishes
    setShowCurtain(false);
  };

  const handleReplayCurtain = () => {
    setShowCurtain(true);
    setReplayKey((k) => k + 1);
  };

  return (
    <>
      {/* Starting off filling up the whole screen with DIY paper lilies covering everything, then smoothly falling down all at once on click */}
      {showCurtain && (
        <PaperLilyCanopyDrop
          key={replayKey}
          onStartFall={handleStartFall}
          onComplete={handleAnimationComplete}
        />
      )}

      <FloralBackground>
        {/* Section 1: Header / Hero with Veronica & Mohamed + Malcolm Todd Audio */}
        <HeroHeader
          onScrollToMemories={scrollToMemories}
          onScrollToLetter={scrollToLetter}
          onReplayLilyCurtain={handleReplayCurtain}
          audioAutoPlayTrigger={audioTrigger}
        />

        {/* Section 2: Interactive Photo & Quote Carousel with Veronica & Mohamed's Real Photos */}
        <PhotoQuoteCarousel />

        {/* Section 3: The Anniversary Letter Card */}
        <AnniversaryLetter />

        {/* Section 4: Milestones & Little Things with 6 Custom Love Reasons */}
        <MilestonesSection />

        {/* Footer */}
        <AnniversaryFooter />
      </FloralBackground>
    </>
  );
}
