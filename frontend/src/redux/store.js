import { configureStore } from '@reduxjs/toolkit';

import userLoginReducer from './user/userLoginSlice';
import notaReducer from './nota/notaSlice';
import rekapanReducer from './rekapan/rekapanSlice';

export default configureStore({
  reducer: {
    currentUser: userLoginReducer,
    nota: notaReducer,
    rekapan: rekapanReducer,
  },
});
