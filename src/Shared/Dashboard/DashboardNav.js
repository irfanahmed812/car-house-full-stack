import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './DashNav.css'
import { AuthContext } from '../../Components/Context/AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAdmin from '../../Hooks/useAdmin';
import { toast } from 'react-hot-toast';
import logo from '../../Assets/logo.png';


const DashboardNav = () => {

    const { user, logOut } = useContext(AuthContext);

    const [isAdmin] = useAdmin(user?.email);

    const url = `https://car-house.vercel.app/orders?email=${user?.email}`;

    const { data: orders = [] } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            return data;
        }
    })

    const profileUrl = `https://car-house.vercel.app/userprofile?email=${user?.email}`;

    const { data: userProfile = [] } = useQuery({
        queryKey: ['userProfile', user?.email],
        queryFn: async () => {
            const res = await fetch(profileUrl);
            const data = await res.json();
            return data;
        }
    })

    // all order only see (admin)
    const { data: allOrders = [] } = useQuery({
        queryKey: ['allOrders'],
        queryFn: async () => {
            const res = await fetch('https://car-house.vercel.app/orders/all');
            const data = await res.json();
            return data;
        }
    });

    // all users only see (admin)
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://car-house.vercel.app/users');
            const data = await res.json();
            return data;
        }
    });

    // all cars
    const { data: cars } = useQuery({
        queryKey: ['cars'],
        queryFn: async () => {
            const res = await fetch('https://car-house.vercel.app/cars');
            const data = await res.json();
            return data;
        }
    })

    // log out
    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('Logout successfull')
            })
            .catch(error => console.log(error))
    }

    const time = new Date()

    const menuItems = <>
        <li className="my-px"><Link to='/dashboard' className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-teal-500 hover:text-white" >
            <span className="flex items-center justify-center text-xl text-white"><ion-icon name="cart"></ion-icon></span>
            <span className="ml-3 text-white">My Orders</span>
            <span className={`flex items-center justify-center text-xs text-black font-bold h-6 px-2 rounded-full ml-auto bg-white`}>{orders?.length}</span></Link></li>

        <li className="my-px"><Link to='/dashboard/addreviews' className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-teal-500 hover:text-white" >
            <span className="flex items-center justify-center text-xl text-white"><ion-icon name="star"></ion-icon></span>
            <span className="ml-3 text-white">Add Reviews</span>
            <span className={`flex items-center justify-center text-xs text-black font-bold h-6 px-2 rounded-full ml-auto`}></span></Link></li>

        {
            isAdmin && <>
                <li className="my-px"><Link to='/dashboard/manageusers' className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-teal-500 hover:text-white" >
                    <span className="flex items-center justify-center text-xl text-white"><ion-icon name="people"></ion-icon></span>
                    <span className="ml-3 text-white">Manage Users</span>
                    <span className={`flex items-center justify-center text-xs bg-white text-black font-bold h-6 px-2 rounded-full ml-auto`}>{users?.length}</span></Link></li>

                <li className="my-px"><Link to='/dashboard/manageorders' className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-teal-500 hover:text-white" >
                    <span className="flex items-center justify-center text-xl text-white"><ion-icon name="bag-check"></ion-icon></span>
                    <span className="ml-3 text-white">Manage Orders</span>
                    <span className={`flex items-center justify-center text-xs bg-white text-black font-bold h-6 px-2 rounded-full ml-auto`}>{allOrders?.length}</span></Link></li>

                <li className="my-px"><Link to='/dashboard/addproducts' className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-teal-500 hover:text-white" >
                    <span className="flex items-center justify-center text-xl text-white"><ion-icon name="add-circle"></ion-icon></span>
                    <span className="ml-3 text-white">Add Product</span>
                    <span className={`flex items-center justify-center text-xs text-black font-bold h-6 px-2 rounded-full ml-auto`}></span></Link></li>
                <li className="my-px"><Link to='/dashboard/allproducts' className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-teal-500 hover:text-white" >
                    <span className="flex items-center justify-center text-xl text-white"><ion-icon name="bag-handle"></ion-icon></span>
                    <span className="ml-3 text-white">All Products</span>
                    <span className={`flex items-center justify-center text-xs text-black font-bold h-6 px-2 bg-white rounded-full ml-auto`}>{cars?.length}</span></Link></li>

            </>
        }

        <li className="my-px"><Link to='/' className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-teal-500 hover:text-white" >
            <span className="flex items-center justify-center text-xl text-white"><ion-icon name="home"></ion-icon></span>
            <span className="ml-3 text-white">Back to home</span>
            <span className={`flex items-center justify-center text-xs text-black font-bold h-6 px-2 rounded-full ml-auto`}></span></Link></li>

        <li className="my-px mt-3"><button onClick={handleLogOut} className="flex shadow-lg shadow-rose-200 flex-row items-center h-10 px-3 rounded-lg text-gray-300 bg-rose-500 hover:bg-rose-500 hover:bg-opacity-80" >
            <span className="flex items-center justify-center text-xl text-white"><ion-icon name="log-out"></ion-icon></span>
            <span className="ml-3 text-white">Log Out</span>
            <span className={`flex items-center justify-center text-xs text-black font-bold h-6 px-2 rounded-full ml-auto`}></span></button></li>

    </>

    return (
        <div>
            <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
                <aside
                    className="sidebar lg:w-[315px] md:w-[30%] md:shadow invisible lg:visible hidden lg:block transform transition-transform duration-150 ease-in bg-gray-800"
                >
                    <div className="sidebar-header flex items-center justify-center py-4">
                        <div className="inline-flex">
                            <Link to='/dashboard' className="inline-flex flex-row items-center">
                                {/* <span className="text-[30px] items-center relative top-[6px] text-white"><ion-icon name="grid"></ion-icon></span> */}
                                <img src={logo} className='object-contain w-[50px]' alt="car house" />
                                <span className="leading-10 items-center text-gray-100 text-2xl font-bold ml-1 uppercase">Car House</span>
                            </Link>
                        </div>
                    </div>
                    <div className="sidebar-content px-4 py-6">
                        <ul className="flex flex-col w-full">
                            {menuItems}
                        </ul>
                    </div>
                </aside>
                <main className="main flex flex-col flex-grow md:ml-0 transition-all duration-150 ease-in">
                    <header className="header fixed z-50 w-full bg-white shadow py-4 px-4">
                        <div className="header-content flex items-center justify-between flex-row">
                            <div className="flex mr-auto">
                                <div className="flex flex-row items-center">
                                    {
                                        userProfile?.map(profile => <img key={profile._id}
                                            src={`data:image/*;base64,${profile?.image}`}
                                            alt={user?.displayName}
                                            className="h-[50px] rounded-[50%] w-[50px] object-cover border-teal-500 p-[1px] bg-gray-200 border"
                                        />)
                                    }
                                    <span className="flex flex-col ml-2">
                                        <span className="text-[16px] w-auto font-bold text-start capitalize tracking-wide leading-none">{user?.displayName}</span>
                                        <span className="text-[14px] w-auto hover:link text-teal-800 font-semibold text-start leading-none mt-1">{user?.email}</span>
                                    </span>
                                </div>
                            </div>

                            {/* mobile */}
                            <div className="lg:hidden">
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="bg-gray-800 rounded cursor-pointer text-white px-1 m-2 text-2xl"><ion-icon name='menu'></ion-icon></label>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-gray-800 text-white rounded-box w-52">
                                        <li className="my-px"><Link to='/dashboard' className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-teal-500 hover:text-gray-700" >
                                            <span className="flex items-center justify-center text-xl text-white"><ion-icon name="cart"></ion-icon></span>
                                            <span className="ml-3 text-white">My Orders</span>
                                            <span className={`flex items-center justify-center text-xs text-black font-bold h-6 px-2 rounded-full ml-auto bg-white`}>{orders?.length}</span></Link></li>

                                        <li className="my-px"><Link to='/dashboard/addreviews' className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-teal-500 hover:text-gray-700" >
                                            <span className="flex items-center justify-center text-xl text-white"><ion-icon name="star"></ion-icon></span>
                                            <span className="ml-3 text-white">Add Reviews</span>
                                            <span className={`flex items-center justify-center text-xs text-black font-bold h-6 px-2 rounded-full ml-auto`}></span></Link></li>

                                        {
                                            isAdmin && <>
                                                <li className="my-px"><Link to='/dashboard/manageusers' className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-teal-500 hover:text-gray-700" >
                                                    <span className="flex items-center justify-center text-xl text-white"><ion-icon name="people"></ion-icon></span>
                                                    <span className="ml-3 text-white">Manage Users</span>
                                                    <span className={`flex items-center justify-center text-xs bg-white text-black font-bold h-6 px-2 rounded-full ml-auto`}>{users?.length}</span></Link></li>

                                                <li className="my-px"><Link to='/dashboard/manageorders' className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-teal-500 hover:text-gray-700" >
                                                    <span className="flex items-center justify-center text-xl text-white"><ion-icon name="bag-check"></ion-icon></span>
                                                    <span className="ml-3 text-white">Manage Orders</span>
                                                    <span className={`flex items-center justify-center text-xs bg-white text-black font-bold h-6 px-2 rounded-full ml-auto`}>{allOrders?.length}</span></Link></li>

                                                <li className="my-px"><Link to='/dashboard/addproducts' className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-teal-500 hover:text-gray-700" >
                                                    <span className="flex items-center justify-center text-xl text-white"><ion-icon name="add-circle"></ion-icon></span>
                                                    <span className="ml-3 text-white">Add Product</span>
                                                    <span className={`flex items-center justify-center text-xs text-black font-bold h-6 px-2 rounded-full ml-auto`}></span></Link></li>

                                                <li className="my-px"><Link to='/dashboard/allproducts' className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-teal-500 hover:text-white" >
                                                    <span className="flex items-center justify-center text-xl text-white"><ion-icon name="bag-handle"></ion-icon></span>
                                                    <span className="ml-3 text-white">All Products</span>
                                                    <span className={`flex items-center justify-center text-xs text-black font-bold h-6 px-2 bg-white rounded-full ml-auto`}>{cars?.length}</span></Link></li>

                                            </>
                                        }

                                        <li className="my-px"><Link to='/' className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-teal-500 hover:text-gray-700" >
                                            <span className="flex items-center justify-center text-xl text-white"><ion-icon name="home"></ion-icon></span>
                                            <span className="ml-3 text-white">Back to home</span>
                                            <span className={`flex items-center justify-center text-xs text-black font-bold h-6 px-2 rounded-full ml-auto`}></span></Link></li>

                                        <li className="my-px mt-3 mb-3"><button onClick={handleLogOut} className="flex shadow-md shadow-rose-200 flex-row items-center h-10 px-3 rounded-lg text-gray-300 bg-rose-600 hover:bg-opacity-80 hover:bg-rose-500" >
                                            <span className="flex items-center justify-center text-xl text-white"><ion-icon name="log-out"></ion-icon></span>
                                            <span className="ml-3 text-white">Log Out</span>
                                            <span className={`flex items-center justify-center text-xs text-black font-bold h-6 px-2 rounded-full ml-auto`}></span></button></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="main-content flex flex-col flex-grow p-1 mt-3">
                        <div className="mx-auto pt-[90px] container">
                            <Outlet></Outlet>
                        </div>
                    </div>
                    <footer className="footer px-4 py-6">
                        <div className="footer-content">
                            <p className="text-sm text-gray-600 text-center"> <p>Copyright &copy; <time dateTime={time}>
                                {time.getFullYear()}</time>  - Car House all right reserved | Developed by <Link target='_blank' to='https://irfanahmed.netlify.app/' className="font-semibold text-teal-500 hover:link">Irfan Ahmed</Link></p></p>
                        </div>
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default DashboardNav;