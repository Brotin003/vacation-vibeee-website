import React, { useState } from 'react';
import TourCard from './TourCard';
import EnquireModal from './EnquireModal';
import { tourData } from '../data/tours';

const Packages = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);

  const openModal = (tour) => {
    setSelectedTour(tour);
    setIsModalOpen(true);
  };

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto bg-gray-50/30">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-slate-900 uppercase">Trending Tours</h2>
        <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tourData.map((tour) => (
          <TourCard 
            key={tour.id}
            id={tour.id}
            title={tour.title}
            duration={tour.duration}
            rating={tour.rating}
            price={tour.price}
            image={tour.image}
            onEnquire={() => openModal(tour)}
          />
        ))}
      </div>

      <EnquireModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        tourDetails={selectedTour} 
      />
    </section>
  );
};

export default Packages;