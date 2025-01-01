import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = { title, author, publishYear };
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/books`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Created Successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error creating book", { variant: "error" });
        console.error(error);
      });
  };

  return (
    <div className="p-6 bg-orange-50 min-h-screen">
      <BackButton />
      <h1 className="text-4xl font-semibold text-center text-orange-700 mb-6">
        Create a New Book
      </h1>
      {loading && (
        <div className="flex justify-center my-4">
          <Spinner />
        </div>
      )}
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg mx-auto">
        {/* Title Input */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            placeholder="Enter book title"
          />
        </div>

        {/* Author Input */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Author
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            placeholder="Enter author's name"
          />
        </div>

        {/* Publish Year Input */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Publish Year
          </label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            placeholder="Enter year of publication"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSaveBook}
          className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          Save Book
        </button>
      </div>
    </div>
  );
};

export default CreateBook;
