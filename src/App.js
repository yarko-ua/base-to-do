import { Modal, Row, Col, Button } from "antd";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useState } from "react";
import { Task } from "./components/defaultTask/Task";
import "./App.css";
// import { ExecutedTask } from "./components/executedTask/ExecutedTask";
import { DownloadOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Counter } from "./components/counter/Counter";

function App() {
  const [task, setTask] = useState("");
  const todos = useStoreState((state) => state.todos);

  const [localTodos, addLocalTodos] = useState([]);

  // addLocalTodos([...localTodos, {text: blabla, done: false}]);

  const addTask = useStoreActions((actions) => {
    return actions.addToDo;
  });
  const updateCount = useStoreActions((actions) => {
    return actions.updateTasksCount;
  });
  const addTodo = () => {
    addTask(task);
    setTask("");
    updateCount({ type: "add" });
  };

  console.log("todos", todos);
  console.log("localTodos", localTodos);

  return (
    <>
      <Row justify="center">
        <Col xs={23} sm={22} md={21} lg={20}>
          <Row justify="space-between" gutter={[15, 10]}>
            <Col flex="auto">
              <input
                className="task-input"
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </Col>
            <Col flex="none">
              <Button
                type="loading"
                shape="round"
                size="middle"
                icon={<PlusCircleOutlined />}
                onClick={() => {
                  addLocalTodos([...localTodos, { text: task, done: false }]);
                  setTask("");
                  updateCount({ type: "add" });
                }}
              >
                Add To List
              </Button>
            </Col>
          </Row>
          <Counter />
          <Row justify="space-between" gutter={[0, 4]}>
            {localTodos.map(
              (task, i) =>
                !task.done && (
                  <Col className="gutter-row" span={24}>
                    <Task
                      index={i}
                      key={i}
                      styles={task.done ? "executed" : "default"}
                      text={task.text}
                      isDone={task.done}
                      addTodo={addLocalTodos}
                    />
                  </Col>
                )
            )}
            {localTodos.map(
              (task, i) =>
                task.done && (
                  <Col className="gutter-row" span={24}>
                    <Task
                      index={i}
                      key={i}
                      styles={task.done ? "executed" : "default"}
                      text={task.text}
                      isDone={task.done}
                      addTodo={addLocalTodos}
                    />
                  </Col>
                )
            )}
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default App;
