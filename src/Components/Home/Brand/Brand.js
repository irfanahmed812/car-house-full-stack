import React from 'react';
import { Link } from 'react-router-dom';

const Brand = () => {
    return (
        <div className='md:pt-24 py-16 md:pb-36 mx-3'>
            <h1 className='md:text-4xl text-2xl dark:text-white font-bold pb-10'>Trusted Brand</h1>
            <div className="grid grid-rows-1 grid-cols-3 md:gid-cols-4 lg:grid-cols-6 gap-4 pt-10">
                <div className="avatar flex justify-center brightness-50 hover:brightness-100 duration-300 hover:cursor-pointer">
                    <div className="w-24 rounded-xl bg-white p-1">
                        <Link to='https://www.bmw.com.bd/en/index.html' target='_blank'>
                            <img className='object-contain' src="https://th.bing.com/th/id/R.11c17a8cffdce4bc047102db49a94a51?rik=YMKOe232a1ee3w&riu=http%3a%2f%2flogos-download.com%2fwp-content%2fuploads%2f2016%2f02%2fBMW_logo_big_transparent_png.png&ehk=AhLghiJcc6OJgtYYdNOiiM061S%2fa11BCNRbBYQtUBjI%3d&risl=&pid=ImgRaw&r=0" alt='bmw' />
                        </Link>
                    </div>
                </div>
                <div className="avatar flex justify-center brightness-50 hover:brightness-100 duration-300 hover:cursor-pointer">
                    <div className="w-24 rounded-xl bg-white p-1">
                        <Link to='https://www.mercedes-benz.com.sg/passengercars.html' target='_blank'>
                            <img className='object-contain' src="https://th.bing.com/th/id/R.7baec8965ceed0a7cea302c64c591c34?rik=5HDjJnOlECZqWw&riu=http%3a%2f%2fauto-logos.com%2fwp-content%2fuploads%2f2017%2f12%2fmercedes-logo.png&ehk=l%2b4K7yeq1KOlvzcb4G%2bITUXMNxK9bFmskO5QK5%2fmGrY%3d&risl=&pid=ImgRaw&r=0" alt='mercedes' />
                        </Link>
                    </div>
                </div>
                <div className="avatar flex justify-center brightness-50 hover:brightness-100 duration-300 hover:cursor-pointer">
                    <div className="w-24 rounded-xl bg-white p-1">
                        <Link to='https://www.lamborghini.com/en-en/models' target='_blank'>
                            <img className='object-contain' src="https://th.bing.com/th/id/R.35a49e20517655572b1929470e0db323?rik=Qk5X6J4RiCqH%2bg&pid=ImgRaw&r=0" alt='lamborghini' />
                        </Link>
                    </div>
                </div>
                <div className="avatar flex justify-center brightness-50 hover:brightness-100 duration-300 hover:cursor-pointer">
                    <div className="w-24 rounded-xl bg-white p-1">
                        <Link to='https://www.apple.com/' target='_blank'>
                            <img className='object-contain' src="https://th.bing.com/th/id/OIP.B3Q_tm70cPq-eez3izjCgAHaHa?pid=ImgDet&rs=1" alt='apple' />
                        </Link>
                    </div>
                </div>
                <div className="avatar flex justify-center brightness-50 hover:brightness-100 duration-300 hover:cursor-pointer">
                    <div className="w-24 rounded-xl bg-white p-1">
                        <Link to='https://www.google.com/' target='_blank'>
                            <img className='object-contain' src="https://th.bing.com/th/id/R.0fa3fe04edf6c0202970f2088edea9e7?rik=joOK76LOMJlBPw&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fgoogle-logo-png-open-2000.png&ehk=0PJJlqaIxYmJ9eOIp9mYVPA4KwkGo5Zob552JPltDMw%3d&risl=&pid=ImgRaw&r=0" alt='google' />
                        </Link>
                    </div>
                </div>
                <div className="avatar flex justify-center brightness-50 hover:brightness-100 duration-300 hover:cursor-pointer">
                    <div className="w-24 rounded-xl bg-white p-1">
                        <Link to='https://www.amazon.com/' target='_blank'>
                            <img className='object-contain' src="https://merivis.org/wp-content/uploads/2018/02/Amazon-Logo-Transparent-PNG.png" alt='amazon' />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Brand;