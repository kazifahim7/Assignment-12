import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import MainLayout from './mainlayout/MainLayout';
import Error from './Pages/Error';
import HOme from './Pages/HOme';
import AuthProvider from './AuthProvider/AuthProvider';
import LogInPage from './Pages/LogInPage';
import Register from './Pages/Register';

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error></Error>,
    element: <MainLayout></MainLayout>,
    children:[
      {
        path: '/',
        element:<HOme></HOme>
      },
      {
        path:'/login',
        element:<LogInPage></LogInPage>
      },
      {
        path:'/signup',
        element: <Register></Register>
      }
    ]
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />

    </AuthProvider>
    
  </React.StrictMode>,
)
