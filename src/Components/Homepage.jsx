import { useEffect, useState } from "react";
import Books from "./Books";
import "./homepage.css";

function Homepage() {
  const [data, setData] = useState();
  const [query, setQuery] = useState("the");
  const [maxResults, setMaxResults] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [filterCount, setFilterCount] = useState(0);
  const [filter, setFilter] = useState({ display: `none`, opacity: "1" });
  const [filterObj, setFilterObj] = useState({
    eBook: 0,
    orderBy: "relevance",
    Book: false,
    Magazines: false,
  });

  useEffect(() => {
    let count = 0;
    if (filterObj.eBook != 0) {
      count++;
    }
    if (filterObj.orderBy != "relevance") {
      count++;
    }
    if (filterObj.Book || filterObj.Magazines) {
      count++;
    }
    setFilterCount(count);
  }, [filterObj]);

  let ordeByFun = () => {
    if (filterObj.Book || filterObj.Magazines) return "all";
    if (filterObj.Book) {
      return "books";
    } else if (filterObj.Magazines) {
      return "magazines";
    } else {
      return "all";
    }
  };

  const changeResult = (e) => {
    setMaxResults(e.target.value);
  };

  const changeStartIndex = (e) => {
    if (e == "prev") {
      let total = startIndex - maxResults;
      if (total <= 0) {
        total = 0;
      }
      setStartIndex(total);
    } else {
      setStartIndex(startIndex + Number(maxResults));
    }
  };

  const changeQuery = (e) => {
    setQuery(e.target.value ? `${e.target.value}` : query);
  };

  useEffect(() => {
    if (startIndex <= 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [startIndex]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&startIndex=${startIndex}${
          filterObj.eBook ? `&filter=${filterObj.eBook}` : 0
        }&orderBy=${filterObj.orderBy}&printType=${ordeByFun()}`
      );
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, [query, maxResults, startIndex, filterObj]);

  const applyFilter = (e) => {
    if (e == "free-ebooks" || e == "paid-ebooks" || e == "ebooks" || e == 0) {
      setFilterObj({ ...filterObj, eBook: e });
    } else if (e.target.value == "relevance" || e.target.value == "newest") {
      setFilterObj({ ...filterObj, orderBy: e.target.value });
    } else if (e.target.value == "Books") {
      setFilterObj({ ...filterObj, Book: filterObj.Book ? false : true });
    } else {
      setFilterObj({
        ...filterObj,
        Magazines: filterObj.Magazines ? false : true,
      });
    }
  };

  const filterContainer = () => {
    setFilter({
      display: `${filter.display == "none" ? "flex" : "none"}`,
      opacity: `${filter.opacity == "0.1" ? "1" : "0.1"}`,
    });
  };

  return (
    <div className="Homepage">
      <div className="searchBar">
        <div class="tooltip">
          <button className="filter-button" onClick={filterContainer}>
            Filters {`(${filterCount})`}
          </button>
          <span class="tooltiptext">
            {filterObj.eBook ? (
              <div className="typeOfBook">Type Of Book : {filterObj.eBook}</div>
            ) : (
              ""
            )}
            {filterObj.orderBy == "newest" ? (
              <div className="order-by">Order By : Newest</div>
            ) : (
              ""
            )}
            {filterObj.Book || filterObj.Magazines ? (
              <div className="print-type">
                Print Type : {filterObj.Book && "Book"}, {" "}
                {filterObj.Magazines && "Magazines"}
              </div>
            ) : (
              ""
            )}
          </span>
        </div>
        <div className="input">
          <input type="text" placeholder="Search Book" onChange={changeQuery} />
          <i class="fa-solid fa-magnifying-glass search-icon fa-xl"></i>
        </div>
      </div>
      <div className="bookContainer" style={{ opacity: filter.opacity }}>
        {data ? (
          <Books data={data} />
        ) : (
          <i class="fa-solid fa-spinner spinner"></i>
        )}
      </div>
      <div className="listBar">
        <select name="Pages" onChange={changeResult}>
          <option value="5">5</option>
          <option value="10" selected>
            10
          </option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
        <div className="prevNext">
          <button onClick={() => changeStartIndex("prev")} disabled={disabled}>
            Prev
          </button>
          <button onClick={() => changeStartIndex("next")}>Next</button>
        </div>
      </div>
      <div className="filter" style={{ display: filter.display }}>
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
    </div>
  );
}

export default Homepage;
