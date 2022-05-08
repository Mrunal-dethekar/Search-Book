import { combineReducers, createStore } from "redux";
import myReducer from "./reducer";

const rootReducer = combineReducers({
    myReducer,
  })

const store = createStore(rootReducer);

export default store;
