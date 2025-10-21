import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router";

const Bookmark = () => {
  const { user } = useContext(AuthContext);
  const [bookmarks, setBookmarks] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/bookmarks/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setBookmarks(bookmarks.filter((bookmark) => bookmark._id !== id));
      })
      .catch((err) => console.error(err));
  };

  if (!user)
    return <p className="text-center mt-10">Please log in to see bookmarks</p>;

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color="#2563eb" loading={loading} />
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6">My Bookmarked Services</h1>
      {bookmarks.length === 0 && <p>You have no bookmarks yet.</p>}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarks.map((bookmark) => (
          <div
            key={bookmark._id}
            className="p-4 border rounded-lg shadow hover:shadow-lg"
          >
            <img
              src={bookmark.serviceId.serviceImage}
              alt={bookmark.serviceId.serviceTitle}
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <h2
              className="text-xl font-semibold cursor-pointer"
              onClick={() => navigate(`/services/${bookmark.serviceId._id}`)}
            >
              {bookmark.serviceId.serviceTitle}
            </h2>
            <p className="text-gray-600 mb-1">${bookmark.serviceId.price}</p>
            {/* Showing additional info */}
            {bookmark.serviceId.description && (
              <p className="text-gray-500 text-sm mb-2">
                {bookmark.serviceId.description}
              </p>
            )}
            {bookmark.serviceId.category && (
              <p className="text-gray-400 text-sm mb-2">
                Category: {bookmark.serviceId.category}
              </p>
            )}
            {/* Delete Button */}
            <button
              onClick={() => handleDelete(bookmark._id)}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookmark;
