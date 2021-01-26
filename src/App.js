import ListStore from "./store/listStore";
import Main from "./components/Main";
import Header from "./components/header/Header";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <ListStore.Provider>
        <Main />
      </ListStore.Provider>
    </>
  );
}

export default App;
