import React from 'react';
import { Send, Code2, SearchCheck, GraduationCap } from 'lucide-react';

const steps = [
  { 
    icon: Send, 
    title: 'Submit Topic', 
    desc: 'Send us your project topic or choose from our list.' 
  },
  { 
    icon: Code2, 
    title: 'We Build It', 
    desc: 'Our experts code your project and write the report.' 
  },
  { 
    icon: SearchCheck, 
    title: 'You Review', 
    desc: 'Check the project on your laptop with our support.' 
  },
  { 
    icon: GraduationCap, 
    title: 'Submit to College', 
    desc: 'Present with confidence and ace your viva.' 
  }
];

const ProcessTimeline = () => {
  return (
    <section className="py-20 bg-gray-50 from-gray-50 to-white bg-gradient-to-b">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-600">
            A simple 4-step process to get your final year project ready for submission.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative bg-white md:bg-transparent p-6 md:p-0 rounded-xl shadow-sm md:shadow-none border md:border-0 border-gray-100">
                <div className="w-16 h-16 mx-auto bg-white border-4 border-brand-50 rounded-full flex items-center justify-center mb-6 relative z-10 shadow-sm">
                  <step.icon className="w-7 h-7 text-brand-700" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
