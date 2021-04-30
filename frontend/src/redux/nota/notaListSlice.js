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
  error: null,
  message: null,
  currentPage: null,
  totalPageCount: null,
  totalNota: null,
});

export const fetchAllNota = createAsyncThunk(
  'nota/fetchAll',
  async (
    query = {
      pageSize: '',
      pageNumber: '',
    },
    { rejectWithValue, getState }
  ) => {
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
      const { data } = await axios.get(
        `/api/nota?pageSize=${query.pageSize}&pageNumber=${query.pageNumber}`,
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
        authorzation: `Bearer ${authToken}`,
      },
    };

    try {
      const { data } = await axios.put(
        `/api/nota/${notaId}/edit`,
        editedNota,
        config
      );

      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      rejectWithValue(message);
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
    resetNotaState: (state, action) => {
      state.ids = [];
      state.entities = {};
      state.status = 'idle';
      state.error = null;
      state.currentPage = null;
      state.totalPageCount = null;
      state.totalNota = null;
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
      state.status = 'loading';
    },
    [editNotaById.fulfilled]: (state, action) => {
      const { message, data } = action.payload;

      state.status = 'success';
      state.totalNota += 1;
      state.message = message;
      notaListAdapter.upsertOne(state, data);
    },
    [editNotaById.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { addNew, resetNotaState } = notaListSlice.actions;

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
