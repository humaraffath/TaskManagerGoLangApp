import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskCreate from "./components/TaskCreate";
import TaskView from "./components/TaskView";
import "./App.css";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<TaskList />} />
      <Route path="/create" element={<TaskCreate />} />
      <Route path="/view/:id" element={<TaskView />} />
    </Routes>
  </Router>
);

export default App;
