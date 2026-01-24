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
      return await taskService.createTask(taskData, token);
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
      return await taskService.getTasks(token);
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
      return await taskService.deleteTask(id, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.toString());
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: { reset: () => initialState },
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(addTask.pending, (state) => { state.isLoading = true; })
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks.push(action.payload);
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
        state.tasks = action.payload.tasks || action.payload; // handle both {tasks:[..]} or array
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
        state.tasks = state.tasks.filter((task) => task._id !== action.meta.arg);
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
