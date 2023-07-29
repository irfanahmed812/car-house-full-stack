import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const MyOrders = () => {

    useEffect(() => {
        document.title = 'Dashboard - My Orders'
    })

    const { user } = useContext(AuthContext);

    const url = `https://car-house.vercel.app/orders?email=${user?.email}`;

    const { data: orders = [], refetch } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            return data;
        }
    })

    const handleDeleteOrder = (order) => {
        const agree = window.confirm(`Are you want to delete: ${order?.carName}`)

        if (agree) {
            fetch(`https://car-house.vercel.app/orders/${order?._id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (data.deletedCount > 0) {
                        toast.success(`${order?.carName} delete successfully`);
                        refetch()
                    }
                })
        }
    }

    // const { name, email, carName, price, brand, phone } = orders;

    return (
        <div className='mx-5'>
            <h1 className='text-start text-2xl font-bold pb-4'>My Orders: {orders?.length}</h1>
            <div className="overflow-auto hidden bg-gray-800 rounded-xl lg:block">
                <table className="table text-white">
                    {/* head */}
                    <thead className='text-white'>
                        <tr>
                            <th>No.</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Brand</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Payment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {
                        orders === undefined ?
                            <div className='flex justify-center py-5'>
                                <h1 className='text-gray-200 text-xl text-center'>Empty order</h1>
                            </div> : <tbody>
                                {
                                    orders && orders?.map((order, i) => <tr key={order._id}>
                                        <th>{i + 1}</th>
                                        <td className='capitalize'>{order?.carName}</td>
                                        <td><ion-icon name="cash"></ion-icon> {order?.price}</td>
                                        <td className='capitalize'><ion-icon name="copy"></ion-icon> {order?.brand}</td>
                                        <td><ion-icon name="call"></ion-icon> {order?.phone}</td>
                                        <td>{order?.status !== 'approved' ? <span className='bg-yellow-800 text-yellow-400 bg-opacity-50 p-1 rounded text-xs uppercase'><ion-icon name="time"></ion-icon> Progress</span> : <span className='bg-green-800 text-green-400 bg-opacity-50 p-1 rounded text-xs uppercase'><ion-icon name="checkmark-circle"></ion-icon> {order?.status}</span>}</td>
                                        <td>
                                            {order?.status !== 'approved' ? <span className="tooltip" data-tip="Please wait for your order to be approved. Then you can make the payment"><button disabled="disabled" className='btn btn-sm btn-success disabled:bg-opacity-50 disabled:bg-[#36d399] disabled:text-black disabled:text-opacity-40 cursor-not-allowed'><Link to={`/dashboard/payment/${order?._id}`}>Pay</Link></button></span> : <button className='btn btn-sm btn-success'><Link to={`/dashboard/payment/${order?._id}`}>Pay</Link></button>}
                                        </td>
                                        <td><button className='btn btn-sm btn-error' onClick={() => handleDeleteOrder(order)}><ion-icon name="trash"></ion-icon> Delete</button></td>
                                    </tr>)
                                }
                            </tbody>
                    }
                </table>

            </div>
            {/* mobile */}
            <div className="grid grid-rows-1 grid-cols-1 md:grid-cols-2 lg:hidden gap-6">
                {
                    orders ? orders?.map((order, i) => <div key={order._id} className="card bg-base-100 shadow-xl">
                        <div className="card-body text-black dark:text-white">
                            <div className="pt-1 pl-2 border-b-2 border-l-2 w-8 h-10 border-teal-500">
                                <h1 className='text-start text-black dark:text-white font-bold ml-0 mt-1'>{i + 1}</h1>
                            </div>
                            <div className="flex justify-between mb-2">
                                <h2 className="card-title text-[24px] text-black dark:text-white">{order?.carName?.slice(0, 15)}</h2>
                                <h2>{order?.status !== 'approved' ? <span className='bg-yellow-800 text-yellow-400 bg-opacity-50 p-1 rounded text-xs uppercase'><ion-icon name="time"></ion-icon> Progress</span> : <span className='dark:bg-green-800 dark:text-green-400 bg-green-600 text-green-600 dark:bg-opacity-70 bg-opacity-50 p-1 rounded text-xs uppercase'><ion-icon name="checkmark-circle"></ion-icon> {order?.status}</span>}</h2>
                            </div>
                            <p className='text-[16px] text-start font-semibold text-black dark:text-white'><ion-icon name="cash"></ion-icon> {order?.price}</p>
                            <p className='text-start text-[14px] py-1 text-black dark:text-white'><ion-icon name="copy"></ion-icon> {order?.brand}</p>
                            <p className='text-start text-[14px] py-1 text-black dark:text-white'><ion-icon name="call"></ion-icon> {order?.phone}</p>
                            <div className="card-actions justify-between pt-1">
                                {order?.status !== 'approved' ? <span className="tooltip" data-tip="Please wait for your order to be approved. Then you can make the payment"><button disabled="disabled" className='btn btn-sm btn-success disabled:bg-opacity-50 disabled:bg-[#36d399] disabled:text-black disabled:text-opacity-40 cursor-not-allowed'><Link to={`/dashboard/payment/${order?._id}`}>Pay</Link></button></span> : <button className='btn btn-sm btn-success'><Link to={`/dashboard/payment/${order?._id}`}>Pay</Link></button>}
                                <button className="btn btn-sm btn-error"><ion-icon name="trash"></ion-icon> Delete</button>
                            </div>
                        </div>
                    </div>) : <span className='justify-center flex py-5'><h1 className='text-gray-800 text-xl'>Empty order</h1></span>
                }


            </div>
        </div>
    );
};

export default MyOrders;