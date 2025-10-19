import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const MyServices = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(null); // Update modal state
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

  // Fetch my services
  useEffect(() => {
    if (!user?.email) return;

    const fetchServices = async () => {
      try {
        const res = await fetch(`http://localhost:3000/myServices?email=${user.email}`);
        const data = await res.json();
        setServices(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [user]);

  // Delete service
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetch(`http://localhost:3000/services/${id}`, { method: "DELETE" });
      if (res.ok) {
        setServices(services.filter((s) => s._id !== id));
      } else {
        alert("Failed to delete service");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  // Open modal and fill formData with selected service
  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      serviceImage: service.serviceImage,
      serviceTitle: service.serviceTitle,
      companyName: service.companyName,
      website: service.website,
      description: service.description,
      category: service.category,
      price: service.price,
      location: service.location,
      tags: service.tags.join(", "),
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit updated data
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/services/${editingService._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, price: parseFloat(formData.price), tags: formData.tags.split(",").map(t => t.trim()) }),
      });

      if (res.ok) {
        const updated = await res.json();
        // Update frontend state
        setServices(services.map(s => s._id === editingService._id ? { ...s, ...formData, tags: formData.tags.split(",").map(t => t.trim()) } : s));
        setEditingService(null);
        alert("Service updated successfully!");
      } else {
        alert("Failed to update service");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Services</h2>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Company</th>
            <th className="p-2 border">Website</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Tags</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service._id} className="hover:bg-gray-50">
              <td className="p-2 border">
                <img src={service.serviceImage} alt={service.serviceTitle} className="w-20 h-20 object-cover" />
              </td>
              <td className="p-2 border">{service.serviceTitle}</td>
              <td className="p-2 border">{service.companyName}</td>
              <td className="p-2 border">
                <a href={service.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                  {service.website}
                </a>
              </td>
              <td className="p-2 border">{service.description}</td>
              <td className="p-2 border">{service.category}</td>
              <td className="p-2 border">${service.price}</td>
              <td className="p-2 border">{service.location}</td>
              <td className="p-2 border">{service.tags.join(", ")}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500 text-white"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="bg-red-500 px-2 py-1 rounded hover:bg-red-600 text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {editingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">Update Service</h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input type="text" name="serviceImage" placeholder="Image URL" value={formData.serviceImage} onChange={handleChange} className="border p-2 w-full rounded" required />
              <input type="text" name="serviceTitle" placeholder="Service Title" value={formData.serviceTitle} onChange={handleChange} className="border p-2 w-full rounded" required />
              <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} className="border p-2 w-full rounded" required />
              <input type="url" name="website" placeholder="Website" value={formData.website} onChange={handleChange} className="border p-2 w-full rounded" required />
              <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 w-full rounded" required />
              <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="border p-2 w-full rounded" required />
              <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="border p-2 w-full rounded" required />
              <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="border p-2 w-full rounded" required />
              <input type="text" name="tags" placeholder="Tags (comma separated)" value={formData.tags} onChange={handleChange} className="border p-2 w-full rounded" required />
              <div className="flex justify-end space-x-2 mt-3">
                <button type="button" onClick={() => setEditingService(null)} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyServices;
