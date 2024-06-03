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
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Dashboard from './DashBoard/Dashboard';
import ManageUser from './AdminPage/ManageUser';
import ContestAdd from './hostpage/ContestAdd';


const queryClient = new QueryClient()

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
    ],
    
  },
  {
    path: '/dashBoard',
    element:<Dashboard></Dashboard>,
    children:[
      {
        path: 'ManageUser',
        element:<ManageUser></ManageUser>

      },
      {
        path:'AddContest',
        element:<ContestAdd></ContestAdd>
      }
    ]
  }
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>

      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      

    </AuthProvider>
    
  </React.StrictMode>,
)
