import React, { useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { PAYMENT_MODE } from '../../config/paymentConfig';

const CartDrawer = ({ 
  isOpen, 
  onClose, 
  teamSize,
  basePrice,
  originalBasePrice,
  isOfferActive = false,
  hardbound,
  hardboundPrice,
  addPPT,
  addViva,
  setAddPPT,
  setAddViva,
  perPersonAddon,
  pptTotal,
  vivaTotal,
  totalPayable,
  formData,
  setFormData,
  onSubmit,
  isProcessing,
  offerSavings = 0
}) => {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-[60] transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`
        fixed bg-white z-[70] shadow-2xl
        md:right-0 md:top-0 md:h-full md:w-[420px]
        bottom-0 left-0 right-0 md:bottom-auto md:left-auto
        rounded-t-3xl md:rounded-none
        max-h-[85vh] md:max-h-full
        flex flex-col overflow-hidden
        transition-transform duration-300 ease-out
        ${isOpen ? 'translate-y-0 md:translate-x-0' : 'translate-y-full md:translate-y-0 md:translate-x-full'}
      `}>
        
        {/* Header - Fixed at top, not scrollable */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="w-10"></div>
            <h2 className="text-xl font-bold text-gray-900">Your Order</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Body - Scrollable */}
        <form onSubmit={onSubmit} className="flex-1 overflow-y-auto flex flex-col">
          <div className="px-6 py-5 space-y-5 flex-1">
            
            {/* Form Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter your name"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
              <div className="relative">
                <span className="absolute left-4 top-2.5 text-gray-500 font-medium">+91</span>
                <input 
                  type="tel" 
                  required
                  pattern="[0-9]{10}"
                  className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                  placeholder="00000 00000"
                  value={formData.whatsapp}
                  onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">We'll send project updates here.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Topic (Optional)</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                placeholder="e.g. Library Management System"
                value={formData.topic}
                onChange={e => setFormData({...formData, topic: e.target.value})}
              />
            </div>

            <div className="border-t border-gray-200 pt-5">
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Base Project ({teamSize} Members)</span>
                  <div className="text-right">
                    <span className="font-medium text-gray-900">₹{basePrice}</span>
                    {isOfferActive && (
                      <span className="ml-2 text-xs text-gray-400 line-through">₹{originalBasePrice}</span>
                    )}
                  </div>
                </div>
                {isOfferActive && (
                  <p className="text-xs text-green-600 font-medium text-right mb-2">
                    15% Launch Offer Applied
                  </p>
                )}
                {hardbound && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Hardbound File</span>
                    <span className="font-medium text-gray-900">₹{hardboundPrice}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Add-ons Section */}
            <div className="border-t border-gray-200 pt-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Enhance Your Package (Optional)</h3>
              <p className="text-xs text-gray-500 mb-4">Boost your viva preparation with premium resources.</p>
              
              <div className="space-y-3 mb-3">
                {/* PPT Slides */}
                <label className={`
                  flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all
                  ${addPPT ? 'border-brand-600 bg-brand-50/50' : 'border-gray-200 hover:border-gray-300'}
                `}>
                  <input 
                    type="checkbox"
                    checked={addPPT}
                    onChange={(e) => setAddPPT(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900 text-sm">PPT Slides</span>
                      <span className="text-xs text-gray-500">₹{perPersonAddon} / person</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">Professional presentation for viva</p>
                  </div>
                </label>

                {/* Viva Q&A PDF */}
                <label className={`
                  flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all
                  ${addViva ? 'border-brand-600 bg-brand-50/50' : 'border-gray-200 hover:border-gray-300'}
                `}>
                  <input 
                    type="checkbox"
                    checked={addViva}
                    onChange={(e) => setAddViva(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900 text-sm">Viva Q&A PDF</span>
                      <span className="text-xs text-gray-500">₹{perPersonAddon} / person</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">Common questions with answers</p>
                  </div>
                </label>
              </div>

              <p className="text-xs text-gray-400 italic text-center">You can skip add-ons. No pressure.</p>
            </div>
          </div>

          {/* Footer - Sticky */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-5">
            <div className="space-y-4">
              {/* Total Summary */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Total (GST included)</span>
                  <span className="text-2xl font-bold text-gray-900">₹{totalPayable}</span>
                </div>
                {offerSavings > 0 && (
                  <p className="text-xs text-green-600 font-medium text-right">
                    You saved ₹{offerSavings} with launch offer
                  </p>
                )}
              </div>

              {/* Payment Button */}
              <button 
                type="submit"
                disabled={isProcessing}
                className="w-full btn-primary py-3.5 flex justify-center items-center gap-2 font-semibold"
              >
                {PAYMENT_MODE === 'whatsapp' && <MessageCircle className="w-5 h-5" />}
                {isProcessing ? 'Processing...' : (
                  PAYMENT_MODE === 'whatsapp' ? 'Reserve Slot on WhatsApp' : 'Proceed to Payment'
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                {PAYMENT_MODE === 'whatsapp' 
                  ? 'Secure your project details first. Payment confirmation happens on WhatsApp.'
                  : 'Instant WhatsApp confirmation after payment'
                }
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CartDrawer;
