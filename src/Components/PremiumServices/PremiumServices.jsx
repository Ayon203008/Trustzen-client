import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router";

const PremiumServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/premiumServices")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ClipLoader size={50} color="#2563eb" loading={loading} />
      </div>
    );
  }

  return (
    <div className="px-6 py-8 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">Premium Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col justify-between hover:scale-105 hover:shadow-2xl transition"
          >
            <img
              src={service.serviceImage}
              alt={service.serviceTitle}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-xl font-semibold mb-2">{service.serviceTitle}</h3>
                <p className="text-gray-500 mb-1">
                  <strong>Company:</strong> {service.companyName}
                </p>
                <p className="text-gray-500 mb-1">
                  <strong>Price:</strong> ${service.price}
                </p>
              </div>
              <button
                onClick={() => navigate(`/services/${service._id.toString()}`)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition w-full"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumServices;
