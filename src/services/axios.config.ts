import axios from "axios"
import { AppDispatch } from "../redux/store"
import { setLoading } from "../redux/slice/utilsSlice"

let dispatch: AppDispatch

export const injectDispatch = (newDispatch: AppDispatch) => {
  dispatch = newDispatch
}

const api = axios.create({
  baseURL: "http://192.168.0.174:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use(
  (config) => {
    if (dispatch) dispatch(setLoading(true))
    return config
  },
  (error) => {
    if (dispatch) dispatch(setLoading(false))
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    if (dispatch) dispatch(setLoading(false))
    return response
  },
  (error) => {
    if (dispatch) dispatch(setLoading(false))
    return Promise.reject(error)
  }
)

export default api
