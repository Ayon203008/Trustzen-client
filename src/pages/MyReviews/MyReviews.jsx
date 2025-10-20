import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return setLoading(false);

    // Fetch all reviews for the logged-in user
    fetch(`http://localhost:3000/reviews?user=${encodeURIComponent(user.email)}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  if (!user) return <p className="text-center mt-10">Please log in to see your reviews.</p>;

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={60} color="#2563eb" loading={loading} />
      </div>
    );

  if (reviews.length === 0)
    return <p className="text-center mt-10">You have not submitted any reviews yet.</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">My Reviews</h1>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review._id} className="p-4 border-l-4 border-blue-500 rounded-lg bg-gray-50 shadow-sm">
            <div className="flex items-center gap-4">
              <p className="font-semibold">{review.user}</p>
              <div className="flex">
                {[...Array(5)].map((_, i) =>
                  i < review.rating ? (
                    <AiFillStar key={i} className="text-yellow-400" />
                  ) : (
                    <AiOutlineStar key={i} className="text-gray-300" />
                  )
                )}
              </div>
            </div>
            <p className="mt-2">{review.comment}</p>
            <p className="text-gray-400 text-sm mt-1">
              Reviewed on: {review.date ? new Date(review.date).toLocaleString() : "Just now"}
            </p>
            <p className="text-gray-500 mt-2"><strong>Service:</strong> {review.serviceTitle || "Unknown"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
