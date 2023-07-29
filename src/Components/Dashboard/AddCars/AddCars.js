import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const AddCars = () => {

    useEffect(() => {
        document.title = 'Dashboard - Add Product'
    })

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [img, setImg] = useState(null);
    const [success, setSuccess] = useState('');

    const handleAddCar = (e) => {
        e.preventDefault();
        // console.log(title, price, brand, description, img);

        if (!img) {
            return
        }

        const formData = new FormData();
        formData.append('title', title)
        formData.append('price', price)
        formData.append('brand', brand)
        formData.append('description', description)
        formData.append('img', img)


        fetch('https://car-house.vercel.app/cars', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.insertedId) {
                    setSuccess('Product added successfull')
                    toast.success('Product added successfull')
                    e.target.reset()
                }
            })

    }

    return (
        <div className='mx-5'>
            <h1 className='text-start text-2xl font-bold pb-4'>Add Product</h1>
            <div className="w-full md:w-[50%] mx-auto">
                <div className="card shadow-2xl bg-gray-800">
                    <form onSubmit={handleAddCar} className="card-body dark:text-white">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Product Name <span className='text-red-600'>*</span></span>
                            </label>
                            <input required onChange={e => setTitle(e.target.value)} type="text" placeholder='Product name' className="input text-black disabled input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Price <span className='text-red-600'>*</span></span>
                            </label>
                            <input required onChange={e => setPrice(e.target.value)} type="number" placeholder='Price' className="input text-black disabled input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Brand <span className='text-red-600'>*</span></span>
                            </label>
                            <input required onChange={e => setBrand(e.target.value)} type="text" placeholder='Brand' className="input text-black disabled input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Description <span className='text-red-600'>*</span></span>
                            </label>
                            <textarea required onChange={e => setDescription(e.target.value)} className="textarea textarea-bordered" placeholder="Description"></textarea>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Product Photo <span className='text-red-600'>*</span></span>
                            </label>
                            <input required onChange={e => setImg(e.target.files[0])} accept='image/*' type="file" className="file-input file-input-bordered file-input-info w-full" />
                        </div>
                        <div className="form-control mt-6">
                            <button type='submit' className="btn btn-accent"><ion-icon name="add-circle"></ion-icon> Add Product</button>
                        </div>
                        {
                            success && <p className='text-green-500'>{success}</p>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCars;