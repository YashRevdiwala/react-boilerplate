import { Alert } from 'antd';
import { useSelector } from 'react-redux';

const GlobalError = () => {
  const error = useSelector((state: RootState) => state.utils.error);

  if (!error) return null;
  return (
    <div>
      <Alert message={error} type="error" />
    </div>
  );
};
export default GlobalError;
