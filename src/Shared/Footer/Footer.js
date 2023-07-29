import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const time = new Date()

    return (
        <div>

            <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
                <div className="grid grid-flow-col gap-4">
                    <Link to='/' className="link link-hover hover:text-teal-500">Home</Link>
                    <Link to='/cars' className="link link-hover hover:text-teal-500">Cars</Link>
                    <Link to='/blogs' className="link link-hover hover:text-teal-500">Blogs</Link>
                    <Link to='/about' className="link link-hover hover:text-teal-500">About</Link>
                </div>
                <div>
                    <div className="grid grid-flow-col gap-4">
                        <Link className='hover:text-teal-500 duration-300' target='_blank' to='https://www.linkedin.com/in/irfanahmed-dev/'><span className='text-[30px]'><ion-icon name="logo-linkedin"></ion-icon></span></Link>
                        <Link className='hover:text-teal-500 duration-300' to='https://github.com/irfanahmed812' target='_blank'><span className='text-[30px]'><ion-icon name="logo-github"></ion-icon></span></Link>
                        <Link className='hover:text-teal-500 duration-300' to='https://www.facebook.com/irfanahmed812i' target='_blank'><span className='text-[30px]'><ion-icon name="logo-facebook"></ion-icon></span></Link>
                    </div>
                </div>
                <div>
                    <p className="text-sm text-gray-600 text-center"> <p>Copyright &copy; <time dateTime={time}>
                        {time.getFullYear()}</time>  - Car House all right reserved | Developed by <Link target='_blank' to='https://irfanahmed.netlify.app/' className="font-semibold text-teal-500 hover:link">Irfan Ahmed</Link></p></p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;