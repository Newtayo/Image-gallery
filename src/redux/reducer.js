import { combineReducers } from "@reduxjs/toolkit";
import movieReducer from "./movie/movieSlice";

const rootReducer = combineReducers({
    movie: movieReducer,
  });
  
  export default rootReducer;