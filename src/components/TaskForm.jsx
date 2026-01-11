import React, { useState } from "react";
import { toast } from "react-toastify";

import { useDispatch,useSelector } from "react-redux";
import {addTask} from "../features/task/taskSlice"
import { useNavigate } from "react-router-dom";
 
const TaskForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
 
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) {
      toast.error("Task cannot be empty ❌");
      return;
    }
    dispatch(addTask({text}))
    toast.success('Task added successfully ')

 //Later: dispatch(createTask({ text }))
    console.log("Task Added:", text);


    setText(""); // clear input
    navigate('/alltask')
    
  };

  return (
    <section className="flex justify-center items-center shadow-lg shadow-gray-400 max-w-lg mx-auto mt-5 p-5 rounded-lg">
      <form onSubmit={handleSubmit} className="flex flex-col w-full" data-aos='fade-up' >
        <label htmlFor="task" className="text-xl mb-2" data-aos='fade-left'>
          Create Task 
        </label>

        <input
        data-aos="fade-right"
          id="task"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border border-gray-300 px-3 py-2 outline-none rounded-md"
          placeholder="Enter your task"
        />

        <button
        data-aos = "flip-up"
          type="submit"
          className="bg-black text-white px-2 py-2 mt-5 rounded-md uppercase hover:opacity-90 transition cursor-pointer "
        >
          Add Task
        </button>
      </form>
    </section>
  );
};

export default TaskForm;
