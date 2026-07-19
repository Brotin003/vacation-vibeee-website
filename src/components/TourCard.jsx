import React from 'react';
import { Link } from 'react-router-dom';

const TourCard = ({ id, title, duration, rating, price, image, onEnquire }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col transition-all hover:shadow-xl hover:-translate-y-1 group">
      <Link to={`/package/${id}`} className="block relative overflow-hidden h-52">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
          {duration}
        </div>
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tour Package</span>
          <span className="text-sm font-bold flex items-center gap-1 text-slate-700">
            <span className="text-orange-500">★</span> {rating}
          </span>
        </div>
        
        <Link to={`/package/${id}`} className="hover:text-blue-600 transition">
          <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex-grow leading-snug">{title}</h3>
        </Link>
        
        <div className="flex justify-between items-end pt-4 mt-auto border-t border-gray-100">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Starting From</p>
            <p className="text-xl font-black text-slate-900">₹{price}</p>
          </div>
          
          <button 
            onClick={onEnquire} 
            className="bg-orange-500 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-orange-600 transition shadow-sm"
          >
            Enquire
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;