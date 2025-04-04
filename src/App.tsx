import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';

import FakeList from './modules/fake/FakeList';
import { setToast } from './redux/slice/utilsSlice';
import GlobalError from './shared/components/GlobalError';
import GlobalNotification from './shared/components/GlobalNotification';
import GlobalSpinner from './shared/components/GlobalSpinner';
import ToastContainer from './shared/components/GlobalToast';
import { useNetworkStatus } from './shared/hooks/useNetworkStatus';

function App() {
  const dispatch = useDispatch();
  const { isOnline } = useNetworkStatus();

  useEffect(() => {
    dispatch(setToast('Login Successful!'));
  }, [dispatch]);

  return (
    <>
      <Modal
        title="You are not Connected to Internet"
        open={!isOnline}
        centered
        closable={false}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <p>Please check your internet connection.</p>
      </Modal>

      <GlobalSpinner />
      <ToastContainer />
      <GlobalNotification />
      <GlobalError />
      <FakeList />
    </>
  );
}

export default App;
