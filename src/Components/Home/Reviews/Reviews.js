import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Reviews.css'
import ReactStars from "react-rating-stars-component";
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Loading/Loading';

const Reviews = () => {

    const [loading, setLoading] = useState(true)

    const { data: reviews } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await fetch('https://car-house.vercel.app/reviews');
            const data = await res.json();
            setLoading(false)
            return data;
        }
    })


    return (
        <div className='pt-4 pb-4 mx-3'>
            <h1 className='md:text-4xl text-2xl dark:text-white font-bold pb-10'>Customer Reviews</h1>
            {
                loading ? <Loading></Loading> : <div>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}
                        // pagination={{
                        //     clickable: true,
                        // }}
                        navigation={true}
                        modules={[Autoplay, Navigation]}
                        className="mySwiper"
                    >

                        {
                            reviews?.map(review =>
                                <SwiperSlide key={review._id}>
                                    <div className="card w-[500px]  bg-gradient-to-r from-cyan-500 to-teal-500 shadow-2xl">
                                        <div className="avatar flex justify-center pt-3">
                                            <div className="w-24 rounded-full">
                                                {
                                                    review?.img === undefined ? <img src="https://th.bing.com/th/id/OIP.STdrVT87X1tnQJWSdE5VeQHaHa?pid=ImgDet&rs=1" alt="" /> : <figure><img src={`data:image/*;base64,${review?.img}`} alt={review?.name} /></figure>
                                                }
                                            </div>
                                        </div>
                                        <div className="card-body text-white">
                                            <div className='flex justify-center'>
                                                <ReactStars
                                                    edit={false}
                                                    count={5}
                                                    value={review?.ratting}
                                                    size={24}
                                                    activeColor="#ffd700"
                                                />
                                            </div>
                                            <h2 className="text-center text-[22px] font-semibold">{review?.name}</h2>
                                            <p className='text-start text-[15px]'>{review?.feedback}</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        }
                    </Swiper>
                </div>
            }
        </div>
    );
};

export default Reviews;