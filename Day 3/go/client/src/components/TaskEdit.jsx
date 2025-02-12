import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import PageHeader from "./PageHeader";

const TaskEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ name: "", status: "Pending" });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/tasks/${id}`)
      .then((response) => setTask(response.data))
      .catch(() => alert("Task not found"));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/tasks/${id}`, task);
      alert("Task Updated Successfully!");
      navigate("/tasks/list");
    } catch (error) {
      alert("Error updating task");
    }
  };

  return (
    <div>
      <PageHeader />
      <div className="container">
        <h3>Edit Task</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-2"
            value={task.name}
            onChange={(e) => setTask({ ...task, name: e.target.value })}
          />
          <select
            className="form-control mb-2"
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <button className="btn btn-warning">Update Task</button>
        </form>
        <Link to="/tasks/list" className="btn btn-light mt-2">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default TaskEdit;
