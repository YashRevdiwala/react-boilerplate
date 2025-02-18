import { useEffect } from "react"
import GlobalError from "./shared/components/GlobalError"
import GlobalNotification from "./shared/components/GlobalNotification"
import GlobalSpinner from "./shared/components/GlobalSpinner"
import ToastContainer from "./shared/components/GlobalToast"
import { useDispatch } from "react-redux"
import { setToast } from "./redux/slice/utilsSlice"
import FakeList from "./modules/fake/FakeList"

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setToast("Login Successful!"))
  }, [dispatch])
  return (
    <>
      <GlobalSpinner />
      <ToastContainer />
      <GlobalNotification />
      <GlobalError />
      <FakeList />
    </>
  )
}

export default App
