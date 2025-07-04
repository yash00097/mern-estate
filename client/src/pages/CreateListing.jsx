import { useState } from "react";
import {useNavigate} from 'react-router-dom';

function CreateListing() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type:"rent",
    bedrooms:1,
    bathrooms:1,
    regularPrice:50,
    discountPrice:0,
    furnished:false,
    offer:false,
    parking:false,
  });
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const cloudinaryUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  
  
  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      setImageUploadError('Please select at least one image');
      return;
    }
    if (files.length > 6) {
      setImageUploadError('Maximum 6 images allowed');
      return;
    }
    try {
      setUploading(true);
      setImageUploadError('');
      const urls= [];
      for (let i = 0; i < files.length; i++) {
        const data = new FormData();
        data.append('file', files[i]);
        data.append('upload_preset', cloudinaryUploadPreset);
        
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
          {
            method: 'POST',
            body: data,
          }
        );

        const result = await response.json(); 
        if (result.error) {
          setImageUploadError('Image upload failed');
          return;
        }  
        urls.push(result.secure_url);        
      }
      setFormData({
        ...formData,
        imageUrls: [...formData.imageUrls, ...urls],
      });
      setFiles([]);
      setImageUploadError('');      
    } catch (error) {
      setImageUploadError(error.message);
    } finally {
      setUploading(false);
    }
  }
  const handleRemoveImage = (index) => {
    const updatedImageUrls = [...formData.imageUrls];
    updatedImageUrls.splice(index, 1);
    setFormData({
      ...formData,
      imageUrls: updatedImageUrls,
    });
  };
const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
    navigate('/', { state: { showAlert: true } });
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-8 text-blue-800 dark:text-blue-300">
        Create a Marvel Listing
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-900 dark:text-white p-3 rounded-lg placeholder-gray-500 dark:placeholder-gray-300"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            placeholder="Description"
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-900 dark:text-white p-3 rounded-lg placeholder-gray-500 dark:placeholder-gray-300"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-900 dark:text-white p-3 rounded-lg placeholder-gray-500 dark:placeholder-gray-300"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />

          <div className="flex gap-6 flex-wrap">
            {[
              { id: "sale", label: "Sell" ,checked: formData.type === 'sale' },
              { id: "rent", label: "Rent" ,checked: formData.type === 'rent'},
              { id: "parking", label: "Parking spot", checked: formData.parking },
              { id: "furnished", label: "Furnished", checked: formData.furnished },
              { id: "offer", label: "Offer", checked: formData.offer },
            ].map((item) => (
              <div key={item.id} className="flex gap-2">
                <input 
                  type="checkbox" 
                  id={item.id} 
                  className="w-5"  
                  onChange={handleChange}
                  checked={item.checked}/>
                <span className="text-gray-900 dark:text-gray-100">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-6">
            {[
              { id: "bedrooms", label: "Beds" },
              { id: "bathrooms", label: "Baths" },
              { id: "regularPrice", label: "Regular price", extra: "($ / month)" },
              { id: "discountPrice", label: "Discounted price", extra: "($ / month)" },
            ].map((field) => (
              <div key={field.id} className="flex items-center gap-2">
                <input
                  type="number"
                  id={field.id}
                  min="1"
                  max="50000"
                  required
                  className="p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg placeholder-gray-500 dark:placeholder-gray-300"
                  onChange={handleChange}
                  value={formData[field.id]}
                />
                <div className="flex flex-col items-center text-gray-900 dark:text-gray-100">
                  <p>{field.label}</p>
                  {field.extra && <span className="text-xs">{field.extra}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold text-gray-900 dark:text-gray-100">
            Images:
            <span className="font-normal text-gray-600 dark:text-gray-400 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>

          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-900 dark:text-white rounded w-full placeholder-gray-500 dark:placeholder-gray-300"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button 
              type="button"
              disabled={files.length === 0 || uploading}
              onClick={handleImageSubmit}
              className="p-3 text-green-700 dark:text-green-400 border border-green-700 dark:border-green-400 rounded uppercase hover:shadow-lg disabled:opacity-80">
              {uploading ? "Uploading..." : "Upload "}
            </button>
          </div>
          <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}

          <button 
            className="p-3 bg-slate-700 dark:bg-slate-800 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 transition"
            disabled={loading|| uploading}
            >
            {loading ? "Creating..." : "Create Listing"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}

export default CreateListing;
