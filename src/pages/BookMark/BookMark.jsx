import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router";
import { Star, Trash2, ExternalLink, MapPin, Tag, Calendar } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Bookmark = () => {
  const { user } = useContext(AuthContext);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:3000/bookmarks/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBookmarks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  const handleDelete = async (id, serviceTitle) => {
    const result = await MySwal.fire({
      title: "Remove Bookmark?",
      text: `Are you sure you want to remove "${serviceTitle}" from your bookmarks?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#6366f1",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove it",
      cancelButtonText: "Keep it",
      background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#fff",
      color: document.documentElement.classList.contains("dark") ? "#fff" : "#000",
      customClass: { 
        popup: "rounded-2xl border border-gray-200 dark:border-gray-600",
        confirmButton: "rounded-lg px-6 py-2",
        cancelButton: "rounded-lg px-6 py-2"
      },
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3000/bookmarks/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (res.ok) {
          setBookmarks(bookmarks.filter((bookmark) => bookmark._id !== id));
          await MySwal.fire({
            icon: "success",
            title: "Removed!",
            text: "Service removed from bookmarks",
            background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#fff",
            color: document.documentElement.classList.contains("dark") ? "#fff" : "#000",
            timer: 1500,
            showConfirmButton: false,
            customClass: { popup: "rounded-2xl" },
          });
        } else {
          MySwal.fire({
            icon: "error",
            title: "Error",
            text: data.error || "Failed to remove bookmark",
            background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#fff",
            color: document.documentElement.classList.contains("dark") ? "#fff" : "#000",
            customClass: { popup: "rounded-2xl" },
          });
        }
      } catch (err) {
        console.error(err);
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong",
          background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#fff",
          color: document.documentElement.classList.contains("dark") ? "#fff" : "#000",
          customClass: { popup: "rounded-2xl" },
        });
      }
    }
  };

  if (!user)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
        <div className="text-center max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Sign In Required
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Please log in to view your bookmarked services
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Sign In
          </button>
        </div>
      </div>
    );

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex justify-center items-center">
        <div className="text-center">
          <ClipLoader size={60} color="#6366f1" loading={loading} />
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading your bookmarks...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6 transition-colors duration-500">
      <div className="max-w-7xl mx-auto pt-8 pb-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-2xl mb-4">
            <Star className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            My Bookmarked Services
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Your curated collection of favorite services. Easily access and manage them here.
          </p>
        </div>

        {/* Bookmark Count */}
        {bookmarks.length > 0 && (
          <div className="mb-8 text-center">
            <span className="inline-block px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
              {bookmarks.length} {bookmarks.length === 1 ? 'bookmark' : 'bookmarks'}
            </span>
          </div>
        )}

        {/* Empty State */}
        {bookmarks.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-12 h-12 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                No bookmarks yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Start exploring services and bookmark your favorites to find them easily later.
              </p>
              <button
                onClick={() => navigate("/allservices")}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Explore Services
              </button>
            </div>
          </div>
        )}

        {/* Bookmarks Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {bookmarks.map((bookmark) => {
            const { serviceId } = bookmark;
            return (
              <div
                key={bookmark._id}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                {/* Service Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={serviceId.serviceImage}
                    alt={serviceId.serviceTitle}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title and Rating */}
                  <div className="flex items-start justify-between mb-3">
                    <h2
                      className="text-xl font-bold text-gray-900 dark:text-white cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-2 flex-1 mr-3"
                      onClick={() => navigate(`/services/${serviceId._id}`)}
                    >
                      {serviceId.serviceTitle}
                    </h2>
                    {serviceId.rating && (
                      <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {serviceId.rating}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Company Info */}
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {serviceId.companyName}
                    </span>
                    <span className="mx-2">•</span>
                    <a
                      href={serviceId.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Website
                    </a>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-2">
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                          $
                        </span>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {serviceId.price}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-2">
                        <MapPin className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="line-clamp-1">{serviceId.location}</span>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-2">
                      <Tag className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span>{serviceId.category}</span>
                  </div>

                  {/* Description */}
                  {serviceId.description && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {serviceId.description}
                    </p>
                  )}

                  {/* Tags */}
                  {serviceId.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {serviceId.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {serviceId.tags.length > 3 && (
                        <span className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                          +{serviceId.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => navigate(`/services/${serviceId._id}`)}
                      className="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-sm"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleDelete(bookmark._id, serviceId.serviceTitle)}
                      className="px-4 py-2.5 bg-gray-100 hover:bg-red-50 dark:bg-gray-700 dark:hover:bg-red-900/20 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 rounded-lg font-semibold transition-all duration-200 border border-transparent hover:border-red-200 dark:hover:border-red-800"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Bookmark;