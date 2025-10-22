import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import ClipLoader from "react-spinners/ClipLoader";
import { AuthContext } from "../../Context/AuthContext";
import { AiFillStar, AiOutlineStar, AiOutlineLink } from "react-icons/ai";
import { FaBookmark, FaRegBookmark, FaMapMarkerAlt, FaTag } from "react-icons/fa";
import toast from 'react-hot-toast'; // 💡 এই লাইনটি যুক্ত করা হয়েছে

// Component for rendering a rating visually
const RatingDisplay = ({ rating, size = "text-xl" }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) =>
      i < rating ? (
        <AiFillStar key={i} className={`text-yellow-500 ${size}`} />
      ) : (
        <AiOutlineStar key={i} className={`text-gray-300 dark:text-gray-500 ${size}`} />
      )
    )}
  </div>
);

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [bookmarked, setBookmarked] = useState(false);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [reviewLoading, setReviewLoading] = useState(false);

  // Fetch reviews
  const fetchReviews = () => {
    fetch(`http://localhost:3000/reviews?serviceId=${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error(err));
  };

  // Fetch service & check bookmark status
  useEffect(() => {
    const fetchData = async () => {
      try {
        const serviceRes = await fetch(`http://localhost:3000/services/${id}`);
        const serviceData = await serviceRes.json();
        setService(serviceData);
        
        // Check bookmark only if user is logged in
        if (user) {
          const bookmarkRes = await fetch(`http://localhost:3000/bookmarks?serviceId=${id}&userEmail=${user.email}`);
          if (bookmarkRes.ok) {
            const bookmarks = await bookmarkRes.json();
            setBookmarked(bookmarks.length > 0);
          }
        }
        setLoading(false);
        fetchReviews();
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load service details."); // 💡 নোটিফিকেশন যুক্ত
        setLoading(false);
      }
    };
    fetchData();
  }, [id, user]);

  const handleBookmark = async () => {
    if (!user) return toast.error("Please log in to bookmark"); // 💡 নোটিফিকেশন যুক্ত

    try {
      const method = bookmarked ? "DELETE" : "POST";
      const endpoint = bookmarked 
        ? `http://localhost:3000/bookmarks?serviceId=${service._id}&userEmail=${user.email}` 
        : "http://localhost:3000/bookmarks";

      const res = await fetch(endpoint, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: method === "POST" ? JSON.stringify({ serviceId: service._id, userEmail: user.email }) : undefined,
      });

      if (res.ok) {
        setBookmarked(!bookmarked);
        // 💡 নোটিফিকেশন যুক্ত
        toast.success(bookmarked ? "Bookmark removed!" : "Bookmarked successfully!"); 
      } else {
        const data = await res.json();
        // 💡 নোটিফিকেশন যুক্ত
        toast.error(data.message || (bookmarked ? "Failed to remove bookmark" : "Failed to bookmark"));
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong with bookmarking."); // 💡 নোটিফিকেশন যুক্ত
    }
  };
