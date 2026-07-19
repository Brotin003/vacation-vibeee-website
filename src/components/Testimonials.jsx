import React from 'react';

const Testimonials = () => {
  const reviews = [
    { name: 'Rahul Mehta', text: 'Booked my entire Europe trip with Travel On Loop. Excellent service and support throughout!' },
    { name: 'Priya Sharma', text: 'Great experience! Best prices and smooth booking process. Highly recommended.' },
    { name: 'Amit Verma', text: 'One stop solution for all my travel needs. Love the customer support!' }
  ];

  return (
    <section className="py-12 px-6 bg-white mb-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-extrabold text-slate-900 uppercase">Customer Reviews</h2>
          <span className="text-blue-600 font-semibold text-sm cursor-pointer hover:underline">View All</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div key={i} className="border border-gray-200 shadow-sm hover:shadow-md transition p-6 rounded-xl bg-white">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600">
                    {review.name.charAt(0)}
                  </div>
                  <span className="font-bold text-slate-900">{review.name}</span>
                </div>
                <span className="text-orange-500 text-sm tracking-widest">★★★★★</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;