import React from 'react';
import { Link } from 'react-router-dom';

const CarsCard = ({ car }) => {

    const { title, _id, img, description, price, brand } = car;

    return (
        <div className="card bg-base-100 shadow-teal-200 shadow-2xl text-start">
            <figure><img src={`data:image/*;base64,${img}`} alt={title} /></figure>
            <div className="card-body">
                <div className="flex justify-between items-center">
                    <h2 className="card-title">{title}</h2>
                    <h1 className="text-xs badge badge-info uppercase">{brand}</h1>
                </div>
                <p className='text-xl'>Price: <strong>${price}</strong></p>
                <p>{description.slice(0, 290)}</p>
                <div className="card-actions pt-2 justify-end">
                    <button className="btn btn-accent"><Link to={`/cars/${_id}`}>Buy Now</Link></button>
                </div>
            </div>
        </div>

    );
};

export default CarsCard;