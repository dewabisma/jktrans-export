import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  entity: {},
  error: null,
};

export const userLogin = createAsyncThunk(
  'user/login',
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post('/api/users/login', userData, config);

      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      return rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.entity = {};
      state.status = 'idle';
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.status = 'loading';
    },
    [userLogin.fulfilled]: (state, action) => {
      state.status = 'success';
      state.entity = action.payload;
      state.error = null;
    },
    [userLogin.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;

// Selector
export const selectAuthToken = (state) => state.currentUser.entity.authToken;
