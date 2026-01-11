import axios from "axios";
const API_URL = "http://localhost:8000/api/tasks"

const createTask = async (task,token) => {
    const config = {
      headers:{
          'Authorization':`Bearer ${token}`
      }
    }
  const res = await axios.post(API_URL, task,config);

  if (res.data) {
    return res.data;
  }
};

const getTasks = async(token)=>{
    const config = {
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }
    const res = await axios.get(API_URL,config)
    if(res.data){
        return res.data
    }
}


// delete task
 
const deleteTask = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.delete(`${API_URL}/${id}`, config)

  return res.data
}

export default { createTask,getTasks,deleteTask };
