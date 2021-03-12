import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  entity: {},
  error: null,
};

export const userLogin = createAsyncThunk('user/login', async (userData) => {
  try {
    const body = userData;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/users/login', body, config);

    return data;
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    return message;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.status = 'loading';
    },
    [userLogin.fulfilled]: (state, action) => {
      state.status = 'success';
      state.entity = action.payload;
    },
    [userLogin.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;

// Selector
export const selectAuthToken = (state) => state.currentUser.entity.authToken;
