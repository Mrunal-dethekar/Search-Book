import React, { useState } from "react";
import imageNotFound from "../Assets/imageNotFound.png";
import "./book.css";

const Book = ({ book }) => {
  const [showHide, setShowHide] = useState(0);

  const handleHover = (e) => {
    if (e === "show") {
      setShowHide(1);
    } else {
      setShowHide(0);
    }
  };

  return (
    <div
      className="book"
      onMouseEnter={() => handleHover("show")}
      onMouseLeave={() => handleHover("hide")}
    >
      <img
        src={
          book.volumeInfo.imageLinks
            ? book.volumeInfo.imageLinks.thumbnail
            : imageNotFound
        }
        className="image"
        alt={book.volumeInfo.title}
      />
      <h6 style={{ bottom: "20%", left: "15%" }} className="h6">
        Book Name :{` ${book.volumeInfo.title.substring(0, 18)}`}
      </h6>
      <h6 style={{ bottom: "15%", left: "15%" }} className="h6">
        Rating :
        {book.volumeInfo.averageRating
          ? ` ${book.volumeInfo.averageRating}`
          : " Not Available"}
      </h6>
      <h6 style={{ bottom: "10%", left: "15%" }} className="h6">
        Print Type :
        {book.volumeInfo.printType
          ? ` ${book.volumeInfo.printType}`
          : "Not Available"}
      </h6>
      <h6
        style={{ bottom: "2.5%", color: "#B12704", fontSize: "15px" }}
        className="h6"
      >
        Price :
        {book.saleInfo.retailPrice
          ? ` INR ${book.saleInfo.retailPrice.amount}`
          : " Not Available"}
      </h6>

      <div className="info" style={{ opacity: `${showHide}` }}>
        <div className="icon">
          <i class="fa-solid fa-eye"></i>
        </div>
        <div className="icon">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
    </div>
  );
};

export default Book;
