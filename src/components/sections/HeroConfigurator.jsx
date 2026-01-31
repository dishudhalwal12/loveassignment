import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Check,
  Star,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import CartDrawer from "../ui/CartDrawer";
import { usePricing } from "../../context/PricingContext";
import useRazorpay from "../../hooks/useRazorpay";
import { saveOrder, saveWhatsAppOrder } from "../../lib/firebase";
import { PAYMENT_MODE, WHATSAPP_NUMBER } from "../../config/paymentConfig";

const pfpImages = [
  "/pfp/0eef600c4aee2c986504050a1d988c7f.jpg",
  "/pfp/26ac83b59b9483944c99dcb9104a28e0.jpg",
  "/pfp/2a9bd72cb276c78aa3a82ddaf8ce57bf.jpg",
  "/pfp/32eb4049fc17b28b23bb11c7febfa298.jpg",
  "/pfp/3e938db6467dd7773eec10a63a1c9ae9.jpg",
  "/pfp/3f117195af8de79f76d09d3673dd9d4f.jpg",
  "/pfp/412eb448fb72053b06b82b7f36a6447e.jpg",
  "/pfp/5a795e60c839b2ade3a6257446750903.jpg",
  "/pfp/6390b3720c610903502b8c9dfac7ccc7.jpg",
  "/pfp/69f3d6ddd5757c57005bba9288221a47.jpg",
  "/pfp/9a7b726ba395074e6bf7be18ce7ee587.jpg",
  "/pfp/a1fbddda7de06260f6d543f3c7ff616f.jpg",
  "/pfp/a270615c7ea87b9f40559dd720e66dbb.jpg",
  "/pfp/a36a908c3e19517116a5d125dcc61e7d.jpg",
  "/pfp/c6cb82181f943e7ec9ea932b8e3addf5.jpg",
  "/pfp/eb9bd195d946e8535f3d73196e96c21e.jpg",
];

