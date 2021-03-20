import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  state: 'idle',
  nota: {},
  error: null,
};

export const addNewNota = createAsyncThunk(
  'nota/addNew',
  async (newNota, { rejectWithValue, getState }) => {
    const {
      currentUser: {
        entity: { authToken },
      },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    };

    try {
      const { data } = await axios.post('/api/nota', newNota, config);

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

const createNotaSlice = createSlice({
  name: 'nota',
  initialState,
  reducers: {},
  extraReducers: {
    [addNewNota.pending]: (state, action) => {
      state.status = 'loading';
    },
    [addNewNota.fulfilled]: (state, action) => {
      state.status = 'success';
      state.nota = action.payload;
    },
    [addNewNota.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export default createNotaSlice.reducer;
