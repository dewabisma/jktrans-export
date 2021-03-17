import { configureStore } from '@reduxjs/toolkit';

import userLoginReducer from './user/userLoginSlice';
import notaListReducer from './nota/notaListSlice';
import rekapanListReducer from './rekapan/rekapanListSlice';
import bookinganListReducer from './bookingan/bookinganListSlice';

export default configureStore({
  reducer: {
    currentUser: userLoginReducer,
    nota: notaListReducer,
    rekapan: rekapanListReducer,
    bookingan: bookinganListReducer,
  },
});
