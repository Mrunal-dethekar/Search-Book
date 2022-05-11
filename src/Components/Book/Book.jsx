import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import imageNotFound from "../../Assets/imageNotFound.png";
import "./book.css";
import { seeImage } from "../../redux/action";

const Book = ({ book }) => {
  const dispatch = useDispatch();

  const seeImagefun = (e) => {
    dispatch(seeImage(e));
  };

  return (
    <div className="book">
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

      <div className="info">
        <div className="icon">
          <i
            className="fa-solid fa-eye"
            onClick={() => seeImagefun(book.volumeInfo.imageLinks.thumbnail)}
          ></i>
        </div>
        <div className="icon">
          <Link to={`/product/${book.id}`}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Book;
