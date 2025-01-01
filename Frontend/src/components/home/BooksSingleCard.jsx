import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import BookModal from "./BookModal";

const BooksSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 m-4 shadow-md hover:shadow-lg transition">
      {/* Publish Year Badge */}
      <h2 className="absolute top-2 right-4 px-3 py-1 bg-orange-600 text-white text-sm rounded-full">
        {book.publishYear}
      </h2>

      {/* Book Details */}
      <div className="flex items-center gap-3 mb-4">
        <PiBookOpenTextLight className="text-orange-500 text-3xl" />
        <h2 className="font-semibold text-lg text-gray-800">{book.title}</h2>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <BiUserCircle className="text-orange-500 text-3xl" />
        <h2 className="text-gray-700">{book.author}</h2>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center gap-4 mt-4">
        <BiShow
          className="text-3xl text-blue-700 hover:text-blue-900 cursor-pointer transition"
          title="Quick View"
          onClick={() => setShowModal(true)}
        />
        <Link to={`/books/details/${book._id}`}>
          <BsInfoCircle
            className="text-2xl text-green-700 hover:text-green-900 transition"
            title="View Details"
          />
        </Link>
        <Link to={`/books/edit/${book._id}`}>
          <AiOutlineEdit
            className="text-2xl text-yellow-600 hover:text-yellow-800 transition"
            title="Edit Book"
          />
        </Link>
        <Link to={`/books/delete/${book._id}`}>
          <MdOutlineDelete
            className="text-2xl text-red-600 hover:text-red-800 transition"
            title="Delete Book"
          />
        </Link>
      </div>

      {/* Book Modal */}
      {showModal && <BookModal book={book} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default BooksSingleCard;
