import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "How does booking work?",
    answer: "You select your team size, fill in your details, and make a secure payment. Once confirmed, our team contacts you via WhatsApp for project topic confirmation and delivery."
  },
  {
    question: "Is each project unique?",
    answer: "Yes! We ensure 100% unique logic and code structure to avoid plagiarism issues during university submission."
  },
  {
    question: "Will code run on my laptop?",
    answer: "Absolutely. We provide complete setup instructions and remote support (TeamViewer/AnyDesk) to ensure the project runs smoothly on your machine."
  },
  {
    question: "Do you provide hardbound files?",
    answer: "Yes, we offer premium hardbound printing with golden embossing as an add-on service. We deliver it directly to your address via courier."
  },
  {
    question: "How soon will I get my project?",
    answer: "Most digital deliveries (Code + Report) are done within 16 hours (First draft). Hardbound delivery typically takes 3-5 business days depending on your location."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="section-container max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">Got questions? We've got answers.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 ${openIndex === idx ? 'bg-gray-50 ring-1 ring-gray-200' : 'bg-white'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
              >
                <span className="font-semibold text-gray-900 pr-8">{faq.question}</span>
                {openIndex === idx ? (
                  <Minus className="w-5 h-5 text-brand-700 flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              <div 
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  openIndex === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-100/50 mt-2">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
