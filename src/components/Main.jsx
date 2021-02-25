import { Task } from "./defaultTask/Task";
import { Row, Col, Button } from "antd";
// import { ExecutedTask } from "./components/executedTask/ExecutedTask";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Counter } from "./counter/Counter";
import ListStore from "./../store/listStore";
import {useStoreActions} from 'easy-peasy';
import {useEffect, useState} from 'react';
import todoAPI from './../api/api';

export default function Main () {
  const [task, setTask] = useState('');
  const todos = ListStore.useStoreState((state) => state.todos);
  const [posts, setPosts] = useState([]);
  const [initialize, setInitialize] = useState(false);
  const [inProgress, setProgress] = useState(true);

  // const [localTodos, addLocalTodos] = useState([]);
  // addLocalTodos([...localTodos, {text: blabla, done: false}]);

  const addTask = ListStore.useStoreActions((actions) => {
    return actions.addToDo;
  });
  const updateCount = useStoreActions((actions) => {
    return actions.updateTasksCount;
  });
  const initializeTasks = ListStore.useStoreActions(actions => {
    return actions.initTasksThunk;
  });
  const saveTask = ListStore.useStoreActions(actions => {
    return actions.saveTask;
  })
  const onAdd = () => {
    saveTask(task);
    setTask('');
    // await getTasks();
    // addTask(task);
    // setTask("");
    // updateCount({ type: "add" });
  };

  console.log("todos", todos);

  useEffect(()=> {
      initTasks();
  });

  const initTasks = () => {
    if (initialize) return;
    initializeTasks();
    setInitialize(true);
  }

  const addLocalTask = () => {
    const post = {
      task: task,
      author: "me",
      executed: false
    }
    fetch('http://localhost:3004/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(post)
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
      setProgress(true)
    })
  }

  const updatePost = () => {
    const post = {
      "title": "olalala",
      "author": "me"
    }

    fetch('http://localhost:3004/posts/4', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })
    .then(response => response.json())
    .then(response => {
      console.log('updated', response);
      setProgress(true);
    })
  }

  const onClick = async () => {
    const tasks = await todoAPI.getTasks();
    console.log(tasks);
    const task = tasks[0];
    const updatedTask = await todoAPI.executeTask(task.id);
    console.log(updatedTask);
  }

  return (
    <main>
      { posts.map(post => <li key={post.id}>{post.title}</li>) }
      
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
                onClick={onAdd}
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
                      text={task.task}
                      isDone={task.executed}
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
                      text={task.task}
                      isDone={task.executed}
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