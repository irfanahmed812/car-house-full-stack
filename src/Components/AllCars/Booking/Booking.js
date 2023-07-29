import React, { useContext, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const Booking = () => {

    useEffect(() => {
        document.title = 'Booking'
    })

    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const { user } = useContext(AuthContext);
    const car = useLoaderData();

    const { title, img, description, price, brand } = car;

    const navigate = useNavigate()

    const handleOrder = (data) => {

        const name = data.name;
        const email = data.email;
        const carName = data.carName;
        const price = data.price;
        const brand = data.brand;
        const phone = data.phone;

        const order = {
            name,
            email,
            carName,
            price,
            brand,
            phone
        }
        // console.log(order);

        fetch('https://car-house.vercel.app/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(result => {
                toast.success('Order successfull');
                reset()
                if (result.acknowledged) {
                    navigate('/dashboard')
                }
            })

    }

    return (
        <div className='pt-3'>
            <div className="grid grid-rows-1 grid-cols-1 md:grid-cols-2 gap-4">
                <div className='rounded text-start pt-3 text-black dark:text-white'>
                    <div className='px-3 md:px-0'>
                        <img className='rounded-xl' src={`data:image/*;base64,${img}`} alt={title} />
                    </div>
                    <p className='md:py-4 p-3 md:p-0  text-black dark:text-white'>
                        {description}
                    </p>
                </div>
                <div>
                    <div className="mx-auto container">
                        <div className="hero-content flex-col">
                            <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                                <form className="card-body" onSubmit={handleSubmit(handleOrder)}>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Name <span className='text-red-600'>*</span></span>
                                        </label>
                                        <input {...register('name', { required: 'Name is required' })
                                        }
                                            type="text" className="input input-bordered" placeholder='Full name' />
                                        {errors.name && <small className='text-red-500 text-start mt-2'>{errors.name?.message}</small>}

                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email <span className='text-red-600'>*</span></span>
                                        </label>
                                        <input {...register('email',)
                                        }
                                            type="email" className="input input-bordered cursor-not-allowed" defaultValue={user?.email} readOnly />

                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Car Name <span className='text-red-600'>*</span></span>
                                        </label>
                                        <input {...register('carName',)
                                        }
                                            type="text" className="input input-bordered cursor-not-allowed" defaultValue={title} readOnly />

                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Price <span className='text-red-600'>*</span></span>
                                        </label>
                                        <input {...register('price',)
                                        }
                                            type="text" className="input input-bordered cursor-not-allowed" defaultValue={`$${price}`} readOnly />

                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Brand <span className='text-red-600'>*</span></span>
                                        </label>
                                        <input {...register('brand',)
                                        }
                                            type="text" className="input input-bordered cursor-not-allowed" defaultValue={brand} readOnly />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Phone Number <span className='text-red-600'>*</span></span>
                                        </label>
                                        <input {...register('phone', { required: "Phone number is required", minLength: { value: 11, message: "Number must be 11 digit" } },)
                                        }
                                            type="number" className="input input-bordered" placeholder='Enter phone number' />
                                        {errors.phone && <small className='text-red-500 text-start mt-2'>{errors.phone?.message}</small>}
                                    </div>

                                    <div className="form-control mt-6">
                                        <button className="btn btn-accent" type='submit'>Order</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;