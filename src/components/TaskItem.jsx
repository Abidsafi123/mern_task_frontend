import React from 'react'
import { FaTrashAlt } from "react-icons/fa"
import { useDispatch } from 'react-redux'
import { deleteTask } from '../features/task/taskSlice'
import { toast } from "react-toastify"

const TaskItem = ({ task }) => {
  const dispatch = useDispatch()

  const onDelete = () => {
     
    const confirmDelete = window.confirm("Are you sure you want to delete this task?")

    if(confirmDelete){
        dispatch(deleteTask(task._id))
        toast.success("Task deleted successfully ✅")
    }
  }

  return (
    <div data-aos = 'flip-left' className="relative bg-gray-200 p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 mt-2 ">

      <button
        onClick={onDelete}
        
        className=" cursor-pointer absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
        title="Delete Task"
      >
        <FaTrashAlt size={18} />
      </button>

      <p className="text-sm text-gray-500 mb-2">
        {new Date(task.createdAt).toLocaleString('en-US')}
      </p>

      <h2 className="text-lg  font-semibold text-gray-800">
        {task.text}
      </h2>

    </div>
  )
}

export default TaskItem
