import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../redux/store"
import { RootState } from "../../redux/store"
import { useEffect } from "react"
import { fetchFake } from "../../redux/slice/fakeSlice"

const FakeList = () => {
  const dispatch: AppDispatch = useDispatch()
  const { data, error, loading } = useSelector(
    (state: RootState) => state.fakeData
  )

  useEffect(() => {
    dispatch(fetchFake())
  }, [dispatch])

  if (loading) return <div>Loading...</div>

  if (error) return <div>Error: {error}</div>

  return JSON.stringify(data)
}

export default FakeList
