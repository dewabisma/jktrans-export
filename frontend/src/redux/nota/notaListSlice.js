import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';

const notaListAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const initialState = notaListAdapter.getInitialState({
  status: 'idle',
  error: null,
  currentPage: null,
  totalPageCount: null,
  totalNota: null,
});

export const fetchAllNota = createAsyncThunk(
  'nota/fetchAll',
  async (undefined, { rejectWithValue, getState }) => {
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
      const { data } = await axios.get('/api/nota', config);

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

const notaListSlice = createSlice({
  name: 'nota',
  initialState,
  reducer: {
    resetNota: (state, action) => {
      state = initialState;
    },
  },
  extraReducers: {
    [fetchAllNota.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchAllNota.fulfilled]: (state, action) => {
      const {
        totalPageCount,
        totalNota,
        allNota,
        currentPage,
      } = action.payload;

      state.status = 'success';
      state.currentPage = currentPage;
      state.totalNota = totalNota;
      state.totalPageCount = totalPageCount;
      notaListAdapter.upsertMany(state, allNota);
    },
    [fetchAllNota.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { resetNota } = notaListSlice.actions;

export default notaListSlice.reducer;

export const {
  selectIds: selectNotaIds,
  selectById: selectNotaById,
  selectAll: selectAllNota,
} = notaListAdapter.getSelectors((state) => state.nota);

export const selectNota = (state) => state.nota;
