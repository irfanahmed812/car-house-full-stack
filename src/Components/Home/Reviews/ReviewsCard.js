// import React from 'react';
// import ReactStars from "react-rating-stars-component";
// import { SwiperSlide } from 'swiper/react';


// const ReviewsCard = ({ review }) => {

//     const { name, ratting, feedback, img } = review;

//     return (
//         <SwiperSlide>
//             <div className="card w-96 bg-base-100 shadow-2xl">
//                 <div className="avatar flex justify-center pt-2">
//                     <div className="w-24 rounded-full">
//                         <figure><img src={img} alt={name} /></figure>
//                     </div>
//                 </div>
//                 <div className="card-body">
//                     <div className='flex justify-center'>
//                         <ReactStars
//                             edit={false}
//                             count={5}
//                             value={ratting}
//                             size={24}
//                             activeColor="#ffd700"

//                         />
//                     </div>
//                     <h2 className="text-center text-[22px] font-semibold">{name}</h2>
//                     <p className='text-start text-[15px]'>{feedback}</p>
//                 </div>
//             </div>
//         </SwiperSlide>
//     );
// };

// export default ReviewsCard;