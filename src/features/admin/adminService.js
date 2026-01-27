import axios from "axios"

const API_URL = `http://localhost:8000/api/admin/users`

const getAllUsers = async()=>{
     const config = {
        headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`

        }
     }
     const res = await axios.get(API_URL,config)
     if(res.data){
        return res.data
     }
}
const adminService = {getAllUsers}
export default adminService