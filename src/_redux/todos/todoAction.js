import { todoSlice, callTypes } from "./todoSlice";

const { actions } = todoSlice;

// add to todo
export const storeToTodo = (todos) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.addTodo(todos));
};
