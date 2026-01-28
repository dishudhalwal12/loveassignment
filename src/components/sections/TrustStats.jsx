import React from 'react';

const stats = [
  { label: 'Projects Delivered', value: '2000+' },
  { label: 'Student Satisfaction', value: '98%' },
  { label: 'Delivery Time', value: '< 1 Week' },
  { label: 'Experience', value: '4+ Years' },
];

const TrustStats = () => {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-700 mb-1">
                {stat.value}
              </div>
              <div className="text-gray-500 font-medium text-sm uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
