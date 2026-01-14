import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home/Home";
import RootLayout from "../Layouts/RootLayout";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import Rider from "../pages/Rider/Rider";
import PrivateRoute from "./PrivateRoute";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import ApproveRiders from "../pages/Dashboard/ApproveRiders/ApproveRiders";
import UsersManagement from "../pages/Dashboard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../pages/Dashboard/AssignRiders/AssignRiders";
import RiderRoutes from "./RiderRoutes";
import AssignDeliveries from "../pages/Dashboard/AssignDeliveries/AssignDeliveries";
import CompletedDeliveries from "../pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import ParcelTrack from "../pages/ParcelTrack/ParcelTrack";
import Aboutus from "../pages/Aboutus/Aboutus";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import Profile from "../pages/Dashboard/Profile/Profile";



export const router = createBrowserRouter([
{
    path:"/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component:Home
        },
        {
           path:'aboutus',
           Component : Aboutus
        },
        {
            path: 'rider',
            element:<PrivateRoute><Rider></Rider></PrivateRoute>,
      loader: () => fetch('/serviceCenters.json')
        .then(res =>res.json())
        },
        {
        path: 'send-parcel',
        element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>,
         loader:() => fetch('/serviceCenters.json')
          .then(res =>res.json())
        },
    {
        path:'coverage',
        Component: Coverage,
        loader: () => fetch('/serviceCenters.json')
        .then(res =>res.json())
    },
 {
  path:'parcel-track/:trackingId', 
  Component: ParcelTrack
 },
    {
      path:'dashboard',
         element : <PrivateRoute><DashboardLayout>
          </DashboardLayout></PrivateRoute>,
         children: [
          {
            index:true,
            Component: DashboardHome
          },
        {
            path: 'my-parcels',
            Component: MyParcels
        },
      {
        path : 'payment-history',
        Component: PaymentHistory

      },
    {
   path : 'payment/:parcelId',
   Component: Payment
  },
  {
    path: 'payment-success',
    Component: PaymentSuccess
  }, 
  {
    path : 'payment-cancelled',
    Component : PaymentCancelled
  },

   // rider only routes
   {
     path : 'assigned-deliveries',
     element : <RiderRoutes><AssignDeliveries></AssignDeliveries></RiderRoutes>

   },
    {
     path :'completed-deliveries',
     element : <RiderRoutes><CompletedDeliveries></CompletedDeliveries></RiderRoutes>

   },

 // admin related routes
  {
    path : 'approve-riders',
   element:<AdminRoute>< ApproveRiders></ApproveRiders></AdminRoute>
  },
   {
    path : 'assign-riders',
    element:<AdminRoute><AssignRiders></AssignRiders></AdminRoute>
  },
  {
    path : 'users-management',
   element: <AdminRoute><UsersManagement></UsersManagement></AdminRoute>
  },
   {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
 
   ]
    },
    {
        path:'/',
        Component: AuthLayout,
        children:[
       {
         path: 'login',
         Component: Login
       },
     {
        path : 'register',
        Component: Register
     },
     ]
    }
    ]
},
]);

