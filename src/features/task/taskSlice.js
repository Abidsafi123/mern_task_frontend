import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "./taskService";

const initialState = {
  tasks: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// CREATE TASK
export const addTask = createAsyncThunk(
  "task/createTask",
  async (taskData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const res = await taskService.createTask(taskData, token);
      return res.task; // ⚠ return single task object
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.toString());
    }
  }
);

// GET TASKS
export const getTasks = createAsyncThunk(
  "task/getTasks",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const res = await taskService.getTasks(token);
      return res.tasks || []; // ⚠ always return array
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.toString());
    }
  }
);

// DELETE TASK
export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      await taskService.deleteTask(id, token);
      return id; // return deleted task id
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.toString());
    }
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(addTask.pending, (state) => { state.isLoading = true; })
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks.push(action.payload); // ⚠ single task object
      })
      .addCase(addTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // GET
      .addCase(getTasks.pending, (state) => { state.isLoading = true; })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = action.payload; // ⚠ ensure array
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // DELETE
      .addCase(deleteTask.pending, (state) => { state.isLoading = true; })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = taskSlice.actions;
export default taskSlice.reducer;
