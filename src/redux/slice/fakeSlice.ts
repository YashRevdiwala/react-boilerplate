import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../services/axios.config"

interface FakeResponse {
  loading: boolean
  error: string | null
  data: [] | null
}

const initialState: FakeResponse = {
  loading: false,
  error: null,
  data: null,
}

export const fetchFake = createAsyncThunk(
  "fake/fetchFake",
  async (_data, { rejectWithValue }) => {
    const response = await api("https://jsonplaceholder.typicode.com/todos/1")

    if (response.status !== 200) {
      return rejectWithValue("Failed to fetch data")
    }

    return response.data
  }
)

export const fakeSlice = createSlice({
  name: "fake",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFake.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchFake.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
    })
    builder.addCase(fetchFake.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  },
})

export default fakeSlice.reducer
