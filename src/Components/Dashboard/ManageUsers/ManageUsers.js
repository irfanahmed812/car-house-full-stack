import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';

const ManageUsers = () => {

    useEffect(() => {
        document.title = 'Dashboard - Manage Users'
    })

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://car-house.vercel.app/users');
            const data = await res.json();
            return data;
        }
    });

    const handleMakeAdmin = (id) => {
        fetch(`https://car-house.vercel.app/users/admin/${id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success('New admin added successfully');
                    refetch()
                }
            })
    }

    const handleDeleteUser = (user) => {
        const agree = window.confirm(`Are you want to delete: ${user?.name}`)

        if (agree) {
            fetch(`https://car-house.vercel.app/users/${user?._id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (data.deletedCount > 0) {
                        toast.success('User delete successfully');
                        refetch()
                    }
                })
        }
    }

    return (
        <div className='mx-5'>
            <h1 className='text-start text-2xl font-bold pb-4'>Manage Users: {users?.length}</h1>
            <div className="overflow-auto hidden bg-gray-800 rounded-xl lg:block">
                <table className="table text-white">
                    {/* head */}
                    <thead className='text-white'>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Make an admin</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, i) => <tr key={user._id}>
                                <th>{i + 1}</th>
                                <td className='capitalize'><ion-icon name="person-circle"></ion-icon> {user?.name}</td>
                                <td><ion-icon name="mail"></ion-icon> {user?.email}</td>
                                <td>{user.role !== 'admin' ? <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-sm btn-success'>Make Admin</button> : <h2 className="bg-green-800 badge text-green-400 bg-opacity-50 p-1 badge-success rounded text-xs uppercase"><ion-icon name="checkmark-circle"></ion-icon> Admin</h2>}</td>
                                <td><button className='btn btn-sm btn-error' onClick={() => handleDeleteUser(user)}><ion-icon name="trash"></ion-icon> Delete</button></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>

            {/* mobile */}
            <div className="grid grid-rows-1 grid-cols-1 md:grid-cols-2 lg:hidden gap-6">
                {
                    users?.map((user, i) => <div key={user._id} className="card text-black dark:text-white bg-base-100 shadow-xl">
                        <div className="card-body text-white">
                            <div className="pt-1 pl-2 border-b-2 border-l-2 w-8 h-10 border-teal-500">
                                <h1 className='text-start text-black dark:text-white  font-bold ml-0 mt-1'>{i + 1}</h1>
                            </div>
                            <div className="flex justify-between">
                                <h2 className="card-title text-black dark:text-white  capitalize"><ion-icon name="person-circle"></ion-icon> {user?.name}</h2>
                            </div>
                            <p className='text-[15px] text-black dark:text-white  text-start font-semibold'><ion-icon name="mail"></ion-icon> {user?.email}</p>
                            <div className="card-actions pt-2 justify-between">
                                {user.role !== 'admin' ? <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-sm btn-success'>Make Admin</button> : <h2 className="dark:bg-green-800 badge badge-success text-green-600 dark:text-green-400 bg-opacity-50 p-1 rounded text-xs uppercase"><ion-icon name="checkmark-circle"></ion-icon> Admin</h2>}
                                <button className="btn btn-sm btn-error" onClick={() => handleDeleteUser(user)}><ion-icon name="trash"></ion-icon> Delete</button>
                            </div>
                        </div>
                    </div>)
                }

            </div>
        </div>
    );
};

export default ManageUsers;