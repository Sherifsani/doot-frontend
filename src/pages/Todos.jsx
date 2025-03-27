import React, { useState, useEffect } from "react";
import iconCheck from "../assets/images/icon-check.svg";
import iconCross from "../assets/images/icon-cross.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Todos = () => {
  const [todo, setTodo] = useState({ todo: "" });
  const [error, setError] = useState("");
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          navigate("/login");
          return;
        }
        
        const res = await axios.get("http://localhost:3000/api/todo/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTodos(res.data.data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("accessToken");
          navigate("/login");
        } else {
          setError(err.response?.data?.message || "Failed to fetch todos");
        }
      }
    };
    getData();
  }, [navigate]);

  const handleChange = (e) => {
    setError(""); // Clear any previous errors
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/login");
        return;
      }

      await axios.post("http://localhost:3000/api/todo/create", todo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodo({ todo: "" });
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("accessToken");
        navigate("/login");
      } else {
        setError(err.response?.data?.message || "Failed to create todo");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen pb-20 relative">
      <div className="w-full max-w-lg mx-auto -translate-y-16 flex flex-col items-center gap-10">
        <form action="" className="w-5/6 mx-auto" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="text"
            placeholder="create a new todo ..."
            name="todo"
            value={todo.todo}
            className="p-3 border border-gray-300 rounded-sm focus:outline-none w-full bg-white"
          />
          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        </form>
        <div className="todo-items w-5/6 mx-auto shadow-lg rounded-sm">
          {todos.map((todo) => (
            <TodoItem key={todo._id} todo={todo} />
          ))}
        </div>
      </div>
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg px-8">
        <button
          onClick={handleLogout}
          className="w-full p-3 text-center bg-blue-300 text-white rounded-sm hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const TodoItem = ({ todo }) => {
  const [isDone, setIsDone] = useState(todo.completed);

  return (
    <div className="todo-item flex gap-3 items-center w-full py-4 px-3 border-b border-gray-300 last:border-b-0">
      <div
        className={`check w-4 h-4 grid place-items-center border rounded-full cursor-pointer ${
          isDone &&
          "bg-gradient-to-r from-[hsl(192,100%,67%)] to-[hsl(280,87%,65%)]"
        }`}
        onClick={() => setIsDone(!isDone)}
      >
        {isDone && <img src={iconCheck} alt="" className="w-2 h-2" />}
      </div>
      <p className={isDone ? "line-through" : ""}>{todo.todo}</p>
      <div className="delete w-4 h-4 cursor-pointer ml-auto">
        <img
          src={iconCross}
          alt=""
          className="w-3 h-3"
          onClick={() => setIsDone(!isDone)}
        />
      </div>
    </div>
  );
};

export default Todos;
