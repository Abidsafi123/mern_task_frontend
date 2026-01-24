import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/user/`;

const registerUser = async (userData) => {
  const res = await axios.post(API_URL, userData);
  if (res.data) localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};

const loginUser = async (userData) => {
  const res = await axios.post(`${API_URL}login`, userData);
  if (res.data) localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};

const logoutUser = async () => {
  localStorage.removeItem("user");
};

export default { registerUser, loginUser, logoutUser };
