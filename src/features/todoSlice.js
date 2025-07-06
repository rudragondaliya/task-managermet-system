import { createSlice } from "@reduxjs/toolkit";
import { createTodo, deleteTodo, editUser, fetchData } from "./thunk";

const initialState = {
  todos: [],
  selectedTodo: null,
  loading: false,
  error: false,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setSelectedTodo: (state, action) => {
      state.selectedTodo = action.payload;
    },
    clearSeletetedTodo: (state) => {
      state.selectedTodo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // CREATE
      .addCase(createTodo.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // DELETE
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ✅ EDIT (Fixed Here)
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        const { id, val } = action.payload;
        state.todos = state.todos.map((todo) =>
          todo.id === id ? { ...todo, val } : todo
        );
      })
      .addCase(editUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { setSelectedTodo, clearSeletetedTodo } = todoSlice.actions;
export default todoSlice.reducer;
