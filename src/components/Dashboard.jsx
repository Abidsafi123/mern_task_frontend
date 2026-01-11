import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TaskForm from "./TaskForm";
import { getTasks } from "../features/task/taskSlice";
import TaskList from "./TaskList";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.task
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getTasks());
    }
  }, [user, navigate, dispatch]);

  return (
    <div>
      {/* Welcome */}
      <h1 data-aos='fade-up' className="text-center font-semibold mt-5">
        Welcome {user?.username}
      </h1>

      
     
     <div className="flex justify-center mt-5">
      <button onClick={()=> navigate('/alltask')}   className="bg-black text-white py-1 px-3 rounded uppercase hover:opacity-85">Check Tasks</button>
     </div>

      <TaskForm />

       
     

       
    </div>
  );
};

export default Dashboard;
