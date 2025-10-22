import React, { useEffect, useState, useContext } from "react";
import { LoaderCircle, Edit, Trash2, X, Save, Image, DollarSign, MapPin, Tag, Globe, Building, FileText } from "lucide-react";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MyServices = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);
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
  });

  const API = "http://localhost:3000";
  const MySwal = withReactContent(Swal);

  // Fetch user services
  const fetchServices = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}/services`);
      const data = await res.json();
      const myServices = data.filter((s) => s.email === user.email);
      setServices(myServices);
    } catch (err) {
      console.error(err);
      MySwal.fire({
        title: "Error",
        text: "Failed to fetch services",
        icon: "error",
        background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#fff",
        color: document.documentElement.classList.contains("dark") ? "#fff" : "#000",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [user]);

  // Delete service
  const handleDelete = async (id) => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete Service",
      cancelButtonText: "Cancel",
      background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#fff",
      color: document.documentElement.classList.contains("dark") ? "#fff" : "#000",
      customClass: { 
        popup: "rounded-xl border border-gray-200 dark:border-gray-700",
        confirmButton: "px-4 py-2 rounded-lg",
        cancelButton: "px-4 py-2 rounded-lg"
      },
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`${API}/services/${id}`, { method: "DELETE" });
        const data = await res.json();
        if (res.ok) {
          setServices(services.filter((s) => s._id !== id));
          MySwal.fire({
            title: "Deleted!",
            text: data.message || "Service has been deleted.",
            icon: "success",
            background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#fff",
            color: document.documentElement.classList.contains("dark") ? "#fff" : "#000",
          });
        } else {
          throw new Error(data.error || "Failed to delete service");
        }
      } catch (err) {
        MySwal.fire({
          title: "Error",
          text: err.message || "Something went wrong",
          icon: "error",
          background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#fff",
          color: document.documentElement.classList.contains("dark") ? "#fff" : "#000",
        });
      }
    }
  };

  // Edit service
  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      ...service,
      price: service.price?.toString() || "",
      tags: service.tags?.join(", ") || "",
    });
  };

  // Update service
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingService) return;

    const updatedService = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      tags: formData.tags.split(",").map((t) => t.trim()).filter(t => t),
    };

    try {
      const res = await fetch(`${API}/services/${editingService._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedService),
      });
      const data = await res.json();
      if (res.ok) {
        setServices(
          services.map((s) =>
            s._id === editingService._id ? { ...s, ...updatedService } : s
          )
        );
        setEditingService(null);
        MySwal.fire({
          title: "Success!",
          text: data.message || "Service updated successfully!",
          icon: "success",
          background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#fff",
          color: document.documentElement.classList.contains("dark") ? "#fff" : "#000",
        });
      } else {
        throw new Error(data.error || "Failed to update service");
      }
    } catch (err) {
      MySwal.fire({
        title: "Error",
        text: err.message || "Something went wrong",
        icon: "error",
        background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#fff",
        color: document.documentElement.classList.contains("dark") ? "#fff" : "#000",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Field configuration with icons and types
  const fieldConfig = {
    serviceImage: { icon: Image, type: "url", placeholder: "https://example.com/image.jpg" },
    serviceTitle: { icon: FileText, type: "text", placeholder: "Enter service title" },
    companyName: { icon: Building, type: "text", placeholder: "Enter company name" },
    website: { icon: Globe, type: "url", placeholder: "https://example.com" },
    category: { icon: Tag, type: "text", placeholder: "e.g., Web Development, Design" },
    price: { icon: DollarSign, type: "number", placeholder: "0.00" },
    location: { icon: MapPin, type: "text", placeholder: "Enter location" },
    tags: { icon: Tag, type: "text", placeholder: "tag1, tag2, tag3" },
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Please log in to view your services
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
        <div className="text-center">
          <LoaderCircle size={60} className="animate-spin text-indigo-600 mx-auto" />
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading your services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Services
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and update your service listings
          </p>
        </div>

        {/* Services Table */}
        {services.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Edit className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No services yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                You haven't created any service listings. Start by adding your first service.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {services.map((service) => (
                    <tr 
                      key={service._id} 
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={service.serviceImage}
                            alt={service.serviceTitle}
                            className="w-10 h-10 rounded-lg object-cover bg-gray-100 dark:bg-gray-600"
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(service.serviceTitle)}&background=6366f1&color=fff`;
                            }}
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-xs">
                              {service.serviceTitle}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900 dark:text-white">
                          {service.companyName}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {service.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          ${Number(service.price || 0).toFixed(2)}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEdit(service)}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                          >
                            <Edit className="w-4 h-4 mr-1.5" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(service._id)}
                            className="inline-flex items-center px-3 py-1.5 border border-red-200 dark:border-red-800 text-sm font-medium rounded-lg text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4 mr-1.5" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Enhanced Edit Modal */}
        {editingService && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl shadow-2xl border border-gray-300 dark:border-gray-600 transition-all duration-300 transform scale-100">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-t-2xl">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Edit Service
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Update your service information
                  </p>
                </div>
                <button
                  onClick={() => setEditingService(null)}
                  className="p-2 hover:bg-white dark:hover:bg-gray-600 rounded-xl transition-colors duration-200 group"
                >
                  <X className="w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleUpdate} className="p-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Regular Input Fields */}
                  {Object.entries(fieldConfig).map(([key, config]) => {
                    const IconComponent = config.icon;
                    return (
                      <div key={key} className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <IconComponent className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type={config.type}
                            name={key}
                            value={formData[key]}
                            onChange={handleInputChange}
                            placeholder={config.placeholder}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                            required
                          />
                        </div>
                      </div>
                    );
                  })}

                  {/* Description Field - Full Width */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Description
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 pointer-events-none">
                        <FileText className="h-5 w-5 text-gray-400" />
                      </div>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter detailed service description..."
                        rows={5}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Enhanced Modal Actions */}
                <div className="flex justify-end space-x-4 pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => setEditingService(null)}
                    className="px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 border border-transparent rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyServices;