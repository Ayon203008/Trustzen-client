import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import ClipLoader from "react-spinners/ClipLoader";
import { AuthContext } from "../../Context/AuthContext";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [reviewLoading, setReviewLoading] = useState(false);

  // Fetch service
  useEffect(() => {
    fetch(`http://localhost:3000/services/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setService(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Fetch reviews
  const fetchReviews = () => {
    fetch(`http://localhost:3000/reviews?serviceId=${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  const handleSubmitReview = async () => {
    if (!user) return alert("Please log in to submit a review");
    if (!newReview.trim()) return alert("Review cannot be empty");
    if (newRating === 0) return alert("Please select a rating");

    setReviewLoading(true);
    try {
      const res = await fetch("http://localhost:3000/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: id,
          user: user.name || user.email,
          comment: newReview,
          rating: newRating,
        }),
      });

      if (res.ok) {
        const savedReview = await res.json();
        // Re-fetch reviews to update average rating and colors
        fetchReviews();
        setNewReview("");
        setNewRating(0);
      } else {
        alert("Failed to submit review");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={60} color="#2563eb" loading={loading} />
      </div>
    );

  if (!service) return <p className="text-center mt-10">Service not found</p>;

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-xl">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition"
      >
        &larr; Back
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <img
            src={service.serviceImage}
            alt={service.serviceTitle}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="lg:w-1/2 flex flex-col gap-4">
          <h1 className="text-4xl font-bold">{service.serviceTitle}</h1>
          <p className="text-gray-700">{service.description}</p>
          <p className="text-blue-600 text-2xl font-semibold">${service.price}</p>
          <p className="text-gray-500"><strong>Company:</strong> {service.companyName}</p>
          <p className="text-gray-500"><strong>Category:</strong> {service.category}</p>
          <p className="text-gray-500"><strong>Location:</strong> {service.location}</p>
          <p className="text-gray-500"><strong>Website:</strong> <a href={service.website} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">{service.website}</a></p>
          <p className="text-gray-500"><strong>Tags:</strong> {service.tags.join(", ")}</p>

          {/* Average Rating */}
          <div className="flex items-center gap-2 mt-4">
            <span className="text-lg font-semibold">Average Rating:</span>
            <div className="flex">
              {[...Array(5)].map((_, i) =>
                i < Math.round(averageRating)
                  ? <AiFillStar key={i} className="text-yellow-400" />
                  : <AiOutlineStar key={i} className="text-gray-300" />
              )}
            </div>
            <span className="text-gray-500 ml-2">({reviews.length} reviews)</span>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-4">Customer Reviews</h2>
        {reviews.length === 0 && <p className="text-gray-500">No reviews yet. Be the first!</p>}
        <div className="space-y-4 mb-6">
          {reviews.map((review, idx) => (
            <div key={idx} className="p-4 border-l-4 border-blue-500 rounded-lg bg-gray-50 shadow-sm">
              <div className="flex items-center gap-2">
                <p className="font-semibold">{review.user}</p>
                <div className="flex">
                  {[...Array(5)].map((_, i) =>
                    i < review.rating
                      ? <AiFillStar key={i} className="text-yellow-400" />
                      : <AiOutlineStar key={i} className="text-gray-300" />
                  )}
                </div>
              </div>
              <p className="mt-2">{review.comment}</p>
              <p className="text-gray-400 text-sm mt-1">{review.date ? new Date(review.date).toLocaleString() : "Just now"}</p>
            </div>
          ))}
        </div>

        {/* Add Review */}
        {user && (
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-2xl font-semibold mb-4">Write a Review</h3>
            <div className="flex items-center mb-2">
              <span className="mr-2">Your Rating:</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setNewRating(i + 1)}
                    disabled={reviewLoading} // Disable while submitting
                  >
                    {i < newRating
                      ? <AiFillStar className="text-yellow-400 text-2xl" />
                      : <AiOutlineStar className="text-gray-300 text-2xl" />
                    }
                  </button>
                ))}
              </div>
            </div>
            <textarea
              rows={4}
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Write your review..."
              className="w-full border p-3 rounded-lg mb-4"
              disabled={reviewLoading} // Disable while submitting
            />
            <button
              onClick={handleSubmitReview}
              disabled={reviewLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {reviewLoading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        )}
        {!user && <p className="text-gray-500 mt-2">Log in to leave a review.</p>}
      </div>
    </div>
  );
};

export default ServiceDetails;
