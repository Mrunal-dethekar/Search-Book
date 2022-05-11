export const QUERY = "QUERY";
export const MAX_RESULT = "MAX_RESULT";
export const START_INDEX = "START_INDEX";
export const FILTER_COUNT = "FILTER_COUNT";
export const FILTER_OBJ = "FILTER_OBJ";
export const FILTER = "FILTER";
export const SEEIMAGE = "SEEIMAGE";

export const setQuery = (query) => {
  return {
    type: QUERY,
    payload: query,
  };
};

export const setMaxResult = (result) => {
  return {
    type: MAX_RESULT,
    payload: result,
  };
};

export const setStartIndex = (index) => {
  return {
    type: START_INDEX,
    payload: index,
  };
};

export const setFilterCount = (count) => {
  return {
    type: FILTER_COUNT,
    payload: count,
  };
};

export const setFilter = () => {
  return {
    type: FILTER,
  };
};

export const setFilterObj = (data) => {
  return {
    type: FILTER_OBJ,
    payload: data,
  };
};

export const seeImage = (data) => {
  return {
    type: SEEIMAGE,
    payload: data,
  };
};
