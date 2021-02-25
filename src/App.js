import ListStore from "./store/listStore";
import Main from "./components/Main";
import Header from "./components/header/Header";
import Todo from "./components/todo/Todo";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Todo />
      <ListStore.Provider>
        <Main />
      </ListStore.Provider>
    </>
  );
}

export default App;
