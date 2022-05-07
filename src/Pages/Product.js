import "./product.css";
// import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const price = {
  fontWeight: "600",
  fontSize: "40px",
  color: "teal",
};

const Product = () => {
  const { id } = useParams();

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      setProduct(await res.json());
      setLoading(false);
    };
    getProduct();
  }, []);

  const Loading = ()=>{
    return(
      <i class="fa-solid fa-spinner spinner"></i>
    )
  }

  const ShowProduct = () => {
    return (
      <>
        <div className="imageContainer">
          <img
            src={product.image}
            alt={product.title}
          />
        </div>
        <div className="infoContainer">
          <h6 className="text-uppercase text-black-50">{product.category}</h6>
          <h2>{product.title}</h2>
          <p className="my-3">{product.description}</p>
          <span style={price}>${product.price}</span>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="container">
        {loading ? <Loading /> : <ShowProduct />}
      </div>
    </>
  );
};

export default Product;
