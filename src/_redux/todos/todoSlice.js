/* eslint-disable no-useless-computed-key */
import { createSlice } from "@reduxjs/toolkit";

const initState = {
  listLoading: false,
  actionsLoading: false,
  lastError: null,
  columns: {
    ["todo_list"]: {
      name: "To do",
      items: [],
    },
    ["progress_list"]: {
      name: "In Progress",
      items: [],
    },
    ["done_list"]: {
      name: "Done",
      items: [],
    },
  },
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const todoSlice = createSlice({
  name: "Todo",
  initialState: initState,
  reducers: {
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },

    // add to list
    addTodo: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.columns = action.payload;
      localStorage.setItem("TODO", JSON.stringify(action.payload));
    },
  },
});
