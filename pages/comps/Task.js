import React from "react";

const Task = ({ task, deleteTask, editTask }) => {
  return (
    <tr key={task.id}>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{task.taskName}</div>
      </td>
      <td className="text-right px-6 py-4 whitespace-nowrap">
        <a
          onClick={(e, id) => editTask(e, task.id)}
          className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer px-4">
          Edit
        </a>
        <a
          onClick={(e, id) => deleteTask(e, task.id)}
          className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer">
          Delete
        </a>
      </td>
    </tr>
  );
};

export default Task;