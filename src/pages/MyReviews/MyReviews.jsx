import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import { AiFillStar, AiOutlineStar, AiOutlineEdit, AiOutlineDelete, AiOutlineLogin } from "react-icons/ai";
import { FiMessageSquare, FiCalendar } from "react-icons/fi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [editedRating, setEditedRating] = useState(0);

  const fetchMyReviews = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/reviews?userEmail=${user.email}`);
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load your reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyReviews();
  }, [user]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Delete Review?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff',
      color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
      customClass: {
        popup: "rounded-2xl border border-gray-200 dark:border-gray-700",
        confirmButton: "px-4 py-2 rounded-lg font-medium",
        cancelButton: "px-4 py-2 rounded-lg font-medium"
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:3000/reviews/${id}`, { method: "DELETE" });
          if (res.ok) {
            toast.success("Review deleted successfully!");
            fetchMyReviews();
          } else {
            toast.error("Failed to delete review");
          }
        } catch (err) {
          console.error(err);
          toast.error("Something went wrong");
        }
      }
    });
  };

  const startEditing = (review) => {
    setEditingId(review._id);
    setEditedComment(review.comment);
    setEditedRating(review.rating);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditedComment("");
    setEditedRating(0);
  };

  const handleUpdate = async (id) => {
    if (!editedComment.trim()) return toast.error("Comment cannot be empty");
    if (editedRating === 0) return toast.error("Please select a rating");

    try {
      const res = await fetch(`http://localhost:3000/reviews/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: editedComment, rating: editedRating }),
      });
      if (res.ok) {
        toast.success("Review updated successfully!");
        cancelEditing();
        fetchMyReviews();
      } else {
        toast.error("Failed to update review");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  if (!user)
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 transition-colors duration-300">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <AiOutlineLogin className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Access Required</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please log in to view and manage your reviews
          </p>
          <a
            href="/login"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Login / Sign Up
          </a>
        </div>
      </div>
    );

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center transition-colors duration-300">
        <div className="text-center">
          <ClipLoader size={60} color="#3b82f6" />
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">Loading your reviews...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Reviews
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and edit your service reviews
          </p>
        </div>

        {/* Reviews List */}
        {reviews.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMessageSquare className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No reviews yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                You haven't posted any reviews. Start reviewing services you've used!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-lg"
              >
                {/* Review Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {review.user?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {review.user}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Service: {review.serviceTitle}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Rating Display */}
                  <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-lg">
                    {[...Array(5)].map((_, i) =>
                      i < review.rating ? (
                        <AiFillStar key={i} className="text-yellow-400 w-5 h-5" />
                      ) : (
                        <AiOutlineStar key={i} className="text-gray-300 dark:text-gray-600 w-5 h-5" />
                      )
                    )}
                    <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      {review.rating}.0
                    </span>
                  </div>
                </div>

                {/* Edit Mode */}
                {editingId === review._id ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Your Review
                      </label>
                      <textarea
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                        rows={4}
                        value={editedComment}
                        onChange={(e) => setEditedComment(e.target.value)}
                        placeholder="Share your experience with this service..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Rating
                      </label>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <button 
                            key={i} 
                            type="button" 
                            onClick={() => setEditedRating(i + 1)}
                            className="transform hover:scale-110 transition-transform duration-200"
                          >
                            {i < editedRating ? (
                              <AiFillStar className="text-yellow-400 w-7 h-7" />
                            ) : (
                              <AiOutlineStar className="text-gray-300 dark:text-gray-600 w-7 h-7 hover:text-yellow-400" />
                            )}
                          </button>
                        ))}
                        <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          {editedRating}.0
                        </span>
                      </div>
                    </div>

                    {/* Edit Actions */}
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => handleUpdate(review._id)}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 shadow-sm"
                      >
                        <AiOutlineEdit className="w-4 h-4 mr-2" />
                        Update Review
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="inline-flex items-center px-4 py-2 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Read Mode */
                  <>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {review.comment}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FiCalendar className="w-4 h-4 mr-2" />
                        {new Date(review.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditing(review)}
                          className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 border border-blue-200 dark:border-blue-800 transition-colors duration-200"
                        >
                          <AiOutlineEdit className="w-4 h-4 mr-2" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(review._id)}
                          className="inline-flex items-center px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 font-medium rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 border border-red-200 dark:border-red-800 transition-colors duration-200"
                        >
                          <AiOutlineDelete className="w-4 h-4 mr-2" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviews;