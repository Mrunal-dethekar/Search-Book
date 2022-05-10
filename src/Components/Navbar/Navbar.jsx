import React, { useEffect } from "react";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilterObj,
  setQuery,
  setFilter,
  setFilterCount,
} from "../../redux/action";
import { Link } from "react-router-dom";

const Navbar = () => {
  const state = useSelector((state) => state.myReducer);
  const dispatch = useDispatch();

  const applyFilter = (e) => {
    dispatch(setFilterObj(e));
  };

  const filterContainer = () => {
    dispatch(setFilter());
  };

  const changeQuery = (e) => {
    dispatch(setQuery(e.target.value));
  };

  useEffect(() => {
    let count = 0;
    if (state.filterObj.eBook != 0) {
      count++;
    }
    if (state.filterObj.orderBy != "relevance") {
      count++;
    }
    if (state.filterObj.Book || state.filterObj.Magazines) {
      count++;
    }
    dispatch(setFilterCount(count));
  }, [state.filterObj]);

  return (
    <>
      <div className="searchBar">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h2>
            <i class="fa-solid fa-house"></i> Home
          </h2>
        </Link>

        <div className="input">
          <input type="text" placeholder="Search Book" onChange={changeQuery} />
          <i className="fa-solid fa-magnifying-glass search-icon fa-xl"></i>
        </div>
        <div className="tooltip">
          <button className="filter-button" onClick={filterContainer}>
          <i class="fa-solid fa-filter"style={{color:"gray"}}></i> Filters {`(${state.filterCount})`}
          </button>
          <span className="tooltiptext">
            {state.filterObj.eBook ? (
              <div className="typeOfBook">
                Type Of Book : {state.filterObj.eBook}
              </div>
            ) : (
              ""
            )}
            {state.filterObj.orderBy == "newest" ? (
              <div className="order-by">Order By : Newest</div>
            ) : (
              ""
            )}
            {state.filterObj.Book || state.filterObj.Magazines ? (
              <div className="print-type">
                Print Type : {state.filterObj.Book && "Book"},{" "}
                {state.filterObj.Magazines && "Magazines"}
              </div>
            ) : (
              ""
            )}
          </span>
        </div>
      </div>
      <div className="filter" style={{ display: state.filter.display}}>
        <div className="row">
          Type Of the Book :{" "}
          <button onClick={() => applyFilter("free-ebooks")}>
            Free-ebooks
          </button>
          <button onClick={() => applyFilter("paid-ebooks")}>
            Paid-ebooks
          </button>
          <button onClick={() => applyFilter("ebooks")}>E-books</button>
          <button onClick={() => applyFilter(0)}>All</button>
        </div>
        <div className="row">
          Order By :{" "}
          <select name="orderBy" className="orderBy" onChange={applyFilter}>
            <option value="relevance">Relevance</option>
            <option value="newest">Newest</option>
          </select>
        </div>
        <div className="row">
          Print Type :
          <input
            type="checkbox"
            id="Books"
            name="Books"
            value="Books"
            onChange={applyFilter}
          />
          <label htmlFor="Books">Books</label>
          <input
            type="checkbox"
            id="Magazines"
            name="Magazines"
            value="Magazines"
            onChange={applyFilter}
          />
          <label htmlFor="Magazines">Magazines</label>
        </div>
        <button className="apply-button" onClick={filterContainer}>
          Apply
        </button>
      </div>
    </>
  );
};

export default Navbar;
