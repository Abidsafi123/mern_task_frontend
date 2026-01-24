import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/tasks`;

// CREATE TASK
const createTask = async (taskData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.post(API_URL, taskData, config);
  return res.data;
};

// GET TASKS
const getTasks = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(API_URL, config);
  return res.data;
};

// DELETE TASK
const deleteTask = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.delete(`${API_URL}/${id}`, config);
  return res.data;
};

export default { createTask, getTasks, deleteTask };
