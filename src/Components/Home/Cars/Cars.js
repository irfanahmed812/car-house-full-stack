import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import CarsCard from './CarsCard';
import { Link } from 'react-router-dom';
import Loading from '../../Loading/Loading';

const Cars = () => {

    const [loading, setLoading] = useState(true);

    const { data: cars } = useQuery({
        queryKey: ['cars'],
        queryFn: async () => {
            const res = await fetch('https://car-house.vercel.app/cars');
            const data = await res.json();
            setLoading(false)
            return data;
        }
    })

    console.log(cars);

    return (
        <div className='pt-4 mx-3'>
            <h1 className='md:text-4xl text-2xl dark:text-white font-bold pb-10'>Explore Cars</h1>
            {
                loading ? <Loading></Loading> : <div className='grid grid-rows-1 md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6'>
                    {
                        cars?.slice(0, 6)?.map(car => <CarsCard key={car._id} car={car}></CarsCard>)
                    }
                </div>
            }
            <div className='text-center pt-[50px] pb-7'>
                <button className='btn btn-accent btn-sm'><Link to='/cars'>See More <ion-icon name="arrow-forward"></ion-icon></Link></button>
            </div>
        </div>
    );
};

export default Cars;