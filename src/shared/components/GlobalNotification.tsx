import { notification } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearNotification } from '@/redux/slice/utilsSlice';

const GlobalNotification = () => {
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();
  const notificationData = useSelector((state: RootState) => state.utils.notification);

  useEffect(() => {
    if (notificationData) {
      api.open({
        message: notificationData.message,
        description: notificationData.description,
        duration: notificationData.duration || 2,
      });

      dispatch(clearNotification());
    }
  }, [notificationData, api, dispatch]);

  return <div>{contextHolder}</div>;
};

export default GlobalNotification;
