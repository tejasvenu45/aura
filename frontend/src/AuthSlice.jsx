import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getProfile = createAsyncThunk('auth/getProfile', async function(_, { getState }) {
    const res = await fetch('http://localhost:8000/user', { credentials: 'include' });
    if (!res.ok) { throw new Error('Not authenticated') }

    const data = await res.json();
    return data;
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
      user: null,
      status: 'idle',
      error: null,
    },
    reducers: {
      login: (state, action) => {
        state.user = action.payload;
      },
      logout: (state) => {
        state.user = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getProfile.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getProfile.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.user = action.payload;
        })
        .addCase(getProfile.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message; // corrected from action.payload
        });
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
