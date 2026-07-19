import React from 'react';

const Destinations = () => {
  const destinations = [
    { name: 'Assam', desc: 'Lush tea gardens and vibrant wildlife', img: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=600&q=80' },
    { name: 'Bhutan', desc: 'Peaceful serenity of the Himalayas', img: 'https://images.unsplash.com/photo-1516815231560-8f41ec531527?auto=format&fit=crop&w=600&q=80' },
    { name: 'Meghalaya', desc: 'The Abode of Clouds and living roots', img: 'https://images.unsplash.com/photo-1629851603507-6c84c176378e?auto=format&fit=crop&w=600&q=80' },
    { name: 'Sikkim', desc: 'Stunning mountain vistas and heritage', img: 'https://images.unsplash.com/photo-1601248068532-60144f80879f?auto=format&fit=crop&w=600&q=80' }
  ];

  return (
    <section className="pt-56 md:pt-40 pb-20 px-6 max-w-7xl mx-auto bg-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-slate-900 uppercase">Explore Your Next Destination</h2>
        <p className="text-gray-500 font-medium mt-4 max-w-2xl mx-auto">Discover our curated selection of breathtaking locations crafted to give you an unforgettable holiday experience.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((dest, i) => (
          <div key={i} className="relative h-80 rounded-2xl overflow-hidden cursor-pointer group shadow-sm">
            <img 
              src={dest.img} 
              alt={dest.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-2xl font-bold text-white mb-1">{dest.name}</h3>
              <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">{dest.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Destinations;