import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const BooksTable = ({ books }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left bg-white shadow-lg rounded-2xl overflow-hidden">
        <thead className="bg-orange-600 text-white">
          <tr>
            <th className="py-4 px-6">#</th>
            <th className="py-4 px-6">Title</th>
            <th className="py-4 px-6 max-md:hidden">Author</th>
            <th className="py-4 px-6 max-md:hidden">Publish Year</th>
            <th className="py-4 px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr
              key={book._id}
              className={`hover:bg-orange-50 ${
                index % 2 === 0 ? "bg-orange-100" : "bg-orange-50"
              } transition`}
            >
              <td className="py-4 px-6 text-center font-semibold">
                {index + 1}
              </td>
              <td className="py-4 px-6 text-center">{book.title}</td>
              <td className="py-4 px-6 text-center max-md:hidden">
                {book.author}
              </td>
              <td className="py-4 px-6 text-center max-md:hidden">
                {book.publishYear}
              </td>
              <td className="py-4 px-6 text-center">
                <div className="flex justify-center items-center gap-4">
                  <Link
                    to={`/books/details/${book._id}`}
                    className="text-green-700 hover:text-green-800 transition"
                    title="View Details"
                  >
                    <BsInfoCircle className="text-2xl" />
                  </Link>
                  <Link
                    to={`/books/edit/${book._id}`}
                    className="text-yellow-500 hover:text-yellow-600 transition"
                    title="Edit Book"
                  >
                    <AiOutlineEdit className="text-2xl" />
                  </Link>
                  <Link
                    to={`/books/delete/${book._id}`}
                    className="text-red-600 hover:text-red-700 transition"
                    title="Delete Book"
                  >
                    <MdOutlineDelete className="text-2xl" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
