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
import MyContest from './hostpage/MyContest';
import Update from './hostpage/Update';
import ManageContest from './AdminPage/ManageContest';
import AllContest from './Pages/Allcontest';
import Details from './componests/Details';

import Private from './Private/Private';
import HostPrivate from './Private/HostPrivate';
import AdMinPrivate from './Private/AdMinPrivate';
import RegisterContest from './UserDashboard/RegisterContest';
import Payment from './UserDashboard/Payment';
import MyParticipate from './UserDashboard/MyParticipate';
import MyProfile from './UserDashboard/MyProfile';
import SubmitedPage from './hostpage/SubmitedPage';
import SeeSubmisson from './hostpage/SeeSubmisson';





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
        path: '/allContests/:id',
        element: <Private><Details></Details></Private>,
        loader: ({ params }) => fetch(`http://localhost:7000/singleData/details/${params.id}`)
      },
      {
        path:'/login',
        element:<LogInPage></LogInPage>
      },
      {
        path:'/signup',
        element: <Register></Register>
      },
      {
        path:'/allContest',
        element:<AllContest></AllContest>
      },
      {
        path: 'register',
        element: <RegisterContest></RegisterContest>
      },
      {
        path:'/payment/:id',
        element:<Payment></Payment>,
        loader: ({params}) => fetch(`http://localhost:7000/getSingleContest/${params.id}`)
      }
     
    ],
    
  },
  {
    path: '/dashBoard',
    element:<Dashboard></Dashboard>,
    children:[
      {
        path: 'ManageUser',
        element: <AdMinPrivate><ManageUser></ManageUser></AdMinPrivate>

      },
      {
        path:'AddContest',
        element: <HostPrivate><ContestAdd></ContestAdd></HostPrivate>
      },
      {
        path:'myContest',
        element:<MyContest></MyContest>
      },
      {
        path:'update/:id',
        element:<Update></Update>,
        loader: ({ params }) => fetch(`http://localhost:7000/single/contest/${params.id}`)
      },
      {
        path: 'ManageContests',
        element: <AdMinPrivate><ManageContest></ManageContest></AdMinPrivate>
      },
      {
        path:'participate',
        element:<MyParticipate></MyParticipate>
      },
      {
        path:'myProfile',
        element:<MyProfile></MyProfile>

      },
      {
        path:'submitted',
        element:<SubmitedPage></SubmitedPage>
      },
      {
        path:'submission',
        element:<SeeSubmisson></SeeSubmisson>
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
