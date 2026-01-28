import React from 'react';
import { Layers, FileText, Printer } from 'lucide-react';

const services = [
  {
    icon: Layers,
    title: 'Final Year Projects',
    desc: 'Complete source code, database, and documentation for BCA/MCA/B.Tech students.',
  },
  {
    icon: FileText,
    title: 'Project Reports',
    desc: 'IEEE standard project reports, synopsis, and PPTs tailored to your university guidelines.',
  },
  {
    icon: Printer,
    title: 'Hardbound Printing',
    desc: 'Premium quality hardbound printing with golden embossing, delivered to your doorstep.',
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-gray-600">
            Everything you need for a successful final year project submission.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-50 rounded-lg flex items-center justify-center mb-6">
                <service.icon className="w-6 h-6 text-brand-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
