import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import ClipLoader from "react-spinners/ClipLoader";

const ServiceDetails = () => {
  const { id } = useParams(); // URL থেকে ID নেবে
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/services/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setService(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader size={60} color={"#2563eb"} loading={loading} />
    </div>
  );

  if (!service) return <p className="text-center mt-10">Service not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
      >
        Back
      </button>
      <img
        src={service.serviceImage}
        alt={service.serviceTitle}
        className="w-full h-64 object-cover rounded"
      />
      <h1 className="text-3xl font-bold my-4">{service.serviceTitle}</h1>
      <p><strong>Company:</strong> {service.companyName}</p>
      <p><strong>Category:</strong> {service.category}</p>
      <p><strong>Price:</strong> ${service.price}</p>
      <p><strong>Website:</strong> <a href={service.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{service.website}</a></p>
      <p><strong>Location:</strong> {service.location}</p>
      <p><strong>Tags:</strong> {service.tags.join(", ")}</p>
      <p className="mt-4">{service.description}</p>
    </div>
  );
};

export default ServiceDetails;
