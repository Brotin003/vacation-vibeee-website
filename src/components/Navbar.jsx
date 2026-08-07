import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import myLogo from '../assets/vacation_vibe.jpeg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-6 lg:px-8 py-4 bg-white shadow-sm fixed w-full top-0 z-50">
      {/* Updated Logo Section */}
      <div className="flex items-center">
        <Link to="/" className="block">
          <img 
            src={myLogo} 
            alt="Vacation Vibeee Logo" 
            className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-md" 
          />
        </Link>
      </div>
      
      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-8 text-slate-800 font-semibold text-sm items-center">
        <li className="hover:text-blue-600 cursor-pointer transition-colors">
          <Link to="/">HOME</Link>
        </li>
        <li className="hover:text-blue-600 cursor-pointer transition-colors">
          <Link to="/">PACKAGES</Link>
        </li>
        <li className="hover:text-blue-600 cursor-pointer transition-colors">
          <Link to="/stays">STAYS</Link>
        </li>
        <li className="hover:text-blue-600 cursor-pointer transition-colors">
          <Link to="/blog">BLOG</Link>
        </li>
      </ul>
      
      <button className="hidden md:block bg-orange-500 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-orange-600 transition shadow-sm">
        PLAN A TRIP
      </button>

      {/* Mobile Hamburger */}
      <button 
        className="md:hidden text-slate-900 focus:outline-none" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-[72px] left-0 w-full bg-white shadow-xl flex flex-col items-center py-6 space-y-4 md:hidden border-t border-gray-100">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-slate-900 font-bold hover:text-blue-600">HOME</Link>
          <Link to="/" onClick={() => setIsOpen(false)} className="text-slate-900 font-bold hover:text-blue-600">PACKAGES</Link>
          <Link to="/stays" onClick={() => setIsOpen(false)} className="text-slate-900 font-bold hover:text-blue-600">STAYS</Link>
          <Link to="/blog" onClick={() => setIsOpen(false)} className="text-slate-900 font-bold hover:text-blue-600">BLOG</Link>
          <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600 transition w-3/4 mt-4">
            PLAN A TRIP
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;