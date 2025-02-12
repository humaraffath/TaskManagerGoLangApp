import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskCreate from "./components/TaskCreate";
import TaskView from "./components/TaskView";
import TaskEdit from "./components/TaskEdit"; // Added TaskEdit

function App() {
  return (
    <BrowserRouter>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/tasks/list" element={<TaskList />} />
          <Route path="/tasks/create" element={<TaskCreate />} />
          <Route path="/tasks/view/:id" element={<TaskView />} />
          <Route path="/tasks/edit/:id" element={<TaskEdit />} />{" "}
          {/* New Edit Route */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
