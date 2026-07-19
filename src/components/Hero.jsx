import React from 'react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-48 md:pb-56 px-6 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center mt-[72px]">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-slate-900/50"></div>
      
      {/* Text Container */}
      <div className="relative z-10 max-w-7xl mx-auto text-center text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          Your Gateway to <span className="text-orange-500">Unforgettable Adventures</span>
        </h1>
        {/* Increased bottom margin (mb-32) to ensure text never touches the floating box */}
        <p className="text-lg md:text-xl font-medium max-w-2xl mx-auto mb-32 text-gray-100 leading-relaxed">
          We specialize in crafting unforgettable travel experiences, offering meticulously planned itineraries, handpicked accommodations, and personalized services.
        </p>
      </div>

      {/* Floating Stats Bar - Positioned precisely on the bottom edge of the section */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-full max-w-4xl px-4 z-20">
        <div className="bg-white rounded-2xl shadow-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x border border-gray-100">
          <div className="text-center pt-4 md:pt-0">
            <div className="text-blue-600 text-3xl mb-2">✈️</div>
            <h3 className="text-3xl font-extrabold text-slate-900">120k+</h3>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mt-1">Journeys Completed</p>
          </div>
          <div className="text-center pt-4 md:pt-0">
            <div className="text-blue-600 text-3xl mb-2">👥</div>
            <h3 className="text-3xl font-extrabold text-slate-900">85k+</h3>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mt-1">Happy Travelers</p>
          </div>
          <div className="text-center pt-4 md:pt-0">
            <div className="text-blue-600 text-3xl mb-2">🧭</div>
            <h3 className="text-3xl font-extrabold text-slate-900">300+</h3>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mt-1">Unique Experiences</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;