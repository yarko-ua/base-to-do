import { createContextStore, action } from "easy-peasy";

const listStore = createContextStore({
  todos: [],
  addToDo: action((state, payload) => {
    state.todos = [{ text: payload, done: false }, ...state.todos];
    // todos: [...state.todos, { text: payload, done: false }],
  }),
  checkTask: action((state, payload) => {
    state.todos[payload].done = true;
  }),
  deleteTask: action((state, payload) => {
    state.todos = state.todos.filter((task, index) => index !== payload);
  }),
});

export default listStore;
