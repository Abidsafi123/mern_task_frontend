import axios from "axios";

const API_URL = "http://localhost:8000/api/user/";

// REGISTER
const registerUser = async (userData) => {
  const res = await axios.post(API_URL, userData);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data; //  returns USER object
};

// LOGIN
const loginUser = async (userData) => {
  const res = await axios.post(`${API_URL}login`, userData);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data; //  returns USER object
};

// LOGOUT
const logoutUser = async () => {
  localStorage.removeItem("user");
};

export default { registerUser, loginUser, logoutUser };
