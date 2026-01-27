import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"

import adminService from "./adminService"
const initialState = {
    users:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:""
}

export const fetchAllUsers = createAsyncThunk('admin/fetchAllUsers',async(_,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await adminService.getAllUsers(token)
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response&&error.response.data && error.response.data.message || error.message || error.toString())


        
    }
})