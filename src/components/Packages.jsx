import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'packages'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (isLoading) {
    return <div className="py-20 text-center font-bold text-gray-500">Loading amazing destinations...</div>;
  }

  return (
    <div className="py-20 bg-slate-50 px-6" id="packages">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Popular Packages</h2>
          <p className="text-gray-500 font-medium">Explore our most booked destinations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition flex flex-col">
              <img src={pkg.image} alt={pkg.title} className="w-full h-56 object-cover" />
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{pkg.title}</h3>
                    <p className="text-sm font-bold text-blue-600 mt-1">{pkg.duration}</p>
                  </div>
                  <span className="bg-orange-50 text-orange-600 text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                    ★ {pkg.rating}
                  </span>
                </div>
                <p className="text-gray-500 text-sm line-clamp-2 mb-6 flex-grow">{pkg.description}</p>
                <div className="flex justify-between items-center mt-auto border-t border-gray-100 pt-6">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Price</p>
                    <p className="text-xl font-black text-slate-900">₹{pkg.price}</p>
                  </div>
                  <Link 
                    to={`/package/${pkg.id}`} 
                    className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Packages;