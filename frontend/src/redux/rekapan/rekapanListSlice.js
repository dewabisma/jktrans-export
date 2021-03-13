import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';

const rekapanListAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const initialState = rekapanListAdapter.getInitialState({
  status: 'idle',
  error: null,
  totalRekapan: null,
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
      const {
        allRekapan,
        totalPageCount,
        totalRekapan,
        currentPage,
      } = action.payload;

      state.status = 'success';
      state.totalRekapan = totalRekapan;
      state.currentPage = currentPage;
      state.totalPageCount = totalPageCount;
      rekapanListAdapter.upsertMany(state, allRekapan);
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
} = rekapanListAdapter.getSelectors((state) => state.rekapan);

export const selectRekapan = (state) => {
  const allRekapan = selectAllRekapan(state.rekapan);
  return {
    ...state.rekapan,
    entities: allRekapan,
  };
};
