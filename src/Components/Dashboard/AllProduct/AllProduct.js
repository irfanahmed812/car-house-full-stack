import React, { useEffect, useState } from 'react';
import { useQuery, } from '@tanstack/react-query'
import { toast } from 'react-hot-toast';
import Loading from '../../Loading/Loading';

const AllProduct = () => {

    useEffect(() => {
        document.title = 'Dashboard - All Products'
    })

    const [loading, setLoading] = useState(false)

    // all cars
    const { data: cars = [], refetch } = useQuery({
        queryKey: ['cars'],
        queryFn: async () => {
            const res = await fetch('https://car-house.vercel.app/cars');
            const data = await res.json();
            // setLoading(false)
            return data;
        }
    })

    // console.log(cars);

    const handleDeleteProduct = (car) => {
        const agree = window.confirm(`Are you want to delete: ${car?.title}`)

        if (agree) {
            fetch(`https://car-house.vercel.app/cars/${car?._id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (data.deletedCount > 0) {
                        toast.success('Product delete successfully');
                        refetch()
                        // setLoading(false)
                    }
                })
        }
    }

    return (
        <div className='mx-5'>
            <h1 className='text-start text-2xl font-bold pb-4'>Total Products: {cars?.length}</h1>
            {
                loading ? <Loading></Loading> : <div className="overflow-auto hidden bg-gray-800 rounded-xl lg:block">
                    <table className="table text-white">
                        <thead className='text-white'>
                            <tr>
                                <th>No.</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Brand</th>
                                <th>Description</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cars?.map((car, i) => <tr key={car._id}>
                                    <th>{i + 1}</th>
                                    <td className='capitalize'><ion-icon name="bag-handle"></ion-icon> {car?.title}</td>
                                    <td><ion-icon name="cash"></ion-icon> ${car?.price}</td>
                                    <td className='capitalize'><ion-icon name="clipboard"></ion-icon> {car?.brand}</td>
                                    <td><ion-icon name="document-text"></ion-icon> {car?.description?.slice(0, 40)}...</td>
                                    <td><button onClick={() => handleDeleteProduct(car)} className='btn btn-sm btn-error'><ion-icon name="trash"></ion-icon> Delete</button></td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            }


            {/* mobile */}
            <div className="grid grid-rows-1 grid-cols-1 md:grid-cols-2 lg:hidden gap-6">
                {
                    cars?.map((car, i) => <div key={car._id} className="card bg-base-100 shadow-xl">
                        <div className="card-body text-black dark:text-white">
                            <div className="pt-1 pl-2 border-b-2 border-l-2 w-8 h-10 border-teal-500">
                                <h1 className='text-start text-black dark:text-white font-bold ml-0 mt-1'>{i + 1}</h1>
                            </div>
                            <div className="flex justify-between">
                                <h2 className="card-title capitalize text-black dark:text-white"><ion-icon name="bag-handle"></ion-icon> {car?.title}</h2>
                            </div>
                            <p className='text-start text-[14px] py-1'><ion-icon name="cash"></ion-icon> ${car?.price}</p>
                            <p className='text-start capitalize text-[16px] py-1'><ion-icon name="clipboard"></ion-icon> {car?.brand}</p>
                            <p className='text-[13px] font-semibold text-start'><ion-icon name="document-text"></ion-icon> {car?.description?.slice(0, 70)}...</p>
                            <div className="card-actions justify-between pt-2">
                                <button onClick={() => handleDeleteProduct(car)} className='btn btn-sm btn-error'><ion-icon name="trash"></ion-icon> Delete</button>
                            </div>
                        </div>
                    </div>)
                }


            </div>
        </div>
    );
};

export default AllProduct;