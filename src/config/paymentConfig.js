/**
 * Payment Configuration
 *
 * Switch between 'whatsapp' and 'razorpay' modes.
 * When Razorpay is approved, simply change PAYMENT_MODE to 'razorpay'.
 */

// Payment Mode: 'whatsapp' | 'razorpay'
export const PAYMENT_MODE = "whatsapp";

// WhatsApp Business Number (with country code, no +)
export const WHATSAPP_NUMBER = '918619740693';
export const WHATSAPP_DISPLAY_NUMBER = '+91 86197 40693';

export const buildWhatsAppUrl = (message = '') => {
  const baseUrl = `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}`;

  if (!message) {
    return `${baseUrl}&type=phone_number&app_absent=0`;
  }

  return `${baseUrl}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
};
