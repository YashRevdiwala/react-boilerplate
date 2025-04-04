import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchFake } from '@/redux/slice/fakeSlice';

const FakeList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, error, loading } = useSelector((state: RootState) => state.fakeData);

  useEffect(() => {
    dispatch(fetchFake());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <br />
      {JSON.stringify(data)}
    </>
  );
};

export default FakeList;
