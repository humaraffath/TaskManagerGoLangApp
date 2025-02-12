import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/tasks")
      .then((response) => {
        console.log("API Response:", response.data); // Debugging log
        setTasks(response.data);
      })
      .catch(() => setError("Failed to load tasks"));
  }, []);

  return (
    <div className="container mt-4">
      <h3>Task List</h3>
      {error && <p className="text-danger">{error}</p>}
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Task Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title || "No Title"}</td>{" "}
              {/* Ensure title is displayed */}
              <td>{task.status}</td>
              <td>
                <Link
                  to={`/tasks/view/${task.id}`}
                  className="btn btn-primary btn-sm me-2"
                >
                  View
                </Link>
                <Link
                  to={`/tasks/edit/${task.id}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </Link>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
