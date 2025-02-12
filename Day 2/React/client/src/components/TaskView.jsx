import PageHeader from "./PageHeader";
import { useParams } from "react-router-dom";

const tasks = [
  { id: 1, name: "Complete Bootstrap", status: "Pending" },
  { id: 2, name: "Sleeping", status: "Completed" },
];

const TaskView = () => {
  const { id } = useParams();
  const task = tasks.find((task) => task.id === parseInt(id));

  return (
    <div>
      <PageHeader />
      <h3> View Task </h3>
      <div className="form-group  mb-3">
        <label className="form-label">Task Name: </label>
        <div className="form-control"> {task.name || "Not Found"}</div>
      </div>
      <div className="form-group  mb-3">
        <label className="form-label">Task Status: </label>
        <div className="form-control"> {task.status || "Not Found"}</div>
      </div>
    </div>
  );
};

export default TaskView;
