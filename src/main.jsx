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
import WiningContest from './UserDashboard/WiningContest';
import Upcoming from './Pages/Upcoming';
import LeaderBoard from './Pages/LeaderBoard';
import News from './Pages/News';





const queryClient = new QueryClient()



const router = createBrowserRouter([

  {
    path: "/",
    errorElement: <Error></Error>,
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <HOme></HOme>
      },
      {
        path: '/LeaderBoard',
        element: <LeaderBoard></LeaderBoard>

      },
      {
        path: '/allContests/:id',
        element: <Private><Details></Details></Private>,
        loader: ({ params }) => fetch(`https://serversite12.vercel.app/singleData/details/${params.id}`)
      },
      {
        path: '/login',
        element: <LogInPage></LogInPage>
      },
      {
        path: '/signup',
        element: <Register></Register>
      },
      {
        path: '/allContest',
        element: <AllContest></AllContest>,
        loader: () => fetch('https://serversite12.vercel.app/allData')
      },
      {
        path: 'register',
        element: <RegisterContest></RegisterContest>
      },
      {
        path: '/payment/:id',
        element: <Payment></Payment>,
        loader: ({ params }) => fetch(`https://serversite12.vercel.app/getSingleContest/${params.id}`)
      },
      {
        path: '/upcomingContest',
        element: <Upcoming></Upcoming>
      },
      {
        path: '/news',
        element: <News></News>
      }

    ],

  },
  {
    path: '/dashBoard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'ManageUser',
        element: <AdMinPrivate><ManageUser></ManageUser></AdMinPrivate>,
        loader: () => fetch('https://serversite12.vercel.app/allusers')

      },
      {
        path: 'AddContest',
        element: <HostPrivate><ContestAdd></ContestAdd></HostPrivate>
      },
      {
        path: 'myContest',
        element: <HostPrivate><MyContest></MyContest></HostPrivate>,

      },
      {
        path: 'update/:id',
        element: <Update></Update>,
        loader: ({ params }) => fetch(`https://serversite12.vercel.app/single/contest/${params.id}`)
      },
      {
        path: 'ManageContests',
        element: <AdMinPrivate><ManageContest></ManageContest></AdMinPrivate>,
        loader: () => fetch('https://serversite12.vercel.app/allData')

      },
      {
        path: 'participate',
        element: <MyParticipate></MyParticipate>
      },
      {
        path: 'myProfile',
        element: <Private><MyProfile></MyProfile></Private>

      },
      {
        path: 'submitted',
        element: <SubmitedPage></SubmitedPage>
      },
      {
        path: 'submission',
        element: <SeeSubmisson></SeeSubmisson>
      },
      {
        path: 'WinningContest',
        element: <WiningContest></WiningContest>
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
