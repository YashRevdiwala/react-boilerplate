import api from '@/services/axios.config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { store } from '../store';

interface UploadState {
  loading: boolean;
  error: string | null;
  uploadedImage: string | null;
  progress: number;
}

const initialState: UploadState = {
  loading: false,
  error: null,
  uploadedImage: null,
  progress: 0,
};

export const uploadImage = createAsyncThunk('upload/image', async (file: File, { rejectWithValue }) => {
  const formData = new FormData();
  formData.append('image_url', file);

  try {
    const response = await api.post('/imageupload/addimage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
        // You can dispatch an action here to update progress if needed
        store.dispatch(setProgress(percent));
      },
    });

    return 'http://192.168.0.174:3000/' + response.data.result.image_url;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data?.message || 'Upload failed');
    }
    return rejectWithValue('Upload failed');
  }
});

export const uploadImageSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    resetImageUpload: (state) => {
      state.uploadedImage = null;
      state.error = null;
      state.progress = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.progress = 0;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadedImage = action.payload;
        state.progress = 100;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.progress = 0;
      });
  },
});

export const { setProgress, resetImageUpload } = uploadImageSlice.actions;
export default uploadImageSlice.reducer;
