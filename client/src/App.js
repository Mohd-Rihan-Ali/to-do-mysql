import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Import CSS file for styling

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [date, setDate] = useState("");
  const [task, setTask] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [filterKeyword, setFilterKeyword] = useState("");

  useEffect(() => {
    fetchTasks();
  }, [userId]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`/tasks/${userId}`);
      setTasks(response.data);
      setFilteredTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    try {
      await axios.post(`/task/${userId}`, { date, task });
      setDate("");
      setTask("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/task/${userId}/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleSignup = async () => {
    try {
      await axios.post("/signup", { username, password });
      alert("Signup successful");
    } catch (error) {
      alert(error.response.data.error || "Signup failed");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("/login", { username, password });
      alert("Login successful");
      setIsLoggedIn(true);
      setUserId(response.data.userId);
    } catch (error) {
      alert(error.response.data.error || "Login failed");
    }
  };

  const handleFilterChange = (e) => {
    setFilterKeyword(e.target.value);
    filterTasks(e.target.value);
  };

  const filterTasks = (keyword) => {
    const filtered = tasks.filter((task) => {
      const taskDate = new Date(task.date).toLocaleDateString();
      return taskDate.includes(keyword);
    });
    setFilteredTasks(filtered);
  };

  if (!isLoggedIn) {
    return (
      <div className="app-container">
        <h1>Login</h1>
        <div className="login-container">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <button onClick={handleSignup}>Sign Up</button>
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="app-container">
        <h1>To-Do List</h1>
        <div className="input-container">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input-date"
          />
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="input-task"
          />
          <button onClick={addTask} className="add-button">
            Add Task
          </button>
        </div>
        <input
          type="text"
          placeholder="Filter tasks"
          value={filterKeyword}
          onChange={handleFilterChange}
          className="filter-input"
        />
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <li key={task.id} className="task-item">
              <span>{new Date(task.date).toLocaleDateString()}</span>
              <span>{task.task}</span>
              <button
                onClick={() => deleteTask(task.id)}
                className="delete-button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