const getRandomPfps = (count = 5) => {
  const shuffled = [...pfpImages].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
const HeroConfigurator = ({ overrideTitle }) => {
  const navigate = useNavigate();
  const [teamSize, setTeamSize] = useState(4);
  const [hardbound, setHardbound] = useState(false);
  const [addPPT, setAddPPT] = useState(false);
  const [addViva, setAddViva] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Random PFPs for social proof - changes on each page load
  const randomPfps = useMemo(() => getRandomPfps(5), []);

  // Handle sequential animation: popIn → pfpFloat
  useEffect(() => {
    const handleAnimationEnd = (e) => {
      if (e.animationName === "popIn") {
        e.target.classList.add("animation-done");
      }
    };

    const pfpElements = document.querySelectorAll(".animate-hero-pfp");
    pfpElements.forEach((el) =>
      el.addEventListener("animationend", handleAnimationEnd),
    );

    return () => {
      pfpElements.forEach((el) =>
        el.removeEventListener("animationend", handleAnimationEnd),
      );
    };
  }, []);

  // Payment Form State
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    topic: "",
  });

  const { openCheckout } = useRazorpay();
  const { basePrice, originalBasePrice, hardboundPrice, isExpired } =
    usePricing();
  const pptTotal = addPPT ? 100 : 0;
  const vivaTotal = addViva ? 100 : 0;
  const perPersonAddon = Math.ceil(100 / teamSize);

  // Calculate final total including all add-ons
  const finalTotal =
    basePrice + (hardbound ? hardboundPrice : 0) + pptTotal + vivaTotal;
  
  // Per-person cost includes ALL selected items (base + hardbound + addons)
  const pricePerPerson = Math.floor(finalTotal / teamSize);
  
  // Calculate savings for any team size vs 1-member price
  const getSavingsForSize = (size) => {
    if (size === 1) return 0;
    const onePersonTotal = basePrice + (hardbound ? hardboundPrice : 0) + pptTotal + vivaTotal;
    const teamTotal = Math.floor(onePersonTotal / size);
    return onePersonTotal - teamTotal;
  };
  
  // Dynamic comparison copy with highlighted keywords
  const getComparisonCopy = () => {
    switch(teamSize) {
      case 4: return <>Less than one <span className="font-semibold text-gray-700">fast-food meal</span> 🍔</>;
      case 3: return <>About the cost of a <span className="font-semibold text-gray-700">movie ticket</span> 🎬</>;
      case 2: return <>Less than a <span className="font-semibold text-gray-700">weekend café visit</span> ☕</>;
      case 1: return <>Still cheaper than <span className="font-semibold text-gray-700">repeating a semester</span> 📚</>;
      default: return <>Less than one <span className="font-semibold text-gray-700">fast-food meal</span> 🍔</>;
    }
  };

  const features = [
    "100% Unique Code Strategy",
    "Runs perfectly on your Laptop",
    "Viva Questions Included",
    "Hardbound Delivery Available",
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
          hardbound: hardbound,
        },
        totalPaid: finalTotal,
        razorpayPaymentId: response.razorpay_payment_id,
        status: "paid",
        createdAt: new Date(),
      });

      // 2. Close cart
      setIsModalOpen(false);

      // 3. Show success and redirect
      alert(
        "Payment successful! You will receive WhatsApp confirmation shortly.",
      );

      const message = `Hi Love Assignment, I have completed payment. My Payment ID is ${response.razorpay_payment_id}. Project: ${formData.topic || "Not specified"}`;
      const whatsappUrl = `https://wa.me/919256487182?text=${encodeURIComponent(message)}`;
      window.location.href = whatsappUrl;
    } catch (error) {
      console.error("Post-payment error:", error);
      alert(
        "Payment successful but failed to record order. Please contact support on WhatsApp.",
      );
      window.location.href = "https://wa.me/919256487182";
    }
  };

  // WhatsApp Checkout Handler
  const handleWhatsAppCheckout = async (e) => {
    e.preventDefault();

    // Validate
    if (!formData.name || !formData.whatsapp) {
      alert("Please fill in all required fields");
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Save order to Firebase
      await saveWhatsAppOrder({
        name: formData.name,
        phone: `+91${formData.whatsapp}`,
        email: "",
        course: "",
        projectType: formData.topic || "",
        teamSize: teamSize,
        price: finalTotal,
        addons: {
          hardbound: hardbound,
          ppt: addPPT,
          viva: addViva,
        },
      });

      // 2. Prepare order data for confirmation page
      const orderData = {
        name: formData.name,
        phone: `+91${formData.whatsapp}`,
        projectType: formData.topic || "",
        teamSize: teamSize,
        price: finalTotal,
        addons: {
          hardbound: hardbound,
          ppt: addPPT,
          viva: addViva,
        },
      };

      // 3. Close modal and navigate to confirmation page
      setIsModalOpen(false);
      setIsProcessing(false);

      navigate("/order-confirmation", { state: { orderData } });
    } catch (error) {
      console.error("WhatsApp checkout error:", error);
      setIsProcessing(false);
      alert("Something went wrong. Please try again.");
    }
  };

  // Razorpay Checkout Handler (for future use)
  const handleRazorpayCheckout = async (e) => {
    e.preventDefault();

    // Validate
    if (!formData.name || !formData.whatsapp) {
      alert("Please fill in all required fields");
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
        color: "#b91c1c",
      },
      modal: {
        ondismiss: function () {
          setIsProcessing(false);
          alert("Payment cancelled or failed. Try again.");
        },
      },
    };

    try {
      await openCheckout(options);
    } catch (err) {
      console.error(err);
      alert("Payment cancelled or failed. Try again.");
      setIsProcessing(false);
    }
  };

  // Payment router based on mode
  const handlePayment =
    PAYMENT_MODE === "whatsapp"
      ? handleWhatsAppCheckout
      : handleRazorpayCheckout;

  return (
    <section className="relative pt-8 pb-20 overflow-hidden bg-white">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-brand-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* Left Content - Clean, no container */}
          <div className="space-y-6 pr-0 lg:pr-8 pt-0 lg:pt-6">
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

            <div className="flex flex-col gap-2.5">
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
              <div className="flex -space-x-3">
                {randomPfps.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Student"
                    width="40"
                    height="40"
                    loading="lazy"
                    decoding="async"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover object-center shadow-sm animate-hero-pfp"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-1">
                <div className="flex text-yellow-500">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-gray-900 font-bold">4.75/5</span>
                <span>from 2000+ students</span>
              </div>
            </div>
          </div>

          {/* Right Content: Configurator Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-brand-200 blur-2xl opacity-20 transform rotate-2 rounded-3xl" />
            <div className="relative bg-white border border-gray-200 rounded-2xl shadow-xl p-6 sm:p-8">
              
              {/* Team Size Selector - Moved up */}
              <div className="mb-6">
                <p className="text-xs text-gray-400 mb-3">Split the cost with your team</p>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((size) => {
                    const savings = getSavingsForSize(size);
                    return (
                      <button
                        key={size}
                        onClick={() => setTeamSize(size)}
                        className={`
                          relative py-3 px-2 rounded-xl text-sm font-bold border-2 transition-all
                          ${
                            teamSize === size
                              ? "border-brand-600 bg-brand-50 text-brand-700 ring-2 ring-brand-100 ring-offset-1"
                              : "border-gray-200 bg-white text-gray-600 hover:border-brand-200 hover:bg-gray-50"
                          }
                        `}
                      >
                        <span className="block text-lg">{size}</span>
                        <span className="text-[10px] font-medium uppercase text-gray-500">
                          Member{size > 1 ? "s" : ""}
                        </span>

                        {teamSize === size && savings > 0 && (
                          <div className="absolute -top-3 -right-3 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow-sm">
                            Save ₹{savings}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pricing Display - Neuromarketing Split Layout */}
              <div className="bg-gray-50 rounded-xl p-5 mb-6 border border-gray-100">
                <div className="flex items-center">
                  {/* Left Section - Reassuring Copy (60%) */}
                  <div className="flex-[3] pr-4 text-left">
                    <h4 className="text-base font-semibold text-gray-800 mb-1">
                      Cost per person
                    </h4>
                    <p className="text-sm text-gray-500 mb-2">
                      {getComparisonCopy()}
                    </p>
                    <p className="text-xs text-gray-400">
                      All add-ons included · GST included
                    </p>
                  </div>
                  
                  {/* Subtle Divider */}
                  <div className="w-px h-16 bg-gray-200 mx-2"></div>
                  
                  {/* Right Section - Price Anchor (40%) */}
                  <div className="flex-[2] text-right pl-4">
                    <span className="text-4xl font-bold text-green-600 block leading-none">
                      ₹{pricePerPerson}
                    </span>
                    <span className="text-xs text-gray-400 font-medium mt-1 block">
                      per person
                    </span>
                  </div>
                </div>
              </div>

              {/* Add-ons */}
              <div className="space-y-4 mb-8">
                <label
                  className={`
                    flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all
                    ${
                      hardbound
                        ? "border-brand-600 bg-brand-50/50"
                        : "border-gray-200 hover:border-gray-300"
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
                      <span className="font-bold text-gray-900">
                        Hardbound File
                      </span>
                      <span className="font-bold text-gray-900">
                        +₹{hardboundPrice}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 leading-snug">
                      Printed, bound, and delivered to your doorstep. Ready for
                      submission.
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      One-time optional add-on
                    </p>
                  </div>
                </label>
              </div>

              {/* Bottom Actions */}
              <div className="space-y-5 pt-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 text-xs">
                    Team Total (split equally)
                  </span>
                  <div className="text-right">
                    {!isExpired && (
                      <span className="text-xs text-gray-400 line-through mr-2">
                        ₹{Math.floor((originalBasePrice + (hardbound ? hardboundPrice : 0) + pptTotal + vivaTotal))}
                      </span>
                    )}
                    <span className="text-base font-medium text-gray-500">
                      ₹{finalTotal}
                    </span>
                    {!isExpired && (
                      <span className="text-xs text-green-600 font-medium ml-1.5">
                        15% off
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleReserve}
                  className="w-full btn-primary py-4 flex items-center justify-center gap-2 group text-base"
                >
                  <span>Reserve Project Slot</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-center text-xs text-gray-500 font-medium flex flex-col sm:flex-row items-center justify-center gap-1.5 pt-2">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-600" /> Takes
                    30 seconds
                  </span>
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
          <p className="text-xs text-gray-500">You pay (per person)</p>
          <p className="text-xl font-bold text-brand-600">₹{pricePerPerson}</p>
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
