import React, { useEffect, useState } from "react";
import "./footer.css";
import { setMaxResult, setStartIndex } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";

const Footer = () => {
  const state = useSelector((state) => state.myReducer);
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);

  const changeResult = (e) => {
    dispatch(setMaxResult(e.target.value));
  };

  const changeStartIndex = (e) => {
    if (e == "prev") {
      let total = state.startIndex - state.maxResults;
      if (total <= 0) {
        total = 0;
      }
      dispatch(setStartIndex(total));
    } else {
      dispatch(setStartIndex(state.startIndex + Number(state.maxResults)));
    }
  };

  useEffect(() => {
    if (state.startIndex <= 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [state.startIndex]);

  return (
    <div className="listBar">
      <select name="Pages" onChange={changeResult} className="select">
        <option value="5">5</option>
        <option value="10" selected>
          10
        </option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
      <div className="prevNext">
        <button onClick={() => changeStartIndex("prev")} disabled={disabled}>
          <i class="fa-solid fa-angles-left"></i> Prev
        </button>
        <button onClick={() => changeStartIndex("next")}>
          Next <i class="fa-solid fa-angles-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Footer;
