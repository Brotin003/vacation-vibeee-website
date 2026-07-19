import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
        
        {/* Brand Info */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-3xl text-blue-500 font-bold">✨</span>
            <div>
              <span className="text-xl font-extrabold tracking-tight block leading-none">VACATION VIBEEE</span>
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Good Vibes. Great Adventures.</span>
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed max-w-sm">
            We specialize in crafting unforgettable travel experiences, offering meticulously planned itineraries and personalized services to make your dream journey extraordinary.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-gray-300">Quick Links</h3>
          <ul className="space-y-4 text-sm text-gray-400 font-medium">
            <li className="hover:text-orange-500 cursor-pointer transition-colors">About Us</li>
            <li className="hover:text-orange-500 cursor-pointer transition-colors">Return & Refund Policy</li>
            <li className="hover:text-orange-500 cursor-pointer transition-colors">Terms and Conditions</li>
            <li className="hover:text-orange-500 cursor-pointer transition-colors">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-gray-300">Contact Us</h3>
          <div className="space-y-4 text-sm text-gray-400 font-medium">
            <p className="flex items-center gap-3">
              <span className="text-blue-500 text-lg">📞</span> +91 70318 21275
            </p>
            <p className="flex items-center gap-3">
              <span className="text-blue-500 text-lg">✉️</span> team@vacationvibeee.com
            </p>
          </div>
        </div>

      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-sm text-gray-500 font-medium">
        © 2026 Vacation Vibeee. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;