import { configureStore } from '@reduxjs/toolkit';

import userLoginReducer from './user/userLoginSlice';
import notaListReducer from './nota/notaListSlice';
import rekapanListReducer from './rekapan/rekapanListSlice';

export default configureStore({
  reducer: {
    currentUser: userLoginReducer,
    nota: notaListReducer,
    rekapan: rekapanListReducer,
  },
});
