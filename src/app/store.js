import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice.js";
import taskReducer from "../features/task/taskSlice.js"
import adminReducer from "../features/admin/adminSlice.js"
export const store = configureStore({
    reducer:{
    auth:authReducer,
    task:taskReducer,
    admin:adminReducer
    }
})