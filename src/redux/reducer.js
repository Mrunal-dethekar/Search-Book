import {
  QUERY,
  MAX_RESULT,
  START_INDEX,
  FILTER_COUNT,
  FILTER_OBJ,
  FILTER,
  SEEIMAGE,
} from "./action";

const intialState = {
  query: "the",
  maxResults: 10,
  startIndex: 0,
  filterCount: 0,
  filter: { display: `none`, opacity: "1" },
  seeImage: { image: "", display: "none" },
  filterObj: {
    eBook: 0,
    orderBy: "relevance",
    Book: false,
    Magazines: false,
  },
};

const myReducer = (state = intialState, action) => {
  let payload = action.payload;
  switch (action.type) {
    case QUERY: {
      return {
        ...state,
        query: payload ? `${payload}` : state.query,
      };
    }
    case MAX_RESULT: {
      return {
        ...state,
        maxResults: payload,
      };
    }
    case START_INDEX: {
      return {
        ...state,
        startIndex: payload,
      };
    }
    case FILTER_COUNT: {
      return {
        ...state,
        filterCount: payload,
      };
    }
    case SEEIMAGE: {
      return {
        ...state,
        filter: {
          ...state.filter,
          opacity: `${state.filter.opacity == "0.1" ? "1" : "0.1"}`,
        },
        seeImage: {
          image: payload,
          display: `${state.seeImage.display == "none" ? "block" : "none"}`,
        },
      };
    }
    case FILTER: {
      return {
        ...state,
        filter: {
          display: `${state.filter.display == "none" ? "flex" : "none"}`,
          opacity: `${state.filter.opacity == "0.1" ? "1" : "0.1"}`,
        },
      };
    }
    case FILTER_OBJ: {
      if (
        payload == "free-ebooks" ||
        payload == "paid-ebooks" ||
        payload == "ebooks" ||
        payload == 0
      ) {
        return {
          ...state,
          filterObj: {
            ...state.filterObj,
            eBook: payload,
          },
        };
      } else if (
        payload.target.value == "relevance" ||
        payload.target.value == "newest"
      ) {
        return {
          ...state,
          filterObj: {
            ...state.filterObj,
            orderBy: payload.target.value,
          },
        };
      } else if (payload.target.value == "Books") {
        return {
          ...state,
          filterObj: {
            ...state.filterObj,
            Book: state.filterObj.Book ? false : true,
          },
        };
      } else {
        return {
          ...state,
          filterObj: {
            ...state.filterObj,
            Magazines: state.filterObj.Magazines ? false : true,
          },
        };
      }
    }
    default:
      return { ...intialState };
  }
};

export default myReducer;
