import { createBrowserRouter } from "react-router";
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
import AboutUs from "../pages/AboutUs/AboutUs";

import Dashboard from "../pages/Dashboard/Dashboard";
import BookMark from "../pages/BookMark/BookMark";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "/login", Component: Login },
      { path: "/register", Component: Register },
      { path: "/allservices", Component: AllServices },
      { path: "/services/:id", element: <PrivateRoute><ServiceDetails /></PrivateRoute> },
      { path: "/aboutus", Component: AboutUs },
    ],
  },
  {
    path: "/dashboard",
    Component: Dashboard,
    children: [
      {
        path: "add-service",
        Component: AddService,
      },
      {
        path: "my-services",
        Component: MyServices,
      },
      {
        path: "my-reviews",
        Component: MyReviews,
      },
      {
        path: "book-mark",
        Component: BookMark,
      },
    ],
  },
]);
