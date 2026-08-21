import React from 'react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-48 md:pb-56 px-6 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center mt-[72px]">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-slate-900/50"></div>
      
      {/* Text Container */}
      <div className="relative z-10 max-w-7xl mx-auto text-center text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
        Zero Stress.<span className="text-orange-500">100% Good Vibes.</span>
        </h1>
        {/* Increased bottom margin (mb-32) to ensure text never touches the floating box */}
        <p className="text-lg md:text-xl font-medium max-w-2xl mx-auto mb-32 text-gray-100 leading-relaxed">
        We don’t just book trips; we craft seamless adventures. With tailor-made itineraries, pristine stays, expert driver-guides, and 24/7 support, all you have to do is show up and soak in the vacation vibe.
        </p>
      </div>

      {/* Floating Stats Bar - Positioned precisely on the bottom edge of the section */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-full max-w-4xl px-4 z-20">
        <div className="bg-white rounded-2xl shadow-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x border border-gray-100">
          <div className="text-center pt-4 md:pt-0">
            <div className="text-blue-600 text-3xl mb-2">✈️</div>
            <h3 className="text-3xl font-extrabold text-slate-900">120+</h3>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mt-1">Journeys Completed</p>
          </div>
          <div className="text-center pt-4 md:pt-0">
            <div className="text-blue-600 text-3xl mb-2">👥</div>
            <h3 className="text-3xl font-extrabold text-slate-900">85+</h3>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mt-1">Happy Travelers</p>
          </div>
          <div className="text-center pt-4 md:pt-0">
            <div className="text-blue-600 text-3xl mb-2">🧭</div>
            <h3 className="text-3xl font-extrabold text-slate-900">30+</h3>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mt-1">Unique Experiences</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;