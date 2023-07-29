import React, { useEffect } from 'react';
import author from '../../Assets/author.jpg';
import { Link } from 'react-router-dom';

const About = () => {

    useEffect(() => {
        document.title = 'About'
    })


    return (
        <div className='text-center pt-2 pb-8'>
            <h1 className='text-4xl font-semibold text-center pt-1 pb-5'>Founder</h1>
            <div className="grid grid-rows-1 grid-cols-1 md:grid-cols-2 my-10 mx-5">
                <div className="avatar flex justify-center">
                    <div className="w-[250px] h-[250px] rounded-full">
                        <img src={author} alt='Irfan Ahmed' />
                    </div>
                </div>
                <div className="card bg-gray-800 shadow-xl mt-7 md:mt-0">
                    <div className="card-body text-white text-start">
                        <h2 className="card-title">Md Irfan Ahmed</h2>
                        <p className='text-teal-500 text-[13px]'>MERN Stack Web Developer</p>
                        <p>I am Md Irfan Ahmed. I am a full stack web developer. I have good knowledge about Html, Css, Javascript, React Js, Node Js, Experss Js, Tailwind Css, Rest Api, React Bootstrap, PSD To Html, Figma To Html and many more.</p>
                        <p>Click to know more about me <Link className='link hover:text-teal-500 duration-300' to='https://irfanahmed.netlify.app/' target='_blank'>click here</Link></p>
                        <div className='pt-2'>
                            <Link className='hover:text-teal-500 duration-300' target='_blank' to='https://www.linkedin.com/in/irfanahmed-dev/'><span className='text-[30px]'><ion-icon name="logo-linkedin"></ion-icon></span></Link>
                            <Link className='hover:text-teal-500 duration-300' to='https://github.com/irfanahmed812' target='_blank'><span className='text-[30px] mx-2'><ion-icon name="logo-github"></ion-icon></span></Link>
                            <Link className='hover:text-teal-500 duration-300' to='https://www.facebook.com/irfanahmed812i' target='_blank'><span className='text-[30px]'><ion-icon name="logo-facebook"></ion-icon></span></Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;