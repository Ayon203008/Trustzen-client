import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const categories = [
  "Web Development",
  "Digital Marketing",
  "App Development",
  "Design",
  "Writing & Translation",
  "Video & Animation",
  "Social Media",
  "Photography",
  "IT Services",
  "Cybersecurity",
];

const AddService = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    serviceImage: "",
    serviceTitle: "",
    companyName: "",
    website: "",
    description: "",
    category: "",
    price: "",
    location: "",
    tags: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const API = "http://localhost:3000";
  const MySwal = withReactContent(Swal);

  // Auto-set email if user is logged in
  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({ ...prev, email: user.email }));
    }
  }, [user]);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Image file handler with preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        MySwal.fire("Error", "Please select a valid image file!", "error");
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        MySwal.fire("Error", "Image size should be less than 5MB!", "error");
        return;
      }

      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image preview
  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
  };

  // Upload image to ImgBB
  const uploadImageToImgBB = async (file) => {
    const toastId = MySwal.fire({
      title: "Uploading image...",
      text: "Please wait while we upload your image",
      didOpen: () => MySwal.showLoading(),
      allowOutsideClick: false,
      background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#fff",
      color: document.documentElement.classList.contains("dark") ? "#fff" : "#000",
      showConfirmButton: false,
    });

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=f1bf752da76b5f29accb86a509bc97bd`,
        { method: "POST", body: formData }
      );

      const data = await res.json();
      MySwal.close();

      if (data.success) {
        return data.data.url;
      } else {
        throw new Error(data.error?.message || "Image upload failed");
      }
    } catch (err) {
      MySwal.fire("Error", "Image upload failed!", "error");
      throw err;
    }
  };

  // Form validation
  const validateForm = () => {
    const requiredFields = ['serviceTitle', 'description', 'price', 'category', 'location'];
    const missingFields = requiredFields.filter(field => !formData[field].trim());
    
    if (missingFields.length > 0) {
      MySwal.fire("Error", "Please fill all required fields!", "error");
      return false;
    }
    
    if (!imageFile) {
      MySwal.fire("Error", "Please upload a service image!", "error");
      return false;
    }

    if (formData.price && parseFloat(formData.price) <= 0) {
      MySwal.fire("Error", "Price must be greater than 0!", "error");
      return false;
    }

    return true;
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      serviceImage: "",
      serviceTitle: "",
      companyName: "",
      website: "",
      description: "",
      category: "",
      price: "",
      location: "",
      tags: "",
      email: user?.email || "",
    });
    setImageFile(null);
    setImagePreview("");
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      // 1️⃣ Upload image
      const imageURL = await uploadImageToImgBB(imageFile);

      // 2️⃣ Prepare service data
      const newService = {
        ...formData,
        serviceImage: imageURL,
        tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()).filter(t => t) : [],
        price: parseFloat(formData.price),
        createdAt: new Date().toISOString(),
      };

      // 3️⃣ Send to backend
      const res = await fetch(`${API}/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newService),
      });

      const data = await res.json();

      if (res.ok) {
        MySwal.fire({
          icon: "success",
          title: "✅ Service Added Successfully!",
          text: "Your service is now live and visible to clients.",
          background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#fff",
          color: document.documentElement.classList.contains("dark") ? "#fff" : "#000",
          confirmButtonColor: "#4f46e5",
        });

        resetForm();
      } else {
        throw new Error(data.error || "Failed to add service");
      }
    } catch (err) {
      console.error("Service submission error:", err);
      MySwal.fire({
        icon: "error",
        title: "Submission Failed",
        text: err.message || "Something went wrong! Please try again.",
        background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#fff",
        color: document.documentElement.classList.contains("dark") ? "#fff" : "#000",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Add New Service
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Showcase your expertise and reach new clients
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* User Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Your Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 cursor-not-allowed focus:outline-none transition-colors"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  This email will be used for client communications
                </p>
              </div>

              {/* Basic Information Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    name="serviceTitle"
                    placeholder="e.g., Professional Web Design"
                    value={formData.serviceTitle}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Your company name"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200 transition-all"
                  />
                </div>
              </div>

              {/* Website & Image Upload */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Company Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    placeholder="https://example.com"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Service Image *
                  </label>
                  <div className="space-y-3">
                    {!imagePreview ? (
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center transition-colors hover:border-indigo-400">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          required
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="cursor-pointer block"
                        >
                          <div className="text-gray-400 mb-2">
                            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Click to upload service image
                          </span>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP up to 5MB</p>
                        </label>
                      </div>
                    ) : (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Service preview"
                          className="w-full h-32 object-cover rounded-xl border border-gray-300 dark:border-gray-600"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Service Description *
                </label>
                <textarea
                  name="description"
                  placeholder="Describe your service in detail. What makes it special? What problems does it solve?"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200 resize-none transition-all"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {formData.description.length}/500 characters
                </p>
              </div>

              {/* Category, Price & Location */}
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200 transition-all"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Price ($) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      name="price"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200 transition-all"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  placeholder="web design, responsive, modern, etc. (separate with commas)"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200 transition-all"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Add relevant tags to help clients find your service
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                    loading
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Adding Service...</span>
                    </div>
                  ) : (
                    "🚀 Publish Service"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Help Text */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            All fields marked with * are required. Your service will be reviewed before going live.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddService;