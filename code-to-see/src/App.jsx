import { useState, useEffect } from 'react';
import './App.css';

import Navbar from "./components/Navbar";
import Footerlab from './components/Footerlab';

import { v4 as uuidv4 } from 'uuid'; // Importing uuid
import { FaEdit } from "react-icons/fa"; // Edit icon
import { MdDelete } from "react-icons/md"; // Delete icon
import { MdLibraryAddCheck } from "react-icons/md"; // Add icon

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const savedTodos = JSON.parse(todoString);
      setTodos(savedTodos);
    }
  }, []);

  //* Runs whenever the todos array changes. It saves the current to-dos to local storage.
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (id) => {
    const t = todos.find(i => i.id === id);
    setTodo(t.todo);
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
  };

  const handleDelete = (id) => {
    const result = window.confirm("Do you want to delete this task?");
    if (result) {
      const newTodos = todos.filter(item => item.id !== id);
      setTodos(newTodos);
    }
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex(item => item.id === id);
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="container sm:mx-auto my-5 rounded-xl p-2 sm:p-5 bg-rose-300 min-h-[86vh]">
        <h1 className="font-serif font-bold text-center text-lg text-rose-950">
          MY-ToDo -- Manage your todos at one place
        </h1>
        <div className="addTodo mb-3">
          <h2 className="text-base font-bold text-slate-900 my-2">Add a Todo</h2>
          <div className="flex">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              name="task"
              className="outline-rose-950 focus:outline-dashed focus:outline-[1.5px] w-[75%] px-3 py-[3px] rounded-full bg-rose-100 text-slate-700"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="bg-rose-700 disabled:bg-rose-400 disabled:outline-dashed cursor-pointer text-sm text-white hover:bg-rose-950 px-3 py-[5px] rounded-md font-medium mx-2 my-2 sm:my-0"
            >
              <MdLibraryAddCheck />
            </button>
          </div>
        </div>
        <input type="checkbox" onChange={toggleFinished} checked={showFinished} />
        <label className="mx-2 font-medium text-sm" htmlFor="show">
          Show Finished
        </label>
        <div className="h-[1px] bg-black opacity-25 w-[95%] mx-auto my-2"></div>
        <h2 className="text-base font-bold text-slate-900 my-2">Your ToDo :</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-3">No Todos to display</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && (
              <div
                key={item.id}
                className="todo flex flex-col sm:flex-row gap-1 sm:gap-3 my-3 w-[80%] sm:justify-between"
              >
                <div className="flex gap-3">
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex gap-1 sm:gap-2 h-full justify-start ml-5 sm:ml-0 sm:justify-end">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-rose-700 text-sm text-white hover:bg-rose-950 px-3 py-[7px] rounded-md font-medium"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-rose-700 text-sm text-white hover:bg-rose-950 px-3 py-[7px] rounded-md font-medium"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footerlab />
    </>
  );
}

export default App;
