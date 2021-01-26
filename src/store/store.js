import { action, createStore } from "easy-peasy";

const store = createStore({
  tasksDoneCount: 0,
  tasksUndoneCount: 0,
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
