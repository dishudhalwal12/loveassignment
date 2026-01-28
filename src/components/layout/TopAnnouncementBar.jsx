import React from 'react';
import { usePricing } from '../../context/PricingContext';

const TopAnnouncementBar = () => {
  const { timeLeft } = usePricing();

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-brand-700 text-white text-xs font-medium h-8 flex items-center justify-center w-full">
      ⏳ 15% launch offer — Ends in {formatTime(timeLeft)}
    </div>
  );
};

export default TopAnnouncementBar;
