import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, MessageCircle, User, Users, Package, IndianRupee } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../../config/paymentConfig';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);
  
  // Get order data from navigation state
  const orderData = location.state?.orderData;
  
  // If no order data, redirect to home
  useEffect(() => {
    if (!orderData) {
      navigate('/', { replace: true });
    }
  }, [orderData, navigate]);

  // Build WhatsApp URL
  const buildWhatsAppUrl = () => {
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

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  // Auto-redirect after 1.5 seconds
  useEffect(() => {
    if (!orderData) return;
    
    const timer = setTimeout(() => {
      setCountdown(0);
      window.location.href = buildWhatsAppUrl();
    }, 1500);

    return () => clearTimeout(timer);
  }, [orderData]);

  // Manual redirect
  const handleContinueClick = () => {
    window.location.href = buildWhatsAppUrl();
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

      <section className="min-h-[70vh] flex items-center justify-center px-4 py-12 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Success Icon */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Your project slot is almost reserved
            </h1>
            <p className="text-gray-600">
              We're redirecting you to WhatsApp to confirm details and payment.
            </p>
          </div>

          {/* Order Summary Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Order Summary
            </h2>
            
            <div className="space-y-3">
              {/* Name */}
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Name</p>
                  <p className="font-medium text-gray-900">{orderData.name}</p>
                </div>
              </div>

              {/* Project Type */}
              {orderData.projectType && (
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <Package className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Project Type</p>
                    <p className="font-medium text-gray-900">{orderData.projectType}</p>
                  </div>
                </div>
              )}

              {/* Team Size */}
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <Users className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Team Size</p>
                  <p className="font-medium text-gray-900">{orderData.teamSize} {orderData.teamSize > 1 ? 'Members' : 'Member'}</p>
                </div>
              </div>

              {/* Add-ons */}
              {(orderData.addons?.hardbound || orderData.addons?.ppt || orderData.addons?.viva) && (
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-2">Selected Add-ons</p>
                  <div className="flex flex-wrap gap-2">
                    {orderData.addons?.hardbound && (
                      <span className="px-2 py-1 bg-brand-50 text-brand-700 text-xs font-medium rounded-full">
                        Hardbound File
                      </span>
                    )}
                    {orderData.addons?.ppt && (
                      <span className="px-2 py-1 bg-brand-50 text-brand-700 text-xs font-medium rounded-full">
                        PPT Slides
                      </span>
                    )}
                    {orderData.addons?.viva && (
                      <span className="px-2 py-1 bg-brand-50 text-brand-700 text-xs font-medium rounded-full">
                        Viva Q&A
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Total Price */}
              <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                <span className="text-gray-600 font-medium">Total</span>
                <span className="text-xl font-bold text-gray-900 flex items-center">
                  <IndianRupee className="w-5 h-5" />
                  {orderData.price}
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 text-center mt-4">
              This information has been securely saved.
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleContinueClick}
            className="w-full btn-primary py-4 flex items-center justify-center gap-2 font-semibold text-lg"
          >
            <MessageCircle className="w-5 h-5" />
            Continue to WhatsApp
          </button>

          {/* Countdown Text */}
          <p className="text-center text-sm text-gray-500 mt-3">
            {countdown > 0 ? (
              <>Redirecting in <span className="font-bold text-brand-600">{countdown}</span>…</>
            ) : (
              <>Redirecting now…</>
            )}
          </p>
        </div>
      </section>
    </>
  );
};

export default OrderConfirmationPage;
