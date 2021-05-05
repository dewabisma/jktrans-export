import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';

const notaListAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
  sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const initialState = notaListAdapter.getInitialState({
  status: 'idle',
  updateStatus: null,
  deleteStatus: null,
  error: null,
  updateError: null,
  deleteError: null,
  message: null,
  currentPage: null,
  totalPageCount: null,
  totalNota: null,
});

export const fetchAllNota = createAsyncThunk(
  'nota/fetchAll',
  async (query, { rejectWithValue, getState }) => {
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
      const { data } = await axios.get(`/api/nota?pageSize=999`, config);

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

export const editNotaById = createAsyncThunk(
  'nota/edit',
  async (data, { rejectWithValue, getState }) => {
    const { notaId, editedNota } = data;
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
        `/api/nota/${notaId}`,
        editedNota,
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

export const deleteNotaById = createAsyncThunk(
  'nota/delete',
  async (notaId, { rejectWithValue, getState }) => {
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
      const { data } = await axios.delete(`/api/nota/${notaId}`, config);

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
  reducers: {
    addNew: (state, action) => {
      notaListAdapter.addOne(state, action.payload);
      state.totalNota += 1;
    },
    updateSudahRekapTrue: (state, action) => {
      action.payload.forEach((idNota) => {
        state.entities[idNota].sudahDirekap = true;
      });
    },
    updateSudahRekapFalse: (state, action) => {
      action.payload.forEach((idNota) => {
        state.entities[idNota].sudahDirekap = false;
      });
    },
    resetNotaState: (state, action) => {
      state.ids = [];
      state.entities = {};
      state.status = 'idle';
      state.updateStatus = null;
      state.deleteStatus = null;
      state.error = null;
      state.updateError = null;
      state.deleteError = null;
      state.message = null;
      state.currentPage = null;
      state.totalPageCount = null;
      state.totalNota = null;
    },
    resetUpdateNotaState: (state, action) => {
      state.updateStatus = null;
      state.updateError = null;
      state.message = null;
    },
    resetDeleteNotaState: (state, action) => {
      state.deleteStatus = null;
      state.deleteError = null;
      state.message = null;
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
      notaListAdapter.addMany(state, allNota);
    },
    [fetchAllNota.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [editNotaById.pending]: (state, action) => {
      state.updateStatus = 'loading';
    },
    [editNotaById.fulfilled]: (state, action) => {
      const { message, data } = action.payload;

      state.updateStatus = 'success';
      state.message = message;
      notaListAdapter.upsertOne(state, data);
    },
    [editNotaById.rejected]: (state, action) => {
      state.updateStatus = 'failed';
      state.updateError = action.payload;
    },
    [deleteNotaById.pending]: (state, action) => {
      state.deleteStatus = 'loading';
    },
    [deleteNotaById.fulfilled]: (state, action) => {
      const { message, deletedNota } = action.payload;
      const deletedNotaId = deletedNota._id;

      state.deleteStatus = 'success';
      state.totalNota -= 1;
      state.message = message;
      notaListAdapter.removeOne(state, deletedNotaId);
    },
    [deleteNotaById.rejected]: (state, action) => {
      state.deleteStatus = 'failed';
      state.deleteError = action.payload;
    },
  },
});

export const {
  addNew,
  updateSudahRekapTrue,
  updateSudahRekapFalse,
  resetNotaState,
  resetUpdateNotaState,
  resetDeleteNotaState,
} = notaListSlice.actions;

export default notaListSlice.reducer;

export const {
  selectIds: selectNotaIds,
  selectById: selectNotaById,
  selectAll: selectAllNota,
} = notaListAdapter.getSelectors((state) => state.nota);

export const selectNota = (state) => {
  const dataNota = selectAllNota(state);

  return { ...state.nota, entities: dataNota };
};
