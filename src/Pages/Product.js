import "./product.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Product = () => {
  const { id } = useParams();

  const [product, setProduct] = useState();

  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${id}`
      );
      const data = await res.json();
      setProduct(data);
    };
    getProduct();
  }, []);

  return (
    <>
      {product ? (
        <div className="container">
          <div className="imageContainer">
            <img
              src={product.volumeInfo.imageLinks.medium}
              alt={product.volumeInfo.title}
            />
          </div>
          <div className="infoContainer">
            <h2>Book Name : {product.volumeInfo.title}</h2>
            <h4>
              <span style={{ color: "orange" }}>Author : </span>
              {product.volumeInfo.authors}
            </h4>
            <h4>
              <span>Published Date : </span>
              {product.volumeInfo.publishedDate}
            </h4>
            <p className="my-3">
              <span style={{ fontWeight: "bold" }}>Description : </span>
              {product.volumeInfo.description}
            </p>
            <h4>
              <span>Page Count : </span>
              {product.volumeInfo.pageCount}
            </h4>
            <span className="price">
              Price :
              <span style={{ color: "#ff0000c0" }}>
                {" "}
                ₹{" "}
                {product.saleInfo.retailPrice
                  ? product.saleInfo.retailPrice.amount
                  : "Not Available"}
              </span>
            </span>
          </div>
        </div>
      ) : (
        <i class="fa-solid fa-spinner spinner"></i>
      )}
    </>
  );
};

export default Product;
