import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import { AuthContext } from '../../Components/Context/AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading/Loading';
import logo from '../../Assets/logo.png';

const Header = () => {

    const { user, logOut } = useContext(AuthContext);
    console.log(user);

    const [loading, setLoading] = useState(true);

    const url = `https://car-house.vercel.app/userprofile?email=${user?.email}`;

    const { data: userProfile = [] } = useQuery({
        queryKey: ['userProfile', user?.email],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            setLoading(false)
            return data;
        }
    })


    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('Logout successfull')
            })
            .catch(error => console.log(error))
    }

    const menuItems = <>
        {
            loading ? <Loading></Loading> : <>
                <li className='mx-3 my-4 md:my-0'><NavLink to='/' className='text-[17px] hover:text-teal-500 duration-500 font-semibold'>Home</NavLink></li>
                <li className='mx-3 my-4 md:my-0'><NavLink to='/cars' className='text-[17px] hover:text-teal-500 duration-500 font-semibold'>Cars</NavLink></li>
                <li className='mx-3 my-4 md:my-0'><NavLink to='/blogs' className='text-[17px] hover:text-teal-500 duration-500 font-semibold'>Blogs</NavLink></li>
                <li className='mx-3 my-4 md:my-0'><NavLink to='/about' className='text-[17px] hover:text-teal-500 duration-500 font-semibold'>About</NavLink></li>
                {
                    user?.uid ? <>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    {
                                        userProfile?.map(profile => <img key={profile._id} src={`data:image/*;base64,${profile?.image}`} alt={user?.displayName} />)
                                    }
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow text-white menu menu-sm dropdown-content bg-gray-800 dark:bg-slate-600 rounded-box w-52">
                                <li className='text-[18px] font-semibold capitalize pt-1 text-start ms-3'>{user?.displayName}</li>
                                <li className='text-[14px] font-semibold text-start pt-1 hover:link ms-3 text-teal-500'>{user?.email}</li>
                                <li className='pt-3'><NavLink to='/dashboard' className='text-[17px] py-2 hover:bg-gray-50 dark:hover:text-white hover:text-black dark:hover:bg-teal-500 duration-500 font-semibold'><ion-icon name="grid"></ion-icon> Dashboard</NavLink></li>
                                <li className='pt-3 pb-2'><button onClick={handleLogOut} className='text-[17px] py-2 hover:bg-gray-50 dark:hover:bg-teal-500 hover:text-black dark:hover:text-white duration-500 font-semibold'>Logout <ion-icon name="log-out"></ion-icon></button></li>

                            </ul>
                        </div>
                    </> : <li className='mx-3 my-4 md:my-0'><Link to='/signin' className='text-[16px] font-semibold btn btn-accent'>Sign In</Link></li>
                }
            </>
        }
    </>

    const [open, setOpen] = useState(false);

    return (
        <div>
            {
                loading ? <Loading></Loading> : <div className='nav-bg fixed z-50 w-full'>
                    <nav className='p-[13px] lg:px-4 md:px-0 relative mx-auto container md:flex items-center md:justify-between'>

                        <div className='flex justify-between lg:justify-normal '>
                            <div>
                                <h1 className='text-2xl flex dark:text-white'>
                                    <img src={logo} className='object-contain w-[35px]' alt="car house" />
                                    <Link className='font-bold' to='/'>Car House</Link>
                                </h1>
                            </div>
                            <div onClick={() => setOpen(!open)} className='text-3xl absolute right-[0.8rem] top-[18px] cursor-pointer duration-500 md:hidden'>
                                <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
                                {/* <ion-icon name="menu-outline"></ion-icon> */}
                            </div>
                        </div>

                        <ul className={`md:flex md:items-center dark:text-white md:pb-0 pb-12 absolute md:static md:bg-transparent lg:bg-transparent bg-gray-800 dark:bg-[#1d232a] md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pt-7 md:pt-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-[58px] text-white' : 'top-[-490px]'}`}>
                            {menuItems}
                        </ul>

                    </nav>
                </div>
            }
        </div>
    );
};

export default Header;