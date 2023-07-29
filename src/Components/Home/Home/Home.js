import React, { useEffect } from 'react';
import car from '../../../Assets/car.png'
import Cars from '../Cars/Cars';
import Reviews from '../Reviews/Reviews';
import Brand from '../Brand/Brand';

const Home = () => {

    useEffect(() => {
        document.title = 'Car House'
    })

    return (
        <div className='pt-3'>
            <div className="grid grid-rows-1 md:grid-cols-2 grid-cols-1 gap-4 mb-7">
                <div className='text-start p-3 md:p-7 md:mt-7'>
                    <h1 className='text-5xl font-bold pb-3'>Welcome to <span className='text-5xl text-teal-500 font-bold'>Car House</span></h1>
                    <p className='text-[18px] pt-4'>
                        Discover Your Perfect Ride at <span className='text-teal-500 font-bold'>CarHouse</span> - Where Every Drive is an Adventure.
                    </p>
                    <p className="pt-3 text-[18px]">At <span className='text-teal-500 font-bold'>CarHouse</span>, we understand that finding the right car is not just about transportation; it's about finding your ideal companion on the road. Whether you're looking for a sleek sedan, a rugged SUV, a powerful sports car, or a family-friendly minivan, we have an extensive selection to cater to your unique needs and desires.</p>
                    <p className='pt-3 text-[18px]'>Browse our user-friendly website, where you can easily search, compare, and customize your car search based on make, model, price, and more. Our virtual showroom allows you to view high-quality images and detailed specifications of each vehicle. Experience the joy of car buying like never before with AutoQuest - Your Trusted Partner in the Pursuit of the Perfect Car!</p>
                    <div className="py-5">
                        <button className='btn btn-accent'>Buy Now</button>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <img src={car} className='p-5 object-contain' alt="car" />
                </div>
            </div>
            {/* start export components */}
            <Cars></Cars>
            <Brand></Brand>
            <Reviews></Reviews>
        </div>
    );
};

export default Home;