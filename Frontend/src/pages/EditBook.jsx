import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/books/${id}`)
      .then((res) => {
        setAuthor(res.data.author);
        setPublishYear(res.data.publishYear);
        setTitle(res.data.title);
        setLoading(false);
      })
      .catch((error) => {
        enqueueSnackbar("Error fetching book data", { variant: "error" });
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Edited Successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error editing book", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-6 bg-orange-50 min-h-screen">
      <BackButton />
      <h1 className="text-4xl font-semibold text-center text-orange-700 mb-8">
        Edit Book
      </h1>
      {loading ? (
        <div className="flex justify-center my-6">
          <Spinner />
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl mx-auto">
          {/* Title Input */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-600 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full rounded-lg"
              placeholder="Enter book title"
            />
          </div>

          {/* Author Input */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-600 mb-2">
              Author
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full rounded-lg"
              placeholder="Enter author name"
            />
          </div>

          {/* Publish Year Input */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-600 mb-2">
              Publish Year
            </label>
            <input
              type="number"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full rounded-lg"
              placeholder="Enter publish year"
            />
          </div>

          {/* Save Button */}
          <button
            className="bg-sky-300 text-white py-2 px-6 rounded-lg shadow-md hover:bg-sky-600 transition-all"
            onClick={handleEditBook}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default EditBook;
