import { combineReducers } from "redux";
import { todoSlice } from "./todos/todoSlice";

const rootReducer = combineReducers({
  todos: todoSlice.reducer,
});

export default rootReducer;
