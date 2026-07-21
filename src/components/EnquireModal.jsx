import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import emailjs from '@emailjs/browser';

const EnquireModal = ({ isOpen, onClose, tourDetails }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Save Lead to Firebase Database
      await addDoc(collection(db, 'enquiries'), {
        ...formData,
        tourId: tourDetails.id,
        tourTitle: tourDetails.title,
        createdAt: serverTimestamp()
      });

      // 2. Send Email via EmailJS
      const templateParams = {
        user_name: formData.name,
        user_phone: formData.phone,
        user_email: formData.email,
        tour_title: tourDetails.title,
        message: formData.message
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, 
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, 
        templateParams, 
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setSuccess(true);
      setFormData({ name: '', phone: '', email: '', message: '' });
      
      // Close modal after 2 seconds
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);

    } catch (error) {
      console.error("Error submitting enquiry:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-slate-900 font-bold text-xl">&times;</button>
        
        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Enquire Now</h2>
        <p className="text-gray-500 text-sm mb-6 font-medium">Interested in <strong className="text-slate-800">{tourDetails?.title}</strong>? Leave your details below.</p>
        
        {success ? (
          <div className="bg-green-50 text-green-700 p-4 rounded-xl text-center font-bold">
            Request sent successfully! We will contact you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm font-medium" />
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm font-medium" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm font-medium" />
            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Any specific requirements? (Optional)" rows="3" className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm font-medium"></textarea>
            
            <button type="submit" disabled={isSubmitting} className={`w-full text-white font-black py-4 rounded-xl transition shadow-lg text-lg ${isSubmitting ? 'bg-orange-300' : 'bg-orange-500 hover:bg-orange-600'}`}>
              {isSubmitting ? 'Sending...' : 'Submit Enquiry'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EnquireModal;