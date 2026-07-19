import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Packages from './components/Packages';
import Destinations from './components/Destinations';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import PackageDetails from './pages/PackageDetails';
import ComingSoon from './pages/ComingSoon'; // <-- Import the new page

const Home = () => (
  <>
    <Hero />
    <Destinations />
    <Packages />
    <WhyChooseUs />
    <Testimonials />
  </>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white font-sans text-slate-900 flex flex-col">
        <Navbar />
        <main className="flex-grow"> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/package/:id" element={<PackageDetails />} />
            
            {/* Catch-all for our incomplete pages */}
            <Route path="/stays" element={<ComingSoon />} />
            <Route path="/blog" element={<ComingSoon />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;