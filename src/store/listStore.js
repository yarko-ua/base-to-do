import { createContextStore, action, thunk } from "easy-peasy";
import todoAPI from './../api/api';

const listStore = createContextStore({
  todos: [],
  addToDo: action((state, task) => {
    // state.todos = [, ...state.todos];
    state.todos.push(task)
    // todos: [...state.todos, { text: payload, done: false }],
  }),
  initTasks: action((state, payload) => {
    state.todos = payload;
  }),
  checkTask: action((state, payload) => {
    state.todos[payload].done = true;
  }),
  deleteTask: action((state, payload) => {
    state.todos = state.todos.filter((task, index) => index !== payload);
  }),
  initTasksThunk: thunk(async (actions, payload) => {
    const tasks = await todoAPI.getTasks();
    actions.initTasks(tasks); 
  }),
  saveTask: thunk(async (actions, payload) => {
    const res  = await todoAPI.addTask(payload);
    console.log(res);
    actions.addToDo(res)
  })
});
 
export default listStore;
