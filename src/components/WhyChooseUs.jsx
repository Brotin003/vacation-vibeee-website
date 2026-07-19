import React from 'react';

const WhyChooseUs = () => {
  const features = [
    { title: 'Safe Travel', desc: 'Decades of experience in safe tourism planning.', icon: '🛡️' },
    { title: 'Awesome Guide', desc: 'Expert guides for a hassle-free experience.', icon: '🗺️' },
    { title: 'Save Money', desc: 'The best prices without compromising quality.', icon: '💰' },
    { title: 'Easy EMI', desc: 'Travel now and pay later with easy options.', icon: '💳' },
  ];

  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 uppercase">Why Travel With Us?</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-14 h-14 bg-blue-50 flex items-center justify-center rounded-xl text-2xl mb-6">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;