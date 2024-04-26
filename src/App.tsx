import React from "react";
import TaskList from "../src/components/TaskList/TaskList";
import "./App.css";

type AppProps = Record<string, never>;

const App: React.FC<AppProps> = () => {
  return (
    <div>
      <TaskList />
    </div>
  );
};

export default App;