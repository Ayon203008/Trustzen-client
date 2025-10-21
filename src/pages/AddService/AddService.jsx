import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";

const AddService = () => {
  const { user } = useContext(AuthContext); // logged-in user
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
  const [imageFile, setImageFile] = useState(null);

  // Set email from logged-in user
  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({ ...prev, email: user.email }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Upload image to ImgBB
  const uploadImageToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", import.meta.env.VITE_IMGBB_API_KEY); // use your .env key

    try {
      const res = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        return data.data.url; // the uploaded image URL
      } else {
        toast.error("❌ Image upload failed");
        return null;
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("❌ Image upload failed");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    if (!imageFile) {
      toast.error("Please upload an image for the service");
      setLoading(false);
      return;
    }

    try {
      toast.loading("Uploading image...");
      const imageURL = await uploadImageToImgBB(imageFile);
      toast.dismiss();

      if (!imageURL) {
        setLoading(false);
        return;
      }

      toast.loading("Adding service...");

      const res = await fetch("http://localhost:3000/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          serviceImage: imageURL,
          price: parseFloat(formData.price),
          tags: formData.tags.split(",").map((tag) => tag.trim()),
        }),
      });

      toast.dismiss();

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
        setImageFile(null);
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
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
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
              placeholder="Category"
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
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg w-full focus:ring focus:ring-blue-300"
            />
          </div>

          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            value={formData.tags}
            onChange={handleChange}
            required
            className="border p-3 rounded-lg w-full focus:ring focus:ring-blue-300"
          />

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
          <p className="mt-4 text-red-600 text-center font-semibold">{errorMsg}</p>
        )}
      </div>
    </div>
  );
};

export default AddService;
