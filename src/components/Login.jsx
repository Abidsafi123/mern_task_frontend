import React, { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import AOS from "aos"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccess,error, message } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required!");
      return;
    }
   

    dispatch(loginUser({ email, password }));
  };
useEffect(() => {
  if (error) {
    toast.error(message);
    dispatch(reset());
    return;
  }

  if (isSuccess && user) {
    toast.success("Login successful 🎉");
    navigate("/");
    dispatch(reset());
  }
}, [isSuccess, user, error, message, navigate, dispatch]);

  return (
    <div className="flex flex-col justify-center p-6 max-w-md mx-auto shadow-lg my-8" data-aos = "fade-up">
      <div className="flex justify-center gap-3">
        <FaSignInAlt size={30} />
        <h1 className="text-2xl font-semibold" data-aos = "fade-up">Login</h1>
      </div>

      <form onSubmit={handleSubmit} className="mt-6">
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border px-3 py-2 mb-4 rounded border-gray-200 outline-none"
          data-aos = 'fade-right'
        />

        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border px-3 py-2 mb-4 rounded border-gray-200 outline-none"
          data-aos = 'fade-left'
        />

        <button
          disabled={isLoading}
          data-aos = 'flip-up'
          className="w-full bg-black text-white py-2 rounded cursor-pointer"
        >
          {isLoading ? <Spinner /> : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
