import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Home from '../Components/Home/Home/Home';
import AllCars from '../Components/AllCars/AllCars';
import Booking from '../Components/AllCars/Booking/Booking';
import SignIn from '../Components/SignIn/SignIn';
import Login from '../Components/Login/Login';
import AddCars from '../Components/Dashboard/AddCars/AddCars';
import DashboardLayout from '../Layout/DashboardLayout';
import MyOrders from '../Components/Dashboard/MyOrders/MyOrders';
import AddReviews from '../Components/Dashboard/AddReviews/AddReviews';
import ManageUsers from '../Components/Dashboard/ManageUsers/ManageUsers';
import ManageOrders from '../Components/Dashboard/ManageOrders/ManageOrders';
import Payment from '../Components/Dashboard/Payment/Payment';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import AdminRoute from './AdminRoute/AdminRoute';
import AllProduct from '../Components/Dashboard/AllProduct/AllProduct';
import NotFound from '../Components/NotFound/NotFound';
import Blogs from '../Components/Blogs/Blogs';
import About from '../Components/About/About';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/cars',
                element: <AllCars></AllCars>
            },
            {
                path: '/cars/:id',
                element: <Booking></Booking>,
                loader: async ({ params }) => fetch(`https://car-house.vercel.app/cars/${params.id}`)
            },
            {
                path: '/signin',
                element: <SignIn></SignIn>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/blogs',
                element: <Blogs></Blogs>
            },
            {
                path: '/about',
                element: <About></About>
            },

        ]
    },
    {
        path: '*',
        element: <NotFound></NotFound>
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <MyOrders></MyOrders>
            },
            {
                path: '/dashboard/addproducts',
                element: <AdminRoute><AddCars></AddCars></AdminRoute>
            },
            {
                path: '/dashboard/addreviews',
                element: <AddReviews></AddReviews>
            },
            {
                path: '/dashboard/manageusers',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: '/dashboard/manageorders',
                element: <AdminRoute><ManageOrders></ManageOrders></AdminRoute>
            },
            {
                path: '/dashboard/allproducts',
                element: <AdminRoute><AllProduct></AllProduct></AdminRoute>
            },
            {
                path: '/dashboard/payment/:id',
                element: <PrivateRoute><Payment></Payment></PrivateRoute>,
                loader: async ({ params }) => fetch(`https://car-house.vercel.app/orders/${params.id}`)
            },
        ]
    }
])



export default router;