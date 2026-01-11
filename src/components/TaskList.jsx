import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, reset } from "../features/task/taskSlice";
import TaskItem from "./TaskItem";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import AOS from "aos";

const TaskList = () => {
  const dispatch = useDispatch();

  const { tasks, isError, isLoading, message } = useSelector(
    (state) => state.task
  );

  // Fetch tasks ONCE
  useEffect(() => {
    dispatch(getTasks());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  // Handle error & AOS refresh
  useEffect(() => {
    if (isError) {
      toast.error(message || "Failed to fetch tasks ❌", {
        toastId: "task-fetch-error",
      });
    }

    // refresh animations after data loads
    if (!isLoading) {
      AOS.refresh();
    }
  }, [isError, isLoading, message]);

  if (isLoading) return <Spinner />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.length === 0 ? (
        <h1
          className="text-center mt-3 font-semibold col-span-full"
          data-aos="fade-up"
        >
          No tasks found!
        </h1>
      ) : (
        tasks.map((task) => (
          <div data-aos="zoom-in" key={task._id}>
            <TaskItem task={task} />
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
