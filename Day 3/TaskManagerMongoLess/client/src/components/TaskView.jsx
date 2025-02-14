import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const TaskView = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/tasks/${id}`)
      .then((response) => {
        console.log("API Response: ", response.data);
        setTask(response.data);
      })
      .catch(() => setError("Task not found"));
  }, [id]);

  if (error) return <p className="text-danger">{error} </p>;
  if (!task) return <p> Loading task.... </p>;

  return (
    <div className="container mt-4">
      <h3> View Task </h3>
      <div className="card p-3">
        <p>
          <strong>Task ID: </strong> {task.id}
        </p>
        <p>
          <strong>Task Title: </strong> {task.title}
        </p>
        <p>
          <strong>Task Status: </strong> {task.status}
        </p>
      </div>
      <Link to="/tasks/list" className="btn btn-light mt-3">
        Go Back{" "}
      </Link>
    </div>
  );
};

export default TaskView;
