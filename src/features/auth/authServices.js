import axios from "axios";

// const API_URL = `${import.meta.env.VITE_API_URL}/api/user`; // no trailing slash
const API_URL = `http://localhost:8000/api/user`
// REGISTER
const registerUser = async (userData) => {
  const res = await axios.post(`${API_URL}`, userData);
  if (res.data) localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};

// LOGIN
const loginUser = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData);
  if (res.data) localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};

// LOGOUT
const logoutUser = async (userData) => {
  const res = await axios.post(`${API_URL}/logout`,userData)
  if(res.data){

    localStorage.removeItem("user");
  }
  
};

export default { registerUser, loginUser, logoutUser };
