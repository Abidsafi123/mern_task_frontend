import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"

import adminService from "./adminService"
import { act } from "react"
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

export const adminSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{
        reset:(state)=>{
             initialState
        }

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAllUsers.pending,(state)=>{
            state.isLoading = true
        })
        builder.addCase(fetchAllUsers.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.isError = false,
            state.isSuccess = true,
            state.users = action.payload,
            state.message = action.payload
        })
        builder.addCase(fetchAllUsers.rejected,(state,action)=>{
            state.isError = true,
            state.isLoading = false,
            state.message = action.payload

        })
    }
})
export const {reset} = adminSlice.actions;
export default adminSlice.reducer