import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser, reset } from "../features/auth/authSlice";
import Spinner from "./Spinner";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isSuccess, error, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    c_password: "",
  });

  const { username, email, password, c_password } = formData;

  // reset any previous state on component mount
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password || !c_password) {
      toast.error("All fields are required");
      return;
    }

    if (password !== c_password) {
      toast.error("Passwords do not match");
      return;
    }

    dispatch(registerUser({ username, email, password }));
  };

  // handle auth result
  useEffect(() => {
    if (error) {
      toast.error(message);
      dispatch(reset()); // reset error after showing
    }

    if (isSuccess) {
      toast.success(message || "Registration successful 🎉");
      navigate("/"); // navigate to home
      dispatch(reset()); // reset success state
    }
  }, [isSuccess, error, message, navigate, dispatch]);

  return (
    <div  className="flex flex-col justify-center p-6 max-w-md mx-auto shadow-lg my-10">
      <div className="flex justify-center gap-3 mb-4">
        <FaUser size={30} />
        <h1 className="text-2xl font-semibold" data-aos='fade-up'>Register</h1>
      </div>

      <form data-aos='fade-up' onSubmit={handleSubmit} className="space-y-4">
        <input
        data-aos='fade-right'
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full border border-gray-200 px-3 py-2 rounded outline-none "
        />

        <input
        data-aos='fade-left'
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full border border-gray-200 px-3 py-2 rounded outline-none"
        />

        <input
        data-aos='fade-right'
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full border border-gray-200 px-3 py-2 rounded outline-none"
        />

        <input
        data-aos='fade-left'
          type="password"
          name="c_password"
          placeholder="Confirm Password"
          value={c_password}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full border border-gray-200 px-3 py-2 rounded outline-none"
        />

        <button
        data-aos='flip-up'
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white py-2 rounded font-semibold hover:opacity-90 flex justify-center items-center"
        >
          {isLoading ? <Spinner /> : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
