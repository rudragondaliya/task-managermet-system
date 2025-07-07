import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstances } from "../api/axiosInstances";

export const fetchData = createAsyncThunk("todo/fetchData", async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstances.get("/.json");
    if (!res.data) return [];
    return Object.entries(res.data).map(([id, val]) => ({ id, val }));
  } catch (error) {
    console.error(error.message);
    return rejectWithValue(error.message);
  }
});




export const createTodo = createAsyncThunk(
  "todo/createTodo",
  async (todo, { rejectWithValue }) => {
    try {
      const res = await axiosInstances.post("/.json", todo);
      return { ...todo, id: res.data.name };
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);


 export const deleteTodo = createAsyncThunk("todo/deleteTodo",async(id,{rejectWithValue})=>{
    try {
        const res = await axiosInstances.delete(`${id}/.json`);
        return id
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const editUser = createAsyncThunk(
  "todo/editUser",
  async ({ id, val }, { rejectWithValue }) => {
    try {
      await axiosInstances.patch(`/${id}.json`, val);
      return { id, val };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
