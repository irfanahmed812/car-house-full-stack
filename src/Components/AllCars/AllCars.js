import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

const AllCars = () => {


    useEffect(() => {
        document.title = 'Cars'
    })


    const [loading, setLoading] = useState(true);

    const { data: cars = [], refetch } = useQuery({
        queryKey: ['cars'],
        queryFn: async () => {
            const res = await fetch('https://car-house.vercel.app/cars');
            const data = await res.json();
            setLoading(false)
            refetch()
            return data;
        }
    })

    return (
        <div className='pt-3 pb-16 mx-3'>
            {
                loading ? <Loading></Loading> : <div className='grid grid-rows-1 md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6'>
                    {
                        cars?.map(car => <div key={car._id}>
                            <div className="card bg-base-100 shadow-teal-200 shadow-2xl text-start">
                                <figure><img className='object-cover h-[260px] w-full' src={`data:image/*;base64,${car?.img}`} alt={car?.title} /></figure>
                                <div className="card-body">
                                    <div className="flex justify-between items-center">
                                        <h2 className="card-title">{car?.title}</h2>
                                        <h1 className="text-xs badge badge-info uppercase">{car?.brand}</h1>
                                    </div>
                                    <p className='text-xl'>Price: <strong>${car?.price}</strong></p>
                                    <p>{car?.description.slice(0, 290)}</p>
                                    <div className="card-actions pt-2 justify-end">
                                        <button className="btn btn-accent"><Link to={`/cars/${car?._id}`}>Buy Now</Link></button>
                                    </div>

                                </div>
                            </div>
                        </div>)
                    }
                </div>

            }
        </div>
    );

};

export default AllCars;