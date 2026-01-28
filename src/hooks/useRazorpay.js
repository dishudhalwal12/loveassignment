import { useState } from 'react';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const useRazorpay = () => {
  const [loading, setLoading] = useState(false);

  const openCheckout = async (options) => {
    setLoading(true);
    
    const scriptLoaded = await loadRazorpayScript();
    
    if (!scriptLoaded) {
      alert('Failed to load Razorpay SDK. Please check your internet connection.');
      setLoading(false);
      return;
    }

    const razorpay = new window.Razorpay(options);
    razorpay.open();
    setLoading(false);
  };

  return { openCheckout, loading };
};

export default useRazorpay;
