import React from 'react';

const EnquireModal = ({ isOpen, onClose, tourDetails }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Enquiry submitted for ${tourDetails?.title}! We will contact you soon.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative border border-gray-100">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-5 text-white hover:text-gray-200 text-3xl font-bold z-10"
        >
          &times;
        </button>

        <div className="bg-slate-900 p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full blur-3xl opacity-50 -mr-10 -mt-10"></div>
          <h2 className="text-2xl font-extrabold mb-1 relative z-10">Plan Your Trip</h2>
          <p className="text-gray-400 text-sm font-medium relative z-10">
            Enquiring for: <span className="text-white">{tourDetails?.title}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5 bg-slate-50">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
            <input type="text" required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none transition font-medium text-slate-900" placeholder="John Doe" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
              <input type="tel" required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none transition font-medium text-slate-900" placeholder="+91 98765 43210" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
              <input type="email" required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none transition font-medium text-slate-900" placeholder="john@example.com" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Travel Date</label>
            <input type="date" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none transition font-medium text-slate-900" />
          </div>

          <button type="submit" className="w-full bg-orange-500 text-white font-black py-4 rounded-xl hover:bg-orange-600 transition shadow-md mt-4 text-lg">
            Submit Enquiry
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnquireModal;