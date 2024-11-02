import React, { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      addTask();
    }
  }

  function addTask() {
    if (newTask.trim() !== "") {
      const currentDate = new Date();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const year = currentDate.getFullYear();
      let hours = currentDate.getHours();
      const meridiem = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      const minutes = String(currentDate.getMinutes()).padStart(2, "0");
      const timeString = `${hours}:${minutes} ${meridiem}`;
      const fullDate = `${month}/${day}/${year} ${timeString}`;
      setTasks((prevTasks) => [...prevTasks, { text: newTask, date: fullDate }]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  return (
    <div className="toDoList font-sans mx-8 my-12 text-center">
      <h1 className="text-4xl font-bold mb-8">Plan Your Tasks</h1>
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="text-lg p-2 border-2 border-gray-300 rounded-lg mr-2 focus:outline-none"
        />
        <button
          onClick={addTask}
          className="addButton bg-[#611171] hover:bg-[#520262] text-white font-semibold px-4 py-2 rounded-lg transition duration-200"
        >
          Add
        </button>
      </div>
      <ol className="space-y-4">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="flex items-center text-lg font-semibold bg-gray-100 border border-gray-300 rounded-lg p-4"
          >
            <span className="flex-1">{task.date}</span>
            <span className="flex-1">{task.text}</span>
            <button
              onClick={() => moveTaskUp(index)}
              className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded-lg ml-2"
            >
              Up &#8593;
            </button>
            <button
              onClick={() => deleteTask(index)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg ml-2"
            >
              Delete
            </button>
            <button
              onClick={() => moveTaskDown(index)}
              className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded-lg ml-2"
            >
              Down &#8595;
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
