import { configureStore } from '@reduxjs/toolkit';
import { fakeSlice } from './slice/fakeSlice';
import { utilsSlice } from './slice/utilsSlice';
import { departmentSlice } from './slice/departmentSlice';
import { uploadImageSlice } from './slice/uploadImageSlice';
import { uploadVideoSlice } from './slice/uploadVideoSlice';

export const store = configureStore({
  reducer: {
    utils: utilsSlice.reducer,
    fakeData: fakeSlice.reducer,
    department: departmentSlice.reducer,
    uploadImage: uploadImageSlice.reducer,
    uploadVideo: uploadVideoSlice.reducer,
  },
});

// injectDispatch(store.dispatch)
