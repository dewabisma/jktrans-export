import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  isRejectedWithValue,
} from '@reduxjs/toolkit';
import axios from 'axios';

const postAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const initialState = postAdapter.getInitialState({
  status: 'idle',
  error: null,
  currentPage: null,
  totalPageCount: null,
});

export const fetchAllRekapan = createAsyncThunk(
  'rekapan/fetchAll',
  async (undefined, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/rekapan');

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

const rekapanListSlice = createSlice({
  name: 'rekapan',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllRekapan.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchAllRekapan.fulfilled]: (state, action) => {
      state.status = 'success';
      postAdapter.upsertMany(state, action.payload.allRekapan);
      state.currentPage = action.payload.currentPage;
      state.totalPageCount = action.payload.totalPageCount;
    },
    [fetchAllRekapan.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export default rekapanListSlice.reducer;

export const {
  selectIds: selectRekapanIds,
  selectAll: selectAllRekapan,
  selectById: selectRekapanById,
} = postAdapter.getSelectors((state) => state.rekapan);

export const selectRekapan = (state) => state.rekapan;
