import React from 'react';
import './Loading.css';

const Loading = () => {
    return (
        <div className="preloader">
            <span className="loading loading-spinner text-success loading-lg"></span>
        </div>
    );
};

export default Loading;