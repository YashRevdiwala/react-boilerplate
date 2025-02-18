# React Boilerplate

A **Vite + React + TypeScript** boilerplate with **Redux Toolkit, Axios, Formik, Express, Ant Design, and other essential tools** for scalable web applications.

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (LTS recommended) → [Download here](https://nodejs.org/)
- **npm** or **yarn**

### Installation

Clone the repository and install dependencies:

```sh
# Clone the repository
git clone git@github.com:YashRevdiwala/react-boilerplate.git
cd react-boilerplate

# Install dependencies
npm install  # or yarn install
```

### Start Development Server

```sh
npm run dev  # or yarn dev
```

This will start the Vite development server at `http://localhost:5173/`.

---

<!-- ## 📂 Project Structure
```
├── src/
│   ├── services/          # API configurations using Axios
│   ├── shared/            # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Application pages
│   ├── redux/             # Redux store setup
│   ├── styles/            # Global styles
│   ├── types/             # TypeScript type definitions
│   ├── validation/        # Validation schemas using Zod/Yup
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Application entry point
│   └── routes.tsx         # React Router configuration
```

--- -->

## 🔗 Dependencies

### Core

```sh
npm install react react-dom react-router
```

### TypeScript Support

```sh
npm install -D typescript @types/react @types/react-dom
```

### State Management (Redux Toolkit)

```sh
npm install @reduxjs/toolkit react-redux
```

### UI Framework (Ant Design)

```sh
npm install antd
```

### API Calls (Axios)

```sh
npm install axios
```

### Form Handling

```sh
npm install formik react-hook-form
```

### Validation (Zod & Yup)

```sh
npm install zod @hookform/resolvers yup
```

---

## 📌 Configuration Details

### 1️⃣ **Redux Toolkit Setup** (`redux/store.ts`)

```ts
import { configureStore } from '@reduxjs/toolkit';
import departmentReducer from './slices/departmentSlice';

export const store = configureStore({
  reducer: {
    department: departmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 2️⃣ **Axios Setup** (`services/axios.config.ts`)

```ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
```

### 3️⃣ **React Router Setup** (`main.tsx`)

```ts
import { createBrowserRouter, RouterProvider } from 'react-router';

const router = createBrowserRouter([
  // routesConfig or Routes Here
])

const AppRoutes = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default AppRoutes;
```

### 4️⃣ **Form Handling with Formik & Yup** (`components/Form.tsx`)

```ts
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const MyForm = () => {
  return (
    <Formik
      initialValues={{ name: '', email: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {() => (
        <Form>
          <Field name="name" />
          <ErrorMessage name="name" component="div" />
          <Field name="email" type="email" />
          <ErrorMessage name="email" component="div" />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
```

### 5️⃣ **CRUD Operations with Axios & Redux Slice Setup** (`redux/slice/departmentSlice.ts`)

```ts
import api from '@/services/axios.config';

interface DepartmentResponse {
  loading: boolean;
  error: string | null;
  data: [] | null;
}

const initialState: DepartmentResponse = {
  loading: false,
  error: null,
  data: null,
};

export const fetchDepartment = createAsyncThunk('department/fetchDepartment', async (_data, { rejectWithValue }) => {
  return api
    .post('/department/getall')
    .then((response) => {
      return response.data.result;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
});

export const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDepartment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDepartment.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchDepartment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default departmentSlice.reducer;
```

---

## 🏗️ Build & Deploy

### **Build for Production**

```sh
npm run build  # or yarn build
```

### **Serve with PM2**

```sh
npm install -g pm2
npm run build
pm2 start ecosystem.config.cjs
```

### **Deploy on EC2 (Example)**

```sh
scp -r ./dist ubuntu@your-ec2-instance:/var/www/html
ssh ubuntu@your-ec2-instance
npm install -g serve
serve -s /var/www/html/dist -l 3000
```

---

## 🎯 Conclusion

This boilerplate provides a strong foundation for building scalable **React + TypeScript** applications with essential tools like **Redux, Axios, Formik, Express, Ant Design, and React Router**.

✅ Feel free to contribute & customize as per your project needs!

---

### 📜 License

This project is open-source and available under the MIT License.
