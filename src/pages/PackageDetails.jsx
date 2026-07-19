import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { tourData } from '../data/tours';
import EnquireModal from '../components/EnquireModal';

const PackageDetails = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const tour = tourData.find((t) => t.id === parseInt(id));

  if (!tour) {
    return <div className="pt-40 text-center text-2xl font-bold text-slate-900 h-screen">Tour package not found.</div>;
  }

  return (
    <div className="pt-28 pb-20 px-6 max-w-5xl mx-auto min-h-screen">
      <Link to="/" className="text-blue-600 hover:text-orange-500 transition-colors mb-6 inline-flex items-center font-bold text-sm uppercase tracking-wider">
        &larr; Back to Home
      </Link>
      
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="relative">
          <img src={tour.image} alt={tour.title} className="w-full h-[400px] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-8">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">{tour.title}</h1>
          </div>
        </div>
        
        <div className="p-8 md:p-12">
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4 border-b border-gray-100 pb-8">
            <div className="flex gap-6 text-sm font-bold text-slate-700 uppercase tracking-wider">
              <span className="flex items-center gap-2"><span className="text-blue-500 text-xl">🕒</span> {tour.duration}</span>
              <span className="flex items-center gap-2"><span className="text-orange-500 text-xl">★</span> {tour.rating} Rating</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Starting From</p>
              <span className="text-4xl font-black text-slate-900">₹{tour.price}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-4">Overview</h2>
              <p className="text-gray-600 leading-relaxed mb-10 text-lg">{tour.description}</p>

              <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Itinerary</h2>
              <div className="space-y-6">
                {tour.itinerary.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-orange-500 border-4 border-orange-100"></div>
                      {index !== tour.itinerary.length - 1 && <div className="w-0.5 h-full bg-gray-200 my-1"></div>}
                    </div>
                    <div className="bg-slate-50 p-5 rounded-2xl border border-gray-100 flex-grow hover:shadow-md transition">
                      <strong className="text-blue-600 block mb-2 font-black">{item.day}</strong>
                      <span className="text-slate-700 font-medium">{item.plan}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
                <h3 className="text-xl font-bold mb-2">Ready to Book?</h3>
                <p className="text-gray-400 text-sm mb-6">Secure your spot for this unforgettable journey.</p>
                <button 
                  onClick={() => setIsOpen(true)} 
                  className="w-full bg-orange-500 text-white px-6 py-4 rounded-xl font-black hover:bg-orange-600 transition shadow-lg text-lg"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <EnquireModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} tourDetails={tour} />
    </div>
  );
};

export default PackageDetails;