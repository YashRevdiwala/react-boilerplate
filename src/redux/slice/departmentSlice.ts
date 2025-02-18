import { DepartmentTypes } from '@/modules/department';
import api from '@/services/axios.config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface DepartmentResponse {
  loading: boolean;
  error: string | null;
  data: [] | null;
}

const initialState: DepartmentResponse = {
  loading: false,
  error: null,
  data: null,
};

export const fetchDepartment = createAsyncThunk('department/fetchDepartment', async (_data, { rejectWithValue }) => {
  return api
    .post('/department/getall')
    .then((response) => {
      return response.data.result;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
});

export const addDepartment = createAsyncThunk(
  'department/addDepartment',
  async (data: Omit<DepartmentTypes, 'department_id'>, { rejectWithValue }) => {
    return api
      .post('/department/addDepartment', data)
      .then((response) => {
        return response.data.result;
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  },
);

export const updateDepartment = createAsyncThunk(
  'department/updateDepartment',
  async (data: DepartmentTypes, { rejectWithValue }) => {
    return api
      .post('/department/updateDepartment', data)
      .then((response) => {
        return response.data.result;
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  },
);

export const deleteDepartment = createAsyncThunk(
  'department/deleteDepartment',
  async (id: number, { rejectWithValue }) => {
    return api
      .post('/department/deleteDepartment', { department_id: id })
      .then((response) => {
        return response.data.result;
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  },
);

export const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDepartment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDepartment.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchDepartment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(addDepartment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addDepartment.fulfilled, (state) => {
      state.loading = false;
    });
  },
});

export default departmentSlice.reducer;
