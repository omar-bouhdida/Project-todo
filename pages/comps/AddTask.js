import { Dialog, Transition } from "@headlessui/react";
import React, { useState } from "react";
import { Fragment } from "react";
import TaskList from "./TaskList";

const AddTask = () => {
  const TASK_API_BASE_URL = "http://localhost:8080/api/v1/tasks";

  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState({
    id: "",
    taskName: "",
  });
  const [responseTask, setResponseTask] = useState({
    id: "",
    taskName: "",
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleChange = (event) => {
    const value = event.target.value;
    setTask({ ...task, [event.target.name]: value });
  };

  const saveTask = async (e) => {
    e.preventDefault();
    const response = await fetch(TASK_API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const _task = await response.json();
    setResponseTask(_task);
    reset(e);
  };

  const reset = (e) => {
    e.preventDefault();
    setTask({
      id: "",
      taskName: "",
    });
    setIsOpen(false);
  };

  return (
    <>
      <div className="container mx-auto my-8">
        <div className="h-12">
          <button
            onClick={openModal}
            className="rounded bg-slate-600 text-white mx-10 px-9 py-2 font-semibold">
            Add Task
          </button>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add new Task
                </Dialog.Title>
                <div className="flex max-w-md max-auto">
                  <div className="py-2">
                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        Task Name
                      </label>
                      <input
                        type="text"
                        name="taskName" // corrected the name attribute
                        value={task.taskName}
                        onChange={(e) => handleChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"
                      />
                    </div>
                    <div className="h-14 my-4 space-x-4 pt-4">
                      <button
                        onClick={saveTask}
                        className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6"
                      >
                        Save
                      </button>
                      <button
                        onClick={reset}
                        className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <TaskList task={responseTask} />
    </>
  );
};

export default AddTask;
