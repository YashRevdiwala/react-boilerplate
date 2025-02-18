import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { store } from './redux/store.ts';
import App from './App.tsx';
import PageNotFound from './shared/components/PageNotFound.tsx';
import Department from './modules/department/index.tsx';
import DepartmentFormik from './modules/department-formik/index.tsx';
import DepartmentBasic from './modules/department-basic/index.tsx';
import ImageUploader from './modules/image-upload/index.tsx';
import VideoUploader from './modules/video-upload/index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/department',
    element: <Department />,
  },
  {
    path: '/department-formik',
    element: <DepartmentFormik />,
  },
  {
    path: '/department-basic',
    element: <DepartmentBasic />,
  },
  {
    path: '/image-upload',
    element: <ImageUploader />,
  },
  {
    path: '/video-upload',
    element: <VideoUploader />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
