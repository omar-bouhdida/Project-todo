import { React, useState, useEffect } from "react";
import EditTask from "./EditTask";
import Task from "./Task";

const TaskList = ({ task }) => {
  const TASK_API_BASE_URL = "http://localhost:8080/api/v1/tasks";
  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [taskId, setTaskId] = useState(null);
  const [responseTask, setResponseTask] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(TASK_API_BASE_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const tasks = await response.json();
        setTasks(tasks);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [task, responseTask]);

  const deleteTask = (e, id) => {
    e.preventDefault();
    fetch(TASK_API_BASE_URL + "/" + id, {
      method: "DELETE",
    }).then((res) => {
      if (tasks) {
        setTasks((prevElement) => {
          return prevElement.filter((task) => task.id !== id);
        });
      }
    });
  };

  const editTask = (e, id) => {
    e.preventDefault();
    setTaskId(id);
  };

  return (
    <>
      <div className="container mx-auto my-8">
        <div className="flex shadow border-b">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  Task Name
                </th>
              </tr>
            </thead>
            {!loading && (
              <tbody className="bg-white">
                {tasks?.map((task) => (
                  <Task
                    task={task}
                    key={task.id}
                    deleteTask={deleteTask}
                    editTask={editTask}
                  />
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
      <EditTask taskId={taskId} setResponseTask={setResponseTask} />
    </>
  );
};

export default TaskList;