import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';


const SignIn = () => {

    useEffect(() => {
        document.title = 'Sign In'
    })

    const { register, formState: { errors }, handleSubmit, reset, watch } = useForm();
    const [signUpError, setSignUpError] = useState("");
    const [img, setImg] = useState(null);


    // nevagite
    const location = useLocation();
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || '/';

    // context
    const { createUser, updateUser } = useContext(AuthContext);

    const handleSignUp = (data) => {

        if (!img) {
            return
        }

        const formData = new FormData();
        formData.append('img', img)
        formData.append('email', data.email)

        fetch('https://car-house.vercel.app/userprofile', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
            })

        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                // console.log(user);
                reset()
                toast.success('Successfully user created');

                const userInfo = data.name;
                updateUser(userInfo)
                savedUser(data.name, data.email)
            })
            .catch(error => {
                // console.log(error);
                setSignUpError(error.message);
                toast.error('Sign in error');
                return
            })
    }

    const savedUser = (name, email) => {
        const user = { name, email };

        fetch('https://car-house.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                navigate(from, { replace: true })
            })
    }



    return (
        <div className='pt-5 pb-7'>
            <div className="px-4 md:px-1">
                <div className="card flex-shrink-0 mx-auto w-full max-w-md shadow-2xl bg-base-100">
                    <h1 className='pt-4 text-4xl font-bold'>Sign In</h1>
                    <form className="card-body" onSubmit={handleSubmit(handleSignUp)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name <span className='text-red-600'>*</span></span>
                            </label>
                            <input {...register('name', { required: "Name is required" })
                            }
                                type="text" className="input input-bordered" placeholder='Enter name' />
                            {errors.name && <small className='text-red-500 text-start mt-2'>{errors.name?.message}</small>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email <span className='text-red-600'>*</span></span>
                            </label>
                            <input {...register('email', { required: "Email is required" })
                            }
                                type="email" className="input input-bordered" placeholder='Email' />
                            {errors.email && <small className='text-red-500 text-start mt-2'>{errors.email?.message}</small>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password <span className='text-red-600'>*</span></span>
                            </label>
                            <input type="password" className="input input-bordered" placeholder='Password' {...register('password', {
                                required: "Password is required",
                                pattern: {
                                    value: /[@/$#%&*!]/,
                                    message: "Password must include a special character [@/$@&%!*]"
                                },
                                minLength: { value: 6, message: "Password must be at least 6 characters" }
                            })
                            } />
                            {errors.password && <small className='text-red-500 text-start mt-2'>{errors.password?.message}</small>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password <span className='text-red-600'>*</span></span>
                            </label>
                            <input {...register('confPassword', {
                                validate: (val) => {
                                    if (watch('password') !== val) {
                                        return "Your passwords do not match";
                                    }
                                }
                            })
                            }
                                type="password" className="input input-bordered" placeholder='Confirm password' />
                            {errors.confPassword && <small className='text-red-500 text-start mt-2'>{errors.confPassword?.message}</small>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo <span className='text-red-600'>*</span></span>
                            </label>
                            <input {...register('file', { required: "Please upload photo" })
                            }
                                type="file" accept='image/*' onChange={e => setImg(e.target.files[0])} name='file' className="file-input file-input-bordered file-input-info w-full max-w-md" placeholder='file' />
                            {errors.file && <small className='text-red-500 text-start mt-2'>{errors.file?.message}</small>}
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-accent" type='submit'>Sign In</button>
                        </div>
                        {
                            signUpError && <p className='text-red-500 my-2'>{signUpError}</p>
                        }

                    </form>
                    <div className="pb-5">
                        <p>You already have an account? <Link className='link-accent hover:link' to='/login'>Login</Link></p>
                        <div className="divider">OR</div>
                        <button className='btn btn-neutral w-[95%] '>Continue with google</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;