import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksCard from "../components/home/BooksCard";
import BooksTable from "../components/home/BooksTable";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/api/books")
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 bg-gradient-to-b from-orange-50 to-orange-100 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center bg-orange-200 shadow-lg p-5 rounded-2xl mb-6">
        <h1 className="text-3xl font-bold text-orange-800">Explore Books</h1>
        <Link
          to="/books/create"
          className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition"
        >
          <MdOutlineAddBox className="text-2xl" />
          <span className="font-medium">Add Book</span>
        </Link>
      </div>

      {/* View Switcher */}
      <div className="flex justify-center items-center gap-x-4 mb-8">
        <button
          className={`px-5 py-2 rounded-full font-semibold ${
            showType === "table"
              ? "bg-orange-600 text-white shadow-lg"
              : "bg-white text-orange-600 border border-orange-600 hover:bg-orange-100"
          } transition`}
          onClick={() => setShowType("table")}
        >
          Table View
        </button>
        <button
          className={`px-5 py-2 rounded-full font-semibold ${
            showType === "card"
              ? "bg-orange-600 text-white shadow-lg"
              : "bg-white text-orange-600 border border-orange-600 hover:bg-orange-100"
          } transition`}
          onClick={() => setShowType("card")}
        >
          Card View
        </button>
      </div>

      {/* Content Section */}
      <div className="bg-white shadow-lg p-6 rounded-2xl">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Spinner />
          </div>
        ) : showType === "table" ? (
          <BooksTable books={books} />
        ) : (
          <BooksCard books={books} />
        )}
      </div>
    </div>
  );
};

export default Home;
