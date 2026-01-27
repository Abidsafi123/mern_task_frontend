import axios from "axios";

// const API_URL = `${import.meta.env.VITE_API_URL}/api/tasks`; // no trailing slash
const API_URL = `http://localhost:8000/api/tasks`
// CREATE TASK
const createTask = async (taskData, token) => {
  const res = await axios.post(API_URL, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; // expects { task: {...} }
};

// GET ALL TASKS
const getTasks = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; // expects { tasks: [...] }
};

// DELETE TASK
const deleteTask = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; // expects { success: true }
};

export default { createTask, getTasks, deleteTask };
