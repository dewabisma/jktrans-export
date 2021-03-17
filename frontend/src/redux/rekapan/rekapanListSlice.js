import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';

const rekapanListAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
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
      const { data } = await axios.get('/api/rekapan', config);

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
      rekapanListAdapter.addMany(state, allRekapan);
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
  const dataRekapan = selectAllRekapan(state);

  return {
    ...state.rekapan,
    entities: dataRekapan,
  };
};