const handleSubmitReview = async () => {
  if (!user) return toast.error("Please log in to submit a review");
  if (!newReview.trim()) return toast.error("Review cannot be empty");
  if (newRating === 0) return toast.error("Please select a rating");

  setReviewLoading(true);
  try {
    const res = await fetch("http://localhost:3000/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceId: id,
        user: user.displayName || user.email,
        userEmail: user.email,
        serviceTitle: service.serviceTitle, // ✅ Add this line
        comment: newReview,
        rating: newRating,
       
      }),
    });

    if (res.ok) {
      fetchReviews();
      setNewReview("");
      setNewRating(0);
      toast.success("Review submitted successfully!");
    } else {
      const data = await res.json();
      toast.error(data.message || "Failed to submit review");
    }
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong while submitting review.");
  } finally {
    setReviewLoading(false);
  }
};




  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
        <ClipLoader size={60} color="#3b82f6" loading={loading} />
      </div>
    );

  if (!service) return <p className="text-center mt-10 dark:text-gray-300">Service not found</p>;

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;
      
  const ratingDistribution = [1, 2, 3, 4, 5].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length
  })).reverse();
  const maxReviews = Math.max(...ratingDistribution.map(d => d.count), 1);


  return (
    // Outer container with Dark Mode BG
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          // Back Button Style
          className="mb-6 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full transition text-gray-800 dark:text-gray-200 font-medium"
        >
          &larr; Back to Services
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 lg:p-12">
          
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left: Image & Primary Info */}
            <div className="lg:w-7/12">
              <img
                src={service.serviceImage}
                alt={service.serviceTitle}
                className="w-full h-96 object-cover rounded-xl shadow-xl mb-6"
              />
              
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                {service.serviceTitle}
              </h1>
              <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4">
                ${service.price}
              </p>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 border-l-4 border-blue-500 pl-4">
                {service.description}
              </p>

              {/* Company & Meta Data */}
              <div className="space-y-2 text-gray-600 dark:text-gray-400">
                <p className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">Company:</span> {service.companyName}
                </p>
                <p className="flex items-center gap-2">
                  <FaTag className="text-purple-500 w-4 h-4"/> 
                  <span className="font-semibold text-gray-800 dark:text-gray-200">Category:</span> {service.category}
                </p>
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500 w-4 h-4"/>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">Location:</span> {service.location}
                </p>
                <p className="flex items-center gap-2">
                  <AiOutlineLink className="text-green-500 w-4 h-4"/>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">Website:</span>{" "}
                  <a
                    href={service.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300 transition underline"
                  >
                    Visit Site
                  </a>
                </p>
              </div>
            </div>

            {/* Right: Rating & Actions */}
            <div className="lg:w-5/12 p-6 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-inner flex flex-col items-start lg:items-center">
              
              {/* Average Rating Block */}
              <div className="mb-6 text-center w-full">
                <p className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
                  {averageRating.toFixed(1)} / 5
                </p>
                <RatingDisplay rating={averageRating} size="text-2xl" />
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Based on {reviews.length} reviews
                </p>
              </div>

              {/* Rating Distribution (Advanced Feature) */}
              <div className="w-full mb-6">
                {ratingDistribution.map((d, i) => (
                    <div key={i} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="w-2">{d.star}</span>
                        <AiFillStar className="text-yellow-500 w-4 h-4" />
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div 
                                className="bg-blue-500 h-2 rounded-full" 
                                style={{ width: `${(d.count / maxReviews) * 100}%` }}
                            ></div>
                        </div>
                        <span className="w-8 text-right text-xs">({d.count})</span>
                    </div>
                ))}
              </div>

              {/* Bookmark Button */}
              <button
                onClick={handleBookmark}
                className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                  bookmarked
                    ? "bg-yellow-500 text-white hover:bg-yellow-600"
                    : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                }`}
              >
                {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
                {bookmarked ? "Bookmarked" : "Add to Bookmarks"}
              </button>
            </div>
          </div>
          
          <hr className="my-10 border-gray-200 dark:border-gray-700" />
          
          {/* Review Section */}
          <div className="flex flex-col lg:flex-row gap-10">
              
              {/* Left: Review List */}
              <div className="lg:w-7/12">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Customer Reviews ({reviews.length})</h2>
                  {reviews.length === 0 && (
                      <p className="text-gray-500 dark:text-gray-400">No reviews yet. Be the first!</p>
                  )}
                  <div className="space-y-4">
                      {reviews.map((review) => (
  <div
    key={review._id}
    className="p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 transition hover:shadow-lg"
  >
    <div className="flex justify-between items-start mb-2">
      <div>
        <p className="font-semibold text-gray-800 dark:text-gray-200">{review.user}</p>
        {/* Show service name here */}
        <p className="text-sm text-gray-500 dark:text-gray-400">Service: {review.serviceTitle}</p>
      </div>
      <div className="flex">
        {[...Array(5)].map((_, i) =>
          i < review.rating ? (
            <AiFillStar key={i} className="text-yellow-500 w-5 h-5" />
          ) : (
            <AiOutlineStar key={i} className="text-gray-300 dark:text-gray-500 w-5 h-5" />
          )
        )}
      </div>
    </div>

    <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
    <p className="text-gray-400 text-xs mt-1">{new Date(review.date).toLocaleString()}</p>

    {/* Edit & Delete buttons remain same */}
  </div>
))}
                  </div>
              </div>

              {/* Right: Add Review Form */}
              <div className="lg:w-5/12">
                  {user ? (
                      <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 sticky top-20">
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Write a Review</h3>
                          
                          <div className="mb-4">
                              <span className="mr-2 font-medium text-gray-700 dark:text-gray-300">Your Rating:</span>
                              <div className="flex gap-1">
                                  {[...Array(5)].map((_, i) => (
                                      <button
                                          key={i}
                                          type="button"
                                          onClick={() => setNewRating(i + 1)}
                                          disabled={reviewLoading}
                                          className="transition-colors"
                                      >
                                          {i < newRating ? (
                                              <AiFillStar className="text-yellow-500 text-3xl" />
                                          ) : (
                                              <AiOutlineStar className="text-gray-400 dark:text-gray-500 text-3xl hover:text-yellow-400" />
                                          )}
                                      </button>
                                  ))}
                              </div>
                          </div>
                          
                          <textarea
                              rows={4}
                              value={newReview}
                              onChange={(e) => setNewReview(e.target.value)}
                              placeholder="Share your experience and thoughts about this service..."
                              // Textarea Style
                              className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg mb-4 resize-none 
                                dark:bg-gray-800 dark:text-white placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 transition"
                              disabled={reviewLoading}
                          />
                          
                          <button
                              onClick={handleSubmitReview}
                              disabled={reviewLoading || !newReview.trim() || newRating === 0}
                              // Submit Button Style
                              className={`w-full py-3 font-semibold rounded-xl transition-all ${
                                  reviewLoading || !newReview.trim() || newRating === 0
                                      ? "bg-gray-400 cursor-not-allowed"
                                      : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                              }`}
                          >
                              {reviewLoading ? "Submitting..." : "Submit Review"}
                          </button>
                      </div>
                  ) : (
                      <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl text-center shadow-lg border border-gray-200 dark:border-gray-600 sticky top-20">
                           <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Join the conversation</h3>
                           <p className="text-gray-600 dark:text-gray-300 mb-4">Log in to leave a review and manage your bookmarks.</p>
                           <button 
                               onClick={() => navigate('/login')}
                               className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition font-semibold"
                           >
                               Login / Sign Up
                           </button>
                      </div>
                  )}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;