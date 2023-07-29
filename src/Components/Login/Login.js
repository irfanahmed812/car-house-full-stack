import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';

const Login = () => {

    useEffect(() => {
        document.title = 'Login'
    })

    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [loginError, setLoginError] = useState("");

    // context
    const { signIn } = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';



    const handleLogin = (data) => {
        // console.log(data);

        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                // console.log(user);
                toast.success('Login successfully')
                reset()
                navigate(from, { replace: true })
            })
            .catch(error => {
                // console.log(error);
                setLoginError(error.message)
                toast.error('Login failed')
            })
    }


    return (
        <div className='pt-5 pb-7'>
            <div className="px-4 md:px-1">
                <div className="card flex-shrink-0 mx-auto w-full max-w-md shadow-2xl bg-base-100">
                    <h1 className='pt-4 text-4xl font-bold'>Login</h1>
                    <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
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
                            <input type='password' className="input input-bordered" placeholder='Password' {...register('password', {
                                required: "Password is required",
                            })
                            } />
                            {errors.password && <small className='text-red-500 text-start mt-2'>{errors.password?.message}</small>}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-accent" type='submit'>Login</button>
                        </div>
                        {
                            loginError && <p className='text-red-500 my-2'>{loginError}</p>
                        }

                    </form>
                    <div className="pb-6">
                        <p>You don't have any account? <Link className='link-accent hover:link' to='/signin'>Sign In</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;