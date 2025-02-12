import PageHeader from "./PageHeader";
import { Link } from "react-router-dom";

const TaskList = () => {
  const tasks = [
    { id: 1, name: "Complete Bootstrap", status: "Pending" },
    { id: 2, name: "Sleeping", status: "Completed" },
  ];

  return (
    <div>
      <PageHeader />
      <div className="container">
        <h3> List of Tasks </h3>
        <table className="table table-body-tertiary table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Task Title</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td> {task.id} </td>
                <td> {task.name} </td>
                <td> {task.status} </td>
                <td>
                  <Link to={`/view/${task.id}`} className="btn btn-primary">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
