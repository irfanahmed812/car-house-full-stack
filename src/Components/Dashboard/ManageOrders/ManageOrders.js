import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';


const ManageOrders = () => {

    useEffect(() => {
        document.title = 'Dashboard - Manage Orders'
    })

    const url = `https://car-house.vercel.app/orders/all`;

    const { data: allOrders = [], refetch } = useQuery({
        queryKey: ['allOrders'],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            return data;
        }
    })

    const handleApproved = (id) => {
        fetch(`https://car-house.vercel.app/orders/approved/${id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success('Order approved successfully');
                    refetch()
                }
            })
    }

    return (
        <div className='mx-5'>
            <h1 className='text-start text-2xl font-bold pb-4'>Manage Orders: {allOrders?.length}</h1>
            <div className="overflow-auto hidden bg-gray-800 rounded-xl lg:block">
                <table className="table text-white">
                    {/* head */}
                    <thead className='text-white'>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allOrders?.map((order, i) => <tr key={order._id}>
                                <th>{i + 1}</th>
                                <td className='capitalize'><ion-icon name="person-circle"></ion-icon> {order?.name}</td>
                                <td><ion-icon name="mail"></ion-icon> {order?.email}</td>
                                <td className='capitalize'><ion-icon name="bag-handle"></ion-icon> {order?.carName}</td>
                                <td><ion-icon name="cash"></ion-icon> ${order?.price}</td>
                                {/* <h2 className="bg-green-800 badge text-green-400 bg-opacity-50 p-1 rounded text-xs uppercase">Approved</h2> */}
                                <td>{order?.status !== 'approved' ? <button onClick={() => handleApproved(order._id)} className='btn btn-sm btn-success'>Approved</button> : <h2 className="bg-green-800 badge text-green-400 badge-success bg-opacity-50 p-1 rounded text-xs uppercase"><ion-icon name="checkmark-circle"></ion-icon> Approved</h2>}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

            {/* mobile */}
            <div className="grid grid-rows-1 grid-cols-1 md:grid-cols-2 lg:hidden gap-6">
                {
                    allOrders?.map((order, i) => <div key={order._id} className="card bg-base-100 shadow-xl">
                        <div className="card-body text-black dark:text-white">
                            <div className="pt-1 pl-2 border-b-2 border-l-2 w-8 h-10 border-teal-500">
                                <h1 className='text-start text-black dark:text-white font-bold ml-0 mt-1'>{i + 1}</h1>
                            </div>
                            <div className="flex justify-between">
                                <h2 className="card-title capitalize text-black dark:text-white"><ion-icon name="person-circle"></ion-icon> {order?.name}</h2>
                            </div>
                            <p className='text-start text-[14px] py-1'><ion-icon name="mail"></ion-icon> {order?.email}</p>
                            <p className='text-start capitalize text-[16px] py-1'><ion-icon name="bag-handle"></ion-icon> {order?.carName}</p>
                            <p className='text-xl font-semibold text-start'><ion-icon name="cash"></ion-icon> ${order?.price}</p>
                            <div className="card-actions justify-between pt-2">
                                {order?.status !== 'approved' ? <button onClick={() => handleApproved(order._id)} className='btn btn-sm btn-success'>Approved</button> : <h2 className="dark:bg-green-800 badge badge-success text-green-600 dark:text-green-400 bg-opacity-50 p-1 rounded text-xs uppercase"><ion-icon name="checkmark-circle"></ion-icon> Approved</h2>}
                            </div>
                        </div>
                    </div>)
                }


            </div>
        </div>
    );
};

export default ManageOrders;