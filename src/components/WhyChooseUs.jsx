import React from 'react';

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: "🚘",
      title: "Professional Driver cum Guide",
      description: "Travel safely with our experienced drivers who also serve as your knowledgeable local guides."
    },
    {
      id: 2,
      icon: "🏨",
      title: "Hygienic Hotels",
      description: "Rest easy in clean, comfortable, and thoroughly sanitized accommodations handpicked for you."
    },
    {
      id: 3,
      icon: "🗺️",
      title: "Customized Itineraries",
      description: "Enjoy flexible, tailor-made travel plans designed perfectly around your preferences and pace."
    },
    {
      id: 4,
      icon: "🎧",
      title: "24x7 Support",
      description: "Experience a worry-free vacation with our round-the-clock customer assistance."
    }
  ];

  return (
    <div className="py-20 bg-white px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Why Travel With Us</h2>
          <p className="text-gray-500 font-medium">Everything you need for an unforgettable adventure.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="bg-slate-50 p-8 rounded-3xl border border-gray-100 text-center hover:shadow-lg transition duration-300 hover:-translate-y-1"
            >
              <div className="text-5xl mb-6 bg-white w-20 h-20 mx-auto rounded-full flex items-center justify-center shadow-sm border border-gray-100">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;