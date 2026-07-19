import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ComingSoon = () => {
  const location = useLocation();
  // Extracts the path name (e.g., "/stays" becomes "Stays")
  const pageName = location.pathname.replace('/', '').toUpperCase();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 pt-24 text-center">
      <div className="text-6xl mb-6">🚧</div>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
        The <span className="text-orange-500">{pageName}</span> Page is Coming Soon!
      </h1>
      <p className="text-gray-500 font-medium max-w-md mx-auto mb-8">
        We are currently working hard to bring you the best experience. Check back soon for exciting updates and new features.
      </p>
      <Link 
        to="/" 
        className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-md"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default ComingSoon;