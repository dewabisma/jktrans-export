import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';

const bookinganListAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
  sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const initialState = bookinganListAdapter.getInitialState({
  status: 'idle',
  error: null,
  currentPage: null,
  totalPageCount: null,
  totalBookingan: null,
});

export const fetchAllBookingan = createAsyncThunk(
  'bookingan/fetchAll',
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
      const { data } = await axios.get('/api/bookings', config);

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

const bookinganListSlice = createSlice({
  name: 'bookingan',
  initialState,
  reducers: {
    addNew: (state, action) => {
      bookinganListAdapter.addOne(state, action.payload);
      state.totalNota += 1;
    },
    resetBookinganState: (state, action) => {
      state.ids = [];
      state.entities = {};
      state.status = 'idle';
      state.error = null;
      state.currentPage = null;
      state.totalPageCount = null;
      state.totalBookingan = null;
    },
  },
  extraReducers: {
    [fetchAllBookingan.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchAllBookingan.fulfilled]: (state, action) => {
      state.status = 'success';
      bookinganListAdapter.addMany(state, action.payload);
    },
    [fetchAllBookingan.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { addNew, resetBookinganState } = bookinganListSlice.actions;

export default bookinganListSlice.reducer;

export const {
  selectAll: selectAllRekapan,
  selectIds: selectRekapanIds,
  selectById: selectRekapanById,
} = bookinganListAdapter.getSelectors((state) => state.bookingan);

export const selectBookingan = (state) => {
  const dataBookingan = selectAllRekapan(state);

  return { ...state.bookingan, entities: dataBookingan };
};
