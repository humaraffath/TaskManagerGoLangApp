import PageHeader from "./PageHeader";
import { useState } from "react";
const TaskCreate = () => {
  const [task, setTask] = useState({
    name: "",
    status: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Task Created: ${task.name}, Status: ${task.status}`);
  };
  return (
    <div>
      <PageHeader />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label for="name" className="form-label">
              Task Title:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              onChange={(e) => setTask({ ...task, name: e.target.value })}
              placeholder="Type your task here"
            />
          </div>
          <div className="form-group mb-3">
            <label for="status" className="form-label">
              Task Status:
            </label>
            <select
              className="form-control"
              id="status"
              onChange={(e) => setTask({ ...task, status: e.target.value })}
            >
              <option value="Pending"> Pending </option>
              <option value="Completed"> Completed </option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskCreate;
