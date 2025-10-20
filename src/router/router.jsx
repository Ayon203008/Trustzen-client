import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Components/Home/Home";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import AllServices from "../pages/AllServices/AllServices";
import AddService from "../pages/AddService/AddService";
import MyServices from "../pages/MyServices/MyServices";
import ServiceDetails from "../pages/ServiceDetails/ServiceDeatils";
import MyReviews from "../pages/MyReviews/MyReviews";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component:Home,
       
      },
      {
        path:'/login',
        Component:Login
      },
      {
        path:'/register',
        Component:Register
      },
      {
        path:"/allservices",
        Component:AllServices
      },
      {
        path:'/addservice',
        Component:AddService
      },
      {
        path:'/myservices',
        Component:MyServices
      },
      {
        path:'/services/:id',
        element:<PrivateRoute><ServiceDetails></ServiceDetails></PrivateRoute>
      },
      {
        path:'/myreviews',
        Component:MyReviews
      }
    ],
  },
]);
