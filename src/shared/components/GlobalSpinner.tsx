import { Spin } from "antd"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

const GlobalSpinner = () => {
  const loading = useSelector((state: RootState) => state.utils.loading)

  if (!loading) return null

  return <Spin spinning={loading} fullscreen />
}
export default GlobalSpinner
