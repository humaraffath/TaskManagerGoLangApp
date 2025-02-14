import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TaskCreate = () => {
  const [task, setTask] = useState({
    title: "",
    status: "Pending",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/tasks", task, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Task Created: ", response.data);
      alert("Task Created Successfully!");
      navigate("/tasks/list");
    } catch (error) {
      console.error(
        "Error Creating Task: ",
        error.response ? error.response.data : error.message
      );
      alert("Error Creating Task");
    }
  };

  return (
    <div className="container mt-4">
      <h3> Add Task </h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label for="name" className="form-label">
            Task Title:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            placeholder="Type your task here"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label for="status" className="form-label">
            Task Status:
          </label>
          <select
            className="form-control"
            id="status"
            value={task.status}
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
  );
};

export default TaskCreate;
