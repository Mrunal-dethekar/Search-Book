import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Book from "../Book/Book";
import { seeImage } from "../../redux/action";
import "./homepage.css";

function Homepage() {
  const state = useSelector((state) => state.myReducer);
  const dispatch = useDispatch();

  const [data, setData] = useState();

  let ordeByFun = () => {
    if (state.filterObj.Book || state.filterObj.Magazines) return "all";
    if (state.filterObj.Book) {
      return "books";
    } else if (state.filterObj.Magazines) {
      return "magazines";
    } else {
      return "all";
    }
  };

  const removeImage = () => {
    dispatch(seeImage());
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${
          state.query
        }&maxResults=${state.maxResults}&startIndex=${state.startIndex}${
          state.filterObj.eBook ? `&filter=${state.filterObj.eBook}` : 0
        }&orderBy=${state.filterObj.orderBy}&printType=${ordeByFun()}`
      );
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, [state.query, state.maxResults, state.startIndex, state.filterObj]);

  return (
    <>
      <div className="bookContainer" style={{ opacity: state.filter.opacity }}>
        {data ? (
          data.items.map((book, index) => <Book book={book} key={index} />)
        ) : (
          <i class="fa-solid fa-xmark"></i>
        )}
      </div>
      <div className="seeImage" style={{ display: state.seeImage.display }}>
        <i class="fa-solid fa-xmark" onClick={removeImage}></i>
        <img src={state.seeImage.image} alt="Image Not Available" />
      </div>
    </>
  );
}

export default Homepage;
