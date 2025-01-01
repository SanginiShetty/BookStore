import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-6 bg-orange-50 min-h-screen">
      <BackButton />
      <h1 className="text-4xl font-semibold text-center text-orange-700 mb-8">
        Book Details
      </h1>
      {loading ? (
        <div className="flex justify-center my-6">
          <Spinner />
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl mx-auto">
          {/* Book ID */}
          <div className="mb-4">
            <span className="block text-lg font-medium text-gray-600">
              ID
            </span>
            <span className="text-gray-800">{book._id}</span>
          </div>

          {/* Title */}
          <div className="mb-4">
            <span className="block text-lg font-medium text-gray-600">
              Title
            </span>
            <span className="text-gray-800">{book.title}</span>
          </div>

          {/* Author */}
          <div className="mb-4">
            <span className="block text-lg font-medium text-gray-600">
              Author
            </span>
            <span className="text-gray-800">{book.author}</span>
          </div>

          {/* Publish Year */}
          <div className="mb-4">
            <span className="block text-lg font-medium text-gray-600">
              Publish Year
            </span>
            <span className="text-gray-800">{book.publishYear}</span>
          </div>

          {/* Created At */}
          <div className="mb-4">
            <span className="block text-lg font-medium text-gray-600">
              Created At
            </span>
            <span className="text-gray-800">
              {new Date(book.createdAt).toLocaleString()}
            </span>
          </div>

          {/* Last Updated */}
          <div className="mb-4">
            <span className="block text-lg font-medium text-gray-600">
              Last Updated
            </span>
            <span className="text-gray-800">
              {new Date(book.updatedAt).toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
