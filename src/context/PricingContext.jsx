import React, { createContext, useContext, useState, useEffect } from 'react';

const PricingContext = createContext();

// Finalized Psychological Pricing Constants
const ORIGINAL_BASE_PRICE = 2498;
const OFFER_BASE_PRICE = 1899;
const HARDBOUND_PRICE = 599;

export const PricingProvider = ({ children }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Initialize or retrieve offer end time
    const storedEndTime = localStorage.getItem('offerEndTime');
    const now = Date.now();
    
    let endTime;
    if (!storedEndTime) {
      // First visit: set end time to now + 1h 12m 45s
      endTime = now + (1 * 3600 + 12 * 60 + 45) * 1000;
      localStorage.setItem('offerEndTime', endTime.toString());
    } else {
      endTime = parseInt(storedEndTime, 10);
    }

    // Calculate initial time left
    const secondsLeft = Math.max(0, Math.floor((endTime - now) / 1000));
    setTimeLeft(secondsLeft);
    setIsExpired(secondsLeft === 0);

    // Start countdown timer
    const timer = setInterval(() => {
      const currentTime = Date.now();
      const remaining = Math.max(0, Math.floor((endTime - currentTime) / 1000));
      setTimeLeft(remaining);
      
      if (remaining === 0) {
        setIsExpired(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Timer logic: use offerBasePrice if timer active, else originalBasePrice
  const basePrice = isExpired ? ORIGINAL_BASE_PRICE : OFFER_BASE_PRICE;
  const originalBasePrice = ORIGINAL_BASE_PRICE;
  const hardboundPrice = HARDBOUND_PRICE;

  return (
    <PricingContext.Provider value={{ 
      timeLeft, 
      isExpired, 
      basePrice, 
      originalBasePrice, 
      hardboundPrice 
    }}>
      {children}
    </PricingContext.Provider>
  );
};

export const usePricing = () => {
  const context = useContext(PricingContext);
  if (!context) {
    throw new Error('usePricing must be used within PricingProvider');
  }
  return context;
};
