import React, { useState, useEffect } from 'react';
import TourCard from './TourCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; 

const Packages = () => {
  // State to hold our fetched tours and track loading status
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch data from Firestore
    const fetchPackages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'packages'));
        const packagesData = querySnapshot.docs.map((doc) => ({
          id: doc.id, // We grab the unique Firestore ID here
          ...doc.data()
        }));
        setTours(packagesData);
      } catch (error) {
        console.error("Error fetching packages: ", error);
      } finally {
        setLoading(false); // Stop loading animation whether it succeeds or fails
      }
    };

    fetchPackages();
  }, []);

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Trending Tours</h2>
      
      {/* Show a loading message while fetching data */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <p className="text-lg text-gray-500 font-medium animate-pulse">
            Loading amazing packages...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <TourCard 
              key={tour.id}
              title={tour.title}
              duration={tour.duration}
              rating={tour.rating}
              price={tour.price}
              image={tour.image}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Packages;