import { Task } from "./defaultTask/Task";
import { Row, Col, Button } from "antd";
// import { ExecutedTask } from "./components/executedTask/ExecutedTask";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Counter } from "./counter/Counter";
import ListStore from "./../store/listStore";
import {useStoreActions} from 'easy-peasy';
import {useState} from 'react';

export default function Main () {
  const [task, setTask] = useState('');
  const todos = ListStore.useStoreState((state) => state.todos);

  // const [localTodos, addLocalTodos] = useState([]);
  // addLocalTodos([...localTodos, {text: blabla, done: false}]);

  const addTask = ListStore.useStoreActions((actions) => {
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

  return (
    <main>
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
                onClick={addTodo}
              >
                Add To List
              </Button>
            </Col>
          </Row>
          <Counter />
          <Row justify="space-between" gutter={[0, 4]}>
            {todos.map(
              (task, i) =>
                !task.done && (
                  <Col key={`undone${i}`} className="gutter-row" span={24}>
                    <Task
                      index={i}
                      key={i}
                      text={task.text}
                      isDone={task.done}
                    />
                  </Col>
                )
            )}
            {todos.map(
              (task, i) =>
                task.done && (
                  <Col key={`done${i}`} className="gutter-row" span={24}>
                    <Task
                      index={i}
                      key={i}
                      text={task.text}
                      isDone={task.done}
                    />
                  </Col>
                )
            )}
          </Row>
        </Col>
      </Row>
    </main>
  )
}