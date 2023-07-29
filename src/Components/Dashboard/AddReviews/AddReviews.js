import React, { useContext, useState, useEffect } from 'react';
import ReactStars from "react-rating-stars-component";
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const AddReviews = () => {

    useEffect(() => {
        document.title = 'Dashboard - Add Review'
    })

    const { user } = useContext(AuthContext);
    const [ratting, setRatting] = useState('');
    const [img, setImg] = useState();

    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const url = `https://car-house.vercel.app/userprofile?email=${user?.email}`;

    const { data: userProfile = [] } = useQuery({
        queryKey: ['userProfile', user?.email],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            return data;
        }
    })

    const ratingChanged = (newRating) => {
        setRatting(newRating);
    }

    const handleReview = (data) => {
        const name = data.name;
        const feedback = data.feedback;
        const profile = userProfile?.map(proImg => setImg(proImg?.image));

        // console.log(name, feedback, ratting, img);

        const review = {
            name: name,
            feedback: feedback,
            ratting: ratting,
            img: img
        }

        fetch('https://car-house.vercel.app/reviews', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(review)
        })

            .then(res => res.json())
            .then(result => {
                // console.log(result);
                toast.success('Thanks for nice review')
                reset()
            })

    }

    return (
        <div className='mx-5'>
            <h1 className='text-start text-2xl font-bold pb-4'>Add Review</h1>
            <div className="w-full md:w-[45%] mx-auto">
                <div className="card shadow-2xl bg-gray-800">
                    <form className="card-body text-black" onSubmit={handleSubmit(handleReview)}>

                        <div className='flex justify-center'>
                            {
                                userProfile?.map(profile => <img key={profile._id} src={(`data:image/*;base64,${profile?.image}`)} alt={user?.displayName} className="h-[170px] w-[170px] rounded-[50%] object-cover" />)
                            }
                        </div>

                        <div className="flex pt-3 justify-center">
                            <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                size={28}
                                activeColor="#ffd700"
                            />{errors.ratting && <small className='text-red-500 text-start mt-2'>{errors.ratting?.message}</small>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Name <span className='text-red-600'>*</span></span>
                            </label>
                            <input {...register('name', { required: 'Name is required' })
                            }
                                type="text" className="input input-bordered capitalize" placeholder='Full name' />
                            {errors.name && <small className='text-red-500 text-start mt-2'>{errors.name?.message}</small>}

                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Feedback <span className='text-red-600'>*</span></span>
                            </label>
                            <textarea {...register('feedback', { required: 'Feedback is required' })} className="textarea textarea-bordered" placeholder="What's your feedback"></textarea>
                            {errors.feedback && <small className='text-red-500 text-start mt-2'>{errors.feedback?.message}</small>}
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-accent" type='submit'>Review</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddReviews;