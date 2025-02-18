import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

interface UtilsResponse {
  loading: boolean
  error: string | null
  toast: string | null
  notification: {
    message: string
    description: string
    duration?: number
  } | null
}

const initialState: UtilsResponse = {
  loading: false,
  error: null,
  toast: null,
  notification: null,
}

export const utilsSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
    clearState: (state) => {
      state.loading = false
      state.error = null
    },
    setToast: (_state, action) => {
      toast.success(action.payload)
    },
    clearToast: (state) => {
      state.toast = null
    },
    showNotification: (
      state,
      action: PayloadAction<{
        message: string
        description: string
        duration?: number
      }>
    ) => {
      state.notification = action.payload
    },
    clearNotification: (state) => {
      state.notification = null
    },
  },
  extraReducers: () => {},
})

export const {
  setLoading,
  setError,
  clearError,
  clearState,
  setToast,
  clearToast,
  showNotification,
  clearNotification,
} = utilsSlice.actions
export default utilsSlice.reducer
