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
  updateStatus: null,
  deleteStatus: null,
  error: null,
  updateError: null,
  deleteError: null,
  message: null,
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

export const editRekapanById = createAsyncThunk(
  'rekapan/edit',
  async (data, { rejectWithValue, getState }) => {
    const { rekapanId, editedRekapan } = data;

    const {
      currentUser: {
        entity: { authToken },
      },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    };

    try {
      const { data } = await axios.put(
        `/api/rekapan/${rekapanId}`,
        editedRekapan,
        config
      );

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

export const deleteRekapanById = createAsyncThunk(
  'rekapan/delete',
  async (rekapanId, { rejectWithValue, getState }) => {
    const {
      currentUser: {
        entity: { authToken },
      },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    try {
      const { data } = await axios.delete(`/api/rekapan/${rekapanId}`, config);

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
  reducers: {
    addNew: (state, action) => {
      rekapanListAdapter.addOne(state, action.payload);
      state.totalRekapan += 1;
    },
    resetRekapanState: (state, action) => {
      state.ids = [];
      state.entities = {};
      state.status = 'idle';
      state.updateStatus = null;
      state.error = null;
      state.updateError = null;
      state.message = null;
      state.currentPage = null;
      state.totalPageCount = null;
      state.totalRekapan = null;
    },
    resetUpdateRekapanState: (state, action) => {
      state.updateStatus = null;
      state.updateError = null;
      state.message = null;
    },
    resetDeleteRekapanState: (state, action) => {
      state.deleteStatus = null;
      state.deleteError = null;
      state.message = null;
    },
  },
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
    [editRekapanById.pending]: (state, action) => {
      state.updateStatus = 'loading';
    },
    [editRekapanById.fulfilled]: (state, action) => {
      const { message, data } = action.payload;

      state.updateStatus = 'success';
      state.message = message;
      state.totalRekapan += 1;
      rekapanListAdapter.upsertOne(state, data);
    },
    [editRekapanById.rejected]: (state, action) => {
      state.updateStatus = 'failed';
      state.updateError = action.payload;
    },
    [deleteRekapanById.pending]: (state, action) => {
      state.deleteStatus = 'loading';
    },
    [deleteRekapanById.fulfilled]: (state, action) => {
      const { message, deletedRekapan } = action.payload;

      state.deleteStatus = 'success';
      state.message = message;
      state.totalRekapan -= 1;
      rekapanListAdapter.removeOne(state, deletedRekapan._id);
    },
    [deleteRekapanById.rejected]: (state, action) => {
      state.deleteStatus = 'failed';
      state.deleteError = action.payload;
    },
  },
});

export const {
  addNew,
  resetRekapanState,
  resetUpdateRekapanState,
  resetDeleteRekapanState,
} = rekapanListSlice.actions;

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
