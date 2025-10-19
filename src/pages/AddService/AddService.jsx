import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";

const AddService = () => {
  const { user } = useContext(AuthContext); // get logged-in user info
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
    email: "", // user email
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Set email from logged-in user
  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({ ...prev, email: user.email }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("http://localhost:3000/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          tags: formData.tags.split(",").map((tag) => tag.trim()),
        }),
      });

      if (res.ok) {
        setSuccessMsg("✅ Service added successfully!");
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
          email: user.email,
        });
      } else {
        setErrorMsg("❌ Failed to add service. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          ➕ Add New Service
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email (read-only) */}
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="border p-3 rounded-lg w-full focus:ring focus:ring-blue-300 bg-gray-200"
          />

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="serviceImage"
              placeholder="Service Image URL"
              value={formData.serviceImage}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg w-full focus:ring focus:ring-blue-300"
            />
            <input
              type="text"
              name="serviceTitle"
              placeholder="Service Title"
              value={formData.serviceTitle}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg w-full focus:ring focus:ring-blue-300"
            />
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg w-full focus:ring focus:ring-blue-300"
            />
            <input
              type="url"
              name="website"
              placeholder="Company Website"
              value={formData.website}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg w-full focus:ring focus:ring-blue-300"
            />
          </div>

          <textarea
            name="description"
            placeholder="Service Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="border p-3 rounded-lg w-full focus:ring focus:ring-blue-300 h-24"
          />

          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              name="category"
              placeholder="Category (e.g., Web Development)"
              value={formData.category}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg w-full focus:ring focus:ring-blue-300"
            />
            <input
              type="number"
              name="price"
              placeholder="Price ($)"
              value={formData.price}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg w-full focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="location"
              placeholder="Location (e.g., New York, USA)"
              value={formData.location}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg w-full focus:ring focus:ring-blue-300"
            />
            <input
              type="text"
              name="tags"
              placeholder="Tags (comma separated, e.g. web, design, UI)"
              value={formData.tags}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg w-full focus:ring focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
          >
            {loading ? "Adding..." : "Add Service"}
          </button>
        </form>

        {successMsg && (
          <p className="mt-4 text-green-600 text-center font-semibold">
            {successMsg}
          </p>
        )}
        {errorMsg && (
          <p className="mt-4 text-red-600 text-center font-semibold">
            {errorMsg}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddService;
