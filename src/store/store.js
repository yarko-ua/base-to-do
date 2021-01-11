import { action, createStore } from "easy-peasy";

const store = createStore({
  todos: [],
  tasksDoneCount: 0,
  tasksUndoneCount: 0,
  addToDo: action((state, payload) => {
    state.todos.push({ text: payload, done: false });
    // todos: [...state.todos, { text: payload, done: false }],
  }),
  checkTask: action((state, payload) => {
    state.todos[payload].done = true;
  }),
  deleteTask: action((state, payload) => {
    state.todos = state.todos.filter((task, index) => index !== payload);
  }),
  updateTasksCount: action((state, payload) => {
    switch (payload.type) {
      case "del":
        if (payload.target === "checked") {
          state.tasksDoneCount -= 1;
        } else {
          state.tasksUndoneCount -= 1;
        }
        break;
      case "add":
        state.tasksUndoneCount += 1;
        break;
      case "check":
        state.tasksDoneCount += 1;
        state.tasksUndoneCount -= 1;
        break;

      default:
        break;
    }
  }),
});

export default store;
