import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../firebase';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '', duration: '', rating: '', price: '', image: '', description: ''
  });

  // Fetch all packages from Firestore
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

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // Handle Create, Update, and Image Upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    
    let imageUrl = formData.image; // Keep existing image if no new file is selected

    try {
      // 1. If a new file was selected, upload it to Storage first
      if (imageFile) {
        // Create a unique file name using the current timestamp
        const imageRef = ref(storage, `packages/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        // Get the live URL for the uploaded image
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      // 2. Attach the URL to our final data object
      const finalData = { ...formData, image: imageUrl };

      // 3. Save to Firestore database
      if (isEditing) {
        await updateDoc(doc(db, 'packages', currentId), finalData);
      } else {
        await addDoc(collection(db, 'packages'), finalData);
      }

      // 4. Reset Form
      setFormData({ title: '', duration: '', rating: '', price: '', image: '', description: '' });
      setImageFile(null);
      setIsEditing(false);
      setCurrentId(null);
      document.getElementById('image-upload').value = ''; // Clear the file input visually
      fetchPackages();

    } catch (error) {
      console.error("Error saving package:", error);
      alert("An error occurred while saving. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // Populate the form when Edit is clicked
  const handleEdit = (pkg) => {
    setIsEditing(true);
    setCurrentId(pkg.id);
    setImageFile(null); // Clear any pending uploads
    document.getElementById('image-upload').value = '';
    
    setFormData({
      title: pkg.title || '', 
      duration: pkg.duration || '', 
      rating: pkg.rating || '', 
      price: pkg.price || '', 
      image: pkg.image || '', 
      description: pkg.description || ''
    });
  };

  // Delete a document
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
          <button 
            onClick={handleLogout}
            className="bg-red-50 text-red-600 px-6 py-2.5 rounded-lg font-bold hover:bg-red-100 transition"
          >
            Log Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit">
            <h2 className="text-xl font-bold text-slate-800 mb-6">{isEditing ? 'Edit Package' : 'Add New Package'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Tour Title" required className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm font-medium" />
              <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration (e.g. 5 Nights & 6 Days)" required className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm font-medium" />
              <div className="flex gap-4">
                <input type="text" name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating (e.g. 4.8)" required className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm font-medium" />
                <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="Price (e.g. 22,500)" required className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm font-medium" />
              </div>
              
              {/* Image Upload Input */}
              <div>
                <input 
                  type="file" 
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageChange} 
                  className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm font-medium file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
                  required={!isEditing && !formData.image} 
                />
                {isEditing && formData.image && !imageFile && (
                  <p className="text-xs text-green-600 font-bold mt-2">Current image saved. Upload a new one to replace.</p>
                )}
              </div>

              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Tour Description" rows="3" required className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm font-medium"></textarea>
              
              <button 
                type="submit" 
                disabled={isUploading}
                className={`w-full font-bold py-3 rounded-xl transition text-white ${isUploading ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-slate-800'}`}
              >
                {isUploading ? 'Uploading & Saving...' : (isEditing ? 'Update Package' : 'Save Package')}
              </button>
              
              {isEditing && (
                <button 
                  type="button" 
                  disabled={isUploading}
                  onClick={() => { 
                    setIsEditing(false); 
                    setFormData({ title: '', duration: '', rating: '', price: '', image: '', description: '' }); 
                    setImageFile(null); 
                    document.getElementById('image-upload').value = ''; 
                  }} 
                  className="w-full mt-2 bg-gray-100 text-slate-700 font-bold py-3 rounded-xl hover:bg-gray-200 transition"
                >
                  Cancel Edit
                </button>
              )}
            </form>
          </div>

          {/* Table Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
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
                            <div className="text-xs text-gray-500 font-medium mt-1">{pkg.duration}</div>
                          </div>
                        </td>
                        <td className="py-4 font-bold text-slate-700">₹{pkg.price}</td>
                        <td className="py-4">
                          <button onClick={() => handleEdit(pkg)} className="text-blue-600 font-bold text-sm mr-4 hover:underline">Edit</button>
                          <button onClick={() => handleDelete(pkg.id)} className="text-red-600 font-bold text-sm hover:underline">Delete</button>
                        </td>
                      </tr>
                    ))}
                    {packages.length === 0 && (
                      <tr>
                        <td colSpan="3" className="py-8 text-center text-gray-500 font-medium">No packages found. Add one to get started!</td>
                      </tr>
                    )}
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