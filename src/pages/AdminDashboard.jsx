import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Notice storage is removed
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '', duration: '', rating: '', price: '', image: '', description: '', itinerary: []
  });

  const fetchPackages = async () => {
    setIsLoading(true);
    const querySnapshot = await getDocs(collection(db, 'packages'));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPackages(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- Dynamic Itinerary Handlers ---
  const handleAddDay = () => {
    setFormData({
      ...formData,
      itinerary: [...formData.itinerary, { dayTitle: '', activities: '' }]
    });
  };

  const handleItineraryChange = (index, field, value) => {
    const newItinerary = [...formData.itinerary];
    newItinerary[index][field] = value;
    setFormData({ ...formData, itinerary: newItinerary });
  };

  const handleRemoveDay = (index) => {
    const newItinerary = formData.itinerary.filter((_, i) => i !== index);
    setFormData({ ...formData, itinerary: newItinerary });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (isEditing) {
        await updateDoc(doc(db, 'packages', currentId), formData);
      } else {
        await addDoc(collection(db, 'packages'), formData);
      }

      setFormData({ title: '', duration: '', rating: '', price: '', image: '', description: '', itinerary: [] });
      setIsEditing(false);
      setCurrentId(null);
      fetchPackages();

    } catch (error) {
      console.error("Error saving package:", error);
      alert("An error occurred while saving. Please check your Firestore rules.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (pkg) => {
    setIsEditing(true);
    setCurrentId(pkg.id);
    
    setFormData({
      title: pkg.title || '', 
      duration: pkg.duration || '', 
      rating: pkg.rating || '', 
      price: pkg.price || '', 
      image: pkg.image || '', 
      description: pkg.description || '',
      itinerary: pkg.itinerary || []
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      await deleteDoc(doc(db, 'packages', id));
      fetchPackages();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Dashboard</h1>
            <p className="text-gray-500 font-medium mt-1">Manage your tour packages and content.</p>
          </div>
          <button onClick={handleLogout} className="bg-red-50 text-red-600 px-6 py-2.5 rounded-lg font-bold hover:bg-red-100 transition">
            Log Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-slate-800 mb-6">{isEditing ? 'Edit Package' : 'Add New Package'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Tour Title" required className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm font-medium" />
              <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration (e.g. 5 Nights & 6 Days)" required className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm font-medium" />
              <div className="flex gap-4">
                <input type="text" name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating (e.g. 4.8)" required className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm font-medium" />
                <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="Price (e.g. 22,500)" required className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm font-medium" />
              </div>
              
              {/* IMAGE URL FIELD */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Image URL</label>
                <input 
                  type="url" 
                  name="image" 
                  value={formData.image} 
                  onChange={handleChange} 
                  placeholder="Paste direct image link here..." 
                  required 
                  className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm font-medium" 
                />
                <p className="text-xs text-gray-400 mt-2">Upload images to <a href="https://imgbb.com/" target="_blank" rel="noreferrer" className="text-blue-500 underline">ImgBB</a> and paste the link here.</p>
              </div>

              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Tour Description" rows="2" required className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm font-medium"></textarea>
              
              {/* ITINERARY SECTION */}
              <div className="border-t border-gray-100 pt-4 mt-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-800 text-sm">Day-wise Schedule</h3>
                  <button type="button" onClick={handleAddDay} className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full font-bold hover:bg-blue-100 transition">
                    + Add Day
                  </button>
                </div>
                
                {formData.itinerary.map((day, index) => (
                  <div key={index} className="bg-slate-50 p-4 rounded-xl border border-gray-200 mb-3 relative group">
                    <button type="button" onClick={() => handleRemoveDay(index)} className="absolute top-3 right-3 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition">✕</button>
                    <span className="text-xs font-bold text-gray-400 uppercase mb-2 block">Day {index + 1}</span>
                    <input type="text" placeholder="Title (e.g., Arrival in Manali)" value={day.dayTitle} onChange={(e) => handleItineraryChange(index, 'dayTitle', e.target.value)} required className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none mb-2 text-sm font-medium" />
                    <textarea placeholder="Activities and sightseeing details..." value={day.activities} onChange={(e) => handleItineraryChange(index, 'activities', e.target.value)} required rows="2" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none text-sm"></textarea>
                  </div>
                ))}
              </div>

              <button type="submit" disabled={isSaving} className={`w-full font-bold py-3 rounded-xl transition text-white ${isSaving ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-slate-800'}`}>
                {isSaving ? 'Saving Package...' : (isEditing ? 'Update Package' : 'Save Package')}
              </button>
              
              {isEditing && (
                <button type="button" disabled={isSaving} onClick={() => { setIsEditing(false); setFormData({ title: '', duration: '', rating: '', price: '', image: '', description: '', itinerary: [] }); }} className="w-full mt-2 bg-gray-100 text-slate-700 font-bold py-3 rounded-xl hover:bg-gray-200 transition">
                  Cancel Edit
                </button>
              )}
            </form>
          </div>

          {/* Table Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 overflow-hidden h-fit">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Current Packages</h2>
            {isLoading ? (
              <p className="text-gray-500 font-medium">Loading database...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wider">
                      <th className="pb-3 font-bold">Package</th>
                      <th className="pb-3 font-bold">Price</th>
                      <th className="pb-3 font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packages.map((pkg) => (
                      <tr key={pkg.id} className="border-b border-gray-50 hover:bg-slate-50 transition">
                        <td className="py-4 pr-4 flex items-center gap-4">
                          <img src={pkg.image} alt={pkg.title} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                          <div>
                            <div className="font-bold text-slate-900">{pkg.title}</div>
                            <div className="text-xs text-gray-500 font-medium mt-1">{pkg.duration} • {pkg.itinerary?.length || 0} Days</div>
                          </div>
                        </td>
                        <td className="py-4 font-bold text-slate-700">₹{pkg.price}</td>
                        <td className="py-4">
                          <button onClick={() => handleEdit(pkg)} className="text-blue-600 font-bold text-sm mr-4 hover:underline">Edit</button>
                          <button onClick={() => handleDelete(pkg.id)} className="text-red-600 font-bold text-sm hover:underline">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;