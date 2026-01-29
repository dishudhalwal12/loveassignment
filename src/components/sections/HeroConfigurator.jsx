import React, { useState, useEffect } from 'react';
import { Check, Star, Users, ShieldCheck, Zap, Book, ChevronRight } from 'lucide-react';
import CartDrawer from '../ui/CartDrawer';
import { usePricing } from '../../context/PricingContext';
import useRazorpay from '../../hooks/useRazorpay';
import { saveOrder } from '../../lib/firebase';

const HeroConfigurator = ({ overrideTitle }) => {
  const [teamSize, setTeamSize] = useState(4);
  const [hardbound, setHardbound] = useState(false);
  const [addPPT, setAddPPT] = useState(false);
  const [addViva, setAddViva] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Payment Form State
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    topic: ''
  });

  const { openCheckout } = useRazorpay();
  const { basePrice, originalBasePrice, hardboundPrice, isExpired } = usePricing();
  const pptTotal = addPPT ? 100 : 0;
  const vivaTotal = addViva ? 100 : 0;
  const perPersonAddon = Math.ceil(100 / teamSize);
  
  const pricePerPerson = Math.floor(basePrice / teamSize);
  const totalProjectCost = basePrice;
  const finalTotal = totalProjectCost + (hardbound ? hardboundPrice : 0) + pptTotal + vivaTotal;
  const savingsPerPerson = basePrice - pricePerPerson;

  const features = [
    "100% Unique Code Strategy",
    "Runs perfectly on your Laptop",
    "Viva Questions Included",
    "Hardbound Delivery Available"
  ];

  const handleReserve = () => {
    setIsModalOpen(true);
  };

  const handlePaymentSuccess = async (response) => {
    try {
      // 1. Save to Firebase
      await saveOrder({
        fullName: formData.name,
        whatsappNumber: formData.whatsapp,
        projectTopic: formData.topic,
        teamSize,
        addOns: {
          ppt: addPPT,
          viva: addViva,
          hardbound: hardbound
        },
        totalPaid: finalTotal,
        razorpayPaymentId: response.razorpay_payment_id,
        status: 'paid',
        createdAt: new Date()
      });

      // 2. Close cart
      setIsModalOpen(false);

      // 3. Show success and redirect
      alert('Payment successful! You will receive WhatsApp confirmation shortly.');
      
      const message = `Hi Love Assignment, I have completed payment. My Payment ID is ${response.razorpay_payment_id}. Project: ${formData.topic || 'Not specified'}`;
      const whatsappUrl = `https://wa.me/919256487182?text=${encodeURIComponent(message)}`;
      window.location.href = whatsappUrl;

    } catch (error) {
      console.error("Post-payment error:", error);
      alert("Payment successful but failed to record order. Please contact support on WhatsApp.");
      window.location.href = "https://wa.me/919256487182";
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    // Validate
    if (!formData.name || !formData.whatsapp) {
      alert('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: finalTotal * 100,
      currency: "INR",
      name: "Love Assignment",
      description: "Final Year Project Bundle",
      image: "/logo.png",
      handler: handlePaymentSuccess,
      prefill: {
        name: formData.name,
        contact: `+91${formData.whatsapp}`,
      },
      theme: {
        color: "#b91c1c"
      },
      modal: {
        ondismiss: function() {
          setIsProcessing(false);
          alert('Payment cancelled or failed. Try again.');
        }
      }
    };

    try {
      await openCheckout(options);
    } catch (err) {
      console.error(err);
      alert('Payment cancelled or failed. Try again.');
      setIsProcessing(false);
    }
  };

  return (
    <section className="relative pt-12 pb-20 overflow-hidden bg-white">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-brand-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center">
          
          {/* Left Content */}
          <div className="space-y-8 pr-0 lg:pr-12">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-xs font-semibold tracking-wide uppercase">
                <Star className="w-3.5 h-3.5 fill-brand-700" />
                <span>#1 Choice for BCA Students</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1]">
                {overrideTitle ? (
                  <span>{overrideTitle}</span>
                ) : (
                  <>
                    Final Year Project <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 to-brand-500">
                      Bundle Configurator
                    </span>
                  </>
                )}
              </h1>
              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                Get complete Code, Report, and Viva support in one bundle. 
                Designed to run flawlessly on your machine.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-green-700 stroke-[3]" />
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm font-medium text-gray-500 border-t border-gray-100 pt-6">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
                ))}
              </div>
              <div className="flex items-center gap-1">
                <div className="flex text-yellow-500">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span className="text-gray-900 font-bold">4.9/5</span>
                <span>from 2000+ students</span>
              </div>
            </div>
          </div>

          {/* Right Content: Configurator Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-brand-200 blur-2xl opacity-20 transform rotate-2 rounded-3xl" />
            <div className="relative bg-white border border-gray-200 rounded-2xl shadow-xl p-6 sm:p-8">
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Configure Your Package</h3>
                <p className="text-gray-500 text-sm">Select team size to split the cost.</p>
              </div>

              {/* Team Size Selector */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Team Size
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((size) => (
                    <button
                      key={size}
                      onClick={() => setTeamSize(size)}
                      className={`
                        relative py-3 px-2 rounded-xl text-sm font-bold border-2 transition-all
                        ${teamSize === size 
                          ? 'border-brand-600 bg-brand-50 text-brand-700 ring-2 ring-brand-100 ring-offset-1' 
                          : 'border-gray-200 bg-white text-gray-600 hover:border-brand-200 hover:bg-gray-50'
                        }
                      `}
                    >
                      <span className="block text-lg">{size}</span>
                      <span className="text-[10px] font-medium uppercase text-gray-500">Member{size > 1 ? 's' : ''}</span>
                      
                      {size === 4 && (
                        <div className="absolute -top-3 -right-3 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow-sm">
                          Best Value
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pricing Display */}
              <div className="bg-gray-50 rounded-xl p-5 mb-6 border border-gray-100">
                <div className="flex items-end justify-between mb-2">
                  <span className="text-gray-600 font-medium">Cost per person</span>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-gray-900">₹{pricePerPerson}</span>
                  </div>
                </div>
                
                {/* Offer Pricing Label */}
                {!isExpired ? (
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Original Price <span className="line-through">₹{originalBasePrice}</span> — <span className="text-green-600 font-medium">15% Launch Offer Applied</span>
                  </p>
                ) : null}
                
                {savingsPerPerson > 0 && (
                  <div className="flex items-center gap-1.5 text-green-700 bg-green-50 px-3 py-1.5 rounded-lg text-sm font-medium w-fit ml-auto mt-2">
                    <Zap className="w-4 h-4" />
                    You save ₹{savingsPerPerson} by teaming up
                  </div>
                )}
              </div>

              {/* Add-ons */}
              <div className="space-y-4 mb-8">
                <label 
                  className={`
                    flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all
                    ${hardbound 
                      ? 'border-brand-600 bg-brand-50/50' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <input 
                    type="checkbox" 
                    checked={hardbound}
                    onChange={(e) => setHardbound(e.target.checked)}
                    className="mt-1 w-5 h-5 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-gray-900">Hardbound File</span>
                      <span className="font-bold text-gray-900">+₹{hardboundPrice}</span>
                    </div>
                    <p className="text-sm text-gray-500 leading-snug">
                      Printed, bound, and delivered to your doorstep. Ready for submission.
                    </p>
                  </div>
                </label>
              </div>

              {/* Bottom Actions */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Total Payable Amount</span>
                  <span className="text-xl font-bold text-gray-900">₹{finalTotal}</span>
                </div>
                
                <button 
                  onClick={handleReserve}
                  className="w-full btn-primary flex items-center justify-center gap-2 group"
                >
                  <span>Reserve Project Slot</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <p className="text-center text-xs text-gray-500 font-medium flex flex-col sm:flex-row items-center justify-center gap-1.5 pt-2">
                  <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-green-600" /> Takes 30 seconds</span>
                  <span className="hidden sm:inline text-gray-300">•</span>
                  <span>Pay after details</span>
                  <span className="hidden sm:inline text-gray-300">•</span>
                  <span>Instant WhatsApp confirmation</span>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        teamSize={teamSize}
        basePrice={basePrice}
        originalBasePrice={originalBasePrice}
        isOfferActive={!isExpired}
        hardbound={hardbound}
        hardboundPrice={hardboundPrice}
        addPPT={addPPT}
        addViva={addViva}
        setAddPPT={setAddPPT}
        setAddViva={setAddViva}
        perPersonAddon={perPersonAddon}
        pptTotal={pptTotal}
        vivaTotal={vivaTotal}
        totalPayable={finalTotal}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handlePayment}
        isProcessing={isProcessing}
        offerSavings={!isExpired ? originalBasePrice - basePrice : 0}
      />

      {/* Mobile Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:hidden z-40 flex items-center justify-between">
        <div>
           <p className="text-xs text-gray-500">Total per person</p>
           <p className="text-xl font-bold text-gray-900">₹{pricePerPerson}</p>
        </div>
        <button 
          onClick={handleReserve}
          className="btn-primary py-2.5 px-6 text-sm"
        >
          Reserve Slot
        </button>
      </div>

    </section>
  );
};

export default HeroConfigurator;
