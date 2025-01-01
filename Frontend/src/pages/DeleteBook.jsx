import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/api/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Deleted Successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error deleting book", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-6 bg-orange-50 min-h-screen">
      <BackButton />
      <h1 className="text-4xl font-semibold text-center text-orange-700 mb-8">
        Delete Book
      </h1>
      {loading ? (
        <div className="flex justify-center my-6">
          <Spinner />
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl mx-auto">
          <h3 className="text-2xl text-center text-gray-600 mb-6">
            Are you sure you want to delete this book?
          </h3>
          <div className="flex justify-center gap-6">
            <button
              className="p-4 bg-red-600 text-white rounded-lg w-full hover:bg-red-800 transition-all"
              onClick={handleDeleteBook}
            >
              Yes, Delete it
            </button>
            <button
              className="p-4 bg-gray-300 text-gray-700 rounded-lg w-full hover:bg-gray-500 transition-all"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteBook;
