import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, MessageCircle, User, Users, Package, IndianRupee, Send, ExternalLink } from 'lucide-react';
import { buildWhatsAppUrl, WHATSAPP_DISPLAY_NUMBER } from '../../config/paymentConfig';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(4);
  
  // Get order data from navigation state
  const orderData = location.state?.orderData;
  
  // If no order data, redirect to home
  useEffect(() => {
    if (!orderData) {
      navigate('/', { replace: true });
    }
  }, [orderData, navigate]);

  // Build WhatsApp URL
  const getOrderWhatsAppUrl = () => {
    if (!orderData) return '';
    
    const message = `Hi Love Assignment 👋

I want to reserve a project slot.

Name: ${orderData.name}
Project Type: ${orderData.projectType || 'Not specified yet'}
Team Size: ${orderData.teamSize}

Selected Price: ₹${orderData.price}

Add-ons:
- Hardbound: ${orderData.addons?.hardbound ? 'Yes' : 'No'}
- PPT: ${orderData.addons?.ppt ? 'Yes' : 'No'}
- Viva Q&A: ${orderData.addons?.viva ? 'Yes' : 'No'}

Submitted via website.`;

    return buildWhatsAppUrl(message);
  };

  // Auto-redirect after a short pause so users can read the instructions
  useEffect(() => {
    if (!orderData) return;

    if (countdown === 0) {
      window.location.href = getOrderWhatsAppUrl();
      return undefined;
    }

    const timer = setTimeout(() => {
      setCountdown((current) => current - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, orderData]);

  // Manual redirect
  const handleContinueClick = () => {
    window.location.href = getOrderWhatsAppUrl();
  };

  if (!orderData) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Order Confirmation | Love Assignment</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="relative min-h-[100dvh] overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(239,68,68,0.12),_transparent_32%),linear-gradient(180deg,_#fff7f7_0%,_#f8fafc_55%,_#ffffff_100%)] px-4 py-3 sm:px-6 sm:py-5">
        <div className="absolute -left-24 top-16 h-48 w-48 rounded-full bg-brand-100/40 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-56 w-56 rounded-full bg-emerald-100/50 blur-3xl" />

        <div className="mx-auto flex min-h-[calc(100dvh-1.5rem)] max-w-5xl items-center sm:min-h-[calc(100dvh-2.5rem)]">
          <div className="relative w-full overflow-hidden rounded-[28px] border border-white/70 bg-white/90 shadow-[0_25px_80px_rgba(15,23,42,0.14)] backdrop-blur">
            <div className="grid md:grid-cols-[1.1fr_0.9fr]">
              <div className="p-5 sm:p-6 lg:p-8">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    <CheckCircle className="h-4 w-4" />
                    Slot saved successfully
                  </div>
                  <div className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                    {countdown > 0 ? `Opening WhatsApp in ${countdown}s` : 'Opening WhatsApp now'}
                  </div>
                </div>

                <div className="max-w-xl">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    One last tap and your order reaches us
                  </h1>
                  <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
                    We&apos;re opening WhatsApp with your pre-filled message to {WHATSAPP_DISPLAY_NUMBER}. Once it opens, just tap the green <span className="font-semibold text-gray-900">Send</span> button.
                  </p>
                </div>

                <div className="mt-5 rounded-2xl border border-brand-100 bg-brand-50/80 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-white text-brand-700 shadow-sm">
                      <Send className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold text-gray-900 sm:text-base">What happens next</h2>
                      <div className="mt-2 grid gap-2 text-sm text-gray-600 sm:grid-cols-3">
                        <p><span className="font-semibold text-gray-900">1.</span> WhatsApp opens automatically.</p>
                        <p><span className="font-semibold text-gray-900">2.</span> You review the ready-made message.</p>
                        <p><span className="font-semibold text-gray-900">3.</span> You tap <span className="font-semibold text-gray-900">Send</span> and we reply there.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={handleContinueClick}
                    className="flex-1 btn-primary py-3.5 flex items-center justify-center gap-2 font-semibold"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Open WhatsApp Chat
                  </button>
                  <div className="flex items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
                    <ExternalLink className="mr-2 h-4 w-4 text-gray-400" />
                    Message is pre-filled, but WhatsApp still needs your final send tap.
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 bg-gray-50/85 p-5 sm:p-6 lg:border-l lg:border-t-0 lg:p-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
                    Order Summary
                  </h2>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-500 shadow-sm">
                    Saved securely
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="flex items-start justify-between gap-4 rounded-2xl bg-white px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Name</p>
                        <p className="font-medium text-gray-900">{orderData.name}</p>
                      </div>
                    </div>
                  </div>

                  {orderData.projectType && (
                    <div className="flex items-start justify-between gap-4 rounded-2xl bg-white px-4 py-3 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100">
                          <Package className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Project</p>
                          <p className="font-medium text-gray-900">{orderData.projectType}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100">
                          <Users className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Team Size</p>
                          <p className="font-medium text-gray-900">
                            {orderData.teamSize} {orderData.teamSize > 1 ? 'Members' : 'Member'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-100">
                          <IndianRupee className="h-4 w-4 text-green-700" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Total</p>
                          <p className="font-bold text-gray-900">₹{orderData.price}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                    <p className="text-xs text-gray-500">Selected Add-ons</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {orderData.addons?.hardbound && (
                        <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
                          Hardbound File
                        </span>
                      )}
                      {orderData.addons?.ppt && (
                        <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
                          PPT Slides
                        </span>
                      )}
                      {orderData.addons?.viva && (
                        <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
                          Viva Q&A
                        </span>
                      )}
                      {!orderData.addons?.hardbound && !orderData.addons?.ppt && !orderData.addons?.viva && (
                        <span className="text-sm text-gray-500">Project only</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderConfirmationPage;
